export default async function handler(req, res) {
  const { path } = req.query;
  const supabaseUrl = process.env.SUPABASE_URL;
  
  if (!supabaseUrl) {
    return res.status(500).json({ error: 'SUPABASE_URL not configured' });
  }

  // Construct the full path
  const fullPath = Array.isArray(path) ? path.join('/') : path;
  const targetUrl = `${supabaseUrl}/rest/v1/${fullPath}`;
  
  // Forward query parameters
  const queryParams = new URLSearchParams();
  Object.entries(req.query).forEach(([key, value]) => {
    if (key !== 'path') {
      queryParams.append(key, value);
    }
  });
  
  const finalUrl = queryParams.toString() 
    ? `${targetUrl}?${queryParams.toString()}`
    : targetUrl;

  try {
    // Forward the request to Supabase
    const response = await fetch(finalUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        'host': undefined, // Remove host header
        'x-forwarded-for': undefined, // Remove forwarded header
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // Forward response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');

    const responseData = await response.text();
    res.status(response.status).send(responseData);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error', details: error.message });
  }
}