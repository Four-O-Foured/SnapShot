import { createRoute, Outlet } from "@tanstack/react-router";
import { rootRoute } from "./router.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import SnapNotePage from "../pages/SnapNotePage.jsx";
import SnapNoteDetailsPage from "../pages/SnapNoteDetailsPage.jsx";
import BubbleMenu from "@/components/layout/BubbleMenu";
import { navItems } from "../lib/utils";

// 1. The Parent (Layout) Route
// This defines the shared structure (Navbar/Sidebar) for all /dashboard/* pages
export const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: () => (
        <div className="min-h-screen bg-snap-bg-main pt-20 sm:pt-12 md:-mt-18 overflow-x-hidden relative">
            <BubbleMenu
                items={navItems}
                logo=""
                useFixedPosition={true}
                className="px-6 md:px-12"
            />
            <main className="flex-1 pt-20 md:pt-32 pb-12 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
                <Outlet />
            </main>
        </div>
    ),
});

// 2. The Index Route (Default page when at /dashboard)
export const dashboardIndexRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/',
    component: DashboardPage,
});

// 3. The SnapNotes Route (/dashboard/snapnotes)
export const snapNotesRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/snapnotes',
    component: SnapNotePage,
});

// 4. The SnapNote Details Route (/dashboard/snapnotes/$noteId)
export const snapNoteDetailsRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/snapnotes/$noteId',
    component: SnapNoteDetailsPage,
});