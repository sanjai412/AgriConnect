import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Calendar, User, Tag, Send, Award, Badge } from 'lucide-react';

const QueryDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [query, setQuery] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchQuery();
    }, [id]);

    const fetchQuery = async () => {
        try {
            const res = await api.get(`/queries/${id}`);
            setQuery(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleResponse = async (e) => {
        e.preventDefault();
        if (!responseText.trim()) return;

        setIsSubmitting(true);
        try {
            await api.post('/responses', { query_id: id, text_content: responseText });
            setResponseText('');
            fetchQuery();
        } catch (err) {
            alert('Failed to post response');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-20 animate-pulse">Loading discussion...</div>;
    if (!query) return <div className="text-center py-20">Query not found.</div>;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Query Section */}
            <div className="card mb-8">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="text-gray-400" />
                        </div>
                        <div>
                            <div className="font-bold">{query.farmer_name}</div>
                            <div className="text-xs text-muted flex items-center gap-1">
                                <Calendar size={12} /> {new Date(query.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${query.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                        {query.status}
                    </span>
                </div>

                <h1 className="text-3xl font-bold mb-4">{query.title}</h1>
                <p className="text-lg text-muted leading-relaxed mb-8">{query.description}</p>

                {query.image_url && (
                    <div className="rounded-2xl overflow-hidden mb-8 border border-border">
                        <img src={`http://localhost:5000${query.image_url}`} alt="Issue" className="w-full max-h-[400px] object-contain bg-gray-50" />
                    </div>
                )}

                <div className="flex gap-4">
                    <span className="flex items-center gap-1 text-sm font-medium text-primary bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                        <Tag size={14} /> {query.crop_type || 'General'}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                        <MessageSquare size={14} /> {query.responses?.length || 0} Responses
                    </span>
                </div>
            </div>

            {/* Discussion List */}
            <div className="space-y-6 mb-12">
                <h2 className="text-xl font-bold">Responses</h2>
                {query.responses?.map((resp) => (
                    <div key={resp.id} className="card bg-white border-l-4 border-l-primary flex gap-4">
                        <div className="shrink-0">
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-primary">
                                <Award size={20} />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-primary">{resp.expert_name}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 bg-yellow-100 text-yellow-700 font-bold rounded uppercase">{resp.badge}</span>
                                </div>
                                <span className="text-xs text-muted">{new Date(resp.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-muted leading-relaxed">{resp.text_content}</p>
                        </div>
                    </div>
                ))}
                {query.responses?.length === 0 && <div className="text-center py-10 text-muted italic">No responses yet.</div>}
            </div>

            {/* Post Response (Expert Only) */}
            {(user.role === 'expert' || user.role === 'student') && (
                <div className="card shadow-xl border-primary/20 sticky bottom-8">
                    <form onSubmit={handleResponse} className="flex gap-4">
                        <input
                            className="input-field flex-1"
                            placeholder="Write your professional advice..."
                            value={responseText}
                            onChange={e => setResponseText(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary !px-6 flex items-center gap-2 shrink-0"
                        >
                            {isSubmitting ? 'Posting...' : <><Send size={18} /> Send</>}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default QueryDetails;
