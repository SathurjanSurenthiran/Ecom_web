import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import ProductCard from '../components/product/ProductCard';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Removed from favourites');
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#fcfbfe] text-black min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-xl text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-300">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-poppins font-bold text-black uppercase tracking-tight">
              Wishlist is Empty
            </h2>
            <p className="text-zinc-500 font-light max-w-sm mx-auto">
              You haven't saved any of our luxury curation yet. Start exploring to add items you love.
            </p>
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 px-8 py-3.5 bg-black text-white rounded-full font-semibold text-xs tracking-wider uppercase hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Start Shopping</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfbfe] text-black min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 pb-6 border-b border-zinc-100"
        >
          <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mb-2">Saved Collection</p>
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-black uppercase tracking-tight">
            My Wishlist
          </h1>
          <p className="text-zinc-500 text-sm mt-1 font-light">{items.length} items curated</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((product) => (
            <div key={product._id} className="relative group">
              <ProductCard product={product} />
              <button
                onClick={() => handleRemove(product._id)}
                className="absolute top-3 left-3 w-8 h-8 bg-white border border-zinc-200 text-zinc-500 hover:bg-black hover:border-black hover:text-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                title="Remove from favourites"
              >
                <Trash2 className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
