import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Plus, MessageCircle, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FarmerDashboard = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/queries')
            .then(res => setQueries(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Queries</h1>
                    <p className="text-muted">Track and manage your agricultural questions</p>
                </div>
                <Link to="/farmer/ask" className="btn-primary flex items-center gap-2">
                    <Plus size={20} />
                    <span>Ask New Question</span>
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : queries.length === 0 ? (
                <div className="card text-center py-20 border-dashed">
                    <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No queries yet</h3>
                    <p className="text-muted mb-6">Ask your first question to get expert advice!</p>
                    <Link to="/farmer/ask" className="text-primary font-bold hover:underline">Start here</Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {queries.map((q, idx) => (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Link to={`/queries/${q.id}`} className="card flex items-center gap-4 hover:border-primary transition-all group">
                                <div className={`p-4 rounded-full ${q.status === 'answered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                    {q.status === 'answered' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold line-clamp-1">{q.title}</h3>
                                    <div className="flex gap-4 mt-1">
                                        <span className="text-sm text-muted">{new Date(q.created_at).toLocaleDateString()}</span>
                                        <span className="text-sm font-medium px-2 py-0.5 rounded bg-gray-100 uppercase tracking-wider text-[10px]">
                                            {q.crop_type || 'General'}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FarmerDashboard;
