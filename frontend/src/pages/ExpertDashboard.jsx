import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Search, Filter, MessageCircle, MapPin, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const ExpertDashboard = () => {
    const [queries, setQueries] = useState([]);
    const [filters, setFilters] = useState({ crop: '', location: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQueries();
    }, [filters]);

    const fetchQueries = async () => {
        setLoading(true);
        try {
            const res = await api.get('/queries', { params: filters });
            setQueries(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Expert Portal</h1>
                    <p className="text-muted">Browse and resolve farmer issues to earn points</p>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-48">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                        <input
                            placeholder="Search crop..."
                            className="input-field !pl-10 !py-2 !text-sm"
                            value={filters.crop}
                            onChange={e => setFilters({ ...filters, crop: e.target.value })}
                        />
                    </div>
                    <div className="relative flex-1 md:w-48">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                        <input
                            placeholder="Location..."
                            className="input-field !pl-10 !py-2 !text-sm"
                            value={filters.location}
                            onChange={e => setFilters({ ...filters, location: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="card h-48 animate-pulse bg-gray-100" />)}
                </div>
            ) : queries.length === 0 ? (
                <div className="card text-center py-20 bg-gray-50 border-dashed">
                    <Filter size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-muted">No matching queries found. Try broadening your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {queries.map((q, idx) => (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Link to={`/queries/${q.id}`} className="card block hover:shadow-xl transition-shadow group flex flex-col h-full">
                                <div className="mb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${q.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                            {q.status}
                                        </span>
                                        <span className="text-xs text-muted">{new Date(q.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">{q.title}</h3>
                                </div>

                                <p className="text-muted text-sm line-clamp-3 mb-6 flex-grow">{q.description}</p>

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-border mt-auto">
                                    <span className="flex items-center gap-1 text-xs font-medium text-muted bg-gray-100 px-2 py-1 rounded">
                                        <Tag size={12} /> {q.crop_type || 'General'}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs font-medium text-muted bg-gray-100 px-2 py-1 rounded">
                                        <MapPin size={12} /> {q.location || 'Unknown'}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs font-medium text-muted bg-gray-100 px-2 py-1 rounded ml-auto">
                                        <MessageCircle size={12} /> {q.responses_count || 0}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpertDashboard;
