import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Camera, Mic, Send, X, AlertCircle } from 'lucide-react';

const CreateQuery = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        crop_type: '',
        issue_type: '',
        location: '',
        language: 'en'
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        try {
            await api.post('/queries', data);
            navigate('/farmer');
        } catch (err) {
            alert('Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Ask a Question</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="card">
                    <div className="mb-4 text-sm font-medium text-muted uppercase tracking-wider">Topic Details</div>
                    <div className="space-y-4">
                        <input
                            className="input-field"
                            placeholder="Query Title (e.g., Tomato leaf spots)"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <textarea
                            className="input-field min-h-[120px]"
                            placeholder="Describe your issue in detail..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card">
                        <label className="block text-sm font-semibold mb-2">Crop Type</label>
                        <input
                            className="input-field"
                            placeholder="e.g., Rice, Wheat"
                            value={formData.crop_type}
                            onChange={e => setFormData({ ...formData, crop_type: e.target.value })}
                        />
                    </div>
                    <div className="card">
                        <label className="block text-sm font-semibold mb-2">Preferred Language</label>
                        <select
                            className="input-field"
                            value={formData.language}
                            onChange={e => setFormData({ ...formData, language: e.target.value })}
                        >
                            <option value="en">English</option>
                            <option value="hi">Hindi (हिन्दी)</option>
                            <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
                            <option value="te">Telugu (తెలుగు)</option>
                        </select>
                    </div>
                </div>

                <div className="card">
                    <div className="flex gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => document.getElementById('image-upload').click()}
                            className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-primary hover:bg-green-50 transition-all text-muted hover:text-primary"
                        >
                            <Camera size={32} className="mb-2" />
                            <span>Add Image</span>
                        </button>
                        <button
                            type="button"
                            className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-primary hover:bg-green-50 transition-all text-muted hover:text-primary"
                        >
                            <Mic size={32} className="mb-2" />
                            <span>Voice Record</span>
                        </button>
                    </div>
                    <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />

                    {preview && (
                        <div className="relative rounded-xl overflow-hidden mb-4">
                            <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                            <button
                                onClick={() => { setPreview(null); setImage(null); }}
                                className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? 'Submitting...' : <><Send size={20} /> Post Query</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuery;
