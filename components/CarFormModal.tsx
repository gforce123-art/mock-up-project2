import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setGenerationError(null);
    }
  }, [carToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'year' || name === 'price' ? Number(value) : value }));
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

  const handleGenerateImage = async () => {
    if (!formData.brand || !formData.model || !formData.year) {
        setGenerationError('Please fill in Brand, Model, and Year first.');
        return;
    }
    setIsGenerating(true);
    setGenerationError(null);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const prompt = `Professional, high-quality photograph of a ${formData.year} ${formData.brand} ${formData.model}, studio lighting, on a clean background.`;

        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });
        
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
        setFormData(prev => ({ ...prev, imageUrl }));

    } catch (error) {
        console.error('Error generating image:', error);
        setGenerationError('Failed to generate image. Please try again.');
    } finally {
        setIsGenerating(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
        setGenerationError("Please add an image before saving.");
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
            
            {/* Image Preview and Actions */}
            <div className="flex flex-col space-y-4">
               <div className="w-full aspect-[16/9] bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                 {formData.imageUrl ? (
                    <img src={formData.imageUrl} alt="Car preview" className="w-full h-full object-contain" />
                 ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                        <i className="fas fa-image fa-3x mb-2"></i>
                        <span className="text-sm">Image Preview</span>
                    </div>
                 )}
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                   <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                       <i className="fas fa-upload mr-2"></i> Upload Image
                   </button>
                   <button 
                    type="button" 
                    onClick={handleGenerateImage} 
                    disabled={isGenerating}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:bg-purple-800 disabled:cursor-not-allowed"
                   >
                     {isGenerating ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                     ) : (
                        <>
                            <i className="fas fa-magic mr-2"></i> Generate with AI
                        </>
                     )}
                   </button>
               </div>
               {generationError && <p className="text-red-400 text-sm text-center">{generationError}</p>}
            </div>

            {/* Form Fields */}
            <div className="flex flex-col space-y-4">
                <input name="brand" value={formData.brand} onChange={handleChange} placeholder="ຍີ່ຫໍ້ (e.g., Toyota)" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <input name="model" value={formData.model} onChange={handleChange} placeholder="ຮຸ່ນ (e.g., Vios)" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <input name="year" type="number" value={formData.year} onChange={handleChange} placeholder="ປີ" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="ລາຄາ (USD)" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="Available">Available</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                </select>
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