import React from 'react';
import { Page } from '../types';
import CarIcon from './icons/CarIcon';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import UserIcon from './icons/UserIcon';
import CheckIcon from './icons/CheckIcon';
import CommentIcon from './icons/CommentIcon';
import ChartIcon from './icons/ChartIcon';
import SettingsIcon from './icons/SettingsIcon';

interface DashboardProps {
  setCurrentPage: (page: Page) => void;
}

interface ModuleCardProps {
    id: Page;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    onClick: (page: Page) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ id, title, description, icon, color, onClick }) => (
    <div
        onClick={() => onClick(id)}
        className={`rounded-xl p-6 flex flex-col cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg ${color}`}
    >
        <div className="flex-shrink-0 w-12 h-12 bg-black bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-white opacity-80 flex-grow">{description}</p>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ setCurrentPage }) => {
    const modules = [
        { id: 'car_management' as Page, title: '1. ຈັດການຂໍ້ມູນລົດ', description: 'ເພີ່ມ, ແກ້ໄຂ, ແລະ ລຶບຂໍ້ມູນລົດ', icon: <CarIcon className="w-7 h-7 text-white"/>, color: 'bg-green-500' },
        { id: 'sales_management' as Page, title: '2. ຈັດການການຂາຍ', description: 'ບັນທຶກການຂາຍ ແລະ ຕິດຕາມການຈ່າຍເງິນ', icon: <ShoppingCartIcon className="w-7 h-7 text-white"/>, color: 'bg-blue-500' },
        { id: 'customer_management' as Page, title: '3. ຈັດການລູກຄ້າ', description: 'ບັນທຶກຂໍ້ມູນລູກຄ້າ ແລະ ນັດໝາຍ', icon: <UserIcon className="w-7 h-7 text-white"/>, color: 'bg-orange-500' },
        { id: 'quality_control' as Page, title: '4. ຄວບຄຸມຄຸນນະພາບ', description: 'ກວດສອບຂໍ້ມູນ, ຮູບພາບ, ແລະ ລາຄາ', icon: <CheckIcon className="w-7 h-7 text-white"/>, color: 'bg-purple-500' },
        { id: 'communication' as Page, title: '5. ຈັດການການຕິດຕໍ່', description: 'ຕອບຄຳຖາມ ແລະ ຕິດຕາມຫຼັງການຂາຍ', icon: <CommentIcon className="w-7 h-7 text-white"/>, color: 'bg-yellow-500' },
        { id: 'reporting' as Page, title: '6. ລາຍງານ ແລະ ວິເຄາະ', description: 'ສະຫຼຸບຍອດຂາຍ ແລະ ວິເຄາະຂໍ້ມູນ', icon: <ChartIcon className="w-7 h-7 text-white"/>, color: 'bg-red-500' },
        { id: 'system_maintenance' as Page, title: '7. ບຳລຸງລະບົບ', description: 'ສຳຮອງຂໍ້ມູນ ແລະ ອັບເດດລະບົບ', icon: <SettingsIcon className="w-7 h-7 text-white"/>, color: 'bg-gray-600' },
    ];

    return (
        <div className="text-white">
            <header className="text-center mb-12">
                <div className="inline-block bg-blue-600 rounded-2xl p-6 shadow-2xl border-4 border-blue-500">
                    <div className="flex items-center justify-center">
                        <div className="bg-blue-700 p-3 rounded-lg mr-4 shadow-inner border-2 border-blue-500">
                            <span className="font-bold text-white text-2xl tracking-wider">VTN</span>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">VTN Motor</h1>
                            <p className="text-xl text-blue-200">Admin Dashboard</p>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {modules.slice(0, 3).map(m => <ModuleCard key={m.id} {...m} onClick={setCurrentPage} />)}
                <div className="lg:col-span-1 xl:col-span-1">
                     <ModuleCard {...modules[3]} onClick={setCurrentPage} />
                </div>

                <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {modules.slice(4).map(m => <ModuleCard key={m.id} {...m} onClick={setCurrentPage} />)}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;