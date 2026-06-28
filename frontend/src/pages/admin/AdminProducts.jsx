import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiPlus, FiEdit2, FiTrash2, FiEye, FiSearch,
  FiFilter, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from '../../api/axios';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import { getProducts } from '../../features/products/productSlice';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, total } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/products/${id}`);
        toast.success('Product deleted successfully');
        dispatch(getProducts({ page: currentPage, limit: 10 }));
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      toast.error('No products selected');
      return;
    }
    if (window.confirm(`Delete ${selectedProducts.length} products?`)) {
      // Implement bulk delete
      toast.success('Products deleted');
      setSelectedProducts([]);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-poppins font-bold text-white">
                Products
              </h1>
              <p className="text-white/60">{total} products total</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              {selectedProducts.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Delete Selected ({selectedProducts.length})
                </button>
              )}
              <Link
                to="/admin/products/add"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <FiPlus />
                <span>Add Product</span>
              </Link>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button className="px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2">
              <FiFilter />
              <span>Filter</span>
            </button>
          </div>

          {/* Products Table */}
          {loading ? (
            <LoadingSkeleton type="product" count={5} />
          ) : (
            <div className="glass rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-white/40 text-sm border-b border-white/10">
                      <th className="text-left py-3 px-4">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProducts(products.map(p => p._id));
                            } else {
                              setSelectedProducts([]);
                            }
                          }}
                          className="accent-primary-500"
                        />
                      </th>
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Stock</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedProducts([...selectedProducts, product._id]);
                              } else {
                                setSelectedProducts(selectedProducts.filter(id => id !== product._id));
                              }
                            }}
                            className="accent-primary-500"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.images?.[0]?.url || 'https://via.placeholder.com/40'}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div>
                              <p className="text-white font-medium">{product.name}</p>
                              <p className="text-white/40 text-sm">{product.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-white/80">
                          {product.category?.name || 'Uncategorized'}
                        </td>
                        <td className="py-3 px-4 text-white font-semibold">
                          ${product.discountPrice || product.price}
                        </td>
                        <td className="py-3 px-4">
                          <span className={product.stock > 10 ? 'text-green-400' : 'text-red-400'}>
                            {product.stock || 0}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            product.isActive !== false
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {product.isActive !== false ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/product/${product.slug}`}
                              className="text-primary-400 hover:text-primary-300"
                            >
                              <FiEye />
                            </Link>
                            <Link
                              to={`/admin/products/edit/${product._id}`}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <FiEdit2 />
                            </Link>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
                <p className="text-white/40 text-sm">
                  Showing {filteredProducts.length} of {total} products
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 glass text-white rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronLeft />
                  </button>
                  <span className="text-white/60 text-sm">
                    Page {currentPage}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={filteredProducts.length < 10}
                    className="p-2 glass text-white rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}
    </motion.div>
  );
};

export default AdminProducts;
