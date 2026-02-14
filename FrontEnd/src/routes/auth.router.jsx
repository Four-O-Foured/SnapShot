import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./router.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import { store } from "../store/store";

export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    beforeLoad: () => {
        const { isAuthenticated } = store.getState().auth;
        if (isAuthenticated) {
            throw redirect({ to: '/dashboard' });
        }
    },
    component: AuthPage,
});
