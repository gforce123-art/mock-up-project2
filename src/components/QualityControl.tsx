
import React, { useMemo } from 'react';
import { Sale } from '../types';

// This mock data should be in a shared location, but for now, we'll keep it here to power the dashboard.
const mockSales: Sale[] = [
    { id: 1, carId: 3, carDescription: 'Ford Ranger 2021', customerId: 1, customerName: 'ທ້າວ ສົມຊາຍ', saleDate: '2024-07-15', salePrice: 32000, paymentStatus: 'Fully Paid' },
    {
      id: 2, carId: 4, carDescription: 'Hyundai H1 2018', customerId: 2, customerName: 'ນາງ ຄຳຫລ້າ', saleDate: '2024-07-20', salePrice: 22000, paymentStatus: 'Partial Payment', depositAmount: 5000, depositDate: '2024-07-20',
      installments: [
        { dueDate: '2024-08-20', amount: 1700, status: 'Paid', paymentDate: '2024-08-18' },
        { dueDate: '2024-09-20', amount: 1700, status: 'Pending' },
        { dueDate: '2024-10-20', amount: 1700, status: 'Pending' },
      ]
    },
    { id: 3, carId: 1, carDescription: 'Toyota Vigo 2020', customerId: 3, customerName: 'ທ້າວ ບຸນມີ', saleDate: '2024-07-28', salePrice: 25500, paymentStatus: 'Pending Deposit' },
    {
      id: 4, carId: 2, carDescription: 'Honda CR-V 2019', customerId: 1, customerName: 'ທ້າວ ສົມຊາຍ', saleDate: '2024-06-10', salePrice: 28000, paymentStatus: 'Overdue', depositAmount: 4000, depositDate: '2024-06-10',
      installments: [
          { dueDate: '2024-07-10', amount: 2400, status: 'Paid', paymentDate: '2024-07-09' },
          { dueDate: '2024-08-10', amount: 2400, status: 'Pending' }, // This is now overdue
      ]
    },
     {
      id: 5, carId: 5, carDescription: 'Isuzu D-Max 2022', customerId: 3, customerName: 'ທ້າວ ບຸນມີ', saleDate: '2024-05-05', salePrice: 30000, paymentStatus: 'Partial Payment', depositAmount: 6000, depositDate: '2024-05-05',
      installments: [
          { dueDate: '2024-06-05', amount: 2000, status: 'Paid', paymentDate: '2024-06-01' },
          { dueDate: '2024-07-05', amount: 2000, status: 'Paid', paymentDate: '2024-07-04' },
          { dueDate: '2024-08-05', amount: 2000, status: 'Paid', paymentDate: '2024-08-05' },
          { dueDate: '2024-09-05', amount: 2000, status: 'Pending' },
      ]
    }
];

const KpiCard: React.FC<{ title: string; value: string; icon: string; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-gray-400 text-sm">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            <div className={`p-3 rounded-full ${color}`}>
                <i className={`fas ${icon} fa-lg text-white`}></i>
            </div>
        </div>
    </div>
);

