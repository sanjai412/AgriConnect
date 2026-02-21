import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Phone, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const user = await login({ email, password });
            navigate(user.role === 'farmer' ? '/farmer' : '/expert');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-20">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-3 gradient-text">Welcome Back</h1>
                <p className="text-muted">Login to stay connected with your agricultural community</p>
            </div>

            <div className="card !p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 -z-10" />

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                            <input
                                type="email"
                                className="input-field !pl-12"
                                placeholder="Email Address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                            <input
                                type="password"
                                className="input-field !pl-12"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary flex items-center justify-center gap-2 group"
                    >
                        {isLoading ? 'Signing in...' : <>Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                    </button>
                </form>

                <div className="mt-8 text-center pt-6 border-t border-border">
                    <p className="text-muted">Don't have an account?</p>
                    <Link to="/register" className="text-primary font-bold hover:underline mt-1 block">Create an account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
