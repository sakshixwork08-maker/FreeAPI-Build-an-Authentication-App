# FreeAPI Auth App
 
A simple, fully working authentication flow built with **vanilla HTML, CSS, and JavaScript**, using [FreeAPI](https://freeapi.app)'s hosted Authentication Module as the backend. Built as part of the Web Dev Cohort 2026.
 
This project has no backend of its own — every account, session, and profile detail is handled by FreeAPI. The entire focus here is the frontend: forms, `fetch` calls, token handling, and conditional UI based on login state.
 
## Live Demo
 
- **Live site:** _add your deployed link here_
- **Repository:** _add your GitHub repo link here_
## Features
 
- **Register** — create a new account with username, email, password, and role
- **Login** — authenticate with username and password, receive a JWT access token
- **Current user profile** — fetches and displays the logged-in user's username, email, and role
- **Logout** — clears the session and returns to the login screen
- Real-time success and error messages for every action, including field-level validation errors and conflict errors (e.g. duplicate accounts)
- Loading states on all form submissions (buttons disable and show progress text while a request is in flight)
- Clean, single-page-style navigation between Register, Login, and Profile — no page reloads
## Tech Stack
 
- HTML5
- CSS3 (no frameworks)
- Vanilla JavaScript (`fetch` API, no libraries)
- [FreeAPI Authentication Module](https://freeapi.app) as the backend
## How It Works
 
The app is a single `index.html` containing three screens (`register-screen`, `login-screen`, `profile-screen`) as `<div>`s. Only one is visible at a time; a small `showScreen()` helper in `script.js` toggles which one displays based on user actions.
 
**Auth flow:**
 
1. User registers → `POST /users/register`
2. User logs in → `POST /users/login` → API returns a JWT `accessToken`, which is saved in `localStorage`
3. On login, the app immediately calls `GET /users/current-user` with the token attached as an `Authorization: Bearer <token>` header, and renders the returned profile details
4. Logout → `POST /users/logout`, then the stored token is removed and the user is returned to the login screen
## API Endpoints Used
 
| Action | Method | Endpoint |
|---|---|---|
| Register | `POST` | `/api/v1/users/register` |
| Login | `POST` | `/api/v1/users/login` |
| Get current user | `GET` | `/api/v1/users/current-user` |
| Logout | `POST` | `/api/v1/users/logout` |
 
Base URL: `https://api.freeapi.app`
 
## Project Structure
 
```
├── index.html      # All three screens (register, login, profile)
├── style.css       # Styling for the entire app
├── script.js       # Form handling, fetch calls, screen switching, token management
└── README.md
```
 
## Running Locally
 
No build step or dependencies required.
 
1. Clone the repository
2. Open `index.html` in your browser (or serve it with a tool like the VS Code Live Server extension)
## What I Learned
 
This was my first project built independently from a brief, without step-by-step guidance. Some of the real-world debugging I worked through:
 
- Understanding that this specific API is **token-based**, not cookie-based — meaning the JWT has to be manually stored (`localStorage`) and attached to authenticated requests via an `Authorization: Bearer` header, rather than relying on `credentials: "include"`
- Handling inconsistent error response shapes from the API (validation errors return a populated `errors` array, while conflict errors like duplicate accounts return an empty `errors` array with the message in `data.message` instead) — and writing defensive code to handle both
- Debugging `ReferenceError`s caused by variables declared inside a `try` block being used outside its scope
- Fixing a `<script>` tag placement bug where JavaScript ran before later DOM elements existed, causing `getElementById` to return `null`
- Testing endpoints directly in RequestKit before writing any JavaScript, to understand exact response shapes ahead of time
## Author
 
Built by Sakshi Shruti
