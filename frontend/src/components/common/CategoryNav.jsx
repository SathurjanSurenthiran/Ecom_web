import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from '../../api/axios';

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data.data);
      } catch {
        console.error('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex space-x-4 overflow-x-auto py-2 px-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-20 h-8 bg-white/5 rounded-full animate-pulse flex-shrink-0" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 overflow-x-auto py-2 px-4 scrollbar-hide">
      <Link
        to="/shop"
        className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors duration-300 ${
          !location.search && location.pathname === '/shop'
            ? 'bg-primary-600 text-white'
            : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <motion.div
          key={category._id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to={`/shop?category=${category.slug}`}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors duration-300 ${
              location.search.includes(`category=${category.slug}`)
                ? 'bg-primary-600 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {category.name}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryNav;
