import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiSearch, FiEdit2, FiTrash2, FiUser,
  FiMail, FiCalendar, FiShield, FiUserX
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import axios from '../../api/axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await axios.put(`/users/${id}/role`, { role: newRole });
      toast.success('User role updated');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/users/${id}`);
        toast.success('User deleted');
        fetchUsers();
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <LoadingSkeleton type="product" count={5} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-poppins font-bold text-white">
                Users
              </h1>
              <p className="text-white/60">{users.length} users total</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{user.name}</h3>
                      <p className="text-white/60 text-sm flex items-center space-x-1">
                        <FiMail className="w-3 h-3" />
                        <span>{user.email}</span>
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {user.role}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-white/60 text-sm">
                  <div className="flex items-center space-x-1">
                    <FiCalendar className="w-3 h-3" />
                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiShield className="w-3 h-3" />
                    <span>{user.isVerified ? 'Verified' : 'Not Verified'}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  <button
                    onClick={() => toggleUserRole(user._id, user.role)}
                    className="flex-1 px-3 py-1 glass text-white rounded-lg hover:bg-white/10 transition-colors text-sm flex items-center justify-center space-x-1"
                  >
                    <FiEdit2 className="w-3 h-3" />
                    <span>Toggle Role</span>
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm flex items-center space-x-1"
                  >
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminUsers;