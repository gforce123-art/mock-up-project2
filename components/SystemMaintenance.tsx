
import React from 'react';
import SettingsIcon from './icons/SettingsIcon';

const SystemMaintenance: React.FC = () => {
  return (
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">ການບຳລຸງລະບົບ</h1>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <SettingsIcon className="w-24 h-24 mx-auto text-gray-500 mb-4 animate-spin-slow" />
          <h2 className="text-2xl font-semibold mb-2">System Maintenance Module</h2>
          <p className="text-gray-400">
            Perform crucial system tasks like data backups, updates, and system health checks.
          </p>
        </div>
        <div className="space-y-4 max-w-md mx-auto">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center">
                <i className="fas fa-database mr-3"></i> ສຳຮອງຂໍ້ມູນ (Backup)
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center">
                <i className="fas fa-cloud-upload-alt mr-3"></i> ອັບເດດຂໍ້ມູນ (Update Data)
            </button>
            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center">
                <i className="fas fa-shield-alt mr-3"></i> ກວດສອບລະບົບ (System Check)
            </button>
        </div>
      </div>
    </div>
  );
};

export default SystemMaintenance;
