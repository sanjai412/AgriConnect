import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/users/profile')
                .then(res => setUser(res.data))
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        const { data } = await api.post('/auth/login', credentials);
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data.user;
    };

    const register = async (userData) => {
        const { data } = await api.post('/auth/register', userData);
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data.user;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
