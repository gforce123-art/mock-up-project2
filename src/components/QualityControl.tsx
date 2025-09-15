import React from 'react';
import ChartIcon from './icons/ChartIcon';

const QualityControl: React.FC = () => {
  return (
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">ການຊຳລະເງິນຄ່າລົດ</h1>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 text-center">
        <ChartIcon className="w-24 h-24 mx-auto text-purple-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Car Payment Management</h2>
        <p className="text-gray-400">
          This module is for managing car payments, including deposits, installments, and full payments. The full implementation is pending.
        </p>
      </div>
    </div>
  );
};

export default QualityControl;
