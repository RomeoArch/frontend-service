# Codeforce frontend

An Angular 21 starter for the Codeforce community website. This repository contains only the frontend, directly at the repository root.

## Run locally

Prerequisites: Node.js 22.20.0 (the version used for setup) and npm 10.9.3. Angular 21 supports Node ^20.19, ^22.12, or ^24. Use a compatible Node version when installing dependencies.

From this folder:

```powershell
npm.cmd ci
npm.cmd start
```

Open http://localhost:4200. Leave the terminal running. Changes under `src/` reload automatically. Stop with Ctrl+C. You only need `npm.cmd ci` on a fresh checkout or after dependency changes. On other platforms, `npm` works in place of `npm.cmd`; the `.cmd` form avoids PowerShell execution-policy problems on Windows.

To open your default browser automatically, use `npm.cmd start -- --open`. If port 4200 is occupied, use `npm.cmd start -- --port 4201` and visit http://localhost:4201.

## Commands

- `npm.cmd start`: local development server.
- `npm.cmd run build`: production build in `dist/frontend-service/browser/`.
- `npm.cmd test -- --watch=false`: run the Vitest tests once.
- `npm.cmd run ng -- generate component pages/my-page`: generate a component.

## What is included

- Standalone Angular components, strict TypeScript, SCSS, and client-side routing.
- Responsive navigation and starter Home, About, Speakers, Meetups, and Contact pages.
- Lazy-loaded page components, browser page titles, and a not-found page.
- Route tests, a reproducible npm lockfile, and Angular CLI build configuration.

The site uses placeholder community copy. No live events, contact submission, accounts, backend, Firebase, or database are connected yet. No secrets or environment configuration are required to run it. SSR and prerendering are not enabled in this starter.

## Angular explained for a FastAPI / Python developer

FastAPI typically runs on a server and returns data. This Angular application runs in the visitor's browser and displays the interface. Later the browser can call the separate API over HTTP and render its JSON response. Angular can call a FastAPI API just as easily as the planned Cloudflare Worker API.

- **TypeScript** is JavaScript with static types. It fills the role Python fills in your backend, with types checked during development/build. Browsers execute the compiled JavaScript. Unlike Pydantic, TypeScript types do not validate incoming JSON at runtime.
- **HTML templates** describe the visible elements. Angular binds data into them and handles events such as clicks. A component pairs this template with a TypeScript class and optional styles. See `src/app/pages/home.ts` for a small example.
- **SCSS** is an extension of CSS, the language that controls layout, colors, and responsive design. It compiles to ordinary CSS. The starter uses mostly plain CSS syntax inside SCSS files.
- **Components** are reusable pieces of interface: a page, navigation bar, event card, or form. `@Component` is metadata on a class, somewhat like Python decorator syntax, although its purpose differs from a FastAPI route decorator. Standalone components declare their own imports without a separate NgModule.
- **Angular Router** maps browser paths such as `/meetups` to components. Unlike a FastAPI endpoint, this route selects a view inside the browser; it does not implement a backend API endpoint.
- **Services and dependency injection** share logic such as API access across components. Angular's `inject()` is conceptually similar to requesting a dependency using FastAPI's `Depends()`, but runs in the frontend.
- **Signals** hold reactive state: Angular updates affected UI when values change. The content page uses `toSignal` to follow route data changes.
- **RxJS** provides Observables, streams of values over time. Angular uses them for route data and HTTP requests. You do not need to learn all of RxJS before writing your first page.
- **Node.js** runs JavaScript tools on your computer. Here it runs the build tools and development server; it is not your application API backend.
- **npm** manages packages, comparable to pip. `package.json` declares dependencies and commands; `package-lock.json` records exact resolved versions; `node_modules/` contains the installed packages and is ignored by Git.
- **Angular CLI** automates scaffolding, serving, compiling, and tests. `npm start` invokes `ng serve`, roughly comparable to running `uvicorn --reload` for the development workflow. It serves the frontend rather than your business API.
- **Vitest** runs automated TypeScript tests, filling a similar role to pytest. The Angular CLI production builder uses esbuild; its development server uses Vite internally.

## Where to edit

```text
src/main.ts                 Application entry point
src/app/app.config.ts       Global providers and router setup
src/app/app.routes.ts       URL-to-page mapping and starter page content
src/app/app.ts              Root component definition
src/app/app.html            Shared navigation, page outlet, and footer
src/app/app.scss            Shared shell styles
src/app/pages/home.ts       Home page component and template
src/app/pages/content.ts    Reusable placeholder page component
src/styles.scss            Global styles and page layout
public/                    Static assets
angular.json               Angular build, serve, and test configuration
```

To start learning, change the headline in `src/app/pages/home.ts` while the server is running. To add a page, generate a component and register its path in `app.routes.ts`. Replace the shared placeholder pages with dedicated components as their features grow.

When connecting the API, add an Angular service and `provideHttpClient()` in `app.config.ts`; keep the API base URL configurable. The backend must enforce authentication, authorization, and validation. Anything included in frontend source or configuration is visible to visitors.

For deployment, configure your static host to serve `index.html` for application routes such as `/meetups`. Public-page prerendering and hosting are later steps.

Official references: https://angular.dev/essentials/components, https://angular.dev/guide/routing, https://angular.dev/essentials/dependency-injection, https://angular.dev/tools/cli/setup-local, https://angular.dev/reference/versions.

Installation troubleshooting: the preinstalled npm 10.9.3 encountered an internal 'edgesOut' error when resolving the initial dependencies. Setup succeeded using `npx.cmd --yes npm@11 install`. The lockfile is now included; use `npm.cmd ci` for repeatable installs. If your npm version encounters the same internal error, use `npx.cmd --yes npm@11 ci`.
