import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';

import axios from '../api/axios';
import ProductCard from '../components/product/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { getProducts } from '../features/products/productSlice';

const FilterSection = ({ title, options, valueKey, filters, onFilterChange, renderOption }) => (
  <div className="mb-6">
    <h4 className="text-white font-semibold mb-3">{title}</h4>
    <div className="space-y-2">
      {[{ label: 'All', value: '' }, ...options].map((option) => {
        const value = typeof option === 'object' ? option.value : option;
        const label = typeof option === 'object' ? option.label : option;

        return (
          <label key={value || 'all'} className="flex items-center space-x-2 text-white/70 hover:text-white cursor-pointer">
            <input
              type="radio"
              name={valueKey}
              value={value}
              checked={filters[valueKey] === value}
              onChange={() => onFilterChange(valueKey, value)}
              className="w-4 h-4 accent-primary-500"
            />
            <span>{value === '' ? label : renderOption ? renderOption(label) : label}</span>
          </label>
        );
      })}
    </div>
  </div>
);

const defaultFilters = {
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
};

const cleanFilters = (filters) =>
  Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== '' && value !== null && value !== undefined)
  );

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, total } = useSelector((state) => state.products);
  const [filters, setFilters] = useState(defaultFilters);
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

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

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.slug,
  }));

  const search = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';
  const deals = searchParams.get('deals') || '';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data.data || []);
      } catch {
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setFilters((prev) => (
      prev.category === categoryParam ? prev : { ...prev, category: categoryParam }
    ));
  }, [categoryParam]);

  useEffect(() => {
    dispatch(getProducts(cleanFilters({ ...filters, search, deals })));
  }, [dispatch, filters, search, deals]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    if (key === 'category') {
      const nextParams = new URLSearchParams(searchParams);
      if (value) {
        nextParams.set('category', value);
      } else {
        nextParams.delete('category');
      }
      setSearchParams(nextParams);
    }
  };

  const handlePriceChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setSearchParams(search ? { search } : {});
  };

  return (
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
              options={categoryOptions}
              valueKey="category"
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <FilterSection
              title="Brand"
              options={brands}
              valueKey="brand"
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <FilterSection
              title="Gender"
              options={genders}
              valueKey="gender"
              filters={filters}
              onFilterChange={handleFilterChange}
              renderOption={(opt) => opt.charAt(0).toUpperCase() + opt.slice(1)}
            />

            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Price Range</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  min="0"
                  onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                  className="w-1/2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <span className="text-white/40">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  min="0"
                  onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                  className="w-1/2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <FilterSection
              title="Rating"
              options={ratings}
              valueKey="rating"
              filters={filters}
              onFilterChange={handleFilterChange}
              renderOption={(opt) => `${opt}+ Stars`}
            />

            <FilterSection
              title="Size"
              options={sizes}
              valueKey="size"
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <FilterSection
              title="Color"
              options={colors}
              valueKey="color"
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Availability</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-white/70 hover:text-white cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value=""
                    checked={filters.availability === ''}
                    onChange={() => handleFilterChange('availability', '')}
                    className="w-4 h-4 accent-primary-500"
                  />
                  <span>All</span>
                </label>
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
  );
};

export default Shop;
