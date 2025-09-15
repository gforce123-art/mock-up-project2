import React, { useState, useMemo, useEffect } from 'react';
import { Sale, Car, Customer } from '../types';
import ConfirmationModal from './ConfirmationModal';

// Mock data moved here for component self-containment
const mockCars: Car[] = [
  { id: 1, brand: 'Toyota', model: 'Vigo', year: 2020, price: 25000, status: 'Available', imageUrl: '' },
  { id: 2, brand: 'Honda', model: 'CR-V', year: 2019, price: 28000, status: 'Available', imageUrl: '' },
  { id: 3, brand: 'Ford', model: 'Ranger', year: 2021, price: 32000, status: 'Sold', imageUrl: '' },
  { id: 4, brand: 'Hyundai', model: 'H1', year: 2018, price: 22000, status: 'Pending', imageUrl: '' },
  { id: 5, brand: 'Isuzu', model: 'D-Max', year: 2022, price: 30000, status: 'Available', imageUrl: '' },
  { id: 6, brand: 'Toyota', model: 'Fortuner', year: 2021, price: 35000, status: 'Available', imageUrl: '' },
];

const mockCustomers: Customer[] = [
  { id: 1, name: 'ທ້າວ ສົມຊາຍ', address: '', phone: '', email: '' },
  { id: 2, name: 'ນາງ ຄຳຫລ້າ', address: '', phone: '', email: '' },
  { id: 3, name: 'ທ້າວ ບຸນມີ', address: '', phone: '', email: '' },
];

const mockSales: Sale[] = [
  { id: 1, carId: 3, carDescription: 'Ford Ranger 2021', customerId: 1, customerName: 'ທ້າວ ສົມຊາຍ', saleDate: '2024-07-15', salePrice: 32000, paymentStatus: 'Fully Paid' },
  { id: 2, carId: 4, carDescription: 'Hyundai H1 2018', customerId: 2, customerName: 'ນາງ ຄຳຫລ້າ', saleDate: '2024-07-20', salePrice: 22000, paymentStatus: 'Deposit Paid', depositAmount: 5000, depositDate: '2024-07-20', nextInstallmentDate: '2024-08-20' },
  { id: 3, carId: 1, carDescription: 'Toyota Vigo 2020', customerId: 3, customerName: 'ທ້າວ ບຸນມີ', saleDate: '2024-07-28', salePrice: 25500, paymentStatus: 'Pending Deposit' },
];

