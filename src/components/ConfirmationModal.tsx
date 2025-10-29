
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md text-white border-2 border-gray-700" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4 text-red-400 flex items-center">
          <i className="fas fa-exclamation-triangle mr-3"></i>
          {title}
        </h2>
        <p className="text-gray-300 mb-8">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            ຍົກເລີກ
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
          >
            ຢືນຢັນການລຶບ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;