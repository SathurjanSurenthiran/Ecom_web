import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiX, FiCheck } from 'react-icons/fi';

import axios from '../api/axios';
import ProductCard from '../components/product/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { getProducts } from '../features/products/productSlice';

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

const colorHexMap = {
  Black: '#000000',
  White: '#ffffff',
  Red: '#ef4444',
  Blue: '#3b82f6',
  Green: '#22c55e',
  Yellow: '#eab308',
  Purple: '#a855f7',
  Grey: '#86868b',
  Olive: '#4b5320',
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
    <div className="bg-[#fcfbfe] text-black min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="container mx-auto">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-zinc-100"
        >
          <div>
            <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mb-2">Curated Catalogue</p>
            <h1 className="text-3xl md:text-4xl font-poppins font-bold text-black uppercase tracking-tight">
              The Shop Narrative
            </h1>
            <p className="text-zinc-500 text-sm mt-1 font-light">{total} pieces available</p>
          </div>
          <div className="flex items-center space-x-4 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 px-4 py-2 border border-zinc-200 bg-white rounded-xl text-black text-sm font-semibold hover:bg-zinc-50"
            >
              <FiFilter />
              <span>Filters</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-zinc-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-zinc-400 hover:text-black'}`}
                >
                  <FiGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-zinc-400 hover:text-black'}`}
                >
                  <FiList size={16} />
                </button>
              </div>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-black text-sm font-medium focus:outline-none focus:border-black cursor-pointer shadow-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white border border-zinc-200/70 p-6 rounded-2xl sticky top-24 shadow-sm space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                <h3 className="text-black font-semibold uppercase tracking-wider text-xs">Filters</h3>
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-zinc-400 hover:text-black font-semibold uppercase tracking-wider"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-4 text-zinc-800">Category</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-sm text-zinc-600 hover:text-black cursor-pointer select-none">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === ''}
                      onChange={() => handleFilterChange('category', '')}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <span className="font-light">All Pieces</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat._id} className="flex items-center space-x-3 text-sm text-zinc-600 hover:text-black cursor-pointer select-none">
                      <input
                        type="radio"
                        name="category"
                        value={cat.slug}
                        checked={filters.category === cat.slug}
                        onChange={() => handleFilterChange('category', cat.slug)}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                      <span className="font-light">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-4 text-zinc-800">Brand</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-sm text-zinc-600 hover:text-black cursor-pointer select-none">
                    <input
                      type="radio"
                      name="brand"
                      checked={filters.brand === ''}
                      onChange={() => handleFilterChange('brand', '')}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <span className="font-light">All Brands</span>
                  </label>
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center space-x-3 text-sm text-zinc-600 hover:text-black cursor-pointer select-none">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={filters.brand === brand}
                        onChange={() => handleFilterChange('brand', brand)}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                      <span className="font-light">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Genders */}
              <div>
                <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-4 text-zinc-800">Gender</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-sm text-zinc-600 hover:text-black cursor-pointer select-none">
                    <input
                      type="radio"
                      name="gender"
                      checked={filters.gender === ''}
                      onChange={() => handleFilterChange('gender', '')}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <span className="font-light">Unisex & All</span>
                  </label>
                  {genders.map((gen) => (
                    <label key={gen} className="flex items-center space-x-3 text-sm text-zinc-600 hover:text-black cursor-pointer select-none">
                      <input
                        type="radio"
                        name="gender"
                        value={gen}
                        checked={filters.gender === gen}
                        onChange={() => handleFilterChange('gender', gen)}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                      <span className="font-light uppercase text-xs tracking-wider">{gen}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Investment Range / Price */}
              <div>
                <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-4 text-zinc-800">Price Range</h4>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    min="0"
                    onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                    className="w-1/2 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-black text-sm focus:outline-none focus:border-black"
                  />
                  <span className="text-zinc-300">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    min="0"
                    onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                    className="w-1/2 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-black text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-4 text-zinc-800">Rating</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-sm text-zinc-600 hover:text-black cursor-pointer select-none">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === ''}
                      onChange={() => handleFilterChange('rating', '')}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <span className="font-light">Any Rating</span>
                  </label>
                  {ratings.map((rate) => (
                    <label key={rate} className="flex items-center space-x-3 text-sm text-zinc-600 hover:text-black cursor-pointer select-none">
                      <input
                        type="radio"
                        name="rating"
                        value={rate}
                        checked={Number(filters.rating) === rate}
                        onChange={() => handleFilterChange('rating', rate)}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                      <span className="font-light">{rate}+ Stars</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Selection (Square buttons matching screenshot) */}
              <div>
                <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-4 text-zinc-800">Size Selection</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => {
                    const isSelected = filters.size === size;
                    return (
                      <button
                        key={size}
                        onClick={() => handleFilterChange('size', isSelected ? '' : size)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-zinc-200 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Swatches */}
              <div>
                <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-4 text-zinc-800">Color Palette</h4>
                <div className="flex flex-wrap gap-2.5">
                  {colors.map((color) => {
                    const isSelected = filters.color === color;
                    const hexColor = colorHexMap[color] || '#e2e2e2';
                    return (
                      <button
                        key={color}
                        onClick={() => handleFilterChange('color', isSelected ? '' : color)}
                        className={`w-7 h-7 rounded-full border relative flex items-center justify-center transition-all ${
                          isSelected ? 'ring-2 ring-black ring-offset-2 scale-105' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: hexColor, borderColor: color === 'White' ? '#e2e2e2' : hexColor }}
                        title={color}
                      >
                        {isSelected && (
                          <FiCheck
                            className={`w-3.5 h-3.5 ${color === 'White' || color === 'Yellow' ? 'text-black' : 'text-white'}`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-4 text-zinc-800">Availability</h4>
                <div className="space-y-3">
                  {['', 'in-stock', 'out-of-stock'].map((avail) => (
                    <label key={avail} className="flex items-center space-x-3 text-sm text-zinc-600 hover:text-black cursor-pointer select-none">
                      <input
                        type="radio"
                        name="availability"
                        value={avail}
                        checked={filters.availability === avail}
                        onChange={() => handleFilterChange('availability', avail)}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                      <span className="font-light">
                        {avail === '' ? 'All Stock' : avail === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <LoadingSkeleton type="product" count={6} />
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white border border-zinc-200/50 rounded-2xl shadow-sm p-8">
                <p className="text-zinc-500 text-lg font-light">No products could be found matching these selections.</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-6 px-6 py-2.5 bg-black text-white font-semibold rounded-xl hover:bg-zinc-800 transition-colors uppercase text-xs tracking-wider"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid ${
                  viewMode === 'grid'
                    ? 'grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
                    : 'grid-cols-1 gap-6'
                }`}
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer (Mobile Filters Overlay) */}
      {showFilters && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setShowFilters(false)}
          />
          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative w-80 max-w-full bg-white h-full z-10 p-6 overflow-y-auto flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-100 mb-6">
                <h3 className="text-black font-semibold uppercase tracking-wider text-sm">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-black hover:opacity-75">
                  <FiX size={20} />
                </button>
              </div>

              {/* Dynamic sidebar filters list in mobile view */}
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-3">Category</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 text-sm text-zinc-600">
                      <input
                        type="radio"
                        name="category-m"
                        checked={filters.category === ''}
                        onChange={() => handleFilterChange('category', '')}
                        className="w-4 h-4 accent-black"
                      />
                      <span>All Pieces</span>
                    </label>
                    {categories.map((cat) => (
                      <label key={cat._id} className="flex items-center space-x-3 text-sm text-zinc-600">
                        <input
                          type="radio"
                          name="category-m"
                          value={cat.slug}
                          checked={filters.category === cat.slug}
                          onChange={() => handleFilterChange('category', cat.slug)}
                          className="w-4 h-4 accent-black"
                        />
                        <span>{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-3">Brand</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center space-x-3 text-sm text-zinc-600">
                        <input
                          type="radio"
                          name="brand-m"
                          value={brand}
                          checked={filters.brand === brand}
                          onChange={() => handleFilterChange('brand', brand)}
                          className="w-4 h-4 accent-black"
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-3">Size</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => {
                      const isSelected = filters.size === size;
                      return (
                        <button
                          key={size}
                          onClick={() => handleFilterChange('size', isSelected ? '' : size)}
                          className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                            isSelected ? 'bg-black text-white border-black' : 'bg-white text-black border-zinc-200'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color swatches */}
                <div>
                  <h4 className="text-black font-bold uppercase tracking-wider text-[10px] mb-3">Color Palette</h4>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => {
                      const isSelected = filters.color === color;
                      const hexColor = colorHexMap[color] || '#e2e2e2';
                      return (
                        <button
                          key={color}
                          onClick={() => handleFilterChange('color', isSelected ? '' : color)}
                          className={`w-7 h-7 rounded-full border relative flex items-center justify-center ${
                            isSelected ? 'ring-2 ring-black ring-offset-2' : ''
                          }`}
                          style={{ backgroundColor: hexColor, borderColor: color === 'White' ? '#e2e2e2' : hexColor }}
                        >
                          {isSelected && <FiCheck className="w-3 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-100 flex gap-4">
              <button
                onClick={handleClearFilters}
                className="w-1/2 py-3 border border-zinc-200 text-black font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-zinc-50"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="w-1/2 py-3 bg-black text-white font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-zinc-800"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Shop;
