import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/router.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './lib/react-query'
import { useSelector, Provider } from 'react-redux'
import { store } from './store/store'
import { useEffect, useRef } from 'react';

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isFirstRender = useRef(true);

  // When auth state changes (login/logout), tell the router to re-run beforeLoad guards
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    router.invalidate();
  }, [isAuthenticated]);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster position="top-right" reverseOrder={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
)
