import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser, logout as logoutAction } from '../store/slices/authSlice';
import api from '../api/axios';
import { showToast } from '../lib/toast';
import { useNavigate } from '@tanstack/react-router';

/**
 * Session-only hook. Used in App.jsx (root layout) to check auth status once.
 * No mutations, no useNavigate -- keeps it side-effect free and stable.
 */
export const useSession = () => {
    return useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            const response = await api.get('/auth/me');
            return response.data;
        },
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
};

/**
 * Mutations-only hook. Used in LoginForm, RegisterForm, and logout buttons.
 * Does NOT subscribe to the session query, so it never triggers auth/me.
 */
export const useAuthActions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/register', userData);
            return response.data.user;
        },
        onSuccess: (user) => {
            dispatch(setUser(user));
            queryClient.setQueryData(['auth'], { user });
            showToast.success('Registration successful! Welcome aboard.');
            // No navigate needed -- auth route's beforeLoad will redirect when context updates
        },
        onError: (error) => {
            console.error('Registration Error:', error);
            showToast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        },
    });

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await api.post('/auth/login', credentials);
            return response.data.user;
        },
        onSuccess: (user) => {
            dispatch(setUser(user));
            queryClient.setQueryData(['auth'], { user });
            showToast.success(`Welcome back, ${user.username || 'User'}!`);
            // No navigate needed -- auth route's beforeLoad will redirect when context updates
        },
        onError: (error) => {
            console.error('Login Error:', error);
            showToast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await api.get('/auth/logout');
            return true;
        },
        onSuccess: () => {
            dispatch(logoutAction());
            queryClient.clear();
            showToast.success('Logged out successfully.');
            navigate({ to: '/auth' });
        },
    });

    return {
        register: registerMutation,
        login: loginMutation,
        logout: logoutMutation,
    };
};

// Keep backward-compatible export (but prefer useSession + useAuthActions)
export const useAuth = () => {
    const session = useSession();
    const actions = useAuthActions();
    return { session, ...actions };
};
