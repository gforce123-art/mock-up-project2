
import React from 'react';
import { Page } from '../types';
import CarIcon from './icons/CarIcon';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import UserIcon from './icons/UserIcon';
import CheckIcon from './icons/CheckIcon';
import CommentIcon from './icons/CommentIcon';
import ChartIcon from './icons/ChartIcon';
import SettingsIcon from './icons/SettingsIcon';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <i className="fa-solid fa-table-columns"></i> },
    { id: 'car_management', label: 'ຈັດການຂໍ້ມູນລົດ', icon: <CarIcon className="w-5 h-5" /> },
    { id: 'sales_management', label: 'ຈັດການການຂາຍ', icon: <ShoppingCartIcon className="w-5 h-5" /> },
    { id: 'customer_management', label: 'ຈັດການລູກຄ້າ', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'quality_control', label: 'ຄວບຄຸມຄຸນນະພາບ', icon: <CheckIcon className="w-5 h-5" /> },
    { id: 'communication', label: 'ຈັດການການຕິດຕໍ່', icon: <CommentIcon className="w-5 h-5" /> },
    { id: 'reporting', label: 'ລາຍງານ ແລະ ວິເຄາະ', icon: <ChartIcon className="w-5 h-5" /> },
    { id: 'system_maintenance', label: 'ບຳລຸງລະບົບ', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  const getNavItemClass = (page: Page) => {
    return `flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200 ${
      currentPage === page ? 'bg-blue-600 text-white shadow-lg' : ''
    }`;
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <div className="bg-yellow-400 p-2 rounded-full mr-3">
          <span className="font-bold text-black text-lg">rāt</span>
        </div>
        <h1 className="text-xl font-bold text-white">VTN Motor</h1>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
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
      <div className="mt-auto text-center text-gray-500 text-xs">
        <p>&copy; 2024 VTN Motor</p>
        <p>Admin Dashboard</p>
      </div>
    </aside>
  );
};

export default Sidebar;
