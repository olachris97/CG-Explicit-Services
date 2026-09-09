<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e30f88b3-638b-47cc-b1b3-ba2290950e75

## Run Locally

**Prerequisites:** Node.js, and a PostgreSQL database (local or hosted).

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL` (and `GEMINI_API_KEY` if you want the AI audit tool to run for real).
3. Run the app:
   `npm run dev`

The server creates its `submissions` and `bookings` tables automatically on first boot if they don't already exist — no separate migration step needed.

## Admin dashboard

The site now includes a protected admin workspace at `/admin`.

### Local setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to a PostgreSQL connection string.
3. Set a strong `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open `http://localhost:3000/admin/login`.

Development fallback credentials (change these before deployment):

- Email: `admin@cgexplicitservices.com`
- Password: `ChangeMe123!`

The dashboard uses an HttpOnly session cookie and admin APIs reject unauthenticated requests.

### Admin features

- Overview metrics for inquiries and bookings
- Search and status filters
- Inquiry pipeline: New → Contacted → Qualified → Closed
- Booking pipeline: Pending → Confirmed → Completed / Cancelled
- Record detail view with direct email action
- Delete records
- CSV export
- Persistent storage in PostgreSQL (`submissions` and `bookings` tables)

The old floating `LIVE DB CONSOLE` has been removed from the public website.

## Deploying to Render

1. Push this repository to GitHub.
2. In Render, create a new **PostgreSQL** instance and copy its Internal Database URL.
3. Create a new **Web Service** from your GitHub repo:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
4. Set these environment variables on the web service:

```text
DATABASE_URL=<the Internal Database URL from your Render Postgres instance>
NODE_ENV=production
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-strong-admin-password
ADMIN_SESSION_SECRET=your-long-random-secret
GEMINI_API_KEY=your-gemini-key
FRONTEND_ORIGIN=https://your-service-name.onrender.com
```

Do not commit real secrets to the repository.

## Netlify deployment

This project can also be deployed to Netlify:

- React/Vite frontend builds to `dist`
- Express API runs through a Netlify serverless function (`netlify/functions/api.ts`) — not included in this export; add one that wraps the same routes in `server.ts` if you go this route
- `/api/*` requests are rewritten to the function
- `/admin` is served by the SPA fallback
- Admin inquiries and bookings persist in the same PostgreSQL database as above — a serverless function can use the same `DATABASE_URL` and `db.ts` module

### Build locally

```bash
npm install
npm run build
```

### Netlify environment variables

Set these in Netlify Project configuration → Environment variables:

```text
DATABASE_URL=your-postgres-connection-string
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-strong-admin-password
ADMIN_SESSION_SECRET=your-long-random-secret
GEMINI_API_KEY=your-gemini-key
```

Do not commit real secrets to the repository.

