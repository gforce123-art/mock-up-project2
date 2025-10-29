
import React from 'react';
import { Sale } from '../types';

interface SaleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: Sale | null;
}

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

const getInstallmentStatusBadge = (status: 'Paid' | 'Pending') => {
    return status === 'Paid' ? 'bg-green-500 text-green-100' : 'bg-yellow-500 text-yellow-100';
};

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-400">{label}</p>
        <div className="text-lg font-semibold">{value}</div>
    </div>
);

const SaleDetailModal: React.FC<SaleDetailModalProps> = ({ isOpen, onClose, sale }) => {
  if (!isOpen || !sale) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl text-white max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold">Sale Details (ID: {sale.id})</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
            {/* Sale Information */}
            <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-300">Sale Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <DetailItem label="Car" value={sale.carDescription} />
                    <DetailItem label="Customer" value={sale.customerName} />
                    <DetailItem label="Sale Date" value={new Date(sale.saleDate).toLocaleDateString()} />
                    <DetailItem label="Sale Price" value={`$${sale.salePrice.toLocaleString()}`} />
                    <DetailItem 
                        label="Payment Status" 
                        value={<span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPaymentStatusBadge(sale.paymentStatus)}`}>{sale.paymentStatus}</span>} 
                    />
                </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-900/50 p-4 rounded-lg">
                 <h3 className="text-lg font-semibold mb-4 text-blue-300">Payment Details</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailItem label="Deposit Amount" value={sale.depositAmount ? `$${sale.depositAmount.toLocaleString()}` : 'N/A'} />
                    <DetailItem label="Deposit Date" value={sale.depositDate ? new Date(sale.depositDate).toLocaleDateString() : 'N/A'} />
                 </div>
            </div>

            {/* Installment Plan */}
            <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-300">Installment Plan</h3>
                {sale.installments && sale.installments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="p-3 text-left font-semibold">Due Date</th>
                                    <th className="p-3 text-left font-semibold">Amount</th>
                                    <th className="p-3 text-left font-semibold">Status</th>
                                    <th className="p-3 text-left font-semibold">Payment Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {sale.installments.map((inst, index) => (
                                    <tr key={index} className="hover:bg-gray-700/50">
                                        <td className="p-3">{new Date(inst.dueDate).toLocaleDateString()}</td>
                                        <td className="p-3">${inst.amount.toLocaleString()}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getInstallmentStatusBadge(inst.status)}`}>
                                                {inst.status}
                                            </span>
                                        </td>
                                        <td className="p-3">{inst.paymentDate ? new Date(inst.paymentDate).toLocaleDateString() : 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400 text-center py-4">No installment plan for this sale.</p>
                )}
            </div>
        </div>

        <div className="p-4 border-t border-gray-700 bg-gray-800/50 flex justify-end">
            <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailModal;
