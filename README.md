# Pantri

A recipe-based shopping list app. Add your recipes once, drop them into a shopping list as you plan the week, and let Pantri produce a deduplicated, per-aisle shopping run for you. Marks of "got it" persist across sessions, so you can put the phone down and pick up where you left off.

## Stack

- **React 17** with React Router v5
- **Vite** for dev/build (migrated off Create React App; tests still run on `react-scripts test`)
- **Firebase v8** for auth + Firestore, wired in via `react-redux-firebase`
- **Redux Toolkit** for the bits of state that aren't in Firestore
- **SCSS** for styling

## Getting started

```bash
git clone https://github.com/<you>/pantri.git
cd pantri
cp .env.example .env       # Firebase config — see below
npm install
npm run dev                # http://localhost:5173
```

### Environment variables

All Firebase config lives in `.env` as `REACT_APP_FIREBASE_*` variables. The committed `.env.example` already points at the real Pantri Firebase project — Firebase web API keys aren't secrets (security is enforced via Firestore rules), so this is safe to share. If you want to run against your own Firebase project, replace the values.

When deploying, the same variables need to be set in your host's environment (e.g. Cloudflare Pages → Settings → Environment Variables).

## Scripts

| Script                 | What it does                           |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Vite dev server with HMR               |
| `npm run build`        | Production build into `build/`         |
| `npm test`             | Jest test runner (via `react-scripts`) |
| `npm run format`       | Prettier write across the whole repo   |
| `npm run format:check` | Prettier check, no writes — used in CI |

## Project layout

```
src/
  App/                    Top-level providers, store, shared utils
  components/             Reusable presentational components
  firebase/               Firebase config + helpers (compat SDK)
  pages/
    contact/              Contact form
    forgot-password/      Auth flow
    home/                 Tabbed container — recipes + shopping list
    recipes/              Recipe CRUD
    shopping-list/        Recipe-grouped shopping view + data utils
    sorted-shopping/      Deduplicated, sorted "shopping run" view
    sign-in-and-sign-up/  Auth pages
```

The shopping data model is documented inline at the top of `src/pages/shopping-list/shopping-list.utils.js` — each shopping-list ingredient is `{ name, purchased }`, with normalisation on read so legacy string shapes still work.

## Debug logger

There's a small namespaced debug logger at `src/App/debug.utils.js` that's off by default. Flip namespaces on from devtools without rebuilding:

```js
localStorage.setItem("pantri:debug", "*"); // every namespace
localStorage.setItem("pantri:debug", "toggle,sort"); // specific
localStorage.removeItem("pantri:debug"); // off
```

Current namespaces: `toggle`, `sort`, `add`.

## Deploy

Pushes to `master` are auto-deployed to [Cloudflare Pages](https://pages.cloudflare.com/). The `bump.yml` GitHub Action additionally bumps the version and updates `CHANGELOG.md` based on conventional-commit messages.
