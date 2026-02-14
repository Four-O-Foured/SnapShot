import { Link } from '@tanstack/react-router'
import { Button } from '../ui/Button.jsx'
import { useSelector } from 'react-redux';
import { useAuthActions } from '../../hooks/useAuth.js';

const Navbar = () => {
    const {isAuthenticated} = useSelector((state) => state.auth);
    const {logout } = useAuthActions();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-snap-bg-main/80 backdrop-blur-xl border-b border-border/50">
            <div className="container px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-snap-cyan flex items-center justify-center">
                            <span className="text-white font-bold text-sm">S</span>
                        </div>
                        <span className="text-lg font-semibold gradient-text">SnapNotes</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-small text-snap-text-secondary hover:text-snap-text-primary transition-colors">
                            Features
                        </a>
                        <a href="#pricing" className="text-small text-snap-text-secondary hover:text-snap-text-primary transition-colors">
                            Pricing
                        </a>
                        <a href="#about" className="text-small text-snap-text-secondary hover:text-snap-text-primary transition-colors">
                            About
                        </a>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex">
                        {isAuthenticated ? (
                            <Button variant="ghost" onClick={() => logout.mutate()} size="sm" className="text-snap-text-secondary">
                              Logout
                            </Button>
                        ) : (
                            <Button variant="gradient" size="sm" >
                                <Link to="/auth">Sign In</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar