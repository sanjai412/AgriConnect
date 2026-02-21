import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, LogIn, User, LogOut, BookOpen, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="w-full border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
                        <Sprout size={24} className="text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-2xl font-bold gradient-text">AgriConnect</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/learning" className="flex items-center gap-2 font-medium text-muted hover:text-green-600 transition-colors">
                        <BookOpen size={20} />
                        <span>Learning</span>
                    </Link>

                    {user ? (
                        <>
                            <Link to={user.role === 'farmer' ? '/farmer' : '/expert'} className="flex items-center gap-2 font-medium text-muted hover:text-green-600 transition-colors">
                                <LayoutDashboard size={20} />
                                <span>Dashboard</span>
                            </Link>
                            <Link to="/profile" className="flex items-center gap-2 font-medium text-muted hover:text-green-600 transition-colors">
                                <User size={20} />
                                <span>{user.name}</span>
                            </Link>
                            <button onClick={handleLogout} className="w-10 h-10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                                <LogOut size={20} />
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary flex items-center gap-2 !py-2 !px-5 text-sm">
                            <LogIn size={18} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
