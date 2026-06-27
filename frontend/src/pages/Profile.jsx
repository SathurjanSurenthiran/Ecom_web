import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiKey, FiPackage } from 'react-icons/fi';
import Header from '../components/common/Header';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  const profileTabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'orders', label: 'Orders', icon: FiPackage },
    { id: 'addresses', label: 'Addresses', icon: FiMapPin },
    { id: 'password', label: 'Change Password', icon: FiKey },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-8">
            My Profile
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Sidebar */}
            <div className="md:w-64 flex-shrink-0">
              <div className="glass p-6 rounded-xl text-center">
                <div className="w-24 h-24 mx-auto bg-primary-600/20 rounded-full flex items-center justify-center mb-4">
                  <FiUser className="w-12 h-12 text-primary-400" />
                </div>
                <h3 className="text-white font-semibold">{user?.name}</h3>
                <p className="text-white/60 text-sm">{user?.email}</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="px-3 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full">
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </span>
                </div>

                <nav className="mt-6 space-y-1">
                  {profileTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-primary-600 text-white'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass p-6 rounded-xl"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-poppins font-bold text-white">Profile Information</h2>
                    <button className="text-primary-400 hover:text-primary-300 flex items-center space-x-1">
                      <FiEdit2 />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                      <FiUser className="text-primary-400" />
                      <div>
                        <p className="text-white/60 text-sm">Full Name</p>
                        <p className="text-white">{user?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                      <FiMail className="text-primary-400" />
                      <div>
                        <p className="text-white/60 text-sm">Email</p>
                        <p className="text-white">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                      <FiPhone className="text-primary-400" />
                      <div>
                        <p className="text-white/60 text-sm">Phone</p>
                        <p className="text-white">{user?.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                      <FiMapPin className="text-primary-400" />
                      <div>
                        <p className="text-white/60 text-sm">Address</p>
                        <p className="text-white">
                          {user?.address ? 
                            `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zipCode}` 
                            : 'No address provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass p-6 rounded-xl"
                >
                  <h2 className="text-xl font-poppins font-bold text-white mb-6">Order History</h2>
                  <div className="text-white/60">No orders yet</div>
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass p-6 rounded-xl"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-poppins font-bold text-white">Saved Addresses</h2>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Add Address
                    </button>
                  </div>
                  <div className="text-white/60">No saved addresses</div>
                </motion.div>
              )}

              {activeTab === 'password' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass p-6 rounded-xl"
                >
                  <h2 className="text-xl font-poppins font-bold text-white mb-6">Change Password</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Update Password
                    </button>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;