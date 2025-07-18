export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  
  // Check if environment variables are configured
  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ 
      status: 'error',
      message: 'Missing environment variables',
      configured: {
        supabaseUrl: !!supabaseUrl,
        supabaseAnonKey: !!supabaseAnonKey,
      }
    });
  }

  try {
    // Test connection to Supabase
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
    });

    if (response.ok) {
      return res.status(200).json({
        status: 'healthy',
        message: 'Supabase proxy is working correctly',
        supabaseUrl: supabaseUrl,
        timestamp: new Date().toISOString(),
      });
    } else {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to connect to Supabase',
        supabaseStatus: response.status,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: error.message,
    });
  }
}