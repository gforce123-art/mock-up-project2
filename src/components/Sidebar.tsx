
import React from 'react';
import { Page, User } from '../types';
import CarIcon from './icons/CarIcon';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import UserIcon from './icons/UserIcon';
import CommentIcon from './icons/CommentIcon';
import ChartIcon from './icons/ChartIcon';
import SettingsIcon from './icons/SettingsIcon';
import LogoutIcon from './icons/LogoutIcon';

interface SidebarProps {
  currentUser: User;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
    </svg>
);


const Sidebar: React.FC<SidebarProps> = ({ currentUser, currentPage, setCurrentPage, isOpen, setIsOpen, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'ພາບລວມ', icon: <DashboardIcon className="w-5 h-5" /> },
    { id: 'car_management', label: 'ຈັດການຂໍ້ມູນລົດ', icon: <CarIcon className="w-5 h-5" /> },
    { id: 'sales_management', label: 'ຈັດການການຂາຍ', icon: <ShoppingCartIcon className="w-5 h-5" /> },
    { id: 'customer_management', label: 'ຈັດການລູກຄ້າ', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'payment_management', label: 'ການຊຳລະເງິນຄ່າລົດ', icon: <ChartIcon className="w-5 h-5" /> },
    { id: 'communication', label: 'ຈັດການການຕິດຕໍ່', icon: <CommentIcon className="w-5 h-5" /> },
    { id: 'reporting', label: 'ລາຍງານ ແລະ ວິເຄາະ', icon: <ChartIcon className="w-5 h-5" /> },
    { id: 'system_maintenance', label: 'ບຳລຸງລະບົບ', icon: <SettingsIcon className="w-5 h-5" />, adminOnly: true },
  ];

  const visibleNavItems = navItems.filter(item => !item.adminOnly || currentUser.role === 'Admin');

  const getNavItemClass = (page?: Page) => {
    return `flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200 ${
      currentPage === page ? 'bg-blue-600 text-white shadow-lg' : ''
    }`;
  };

  const sidebarClasses = `
    w-64 flex-shrink-0 bg-gray-800 p-4 flex flex-col
    fixed inset-y-0 left-0 z-30
    transform transition-transform duration-300 ease-in-out
    md:relative md:translate-x-0
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={sidebarClasses}>
        <div
          className="flex items-center mb-8 cursor-pointer"
          onClick={() => setCurrentPage('dashboard')}
        >
          <div className="bg-blue-600 p-2 rounded-lg mr-3 shadow-lg border-2 border-blue-500">
            <span className="font-bold text-white text-lg tracking-wider">VTN</span>
          </div>
          <h1 className="text-xl font-bold text-white">VTN Motor</h1>
        </div>
        <nav className="flex-1 space-y-2">
          {visibleNavItems.map((item) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(item.id as Page);
              }}
              className={getNavItemClass(item.id as Page)}
            >
              <span className="mr-3 w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto">
            <div className="px-4 py-3 my-2 border-t border-b border-gray-700/50">
                <p className="font-semibold text-white">{currentUser.username}</p>
                <p className="text-sm text-gray-400">{currentUser.role}</p>
            </div>
           <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onLogout();
              }}
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200"
            >
              <span className="mr-3 w-5 text-center"><LogoutIcon className="w-5 h-5" /></span>
              <span>Logout</span>
            </a>
          <div className="mt-4 text-center text-gray-500 text-xs">
            <p>&copy; 2024 VTN Motor</p>
            <p>Admin Dashboard</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