// Sub-component for the Add/Edit Sale Modal
const SaleFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (sale: Omit<Sale, 'id'> & { id?: number }) => void;
  saleToEdit: Sale | null;
  cars: Car[];
  customers: Customer[];
}> = ({ isOpen, onClose, onSave, saleToEdit, cars, customers }) => {
  const [formData, setFormData] = useState<any>({
    carId: '',
    customerId: '',
    saleDate: new Date().toISOString().split('T')[0],
    salePrice: '',
    paymentStatus: 'Pending Deposit',
    depositAmount: '',
    depositDate: '',
    nextInstallmentDate: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (saleToEdit) {
        setFormData({
          id: saleToEdit.id,
          carId: saleToEdit.carId,
          customerId: saleToEdit.customerId,
          saleDate: saleToEdit.saleDate,
          salePrice: saleToEdit.salePrice,
          paymentStatus: saleToEdit.paymentStatus,
          depositAmount: saleToEdit.depositAmount || '',
          depositDate: saleToEdit.depositDate || '',
          nextInstallmentDate: saleToEdit.nextInstallmentDate || '',
        });
      } else {
        setFormData({
          carId: '',
          customerId: '',
          saleDate: new Date().toISOString().split('T')[0],
          salePrice: '',
          paymentStatus: 'Pending Deposit',
          depositAmount: '',
          depositDate: '',
          nextInstallmentDate: '',
        });
      }
    }
  }, [saleToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };
    
    if (name === 'carId' && !saleToEdit) { // Only auto-set price for new sales
      const selectedCar = cars.find(c => c.id === Number(value));
      newFormData.salePrice = selectedCar ? selectedCar.price : 0;
    }

    setFormData(newFormData);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCar = cars.find(c => c.id === Number(formData.carId));
    const selectedCustomer = customers.find(c => c.id === Number(formData.customerId));
    
    if (selectedCar && selectedCustomer) {
        const saleData = {
            ...formData,
            carDescription: `${selectedCar.brand} ${selectedCar.model} ${selectedCar.year}`,
            customerName: selectedCustomer.name,
            salePrice: Number(formData.salePrice),
            depositAmount: formData.depositAmount ? Number(formData.depositAmount) : undefined,
        };
        onSave(saleData);
    }
  };

  if (!isOpen) return null;

  const availableCars = cars.filter(c => c.status === 'Available' || c.id === saleToEdit?.carId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg text-white max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold p-6 border-b border-gray-700">{saleToEdit ? 'ແກ້ໄຂຂໍ້ມູນການຂາຍ' : 'ເພີ່ມການຂາຍໃໝ່'}</h2>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">ເລືອກລົດ</label>
                <select name="carId" value={formData.carId} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3" required>
                    <option value="">-- ເລືອກລົດ --</option>
                    {availableCars.map(car => <option key={car.id} value={car.id}>{`${car.brand} ${car.model} (${car.year})`}</option>)}
                </select>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">ເລືອກລູກຄ້າ</label>
                <select name="customerId" value={formData.customerId} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3" required>
                    <option value="">-- ເລືອກລູກຄ້າ --</option>
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
                </select>
            </div>
             <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">ວັນທີຂາຍ</label>
                <input type="date" name="saleDate" value={formData.saleDate} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3" required />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">ລາຄາຂາຍ (USD)</label>
                <input type="number" name="salePrice" value={formData.salePrice} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3" required />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">ສະຖານະການຈ່າຍເງິນ</label>
                <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3" required>
                    <option value="Pending Deposit">Pending Deposit</option>
                    <option value="Deposit Paid">Deposit Paid</option>
                    <option value="Partial Payment">Partial Payment</option>
                    <option value="Fully Paid">Fully Paid</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">ຈຳນວນເງິນມັດຈຳ (USD)</label>
                <input type="number" name="depositAmount" value={formData.depositAmount} onChange={handleChange} placeholder="e.g., 5000" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3" />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">ວັນທີມັດຈຳ</label>
                <input type="date" name="depositDate" value={formData.depositDate} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3" />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">ວັນທີຜ່ອນຄັ້ງຕໍ່ໄປ</label>
                <input type="date" name="nextInstallmentDate" value={formData.nextInstallmentDate} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3" />
            </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 py-2 px-6 rounded-lg">ຍົກເລີກ</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-lg">ບັນທຶກ</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Main Sales Management Component
const SalesManagement: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>(mockSales);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [saleToEdit, setSaleToEdit] = useState<Sale | null>(null);
    const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const getPaymentStatusBadge = (status: Sale['paymentStatus']) => {
        switch (status) {
            case 'Fully Paid': return 'bg-green-500 text-green-100';
            case 'Deposit Paid': return 'bg-blue-500 text-blue-100';
            case 'Partial Payment': return 'bg-teal-500 text-teal-100';
            case 'Pending Deposit': return 'bg-yellow-500 text-yellow-100';
            case 'Overdue': return 'bg-orange-500 text-orange-100';
            case 'Cancelled': return 'bg-red-500 text-red-100';
        }
    };
    
    const handleAddSale = () => {
        setSaleToEdit(null);
        setIsModalOpen(true);
    };
    
    const handleEditSale = (sale: Sale) => {
        setSaleToEdit(sale);
        setIsModalOpen(true);
    };

    const handleDeleteSale = (sale: Sale) => {
        setSaleToDelete(sale);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (saleToDelete) {
            setSales(sales.filter(s => s.id !== saleToDelete.id));
            setIsDeleteModalOpen(false);
            setSaleToDelete(null);
        }
    };
    
    const handleSaveSale = (saleData: Omit<Sale, 'id'> & { id?: number }) => {
        if (saleData.id) {
            setSales(sales.map(s => s.id === saleData.id ? { ...s, ...saleData } as Sale : s));
        } else {
            const newSale: Sale = {
                ...saleData,
                id: sales.length > 0 ? Math.max(...sales.map(s => s.id)) + 1 : 1,
            };
            setSales([newSale, ...sales]);
        }
        setIsModalOpen(false);
    };

    const filteredSales = useMemo(() => {
        return sales.filter(sale => {
            const matchesStatus = filterStatus === 'All' || sale.paymentStatus === filterStatus;
            const matchesSearch = searchTerm === '' ||
                sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.carDescription.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [sales, searchTerm, filterStatus]);

    const kpiData = useMemo(() => {
        const totalRevenue = sales.filter(s => s.paymentStatus === 'Fully Paid').reduce((acc, s) => acc + s.salePrice, 0);
        const carsSold = sales.filter(s => s.paymentStatus === 'Fully Paid').length;
        const pendingPayments = sales.filter(s => s.paymentStatus === 'Pending Deposit' || s.paymentStatus === 'Deposit Paid' || s.paymentStatus === 'Partial Payment').length;
        const salesThisMonth = sales.filter(s => new Date(s.saleDate).getMonth() === new Date().getMonth() && new Date(s.saleDate).getFullYear() === new Date().getFullYear()).length;
        return { totalRevenue, carsSold, pendingPayments, salesThisMonth };
    }, [sales]);

    const KpiCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 flex items-center">
            <div className="bg-gray-900/50 p-4 rounded-full mr-4"><i className={`fas ${icon} fa-2x text-blue-400`}></i></div>
            <div>
                <p className="text-gray-400 text-sm">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
    
  return (
    <div className="container mx-auto text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold">ຈັດການການຂາຍ</h1>
            <button onClick={handleAddSale} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center w-full sm:w-auto justify-center">
                <i className="fas fa-plus mr-2"></i> ເພີ່ມການຂາຍ
            </button>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KpiCard title="ລາຍຮັບລວມ" value={`$${kpiData.totalRevenue.toLocaleString()}`} icon="fa-dollar-sign" />
            <KpiCard title="ລົດທີ່ຂາຍໄດ້ທັງໝົດ" value={kpiData.carsSold.toString()} icon="fa-car" />
            <KpiCard title="ລໍຖ້າຊຳລະ" value={kpiData.pendingPayments.toString()} icon="fa-hourglass-half" />
            <KpiCard title="ຍອດຂາຍເດືອນນີ້" value={kpiData.salesThisMonth.toString()} icon="fa-calendar-day" />
        </div>

        {/* Filter Controls */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center flex-grow">
                <input
                    type="text"
                    placeholder="ຄົ້ນຫາລູກຄ້າ ຫຼື ລົດ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-80 bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="status-filter" className="text-sm font-medium mr-2 text-gray-300">ສະຖານະ:</label>
                <select id="status-filter" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-gray-700 border border-gray-600 rounded-lg p-2">
                    <option value="All">ທັງໝົດ</option>
                    <option value="Pending Deposit">Pending Deposit</option>
                    <option value="Deposit Paid">Deposit Paid</option>
                    <option value="Partial Payment">Partial Payment</option>
                    <option value="Fully Paid">Fully Paid</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
        </div>

        {/* Sales Table */}
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 text-left font-semibold">ລົດ</th>
                            <th className="p-4 text-left font-semibold">ລູກຄ້າ</th>
                            <th className="p-4 text-left font-semibold">ວັນທີຂາຍ</th>
                            <th className="p-4 text-left font-semibold">ລາຄາຂາຍ (USD)</th>
                            <th className="p-4 text-left font-semibold">ເງິນມັດຈຳ (USD)</th>
                            <th className="p-4 text-left font-semibold">ວັນທີມັດຈຳ</th>
                            <th className="p-4 text-left font-semibold">ຜ່ອນຄັ້ງຕໍ່ໄປ</th>
                            <th className="p-4 text-left font-semibold">ສະຖານະການຈ່າຍເງິນ</th>
                            <th className="p-4 text-left font-semibold">ການກະທຳ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredSales.map(sale => (
                            <tr key={sale.id} className="hover:bg-gray-700/50 transition-colors">
                                <td className="p-4 whitespace-nowrap">{sale.carDescription}</td>
                                <td className="p-4 whitespace-nowrap">{sale.customerName}</td>
                                <td className="p-4">{new Date(sale.saleDate).toLocaleDateString()}</td>
                                <td className="p-4">${sale.salePrice.toLocaleString()}</td>
                                <td className="p-4 whitespace-nowrap">{sale.depositAmount ? `$${sale.depositAmount.toLocaleString()}` : '-'}</td>
                                <td className="p-4 whitespace-nowrap">{sale.depositDate ? new Date(sale.depositDate).toLocaleDateString() : '-'}</td>
                                <td className="p-4 whitespace-nowrap">{sale.nextInstallmentDate ? new Date(sale.nextInstallmentDate).toLocaleDateString() : '-'}</td>
                                <td className="p-4"><span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPaymentStatusBadge(sale.paymentStatus)}`}>{sale.paymentStatus}</span></td>
                                <td className="p-4 flex items-center space-x-2">
                                    <button onClick={() => handleEditSale(sale)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md"><i className="fas fa-pencil-alt"></i></button>
                                    <button onClick={() => handleDeleteSale(sale)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md"><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
        <SaleFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveSale} saleToEdit={saleToEdit} cars={mockCars} customers={mockCustomers} />
        <ConfirmationModal 
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title="ຢືນຢັນການລຶບການຂາຍ"
            message={`ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການຂາຍນີ້? ການກະທຳນີ້ບໍ່ສາມາດຍົກເລີກໄດ້.`}
        />
    </div>
  );
};

export default SalesManagement;