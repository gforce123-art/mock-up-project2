
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import CarManagement from './components/CarManagement';
import SalesManagement from './components/SalesManagement';
import CustomerManagement from './components/CustomerManagement';
import QualityControl from './components/QualityControl';
import Communication from './components/Communication';
import Reporting from './components/Reporting';
import SystemMaintenance from './components/SystemMaintenance';
import TopBar from './components/TopBar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Page, User } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSetCurrentPage = (page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false); // Close sidebar on navigation
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderPage = useCallback(() => {
    // Note: Access control is primarily handled by hiding UI elements in Sidebar/Dashboard.
    // A more robust solution with routing would protect routes here.
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={handleSetCurrentPage} currentUser={currentUser!} />;
      case 'car_management':
        return <CarManagement />;
      case 'sales_management':
        return <SalesManagement />;
      case 'customer_management':
        return <CustomerManagement />;
      case 'payment_management':
        return <QualityControl />;
      case 'communication':
        return <Communication />;
      case 'reporting':
        return <Reporting />;
      case 'system_maintenance':
        // Only render if admin, though the link wouldn't be visible anyway.
        return currentUser?.role === 'Admin' ? <SystemMaintenance /> : <Dashboard setCurrentPage={handleSetCurrentPage} currentUser={currentUser!} />;
      default:
        return <Dashboard setCurrentPage={handleSetCurrentPage} currentUser={currentUser!} />;
    }
  }, [currentPage, currentUser]);

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-900 font-sans text-gray-100">
      <Sidebar 
        currentUser={currentUser}
        currentPage={currentPage} 
        setCurrentPage={handleSetCurrentPage} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
          <div 
            className="absolute inset-0 -z-10 h-full w-full bg-gray-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          </div>
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
