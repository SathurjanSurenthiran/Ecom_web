import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <AdminSidebar />
          </aside>
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
