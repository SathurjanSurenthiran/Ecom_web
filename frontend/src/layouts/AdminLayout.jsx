import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark text-white flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row flex-1 pt-20">
        {/* Sidebar container - glass card on mobile, fixed panel on tablet/desktop */}
        <aside className="w-full md:w-64 md:fixed md:left-0 md:top-0 md:bottom-0 md:z-40 p-4 mb-6 md:mb-0 glass md:glass-sidebar rounded-xl md:rounded-none border-b md:border-b-0 md:border-r border-white/10 md:shadow-none overflow-y-auto md:pt-24">
          <AdminSidebar />
        </aside>
        
        {/* Main Content Area */}
        <main className="flex-1 md:pl-64 min-h-[calc(100vh-5rem)] flex flex-col min-w-0">
          <div className="flex-1 p-4 md:p-6 lg:p-8 admin-page-content">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
