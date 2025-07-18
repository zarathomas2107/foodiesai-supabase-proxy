# Supabase API Proxy for Vercel

This project creates a custom domain proxy for Supabase services, allowing you to use `app.foodiesai.london` instead of the default Supabase URL.

## Features

- Proxies all Supabase API endpoints (auth, rest, storage, realtime, functions)
- Maintains all headers and query parameters
- CORS-enabled for web applications
- Custom domain branding

## Setup

1. **Deploy to Vercel**:
   ```bash
   cd vercel-supabase-proxy
   npm install
   vercel --prod
   ```

2. **Add Environment Variables in Vercel Dashboard**:
   - Go to your Vercel project > Settings > Environment Variables
   - Add:
     - `SUPABASE_URL`: `https://ryvqoavkltzagedrvymy.supabase.co`
     - `SUPABASE_ANON_KEY`: `your-anon-key`
     - `SUPABASE_SERVICE_ROLE_KEY`: `your-service-role-key`

3. **Configure Custom Domain**:
   - In Vercel Dashboard > Settings > Domains
   - Add `app.foodiesai.london`
   - Update DNS records as instructed by Vercel

4. **Update Your App**:
   - Change `SUPABASE_URL` from `https://ryvqoavkltzagedrvymy.supabase.co` to `https://app.foodiesai.london`
   - Keep the same `SUPABASE_ANON_KEY`

## API Endpoints

- `https://app.foodiesai.london/auth/v1/*` → Supabase Auth
- `https://app.foodiesai.london/rest/v1/*` → Supabase Database API
- `https://app.foodiesai.london/storage/v1/*` → Supabase Storage

## Testing

Test the proxy by making requests to:
- `https://app.foodiesai.london/auth/v1/settings`
- `https://app.foodiesai.london/rest/v1/`

## Migration Plan

1. Deploy this proxy to Vercel
2. Test all endpoints work correctly
3. Update your app's `.env` file to use the new domain
4. Deploy your app with the new configuration
5. Remove the old `auth.theconciergex.com` configuration when ready