# College Booking — Frontend (Vite + React + Tailwind + Firebase Auth)

## Quick Start
```bash
npm i
npm run dev
```

## Tailwind already configured
Edits in `src/index.css`, config in `tailwind.config.js` and `postcss.config.js`.

## Firebase Authentication — Activation Steps
1. Go to [Firebase Console] → Create a project → Add a Web App.
2. In **Build → Authentication → Sign-in method**, enable:
   - Email/Password
   - Google
   - GitHub (or another social provider) — add callback URL: `http://localhost:5173/` (and Vercel/Netlify domain when deployed).
3. Copy your Firebase SDK config and create `.env` in the project root:
   ```env
   VITE_FIREBASE_API_KEY=YOUR_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-app
   VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
4. Restart dev server.

## Routes (React Router v6)
- `/` Home (search, featured colleges, gallery, research links, recent reviews)
- `/colleges` All colleges (5–6+ cards) with Details buttons
- `/college/:id` **Protected** college details (events, research, sports, process)
- `/admission` **Protected** admission form
- `/my-college` **Protected** user applications + add review
- `/profile` **Protected** profile with editable name, university & address
- `/login`, `/register`, `/reset` Auth screens
- `*` 404 creative screen

## Data
- Static JSON in `src/data/colleges.json` and `src/data/reviews.json`.
- Applications & new reviews are persisted in `localStorage` for demo.
- Later, swap to API calls (backend) while keeping the same state shape.

## Deployment
- Vercel / Netlify: just add env vars from above and build.
