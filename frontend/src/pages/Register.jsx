import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserCircle, ArrowRight } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'farmer'
    });
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const user = await register(formData);
            navigate('/');
        } catch (err) {
            alert('Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-3 gradient-text">Join AgriConnect</h1>
                <p className="text-muted">Choose your role and start your journey</p>
            </div>

            <div className="card !p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex gap-4 mb-8">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'farmer' })}
                            className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.role === 'farmer' ? 'border-primary bg-green-50 text-primary' : 'border-border grayscale opacity-60'}`}
                        >
                            <User size={24} />
                            <span className="font-bold text-sm">Farmer</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'expert' })}
                            className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.role === 'expert' ? 'border-primary bg-green-50 text-primary' : 'border-border grayscale opacity-60'}`}
                        >
                            <UserCircle size={24} />
                            <span className="font-bold text-sm">Expert</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <input
                            className="input-field"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Password"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                        {isLoading ? 'Creating account...' : <>Create Account <ArrowRight size={20} /></>}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-muted text-sm">Already have an account? <Link to="/login" className="text-primary font-bold">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
