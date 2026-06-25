import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiChevronDown } from 'react-icons/fi';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ProductCard from '../../components/product/ProductCard';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import { getProducts, filterProducts } from '../../features/products/productSlice';

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { products, loading, total } = useSelector((state) => state.products);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    gender: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    size: '',
    color: '',
    availability: '',
    sort: '-createdAt',
  });
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Men', 'Women', 'Kids', 'Accessories', 'Sportswear'];
  const brands = ['Nike', 'Adidas', 'Zara', 'H&M', 'Puma', 'Levi\'s'];
  const genders = ['men', 'women', 'kids', 'unisex'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple'];
  const ratings = [1, 2, 3, 4, 5];
  const sortOptions = [
    { value: '-createdAt', label: 'Newest' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: '-rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name: A-Z' },
  ];

  useEffect(() => {
    const search = searchParams.get('search') || '';
    dispatch(getProducts({ ...filters, search }));
  }, [dispatch, filters, searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      gender: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      size: '',
      color: '',
      availability: '',
      sort: '-createdAt',
    });
  };

  const FilterSection = ({ title, options, valueKey, renderOption }) => (
    <div className="mb-6">
      <h4 className="text-white font-semibold mb-3">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 text-white/70 hover:text-white cursor-pointer">
            <input
              type="radio"
              name={valueKey}
              value={option}
              checked={filters[valueKey] === option}
              onChange={() => handleFilterChange(valueKey, option)}
              className="w-4 h-4 accent-primary-500"
            />
            <span>{renderOption ? renderOption(option) : option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-poppins font-bold text-white">
              Shop Collection
            </h1>
            <p className="text-white/60">{total} products found</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 px-4 py-2 glass rounded-lg text-white"
            >
              <FiFilter />
              <span>Filters</span>
            </button>
            <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-white/60'}`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-white/60'}`}
              >
                <FiList />
              </button>
            </div>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}
          >
            <div className="glass p-6 rounded-xl sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-semibold">Filters</h3>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-primary-400 hover:text-primary-300"
                >
                  Clear All
                </button>
              </div>

              <FilterSection
                title="Category"
                options={categories}
                valueKey="category"
              />

              <FilterSection
                title="Brand"
                options={brands}
                valueKey="brand"
              />

              <FilterSection
                title="Gender"
                options={genders}
                valueKey="gender"
                renderOption={(opt) => opt.charAt(0).toUpperCase() + opt.slice(1)}
              />

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Price Range</h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-1/2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-white/40">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-1/2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <FilterSection
                title="Rating"
                options={ratings}
                valueKey="rating"
                renderOption={(opt) => `${opt}+ Stars`}
              />

              <FilterSection
                title="Size"
                options={sizes}
                valueKey="size"
              />

              <FilterSection
                title="Color"
                options={colors}
                valueKey="color"
              />

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Availability</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-white/70 hover:text-white cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      value="in-stock"
                      checked={filters.availability === 'in-stock'}
                      onChange={() => handleFilterChange('availability', 'in-stock')}
                      className="w-4 h-4 accent-primary-500"
                    />
                    <span>In Stock</span>
                  </label>
                  <label className="flex items-center space-x-2 text-white/70 hover:text-white cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      value="out-of-stock"
                      checked={filters.availability === 'out-of-stock'}
                      onChange={() => handleFilterChange('availability', 'out-of-stock')}
                      className="w-4 h-4 accent-primary-500"
                    />
                    <span>Out of Stock</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <LoadingSkeleton type="product" count={8} />
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">No products found</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid ${
                  viewMode === 'grid'
                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6'
                    : 'grid-cols-1 gap-4'
                }`}
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;