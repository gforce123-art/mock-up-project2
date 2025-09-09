
import React from 'react';
import UserIcon from './icons/UserIcon';

const CustomerManagement: React.FC = () => {
  return (
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">ຈັດການລູກຄ້າ</h1>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 text-center">
        <UserIcon className="w-24 h-24 mx-auto text-orange-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Customer Management Module</h2>
        <p className="text-gray-400">
          Here you can manage customer information, view their purchase history, and schedule appointments for test drives. The full implementation is pending.
        </p>
      </div>
    </div>
  );
};

export default CustomerManagement;
