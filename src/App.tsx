import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Newsletter from './components/Newsletter';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/admin/Dashboard';
import Directory from './pages/private/Directory';
import Forum from './pages/private/Forum';
import Messaging from './pages/private/Messaging';
import Personalities from './pages/Personalities';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/personalities" element={<Personalities />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={
              <PrivateRoute requiredPermissions={['canAccessAdminPanel']}>
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/directory" element={
              <PrivateRoute>
                <Directory />
              </PrivateRoute>
            } />
            <Route path="/forum" element={
              <PrivateRoute>
                <Forum />
              </PrivateRoute>
            } />
            <Route path="/messages" element={
              <PrivateRoute>
                <Messaging />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Newsletter />
        <Footer />
      </div>
    </Router>
  );
}

export default App;