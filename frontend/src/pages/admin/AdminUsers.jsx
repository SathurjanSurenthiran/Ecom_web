import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FiSearch, FiTrash2, FiUser, FiPlus, FiX,
  FiMail, FiCalendar, FiShield
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import axios from '../../api/axios';

const AdminUsers = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchUsers, 0);
    return () => window.clearTimeout(timeoutId);
  }, [fetchUsers]);

  const updateRole = async (id, role) => {
    const targetUser = users.find((user) => user._id === id);
    if (!targetUser || targetUser.role === role) return;

    try {
      setUpdatingUserId(id);
      const response = await axios.put(`/users/${id}/role`, { role });
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? response.data.data : user))
      );
      toast.success('User role updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update role');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);
      const response = await axios.post('/users', formData);
      setUsers((prev) => [response.data.data, ...prev]);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
      });
      setShowCreateForm(false);
      toast.success(`${response.data.data.role === 'admin' ? 'Admin' : 'User'} created`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setCreating(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/users/${id}`);
        toast.success('User deleted');
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const formatJoinDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Unknown' : date.toLocaleDateString();
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSkeleton type="product" count={5} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-poppins font-bold text-white">
            Users
          </h1>
          <p className="text-white/60">{users.length} users total</p>
        </div>
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className="mt-4 md:mt-0 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          {showCreateForm ? <FiX className="h-4 w-4" /> : <FiPlus className="h-4 w-4" />}
          <span>{showCreateForm ? 'Cancel' : 'Add User/Admin'}</span>
        </button>
      </div>

      {showCreateForm && (
        <form
          onSubmit={createUser}
          className="glass rounded-xl p-5 grid grid-cols-1 md:grid-cols-5 gap-3"
        >
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            minLength={6}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            required
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="user" className="bg-dark text-white">User</option>
            <option value="admin" className="bg-dark text-white">Admin</option>
          </select>
          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
          >
            {creating ? 'Creating...' : 'Create'}
          </button>
        </form>
      )}

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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredUsers.map((user) => {
          const isCurrentUser = user._id === currentUser?._id;

          return (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-6 rounded-xl flex flex-col justify-between"
            >
            <div>
              <div className="flex items-start justify-between gap-2 min-w-0">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiUser className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-semibold truncate" title={user.name}>{user.name}</h3>
                    <p className="text-white/60 text-sm flex items-center space-x-1 min-w-0">
                      <FiMail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate" title={user.email}>{user.email}</span>
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize flex-shrink-0 ${
                  user.role === 'admin'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {user.role}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-white/60 text-sm gap-2 flex-wrap">
                <div className="flex items-center space-x-1 min-w-0">
                  <FiCalendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">Joined {formatJoinDate(user.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1 min-w-0">
                  <FiShield className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{user.isVerified ? 'Verified' : 'Not Verified'}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2">
              <select
                value={user.role}
                onChange={(e) => updateRole(user._id, e.target.value)}
                disabled={updatingUserId === user._id || isCurrentUser}
                title={isCurrentUser ? 'You cannot change your own role' : 'Change user role'}
                className="flex-1 px-3 py-1.5 glass text-white rounded-lg hover:bg-white/10 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60"
              >
                <option value="user" className="bg-dark text-white">User</option>
                <option value="admin" className="bg-dark text-white">Admin</option>
              </select>
              <button
                onClick={() => deleteUser(user._id)}
                disabled={isCurrentUser}
                title={isCurrentUser ? 'You cannot delete your own account' : 'Delete user'}
                className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm flex items-center justify-center space-x-1 flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AdminUsers;
