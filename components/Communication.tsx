
import React from 'react';
import CommentIcon from './icons/CommentIcon';

const Communication: React.FC = () => {
  return (
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">ຈັດການການຕິດຕໍ່</h1>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 text-center">
        <CommentIcon className="w-24 h-24 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Communication Management Module</h2>
        <p className="text-gray-400">
          Manage all customer interactions here, including answering questions via phone, email, or chat, and conducting after-sale follow-ups. The full implementation is pending.
        </p>
      </div>
    </div>
  );
};

export default Communication;
