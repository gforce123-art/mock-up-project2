import React, { useState, useMemo } from 'react';
import { Car } from '../types';
import CarFormModal from './CarFormModal';
import ConfirmationModal from './ConfirmationModal';

const mockCars: Car[] = [
  { id: 1, brand: 'Toyota', model: 'Vigo', year: 2020, price: 25000, status: 'Available', imageUrl: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, brand: 'Honda', model: 'CR-V', year: 2019, price: 28000, status: 'Available', imageUrl: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, brand: 'Ford', model: 'Ranger', year: 2021, price: 32000, status: 'Sold', imageUrl: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, brand: 'Hyundai', model: 'H1', year: 2018, price: 22000, status: 'Pending', imageUrl: 'https://images.pexels.com/photos/3354648/pexels-photo-3354648.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 5, brand: 'Isuzu', model: 'D-Max', year: 2022, price: 30000, status: 'Available', imageUrl: 'https://images.pexels.com/photos/12842263/pexels-photo-12842263.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 6, brand: 'Toyota', model: 'Fortuner', year: 2021, price: 35000, status: 'Available', imageUrl: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 7, brand: 'Ford', model: 'Everest', year: 2020, price: 33000, status: 'Sold', imageUrl: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

type SortableKeys = 'brand' | 'year' | 'price' | 'status';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState<Car | null>(null);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });
  const [filterStatus, setFilterStatus] = useState<'All' | 'Available' | 'Sold' | 'Pending'>('All');
  const [filterBrand, setFilterBrand] = useState('');

  const handleAddCar = () => {
    setCarToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditCar = (car: Car) => {
    setCarToEdit(car);
    setIsModalOpen(true);
  };

  const handleDeleteCar = (car: Car) => {
    setCarToDelete(car);
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (carToDelete) {
      setCars(cars.filter((car) => car.id !== carToDelete.id));
      setIsDeleteModalOpen(false);
      setCarToDelete(null);
    }
  };

  const handleSaveCar = (carData: Omit<Car, 'id'> & { id?: number }) => {
    if (carData.id) { // Editing existing car
      setCars(cars.map(c => c.id === carData.id ? { ...c, ...carData } as Car : c));
    } else { // Adding new car
      const newCar: Car = {
        ...carData,
        id: cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1, // simple id generation
      };
      setCars([newCar, ...cars]);
    }
    setIsModalOpen(false);
  };
  
  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedCars = useMemo(() => {
    let sortableCars = [...cars];

    // Filtering
    if (filterStatus !== 'All') {
        sortableCars = sortableCars.filter(car => car.status === filterStatus);
    }
    if (filterBrand) {
        sortableCars = sortableCars.filter(car =>
            car.brand.toLowerCase().includes(filterBrand.toLowerCase())
        );
    }

    // Sorting
    if (sortConfig.key !== null) {
        sortableCars.sort((a, b) => {
            if (a[sortConfig.key!] < b[sortConfig.key!]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key!] > b[sortConfig.key!]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    return sortableCars;
  }, [cars, filterStatus, filterBrand, sortConfig]);

  const renderSortArrow = (key: SortableKeys) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? 
      <span className="text-blue-400 ml-1">▲</span> : 
      <span className="text-blue-400 ml-1">▼</span>;
  };


  return (
    <div className="container mx-auto text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">ຈັດການຂໍ້ມູນລົດ</h1>
        <button onClick={handleAddCar} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center w-full sm:w-auto justify-center">
          <i className="fas fa-plus mr-2"></i> ເພີ່ມລົດໃໝ່
        </button>
      </div>

      {/* Filter and Sort Controls */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex items-center">
              <label htmlFor="status-filter" className="text-sm font-medium mr-2 text-gray-300">ສະຖານະ:</label>
              <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                  <option value="All">ທັງໝົດ</option>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Pending">Pending</option>
              </select>
          </div>
          <div className="flex items-center flex-grow">
               <label htmlFor="brand-filter" className="text-sm font-medium mr-2 text-gray-300">ຍີ່ຫໍ້:</label>
              <input
                  id="brand-filter"
                  type="text"
                  placeholder="ຄົ້ນຫາຕາມຍີ່ຫໍ້..."
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  className="w-full md:w-64 bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
      </div>


      <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">ຮູບພາບ</th>
                <th className="p-4 text-left font-semibold cursor-pointer select-none" onClick={() => requestSort('brand')}>ຍີ່ຫໍ້ {renderSortArrow('brand')}</th>
                <th className="p-4 text-left font-semibold">ຮຸ່ນ</th>
                <th className="p-4 text-left font-semibold cursor-pointer select-none" onClick={() => requestSort('year')}>ປີ {renderSortArrow('year')}</th>
                <th className="p-4 text-left font-semibold cursor-pointer select-none" onClick={() => requestSort('price')}>ລາຄາ (USD) {renderSortArrow('price')}</th>
                <th className="p-4 text-left font-semibold cursor-pointer select-none" onClick={() => requestSort('status')}>ສະຖານະ {renderSortArrow('status')}</th>
                <th className="p-4 text-left font-semibold">ການກະທຳ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredAndSortedCars.map((car) => (
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
                    <button onClick={() => handleEditCar(car)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md shadow-sm transition-colors duration-300 flex items-center" title="Edit">
                        <i className="fas fa-pencil-alt mr-1"></i> ແກ້ໄຂ
                    </button>
                    <button onClick={() => handleDeleteCar(car)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md shadow-sm transition-colors duration-300 flex items-center" title="Delete">
                        <i className="fas fa-trash mr-1"></i> ລຶບ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CarFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveCar} carToEdit={carToEdit} />
      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="ຢືນຢັນການລຶບຂໍ້ມູນ"
        message={`ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລົດ '${carToDelete?.brand} ${carToDelete?.model}'? ການກະທຳນີ້ບໍ່ສາມາດຍົກເລີກໄດ້.`}
      />
    </div>
  );
};

export default CarManagement;