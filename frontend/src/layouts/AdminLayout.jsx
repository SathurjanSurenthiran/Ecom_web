import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut, FiSearch, FiBell } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { logoutUser } from '../features/auth/authSlice';
import { shopDetails } from '../data/shopDetails';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('Logged out of admin panel');
    navigate('/login');
  };

  return (
    <div className="h-screen overflow-hidden bg-zinc-950 text-white font-inter dark">
      
      {/* Top dashboard control header */}
      <header className="bg-zinc-900 border-b border-zinc-800/80 fixed top-0 left-0 right-0 h-16 z-50 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-poppins font-extrabold tracking-widest text-white hover:opacity-80 transition-opacity">
            {shopDetails.name.toUpperCase()}
          </Link>
          <span className="hidden sm:inline-block w-[1px] h-5 bg-zinc-800"></span>
          <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Control Center
          </span>
        </div>

        {/* Dashboard Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Sleek dark search */}
          <div className="relative hidden md:block">
            <FiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search analytics, logs..."
              className="w-64 pl-10 pr-4 py-1.5 bg-zinc-950/40 border border-zinc-800/80 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
            />
          </div>

          {/* Notifications */}
          <button
            onClick={() => toast.success('All systems operational')}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all relative"
            title="Notifications"
          >
            <FiBell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full"></span>
          </button>

          {/* Profile details */}
          <div className="flex items-center space-x-3 bg-zinc-950/30 border border-zinc-800/50 px-3 py-1.5 rounded-xl">
            <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-xs font-extrabold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <p className="font-semibold text-white leading-none">{user?.name}</p>
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold mt-0.5">{user?.role}</p>
            </div>
          </div>

          {/* Quick exit */}
          <button
            onClick={handleLogout}
            className="p-2 border border-zinc-800 hover:border-red-500/30 text-zinc-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all"
            title="Exit System"
          >
            <FiLogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main layout frame */}
      <div className="pt-16 h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="fixed left-0 right-0 top-16 z-40 h-auto border-b border-zinc-800/80 bg-zinc-900 p-3 shadow-xl shadow-black/20 lg:bottom-0 lg:right-auto lg:h-[calc(100vh-4rem)] lg:w-64 lg:border-b-0 lg:border-r lg:p-4 lg:shadow-none">
          <AdminSidebar />
        </aside>
        
        {/* Dashboard Workspace */}
        <main className="admin-workspace flex h-[calc(100vh-4rem)] min-w-0 flex-col overflow-y-auto pt-[9.5rem] lg:ml-64 lg:pt-0">
          <div className="flex-1 p-5 md:p-8 admin-page-content">
            <Outlet />
          </div>
          
          {/* Simplified footer for admin */}
          <footer className="border-t border-zinc-600/70 bg-zinc-700 py-4 px-6 md:px-8 text-center text-xs text-zinc-300 font-light flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>&copy; {new Date().getFullYear()} {shopDetails.name.toUpperCase()} CONTROL. Core system v1.2.0</p>
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-zinc-400 transition-colors">Retail Store</Link>
              <span>&bull;</span>
              <button onClick={() => toast.success('API Status: Green')} className="hover:text-zinc-400 transition-colors">API Diagnostics</button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
