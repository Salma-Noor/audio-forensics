import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Transcribe from './pages/Transcribe';
import { useAppStore } from './store';

const queryClient = new QueryClient();

function App() {
  const { currentPage } = useAppStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transcribe':
        return <Transcribe />;
      case 'analysis':
        return <div className="p-6">Analysis Page - Coming Soon</div>;
      case 'reports':
        return <div className="p-6">Reports Page - Coming Soon</div>;
      case 'settings':
        return <div className="p-6">Settings Page - Coming Soon</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64">
            {renderCurrentPage()}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
