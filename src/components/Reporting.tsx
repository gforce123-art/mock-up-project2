
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { ReportData } from '../types';

// More realistic mock data
const monthlySalesData = [
  { name: 'Jan', 'Cars Sold': 12, 'Revenue': 300000 }, { name: 'Feb', 'Cars Sold': 19, 'Revenue': 480000 },
  { name: 'Mar', 'Cars Sold': 15, 'Revenue': 380000 }, { name: 'Apr', 'Cars Sold': 25, 'Revenue': 650000 },
  { name: 'May', 'Cars Sold': 22, 'Revenue': 560000 }, { name: 'Jun', 'Cars Sold': 30, 'Revenue': 780000 },
  { name: 'Jul', 'Cars Sold': 28, 'Revenue': 710000 }, { name: 'Aug', 'Cars Sold': 35, 'Revenue': 900000 },
  { name: 'Sep', 'Cars Sold': 29, 'Revenue': 730000 }, { name: 'Oct', 'Cars Sold': 32, 'Revenue': 820000 },
  { name: 'Nov', 'Cars Sold': 38, 'Revenue': 980000 }, { name: 'Dec', 'Cars Sold': 45, 'Revenue': 1150000 },
];

const bestSellingModelsData: ReportData[] = [
  { name: 'Toyota Vigo', value: 40 }, { name: 'Honda CR-V', value: 30 },
  { name: 'Ford Ranger', value: 25 }, { name: 'Isuzu D-Max', value: 22 },
  { name: 'Hyundai H1', value: 18 }, { name: 'Other', value: 35 },
];

const PIE_COLORS = ['#3B82F6', '#10B981', '#F97316', '#8B5CF6', '#F59E0B', '#64748B'];

const KpiCard: React.FC<{ title: string; value: string; icon: React.ReactNode, color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-gray-800 rounded-xl shadow-2xl p-6 flex items-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);


const Reporting: React.FC = () => {
  const totalRevenue = monthlySalesData.reduce((acc, item) => acc + item.Revenue, 0);
  const totalCarsSold = monthlySalesData.reduce((acc, item) => acc + item['Cars Sold'], 0);
  const averagePrice = totalRevenue / totalCarsSold;
  const currentMonthSales = monthlySalesData[monthlySalesData.length - 1]['Cars Sold'];


  return (
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">ລາຍງານ ແລະ ວິເຄາະ</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard title="ລາຍຮັບລວມ" value={`$${totalRevenue.toLocaleString()}`} icon={<i className="fas fa-dollar-sign fa-2x"></i>} color="bg-blue-500/30 text-blue-400" />
        <KpiCard title="ລົດທີ່ຂາຍໄດ້ທັງໝົດ" value={totalCarsSold.toString()} icon={<i className="fas fa-car fa-2x"></i>} color="bg-green-500/30 text-green-400" />
        <KpiCard title="ລາຄາຂາຍສະເລ່ຍ" value={`$${averagePrice.toFixed(0).toLocaleString()}`} icon={<i className="fas fa-tags fa-2x"></i>} color="bg-yellow-500/30 text-yellow-400" />
        <KpiCard title="ຍອດຂາຍເດືອນນີ້" value={currentMonthSales.toString()} icon={<i className="fas fa-chart-line fa-2x"></i>} color="bg-purple-500/30 text-purple-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Monthly Revenue Chart */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">ລາຍຮັບປະຈຳເດືອນ (USD)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${Number(value)/1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}
                cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Line type="monotone" dataKey="Revenue" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Best Selling Models Chart */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">5 ຮຸ່ນລົດທີ່ຂາຍດີທີ່ສຸດ</h2>
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
                label={({ name, percent }: { name: string, percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {bestSellingModelsData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Sales Bar Chart */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 lg:col-span-2">
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
                <Bar dataKey="Cars Sold" fill="#3B82F6" />
                </BarChart>
            </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Reporting;
