# AL MUBIN — Personal Digital World

A responsive black-and-white personal website built with React + Vite.

## Run locally
1. Install Node.js.
2. Run `npm install`.
3. Run `npm run dev`.

## Deploy to Netlify
Build command: `npm run build`
Publish directory: `dist`

The included `netlify.toml` handles single-page navigation.

## Supabase
Add these environment variables in Netlify:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Only use the Supabase anon/publishable key in frontend variables. Never use a `service_role` key in a website.

The contact form inserts into the existing `contact_messages` table using `name`, `email`, and `message` fields. If your table uses different field names, update the insert in `src/App.jsx`.

## Content
The homepage sections and preview content are in `src/App.jsx`. Replace the sample photos with your own photos when ready.
