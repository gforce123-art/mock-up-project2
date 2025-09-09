
import React, { useState } from 'react';
import { Car } from '../types';

const mockCars: Car[] = [
  { id: 1, brand: 'Toyota', model: 'Vigo', year: 2020, price: 25000, status: 'Available', imageUrl: 'https://picsum.photos/id/111/200/150' },
  { id: 2, brand: 'Honda', model: 'CR-V', year: 2019, price: 28000, status: 'Available', imageUrl: 'https://picsum.photos/id/145/200/150' },
  { id: 3, brand: 'Ford', model: 'Ranger', year: 2021, price: 32000, status: 'Sold', imageUrl: 'https://picsum.photos/id/1071/200/150' },
  { id: 4, brand: 'Hyundai', model: 'H1', year: 2018, price: 22000, status: 'Pending', imageUrl: 'https://picsum.photos/id/1062/200/150' },
  { id: 5, brand: 'Isuzu', model: 'D-Max', year: 2022, price: 30000, status: 'Available', imageUrl: 'https://picsum.photos/id/21/200/150' },
];

const getStatusBadge = (status: 'Available' | 'Sold' | 'Pending') => {
  switch (status) {
    case 'Available':
      return 'bg-green-500 text-green-100';
    case 'Sold':
      return 'bg-red-500 text-red-100';
    case 'Pending':
      return 'bg-yellow-500 text-yellow-100';
  }
};

const CarManagement: React.FC = () => {
  const [cars, setCars] = useState<Car[]>(mockCars);

  return (
    <div className="container mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">ຈັດການຂໍ້ມູນລົດ</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center">
          <i className="fas fa-plus mr-2"></i> ເພີ່ມລົດໃໝ່
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">ຮູບພາບ</th>
                <th className="p-4 text-left font-semibold">ຍີ່ຫໍ້</th>
                <th className="p-4 text-left font-semibold">ຮຸ່ນ</th>
                <th className="p-4 text-left font-semibold">ປີ</th>
                <th className="p-4 text-left font-semibold">ລາຄາ (USD)</th>
                <th className="p-4 text-left font-semibold">ສະຖານະ</th>
                <th className="p-4 text-left font-semibold">ການກະທຳ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {cars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="p-4"><img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="w-24 h-16 object-cover rounded-md" /></td>
                  <td className="p-4 whitespace-nowrap">{car.brand}</td>
                  <td className="p-4 whitespace-nowrap">{car.model}</td>
                  <td className="p-4">{car.year}</td>
                  <td className="p-4">${car.price.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(car.status)}`}>
                      {car.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center space-x-2">
                    <button className="text-blue-400 hover:text-blue-300" title="Edit"><i className="fas fa-pencil-alt"></i></button>
                    <button className="text-red-400 hover:text-red-300" title="Delete"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CarManagement;