const QualityControl: React.FC = () => {
    const {
        overdueInstallments,
        upcomingInstallments,
        recentPayments,
        totalOutstanding,
        next30Days,
        totalOverdue
    } = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const allInstallments = mockSales.flatMap(sale =>
            sale.installments ? sale.installments.map(inst => ({
                ...inst,
                saleId: sale.id,
                customerName: sale.customerName,
                carDescription: sale.carDescription
            })) : []
        );

        const overdue = allInstallments
            .filter(inst => inst.status === 'Pending' && new Date(inst.dueDate) < today)
            .map(inst => ({
                ...inst,
                daysOverdue: Math.floor((today.getTime() - new Date(inst.dueDate).getTime()) / (1000 * 3600 * 24))
            }))
            .sort((a, b) => b.daysOverdue - a.daysOverdue);

        const upcoming = allInstallments
            .filter(inst => inst.status === 'Pending' && new Date(inst.dueDate) >= today)
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        
        const recent = allInstallments
            .filter(inst => inst.status === 'Paid' && inst.paymentDate)
            .sort((a, b) => new Date(b.paymentDate!).getTime() - new Date(a.paymentDate!).getTime())
            .slice(0, 10);
            
        const outstanding = allInstallments
            .filter(inst => inst.status === 'Pending')
            .reduce((sum, inst) => sum + inst.amount, 0);

        const dueIn30 = upcoming
            .filter(inst => new Date(inst.dueDate) <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000))
            .reduce((sum, inst) => sum + inst.amount, 0);
            
        const overdueTotal = overdue.reduce((sum, inst) => sum + inst.amount, 0);

        return {
            overdueInstallments: overdue,
            upcomingInstallments: upcoming,
            recentPayments: recent,
            totalOutstanding: outstanding,
            next30Days: dueIn30,
            totalOverdue: overdueTotal
        };
    }, []);

    return (
        <div className="container mx-auto text-white space-y-8">
            <h1 className="text-3xl font-bold">ພາບລວມການຊຳລະເງິນ</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <KpiCard title="ຍອດຄົງຄ້າງທັງໝົດ" value={`$${totalOutstanding.toLocaleString()}`} icon="fa-file-invoice-dollar" color="bg-blue-500/80" />
                <KpiCard title="ຮອດກຳນົດໃນ 30 ມື້" value={`$${next30Days.toLocaleString()}`} icon="fa-calendar-alt" color="bg-yellow-500/80" />
                <KpiCard title="ເກີນກຳນົດທັງໝົດ" value={`$${totalOverdue.toLocaleString()}`} icon="fa-exclamation-triangle" color="bg-red-500/80" />
            </div>

            {/* Overdue and Upcoming Payments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Overdue Payments */}
                <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <h2 className="text-xl font-semibold p-4 bg-gray-700/50">ການຈ່າຍເງິນທີ່ເກີນກຳນົດ</h2>
                    <div className="overflow-x-auto max-h-96">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-700 sticky top-0">
                                <tr>
                                    <th className="p-3 text-left font-semibold">ລູກຄ້າ</th>
                                    <th className="p-3 text-left font-semibold">ລົດ</th>
                                    <th className="p-3 text-left font-semibold">ວັນຄົບກຳນົດ</th>
                                    <th className="p-3 text-left font-semibold">ຈຳນວນ</th>
                                    <th className="p-3 text-left font-semibold">ເກີນ (ມື້)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {overdueInstallments.map((inst, index) => (
                                    <tr key={`overdue-${index}`} className="hover:bg-gray-700/50">
                                        <td className="p-3">{inst.customerName}</td>
                                        <td className="p-3 text-gray-400">{inst.carDescription}</td>
                                        <td className="p-3">{new Date(inst.dueDate).toLocaleDateString()}</td>
                                        <td className="p-3">${inst.amount.toLocaleString()}</td>
                                        <td className="p-3"><span className="bg-red-500 text-white font-bold px-2 py-1 rounded">{inst.daysOverdue}</span></td>
                                    </tr>
                                ))}
                                {overdueInstallments.length === 0 && (
                                    <tr><td colSpan={5} className="p-4 text-center text-gray-500">ບໍ່ມີລາຍການທີ່ເກີນກຳນົດ</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upcoming Payments */}
                <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <h2 className="text-xl font-semibold p-4 bg-gray-700/50">ການຈ່າຍເງິນທີ່ຈະມາເຖິງ</h2>
                    <div className="overflow-x-auto max-h-96">
                        <table className="min-w-full text-sm">
                             <thead className="bg-gray-700 sticky top-0">
                                <tr>
                                    <th className="p-3 text-left font-semibold">ລູກຄ້າ</th>
                                    <th className="p-3 text-left font-semibold">ລົດ</th>
                                    <th className="p-3 text-left font-semibold">ວັນຄົບກຳນົດ</th>
                                    <th className="p-3 text-left font-semibold">ຈຳນວນ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {upcomingInstallments.map((inst, index) => (
                                    <tr key={`upcoming-${index}`} className="hover:bg-gray-700/50">
                                        <td className="p-3">{inst.customerName}</td>
                                        <td className="p-3 text-gray-400">{inst.carDescription}</td>
                                        <td className="p-3">{new Date(inst.dueDate).toLocaleDateString()}</td>
                                        <td className="p-3">${inst.amount.toLocaleString()}</td>
                                    </tr>
                                ))}
                                {upcomingInstallments.length === 0 && (
                                    <tr><td colSpan={4} className="p-4 text-center text-gray-500">ບໍ່ມີການຈ່າຍເງິນທີ່ຈະມາເຖິງ</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Recent Payment History */}
            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                <h2 className="text-xl font-semibold p-4 bg-gray-700/50">ປະຫວັດການຈ່າຍເງິນຫຼ້າສຸດ</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="p-4 text-left font-semibold">ວັນທີຈ່າຍ</th>
                                <th className="p-4 text-left font-semibold">ລູກຄ້າ</th>
                                <th className="p-4 text-left font-semibold">ລົດ</th>
                                <th className="p-4 text-left font-semibold">ຈຳນວນ</th>
                                <th className="p-4 text-left font-semibold">ວັນຄົບກຳນົດເດີມ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                           {recentPayments.map((inst, index) => (
                               <tr key={`recent-${index}`} className="hover:bg-gray-700/50">
                                   <td className="p-4 text-green-400">{new Date(inst.paymentDate!).toLocaleDateString()}</td>
                                   <td className="p-4">{inst.customerName}</td>
                                   <td className="p-4 text-gray-400">{inst.carDescription}</td>
                                   <td className="p-4">${inst.amount.toLocaleString()}</td>
                                   <td className="p-4 text-gray-400">{new Date(inst.dueDate).toLocaleDateString()}</td>
                               </tr>
                           ))}
                           {recentPayments.length === 0 && (
                               <tr><td colSpan={5} className="p-4 text-center text-gray-500">ບໍ່ມີປະຫວັດການຈ່າຍເງິນ</td></tr>
                           )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default QualityControl;
