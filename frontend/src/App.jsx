import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import ExpertDashboard from './pages/ExpertDashboard';
import QueryDetails from './pages/QueryDetails';
import LearningCorner from './pages/LearningCorner';
import Profile from './pages/Profile';
import CreateQuery from './pages/CreateQuery';

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/farmer"
                element={<PrivateRoute roles={['farmer']}><FarmerDashboard /></PrivateRoute>}
              />
              <Route
                path="/farmer/ask"
                element={<PrivateRoute roles={['farmer']}><CreateQuery /></PrivateRoute>}
              />

              <Route
                path="/expert"
                element={<PrivateRoute roles={['expert', 'student']}><ExpertDashboard /></PrivateRoute>}
              />

              <Route path="/queries/:id" element={<PrivateRoute><QueryDetails /></PrivateRoute>} />
              <Route path="/learning" element={<LearningCorner />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
