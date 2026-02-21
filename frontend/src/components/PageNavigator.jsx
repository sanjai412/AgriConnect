import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, Home, LayoutDashboard, Search,
    BookOpen, User, PlusCircle, Bell, Settings,
    MessageCircle, HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PageNavigator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const location = useLocation();

    const menuItems = [
        { name: 'Home', path: '/', icon: Home, color: 'bg-blue-100 text-blue-600' },
        { name: 'Learning Corner', path: '/learning', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
    ];

    if (user) {
        menuItems.push(
            { name: 'Profile', path: '/profile', icon: User, color: 'bg-orange-100 text-orange-600' }
        );

        if (user.role === 'farmer') {
            menuItems.push({ name: 'Ask Question', path: '/farmer/ask', icon: PlusCircle, color: 'bg-red-100 text-red-600' });
        }
    } else {
        menuItems.push({ name: 'Sign In', path: '/login', icon: User, color: 'bg-gray-100 text-gray-600' });
    }

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
                        />

                        {/* Menu Items */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="absolute bottom-20 right-0 w-64 bg-white rounded-3xl shadow-2xl border border-border p-4 overflow-hidden"
                        >
                            <div className="mb-4 px-2">
                                <h3 className="text-sm font-bold text-muted uppercase tracking-wider">Quick Navigation</h3>
                            </div>
                            <div className="space-y-2">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 p-3 rounded-2xl transition-all hover:translate-x-1 ${location.pathname === item.path
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'hover:bg-gray-50 text-main'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-xl ${location.pathname === item.path ? 'bg-white/20' : item.color}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <span className="font-semibold">{item.name}</span>
                                    </Link>
                                ))}
                            </div>

                            {user && (
                                <div className="mt-4 pt-4 border-t border-border flex items-center gap-3 px-2">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {user.name[0]}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-bold truncate text-sm">{user.name}</p>
                                        <p className="text-[10px] text-muted uppercase tracking-tighter">{user.role}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors ${isOpen ? 'bg-main text-white' : 'bg-primary text-white'
                    }`}
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
                {!isOpen && (
                    <motion.div
                        layoutId="dot"
                        className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-4 border-background"
                    />
                )}
            </motion.button>
        </div>
    );
};

export default PageNavigator;
