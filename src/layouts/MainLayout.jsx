import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Menu, X } from 'lucide-react';

const MainLayout = () => {
  const { currentUser, logout, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-white shadow-lg text-blue-600 hover:bg-blue-50 transition-colors border border-blue-100"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        user={currentUser}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'lg:ml-64'} min-h-screen flex flex-col`}>
        <Navbar user={currentUser} onLogout={handleLogout} />
        
        <main className="flex-grow p-4 sm:p-6 lg:p-8 transition-all">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 px-6 text-center text-sm text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} Store Rating System. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;