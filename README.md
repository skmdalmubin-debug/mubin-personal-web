# Mubin Personal Web

A React + Vite personal website starter designed for Netlify and Supabase.

## Run locally
1. Install Node.js.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and add your Supabase project URL and anon/publishable key.
4. Run `npm run dev`.

## Deploy to Netlify
Connect this GitHub repository to Netlify. Build command: `npm run build`; publish directory: `dist`.

Add these Netlify environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Never put a Supabase service_role key in frontend code or Netlify's public build environment.