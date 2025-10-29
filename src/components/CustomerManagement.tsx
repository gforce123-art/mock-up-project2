import React, { useState, useMemo } from 'react';
import { Customer } from '../types';
import UserIcon from './icons/UserIcon';

// Mock data for initial state
const mockCustomers: Customer[] = [
  { id: 1, name: 'ທ້າວ ສົມຊາຍ', address: 'ບ້ານโพนไทร, ເມືອງສີສັດຕະນາກ, ນະຄອນຫຼວງວຽງຈັນ', phone: '020 5555 1234', email: 'somchai@email.com' },
  { id: 2, name: 'ນາງ ຄຳຫລ້າ', address: 'ບ້ານດົງໂດກ, ເມືອງໄຊທານີ, ນະຄອນຫຼວງວຽງຈັນ', phone: '020 5555 5678', email: 'khamla@email.com' },
  { id: 3, name: 'ທ້າວ ບຸນມີ', address: 'ບ້ານໂພນຕ້ອງ, ເມືອງຈັນທະບູລີ, ນະຄອນຫຼວງວຽງຈັນ', phone: '020 5555 8765', email: 'bounmee@email.com' },
];

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [newCustomer, setNewCustomer] = useState({ name: '', address: '', phone: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCustomer.name && newCustomer.phone) {
      const customerToAdd: Customer = {
        id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
        ...newCustomer
      };
      setCustomers([customerToAdd, ...customers]);
      // Reset form
      setNewCustomer({ name: '', address: '', phone: '', email: '' });
    }
  };

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) {
        return customers;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return customers.filter(customer =>
        customer.name.toLowerCase().includes(lowercasedFilter) ||
        customer.phone.toLowerCase().includes(lowercasedFilter) ||
        (customer.email && customer.email.toLowerCase().includes(lowercasedFilter))
    );
  }, [customers, searchTerm]);

  return (
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">ຈັດການລູກຄ້າ</h1>

      {/* Search input field */}
      <div className="mb-6">
          <div className="relative max-w-lg">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fas fa-search text-gray-400"></i>
              </span>
              <input
                  type="text"
                  placeholder="ຄົ້ນຫາตามຊື່, ເບີໂທ, ຫຼື ອີເມວ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
          </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Customer Form */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <UserIcon className="w-6 h-6 mr-2 text-orange-400" />
              ເພີ່ມລູກຄ້າໃໝ່
            </h2>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <input
                type="text"
                name="name"
                value={newCustomer.name}
                onChange={handleInputChange}
                placeholder="ຊື່ ແລະ ນາມສະກຸນ"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <textarea
                name="address"
                value={newCustomer.address}
                onChange={handleInputChange}
                placeholder="ທີ່ຢູ່"
                rows={3}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="tel"
                name="phone"
                value={newCustomer.phone}
                onChange={handleInputChange}
                placeholder="ເບີໂທລະສັບ"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="email"
                name="email"
                value={newCustomer.email}
                onChange={handleInputChange}
                placeholder="ອີເມວ"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-300"
              >
                ບັນທຶກຂໍ້ມູນລູກຄ້າ
              </button>
            </form>
          </div>
        </div>
        
        {/* Customer List */}
        <div className="lg:col-span-2">
           <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
             <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 text-left font-semibold">ຊື່</th>
                            <th className="p-4 text-left font-semibold">ຂໍ້ມູນຕິດຕໍ່</th>
                            <th className="p-4 text-left font-semibold">ທີ່ຢູ່</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-700/50 transition-colors">
                                <td className="p-4 whitespace-nowrap font-medium">{customer.name}</td>
                                <td className="p-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span><i className="fas fa-phone mr-2 text-gray-400"></i>{customer.phone}</span>
                                        <span><i className="fas fa-envelope mr-2 text-gray-400"></i>{customer.email || 'N/A'}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-300">{customer.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;