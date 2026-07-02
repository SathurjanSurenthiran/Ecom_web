import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { addToCart } from '../../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const [isHovered, setIsHovered] = useState(false);

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.error('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to favourites', {
        icon: <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />,
      });
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const size = product.sizes?.[0]?.size || 'M';
    const color = product.colors?.[0]?.name || 'Default';
    dispatch(addToCart({ product, quantity: 1, size, color }));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${
          i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'
        } w-4 h-4`}
        strokeWidth={1.8}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 rounded-xl overflow-hidden card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug || product._id}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images?.[0]?.url || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Quick Actions */}
          <div
            className={`absolute top-2 right-2 flex flex-col space-y-2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
          >
            <button
              onClick={handleWishlist}
              className={`w-9 h-9 rounded-full border flex items-center justify-center backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition-all duration-300 ${
                isInWishlist
                  ? 'bg-white text-rose-500 border-white/70'
                  : 'bg-dark/55 text-white/85 border-white/15 hover:bg-white hover:text-slate-950'
              }`}
              aria-label={isInWishlist ? 'Remove from favourites' : 'Add to favourites'}
            >
              <Heart
                className={`h-[18px] w-[18px] ${isInWishlist ? 'fill-current' : ''}`}
                strokeWidth={1.9}
              />
            </button>
          </div>

          {/* Discount Badge */}
          {product.discountPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
              )}
              % OFF
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-white font-medium truncate">{product.name}</h3>
          <p className="text-white/60 text-sm">{product.brand}</p>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold">
                ${product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <span className="text-white/40 line-through text-sm">
                  ${product.price}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
              <span className="text-white/60 text-xs ml-1">
                ({product.numReviews})
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="w-full mt-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.9} />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
