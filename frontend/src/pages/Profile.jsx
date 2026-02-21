import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Award, Star, Settings, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        api.get('/users/profile').then(res => setProfile(res.data));
        api.get('/users/leaderboard').then(res => setLeaderboard(res.data));
    }, []);

    if (!profile) return <div className="text-center py-20">Loading profile...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User Info */}
                <div className="md:col-span-1 space-y-6">
                    <div className="card text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-green-600 to-green-100" />
                        <div className="relative mt-8 mb-4">
                            <div className="w-24 h-24 bg-white p-1 rounded-full mx-auto shadow-lg">
                                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                                    <span className="text-3xl font-bold text-primary">{profile.name.charAt(0)}</span>
                                </div>
                            </div>
                            {profile.role === 'expert' && (
                                <div className="absolute bottom-0 right-1/2 translate-x-12 translate-y-2 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-lg">
                                    <Star size={16} fill="white" />
                                </div>
                            )}
                        </div>

                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <p className="text-sm font-bold text-primary uppercase tracking-widest mb-6">{profile.role}</p>

                        <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                            <div>
                                <div className="text-2xl font-black text-primary">{profile.points}</div>
                                <div className="text-[10px] text-muted uppercase font-bold">Total Points</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-orange-600 italic">{profile.badge}</div>
                                <div className="text-[10px] text-muted uppercase font-bold">Rank</div>
                            </div>
                        </div>
                    </div>

                    <div className="card space-y-4">
                        <h3 className="font-bold flex items-center gap-2 mb-2"><Settings size={18} /> Details</h3>
                        <div className="flex items-center gap-3 text-sm text-muted">
                            <Mail size={16} /> {profile.email || 'No email provided'}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted">
                            <Phone size={16} /> {profile.phone || '+91 00000 00000'}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted">
                            <MapPin size={16} /> Location: India
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-8">
                    {/* Achievement Badges */}
                    <div className="card shadow-lg border-primary/10">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Award size={24} className="text-yellow-500" /> Achievement Badges
                        </h3>
                        <div className="flex flex-wrap gap-6">
                            <BadgeItem label="Contributor" earned={profile.points > 0} />
                            <BadgeItem label="Top 10" earned={false} />
                            <BadgeItem label="Problem Solver" earned={profile.points > 50} />
                            <BadgeItem label="Trusted Expert" earned={profile.role === 'expert'} />
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="card shadow-lg">
                        <h3 className="text-xl font-bold mb-6">Expert Leaderboard</h3>
                        <div className="space-y-4">
                            {leaderboard.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${idx < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <div className="font-bold">{item.name}</div>
                                            <div className="text-xs text-muted italic">{item.badge} Rank</div>
                                        </div>
                                    </div>
                                    <div className="text-primary font-bold">{item.points} pts</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BadgeItem = ({ label, earned }) => (
    <div className={`flex flex-col items-center gap-2 ${!earned ? 'opacity-20 grayscale' : ''}`}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center shadow-inner">
            <ShieldCheck size={32} className="text-yellow-700" />
        </div>
        <span className="text-xs font-bold text-muted">{label}</span>
    </div>
);

export default Profile;
