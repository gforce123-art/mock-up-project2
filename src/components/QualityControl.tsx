
import React from 'react';
import CheckIcon from './icons/CheckIcon';

const QualityControl: React.FC = () => {
  return (
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">ຄວບຄຸມຄຸນນະພາບ</h1>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 text-center">
        <CheckIcon className="w-24 h-24 mx-auto text-purple-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Quality Control Module</h2>
        <p className="text-gray-400">
          This module is dedicated to verifying car information before publishing, ensuring photos are professional, and checking that prices are aligned with the market. The full implementation is pending.
        </p>
      </div>
    </div>
  );
};

export default QualityControl;