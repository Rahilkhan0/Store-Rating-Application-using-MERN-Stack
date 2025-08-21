import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Store, Users, User, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose, user }) => {
  const location = useLocation();
  const { logout, isAdmin, isStoreOwner } = useAuth();

  const navItems = [
    // Common items
    { 
      to: '/profile',
      label: 'Profile',
      icon: <User size={20} />,
      show: true
    },
    
    // Admin-only items
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      show: isAdmin
    },
    {
      to: '/stores',
      label: 'Stores',
      icon: <Store size={20} />,
      show: true
    },
    {
      to: '/users',
      label: 'Users',
      icon: <Users size={20} />,
      show: isAdmin
    },
    
    // Store owner items
    {
      to: '/store-dashboard',
      label: 'Store Dashboard',
      icon: <Store size={20} />,
      show: isStoreOwner
    }
  ];

  const filteredNavItems = navItems.filter(item => item.show);

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-50 to-white shadow-xl transform transition-all duration-300 ease-in-out
    ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} lg:translate-x-0
  `;

  const handleClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="h-16 flex items-center justify-center border-b border-blue-100 bg-gradient-to-r from-blue-600 to-indigo-600">
          <Link to="/" className="flex items-center">
            <Store className="h-8 w-8 text-white mr-2" />
            <span className="text-xl font-bold text-white">Store Ratings</span>
          </Link>
        </div>
        
        <div className="px-4 py-5 border-b border-blue-100 bg-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-11 w-11 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-blue-600 font-medium capitalize">
                {user?.role?.replace('_', ' ') || 'Role'}
              </p>
            </div>
          </div>
        </div>
        
        <nav className="mt-5 px-3 space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-100 to-indigo-50 text-blue-700 shadow-inner' 
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}
                `}
                onClick={handleClick}
              >
                <span className={`
                  mr-3 p-1 rounded-lg
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'}
                `}>
                  {React.cloneElement(item.icon, { size: 18 })}
                </span>
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={16} className="text-blue-400" />}
              </Link>
            );
          })}
          
          <button
            onClick={logout}
            className="w-full text-left group flex items-center px-3 py-3 mt-6 text-sm font-medium rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <span className="mr-3 p-1 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200">
              <LogOut size={18} />
            </span>
            <span className="flex-1">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;