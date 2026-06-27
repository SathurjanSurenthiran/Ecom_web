import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FiPlus, FiEdit2, FiTrash2, FiGrid,
  FiX, FiImage
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import Header from '../../components/common/Header';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import axios from '../../api/axios';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data.data);
    } catch {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchCategories, 0);
    return () => window.clearTimeout(timeoutId);
  }, [fetchCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      if (editingCategory) {
        await axios.put(`/categories/${editingCategory._id}`, form);
        toast.success('Category updated');
      } else {
        await axios.post('/categories', form);
        toast.success('Category created');
      }
      setShowModal(false);
      setFormData({ name: '', description: '', image: null });
      setImagePreview(null);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save category');
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`/categories/${id}`);
        toast.success('Category deleted');
        fetchCategories();
      } catch {
        toast.error('Failed to delete category');
      }
    }
  };

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || '',
        image: null,
      });
      setImagePreview(category.image?.url || null);
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '', image: null });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <LoadingSkeleton type="product" count={6} />
        </div>
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
                Categories
              </h1>
              <p className="text-white/60">{categories.length} categories total</p>
            </div>
            <button
              onClick={() => openModal()}
              className="mt-4 md:mt-0 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <FiPlus />
              <span>Add Category</span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-4 rounded-xl text-center group"
              >
                <div className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center overflow-hidden mb-3">
                  {category.image?.url ? (
                    <img
                      src={category.image.url}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiGrid className="w-12 h-12 text-white/40" />
                  )}
                </div>
                <h3 className="text-white font-semibold">{category.name}</h3>
                <p className="text-white/60 text-sm truncate">
                  {category.description || 'No description'}
                </p>
                <div className="mt-3 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openModal(category)}
                    className="p-2 glass text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-6 rounded-2xl max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-poppins font-bold text-white">
                {editingCategory ? 'Edit Category' : 'Add Category'}
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
                <label className="text-white/60 text-sm mb-1 block">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1 block">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1 block">Image</label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-center">
                    <FiImage className="inline mr-2" />
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFormData({ ...formData, image: file });
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {editingCategory ? 'Update' : 'Create'}
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
    </div>
  );
};

export default AdminCategories;
