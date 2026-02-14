import { useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';
import { useSession } from './hooks/useAuth';
import { useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { setUser, logout } from './store/slices/authSlice';
import { showToast } from './lib/toast';

const App = () => {
  const session = useSession();
  const dispatch = useDispatch();

  const isSuccess = session.isSuccess;
  const isError = session.isError;
  const sessionData = session.data;

  useEffect(() => {
    if (isSuccess && sessionData) {
      dispatch(setUser(sessionData.user || sessionData));
      return;
    }

    if (isError) {
      // Crucial: set loading to false so the dashboard guard can redirect properly
      showToast.error('Login Failed', session.error?.message || 'Failed to login');
      dispatch(logout());
    }
  }, [isSuccess, isError, sessionData, dispatch]);

  if (session.isLoading) {
    return (
      <div className="min-h-screen bg-snap-bg-main flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return <Outlet />;
};

export default App;