import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiKey, FiPackage } from 'react-icons/fi';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  const profileTabs = [
    { id: 'profile', label: 'Profile Information', icon: FiUser },
    { id: 'orders', label: 'Order History', icon: FiPackage },
    { id: 'addresses', label: 'Saved Addresses', icon: FiMapPin },
    { id: 'password', label: 'Change Password', icon: FiKey },
  ];

  return (
    <div className="bg-[#fcfbfe] text-black min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 pb-6 border-b border-zinc-100"
        >
          <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mb-2">Customer Account</p>
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-black uppercase tracking-tight">
            My Account
          </h1>
          <p className="text-zinc-500 text-sm mt-1 font-light">Manage your profile, orders, and security settings</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Profile Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-sm text-center">
              <div className="w-20 h-20 mx-auto bg-black text-white rounded-full flex items-center justify-center mb-4 text-3xl font-poppins font-extrabold shadow-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-black font-semibold text-lg">{user?.name}</h3>
              <p className="text-zinc-400 text-xs font-light mt-0.5">{user?.email}</p>
              
              <div className="mt-4 pt-3 border-t border-zinc-100">
                <span className="px-3 py-1 bg-zinc-100 border border-zinc-200 text-zinc-700 text-[10px] font-bold tracking-wider uppercase rounded-full">
                  {user?.role} Account
                </span>
              </div>

              <nav className="mt-8 space-y-1.5 text-left">
                {profileTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-black text-white shadow-sm font-semibold'
                        : 'text-zinc-500 hover:text-black hover:bg-zinc-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Profile Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-zinc-200/80 p-6 md:p-8 rounded-3xl shadow-sm space-y-6"
              >
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <h2 className="text-lg font-poppins font-bold text-black uppercase tracking-wider">Concierge Profile</h2>
                  <button className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-black flex items-center space-x-1.5 transition-colors">
                    <FiEdit2 size={12} />
                    <span>Edit Profile</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4 p-4 bg-zinc-50/50 border border-zinc-200/50 rounded-2xl">
                    <div className="w-10 h-10 bg-white border border-zinc-200/50 rounded-xl flex items-center justify-center text-black shadow-sm">
                      <FiUser />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-[10px] uppercase tracking-wider font-semibold">Full Name</p>
                      <p className="text-black font-semibold text-sm mt-0.5">{user?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-zinc-50/50 border border-zinc-200/50 rounded-2xl">
                    <div className="w-10 h-10 bg-white border border-zinc-200/50 rounded-xl flex items-center justify-center text-black shadow-sm">
                      <FiMail />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-[10px] uppercase tracking-wider font-semibold">Email Address</p>
                      <p className="text-black font-semibold text-sm mt-0.5">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-zinc-50/50 border border-zinc-200/50 rounded-2xl">
                    <div className="w-10 h-10 bg-white border border-zinc-200/50 rounded-xl flex items-center justify-center text-black shadow-sm">
                      <FiPhone />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-[10px] uppercase tracking-wider font-semibold">Phone Contact</p>
                      <p className="text-black font-semibold text-sm mt-0.5">{user?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-zinc-50/50 border border-zinc-200/50 rounded-2xl">
                    <div className="w-10 h-10 bg-white border border-zinc-200/50 rounded-xl flex items-center justify-center text-black shadow-sm">
                      <FiMapPin />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-[10px] uppercase tracking-wider font-semibold">Shipping Destination</p>
                      <p className="text-black font-semibold text-sm mt-0.5">
                        {user?.address ? 
                          `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zipCode}` 
                          : 'No address saved'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-zinc-200/80 p-6 md:p-8 rounded-3xl shadow-sm"
              >
                <h2 className="text-lg font-poppins font-bold text-black uppercase tracking-wider pb-4 border-b border-zinc-100 mb-6">Order History</h2>
                <div className="text-center py-12 text-zinc-400 font-light text-sm">
                  You haven't placed any orders yet.
                </div>
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-zinc-200/80 p-6 md:p-8 rounded-3xl shadow-sm"
              >
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100 mb-6">
                  <h2 className="text-lg font-poppins font-bold text-black uppercase tracking-wider">Saved Addresses</h2>
                  <button className="px-5 py-2 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm">
                    Add Address
                  </button>
                </div>
                <div className="text-center py-12 text-zinc-400 font-light text-sm">
                  No saved addresses found.
                </div>
              </motion.div>
            )}

            {activeTab === 'password' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-zinc-200/80 p-6 md:p-8 rounded-3xl shadow-sm space-y-6"
              >
                <h2 className="text-lg font-poppins font-bold text-black uppercase tracking-wider pb-4 border-b border-zinc-100">Change Password</h2>
                <form className="space-y-5 max-w-md">
                  <div>
                    <label className="text-black font-semibold text-xs tracking-wider uppercase mb-2 block">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-black font-semibold text-xs tracking-wider uppercase mb-2 block">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-black font-semibold text-xs tracking-wider uppercase mb-2 block">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <button className="px-6 py-3 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm">
                    Update Password
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;