
import React from 'react';

interface TopBarProps {
  toggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  return (
    <header className="md:hidden bg-gray-800/50 backdrop-blur-sm text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-10">
      <div className="flex items-center">
         <div className="bg-blue-600 p-2 rounded-lg mr-3 shadow-lg border-2 border-blue-500">
            <span className="font-bold text-white text-md tracking-wider">VTN</span>
          </div>
          <h1 className="text-lg font-bold">VTN Motor</h1>
      </div>
      <button onClick={toggleSidebar} className="text-white focus:outline-none">
        <i className="fas fa-bars fa-lg"></i>
      </button>
    </header>
  );
};

export default TopBar;
