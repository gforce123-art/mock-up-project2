
import React from 'react';
import ShoppingCartIcon from './icons/ShoppingCartIcon';

const SalesManagement: React.FC = () => {
  return (
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">ຈັດການການຂາຍ</h1>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 text-center">
        <ShoppingCartIcon className="w-24 h-24 mx-auto text-blue-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Sales Management Module</h2>
        <p className="text-gray-400">
          This section is for recording sales, tracking payment statuses (deposit, full payment, installment), and generating receipts for customers. The full implementation is pending.
        </p>
      </div>
    </div>
  );
};

export default SalesManagement;