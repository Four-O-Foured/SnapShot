import { createRootRoute, createRouter } from '@tanstack/react-router';
import App from '../App';
import { landingRoute } from './landingPage.router.jsx';
import { dashboardRoute, dashboardIndexRoute, snapNotesRoute, snapNoteDetailsRoute } from './dashboard.router.jsx';
import { authRoute } from './auth.router.jsx';

// Root route - layout wrapper for all routes
// Do NOT define context here -- it comes from RouterProvider in main.jsx
export const rootRoute = createRootRoute({
    component: App,
});

// Build the route tree
export const routeTree = rootRoute.addChildren([
    landingRoute,
    dashboardRoute.addChildren([
        dashboardIndexRoute,
        snapNotesRoute,
        snapNoteDetailsRoute
    ]),
    authRoute
]);

// Create the router instance
// context here is the INITIAL default -- RouterProvider overrides it dynamically
export const router = createRouter({
    routeTree,
    context: {
        auth: undefined,
    },
});
