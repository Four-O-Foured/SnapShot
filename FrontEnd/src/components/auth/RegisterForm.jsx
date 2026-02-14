import { useForm } from 'react-hook-form';
import { useAuthActions } from '../../hooks/useAuth';

const RegisterForm = ({ onToggle }) => {
    const { register: registerUser } = useAuthActions();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        registerUser.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in-up">
            <div className="space-y-2">
                <label className="text-sm font-medium text-snap-text-secondary ml-1">
                    Username
                </label>
                <input
                    {...register('username', {
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: 'Username must be at least 3 characters',
                        },
                    })}
                    type="text"
                    placeholder="Choose a username"
                    disabled={registerUser.isPending}
                    className={`w-full px-4 py-3 bg-snap-bg-panel/50 border ${errors.username ? 'border-snap-coral/50' : 'border-white/10'
                        } rounded-xl focus:outline-none focus:border-snap-cyan/50 focus:ring-1 focus:ring-snap-cyan/20 transition-all placeholder:text-snap-text-muted/50 disabled:opacity-50`}
                />
                {errors.username && (
                    <p className="text-xs text-snap-coral ml-1">{errors.username.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-snap-text-secondary ml-1">
                    Email Address
                </label>
                <input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                    type="email"
                    placeholder="name@example.com"
                    disabled={registerUser.isPending}
                    className={`w-full px-4 py-3 bg-snap-bg-panel/50 border ${errors.email ? 'border-snap-coral/50' : 'border-white/10'
                        } rounded-xl focus:outline-none focus:border-snap-cyan/50 focus:ring-1 focus:ring-snap-cyan/20 transition-all placeholder:text-snap-text-muted/50 disabled:opacity-50`}
                />
                {errors.email && (
                    <p className="text-xs text-snap-coral ml-1">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-snap-text-secondary ml-1">
                    Password
                </label>
                <input
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                        },
                    })}
                    type="password"
                    placeholder="Create a password"
                    disabled={registerUser.isPending}
                    className={`w-full px-4 py-3 bg-snap-bg-panel/50 border ${errors.password ? 'border-snap-coral/50' : 'border-white/10'
                        } rounded-xl focus:outline-none focus:border-snap-cyan/50 focus:ring-1 focus:ring-snap-cyan/20 transition-all placeholder:text-snap-text-muted/50 disabled:opacity-50`}
                />
                {errors.password && (
                    <p className="text-xs text-snap-coral ml-1">{errors.password.message}</p>
                )}
            </div>

            {registerUser.isError && (
                <p className="text-sm text-snap-coral text-center bg-snap-coral/10 py-2 rounded-lg">
                    {registerUser.error?.response?.data?.message || 'Registration failed'}
                </p>
            )}

            <button
                type="submit"
                disabled={registerUser.isPending}
                className="w-full py-3.5 mt-2 btn-gradient rounded-xl font-semibold tracking-wide flex items-center justify-center gap-2 group disabled:opacity-50"
            >
                {registerUser.isPending ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <span>Create Account</span>
                        <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </>
                )}
            </button>

            <p className="text-center text-sm text-snap-text-secondary mt-6">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={onToggle}
                    className="text-snap-cyan font-semibold hover:underline"
                >
                    Sign In
                </button>
            </p>
        </form>
    );
};

export default RegisterForm;
