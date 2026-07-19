# Skill Swap — Backend

Quick Node.js + MongoDB backend for the Skill Swap app.

Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and set values (e.g. `MONGO_URI`, `JWT_SECRET`).

3. Start server:

```bash
npm run dev
# or
npm start
```

API endpoints (base `/api/auth`)

- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login (returns JWT)
- `GET /api/auth/users` — list users (no password)
- `POST /api/auth/update` — update user by email

The server also serves static files from the project root, so your existing `dashboard.html` and `login.html` will be available.

