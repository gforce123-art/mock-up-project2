
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ReportData } from '../types';

const monthlySalesData: ReportData[] = [
  { name: 'Jan', value: 12 }, { name: 'Feb', value: 19 }, { name: 'Mar', value: 15 },
  { name: 'Apr', value: 25 }, { name: 'May', value: 22 }, { name: 'Jun', value: 30 },
];

const bestSellingModelsData: ReportData[] = [
  { name: 'Toyota Vigo', value: 400 },
  { name: 'Honda CR-V', value: 300 },
  { name: 'Ford Ranger', value: 300 },
  { name: 'Isuzu D-Max', value: 200 },
];

const COLORS = ['#3B82F6', '#10B981', '#F97316', '#8B5CF6'];

const Reporting: React.FC = () => {
  return (
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">ລາຍງານ ແລະ ວິເຄາະ</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Monthly Sales Chart */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">ຈຳນວນລົດຂາຍໄດ້ຕາມເດືອນ</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}
                cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="value" name="Cars Sold" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Best Selling Models Chart */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">ລົດຮຸ່ນໃດຂາຍດີທີ່ສຸດ</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bestSellingModelsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {bestSellingModelsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Reporting;
