import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import ImagePreview from './ImagePreview';

type CarFormData = Omit<Car, 'id'> & { id?: number };

interface CarFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (car: CarFormData) => void;
  carToEdit: Car | null;
}

const BRANDS = ['Toyota', 'Honda', 'Ford', 'Hyundai', 'Isuzu', 'Nissan', 'Mitsubishi', 'Mazda', 'Kia', 'Chevrolet'];

const CarFormModal: React.FC<CarFormModalProps> = ({ isOpen, onClose, onSave, carToEdit }) => {
  const [formData, setFormData] = useState<CarFormData>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    status: 'Available',
    imageUrl: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
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
      setError(null);
    }
  }, [carToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      // Allow only numbers and handle empty string for price, removing commas for state
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue === '' ? 0 : Number(numericValue) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: name === 'year' ? Number(value) : value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
        setError("Please add an image before saving.");
        return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl text-white max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold">{carToEdit ? 'ແກ້ໄຂຂໍ້ມູນລົດ' : 'ເພີ່ມລົດໃໝ່'}</h2>
        </div>
        
        <form id="car-form" onSubmit={handleSubmit} className="flex-grow p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <ImagePreview 
              imageUrl={formData.imageUrl}
              error={error}
              onFileChange={handleFileChange}
            />

            {/* Form Fields */}
            <div className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="brand-input" className="block text-sm font-medium text-gray-300 mb-1">ຍີ່ຫໍ້</label>
                  <input id="brand-input" name="brand" list="brand-list" value={formData.brand} onChange={handleChange} placeholder="e.g., Toyota" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  <datalist id="brand-list">
                    {BRANDS.map(b => <option key={b} value={b} />)}
                  </datalist>
                </div>
                <div>
                  <label htmlFor="model-input" className="block text-sm font-medium text-gray-300 mb-1">ປະເພດ</label>
                  <input id="model-input" name="model" value={formData.model} onChange={handleChange} placeholder="e.g., Vios" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="year-input" className="block text-sm font-medium text-gray-300 mb-1">ປີ</label>
                  <input id="year-input" name="year" type="number" value={formData.year} onChange={handleChange} placeholder="e.g., 2024" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="price-input" className="block text-sm font-medium text-gray-300 mb-1">ລາຄາ (USD)</label>
                  <input id="price-input" name="price" type="text" value={formData.price === 0 ? '' : formData.price.toLocaleString()} onChange={handleChange} placeholder="e.g., 25,000" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="status-select" className="block text-sm font-medium text-gray-300 mb-1">ສະຖານະ</label>
                  <select id="status-select" name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="Available">Available</option>
                    <option value="Pending">Pending</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-gray-700 bg-gray-800/50">
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4 gap-3 sm:gap-0">
                <button type="button" onClick={onClose} className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                  ຍົກເລີກ
                </button>
                <button type="submit" form="car-form" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-300">
                  ບັນທຶກ
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CarFormModal;