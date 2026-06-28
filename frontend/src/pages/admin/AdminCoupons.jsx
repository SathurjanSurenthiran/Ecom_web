import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FiPlus, FiEdit2, FiTrash2, FiDollarSign,
  FiX
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import axios from '../../api/axios';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minPurchase: '',
    maxDiscount: '',
    startDate: '',
    endDate: '',
    usageLimit: '',
  });

  const fetchCoupons = useCallback(async () => {
    try {
      const response = await axios.get('/coupons');
      setCoupons(response.data.data);
    } catch {
      toast.error('Failed to fetch coupons');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchCoupons, 0);
    return () => window.clearTimeout(timeoutId);
  }, [fetchCoupons]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        discountValue: parseFloat(formData.discountValue),
        minPurchase: parseFloat(formData.minPurchase) || 0,
        maxDiscount: parseFloat(formData.maxDiscount) || undefined,
        usageLimit: parseInt(formData.usageLimit) || 1,
      };

      if (editingCoupon) {
        await axios.put(`/coupons/${editingCoupon._id}`, data);
        toast.success('Coupon updated');
      } else {
        await axios.post('/coupons', data);
        toast.success('Coupon created');
      }
      setShowModal(false);
      setFormData({
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        minPurchase: '',
        maxDiscount: '',
        startDate: '',
        endDate: '',
        usageLimit: '',
      });
      setEditingCoupon(null);
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save coupon');
    }
  };

  const deleteCoupon = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await axios.delete(`/coupons/${id}`);
        toast.success('Coupon deleted');
        fetchCoupons();
      } catch {
        toast.error('Failed to delete coupon');
      }
    }
  };

  const openModal = (coupon = null) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        description: coupon.description || '',
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minPurchase: coupon.minPurchase || '',
        maxDiscount: coupon.maxDiscount || '',
        startDate: coupon.startDate?.split('T')[0] || '',
        endDate: coupon.endDate?.split('T')[0] || '',
        usageLimit: coupon.usageLimit || '',
      });
    } else {
      setEditingCoupon(null);
      setFormData({
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        minPurchase: '',
        maxDiscount: '',
        startDate: '',
        endDate: '',
        usageLimit: '',
      });
    }
    setShowModal(true);
  };

  if (loading) {
    return <LoadingSkeleton type="product" count={4} />;
  }

  return (
    <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-poppins font-bold text-white">
                Coupons
              </h1>
              <p className="text-white/60">{coupons.length} coupons total</p>
            </div>
            <button
              onClick={() => openModal()}
              className="mt-4 md:mt-0 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <FiPlus />
              <span>Add Coupon</span>
            </button>
          </div>

          {/* Coupons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <motion.div
                key={coupon._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-6 rounded-xl group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <FiDollarSign className="text-primary-400" />
                      <h3 className="text-xl font-poppins font-bold text-white">
                        {coupon.code}
                      </h3>
                    </div>
                    <p className="text-white/60 text-sm mt-1">
                      {coupon.description || 'No description'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    coupon.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {coupon.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="text-white/60">
                    <span className="block">Discount</span>
                    <span className="text-white font-semibold">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                    </span>
                  </div>
                  <div className="text-white/60">
                    <span className="block">Min Purchase</span>
                    <span className="text-white font-semibold">
                      ${coupon.minPurchase || 0}
                    </span>
                  </div>
                  <div className="text-white/60">
                    <span className="block">Used</span>
                    <span className="text-white font-semibold">
                      {coupon.usedCount || 0} / {coupon.usageLimit}
                    </span>
                  </div>
                  <div className="text-white/60">
                    <span className="block">Expires</span>
                    <span className="text-white font-semibold">
                      {new Date(coupon.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openModal(coupon)}
                    className="p-2 glass text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => deleteCoupon(coupon._id)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-6 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-poppins font-bold text-white">
                {editingCoupon ? 'Edit Coupon' : 'Add Coupon'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/60 hover:text-white"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/60 text-sm mb-1 block">Code *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  required
                  placeholder="e.g., SUMMER20"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 uppercase"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1 block">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1 block">Discount Type</label>
                <select
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1 block">
                  {formData.discountType === 'percentage' ? 'Discount %' : 'Discount Amount ($)'} *
                </label>
                <input
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  required
                  min="0"
                  max={formData.discountType === 'percentage' ? '100' : ''}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1 block">Minimum Purchase ($)</label>
                <input
                  type="number"
                  value={formData.minPurchase}
                  onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                  min="0"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1 block">Maximum Discount ($)</label>
                <input
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                  min="0"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-1 block">Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-1 block">End Date *</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1 block">Usage Limit</label>
                <input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                  min="1"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {editingCoupon ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 glass text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AdminCoupons;
