import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, Users, GraduationCap, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full max-w-6xl py-20 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-200 text-green-700 font-medium"
                >
                    <Sprout size={18} />
                    <span>Empowering Agriculture through Collaboration</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
                >
                    AgriConnect
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-muted max-w-2xl mb-10"
                >
                    Connecting farmers with agricultural experts and students to solve farming challenges in real-time.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4"
                >
                    <Link to="/register" className="btn-primary flex items-center gap-2 text-lg">
                        Get Started <ArrowRight size={20} />
                    </Link>
                    <Link to="/learning" className="px-8 py-4 rounded-2xl glass font-semibold hover:bg-white/50 transition-colors">
                        Explore Learning Corner
                    </Link>
                </motion.div>
            </section>

            {/* Feature Grid */}
            <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 py-20 px-4">
                <FeatureCard
                    icon={<Sprout size={32} className="text-green-600" />}
                    title="For Farmers"
                    description="Submit queries via text, voice, or image and get expert solutions in your local language."
                />
                <FeatureCard
                    icon={<Users size={32} className="text-orange-600" />}
                    title="For Experts"
                    description="Help the farming community, share your knowledge, and earn badges for your contributions."
                />
                <FeatureCard
                    icon={<GraduationCap size={32} className="text-blue-600" />}
                    title="Learning Corner"
                    description="Access tutorials, crop tips, and best practices curated by agricultural specialists."
                />
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="card flex flex-col items-center text-center p-10"
    >
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-muted leading-relaxed">{description}</p>
    </motion.div>
);

export default Home;
