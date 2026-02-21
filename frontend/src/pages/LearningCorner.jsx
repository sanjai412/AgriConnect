import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Book, Play, Filter, Search, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LearningCorner = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial dummy data as we don't have seeds yet
        setResources([
            { id: 1, title: 'Sustainable Pest Management', category: 'Tips', content: 'Learn natural ways to keep pests away...', video_url: '#' },
            { id: 2, title: 'Optimizing Soil Nutrition', category: 'Tutorial', content: 'Testing and improving your soil quality...', video_url: '#' },
            { id: 3, title: 'Water Conservation Techniques', category: 'Tutorial', content: 'Drip irrigation benefits and setup...', video_url: '#' }
        ]);
        setLoading(false);
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Learning Corner</h1>
                <p className="text-muted text-lg">Curated agricultural insights and video tutorials for the modern farmer.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1 space-y-6">
                    <div className="card">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Filter size={18} className="text-primary" /> Filter
                        </h3>
                        <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 rounded-lg bg-green-50 text-primary font-medium">All Topics</button>
                            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-muted">Crop Tips</button>
                            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-muted">Best Practices</button>
                            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-muted">Tutorials</button>
                        </div>
                    </div>
                </aside>

                <div className="lg:col-span-3 space-y-6">
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                        <input
                            placeholder="Search for articles, videos, or tips..."
                            className="input-field !pl-12 !h-14 shadow-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {resources.map((res, idx) => (
                            <motion.div
                                key={res.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="card group hover:border-primary transition-all flex flex-col"
                            >
                                <div className="aspect-video bg-gray-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                                    <Play size={40} className="text-primary opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur rounded text-[10px] font-bold uppercase tracking-widest">{res.category}</div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 line-clamp-1">{res.title}</h3>
                                <p className="text-muted text-sm mb-6 line-clamp-2">{res.content}</p>
                                <button className="mt-auto flex items-center gap-2 text-primary font-bold text-sm">
                                    Read More <ChevronRight size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningCorner;
