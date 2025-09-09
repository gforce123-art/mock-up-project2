
import React, { useState, useEffect } from 'react';
import { Car } from '../types';

type CarFormData = Omit<Car, 'id'> & { id?: number };

interface CarFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (car: CarFormData) => void;
  carToEdit: Car | null;
}

const CarFormModal: React.FC<CarFormModalProps> = ({ isOpen, onClose, onSave, carToEdit }) => {
  const [formData, setFormData] = useState<CarFormData>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    status: 'Available',
    imageUrl: '',
  });

  useEffect(() => {
    if (carToEdit) {
      setFormData(carToEdit);
    } else {
      setFormData({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        status: 'Available',
        imageUrl: '',
      });
    }
  }, [carToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'year' || name === 'price' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg text-white max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{carToEdit ? 'ແກ້ໄຂຂໍ້ມູນລົດ' : 'ເພີ່ມລົດໃໝ່'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input name="brand" value={formData.brand} onChange={handleChange} placeholder="ຍີ່ຫໍ້ (e.g., Toyota)" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input name="model" value={formData.model} onChange={handleChange} placeholder="ຮຸ່ນ (e.g., Vios)" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input name="year" type="number" value={formData.year} onChange={handleChange} placeholder="ປີ" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="ລາຄາ (USD)" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-4">
            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
          <div className="mb-4 sm:mb-6">
            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL (e.g., https://...)" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4 gap-3 sm:gap-0">
            <button type="button" onClick={onClose} className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
              ຍົກເລີກ
            </button>
            <button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-300">
              ບັນທຶກ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarFormModal;
