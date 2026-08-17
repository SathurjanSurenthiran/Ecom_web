import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { addToCart } from '../../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const [isHovered, setIsHovered] = useState(false);

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to save favourites');
      navigate('/login');
      return;
    }

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
    if (!isAuthenticated) {
      toast.error('Please login first to add items to cart');
      navigate('/login');
      return;
    }
    const size = product.sizes?.[0]?.size || 'M';
    const color = product.colors?.[0]?.name || 'Default';
    dispatch(addToCart({ product, quantity: 1, size, color }));
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login first to buy items');
      navigate('/login');
      return;
    }
    const size = product.sizes?.[0]?.size || 'M';
    const color = product.colors?.[0]?.name || 'Default';
    const buyNowItem = {
      product,
      quantity: 1,
      size,
      color,
    };
    navigate('/checkout', { state: { buyNowItem } });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${
          i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-300'
        } w-3 h-3`}
        strokeWidth={1.8}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative bg-white border border-zinc-200/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug || product._id}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-zinc-50">
          <img
            src={product.images?.[0]?.url || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Quick Actions */}
          <div
            className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
            }`}
          >
            <button
              onClick={handleWishlist}
              className={`w-9 h-9 rounded-full border flex items-center justify-center backdrop-blur-md shadow-sm transition-all duration-300 ${
                isInWishlist
                  ? 'bg-black text-white border-black'
                  : 'bg-white/95 text-zinc-700 border-zinc-200 hover:bg-black hover:text-white hover:border-black'
              }`}
              aria-label={isInWishlist ? 'Remove from favourites' : 'Add to favourites'}
            >
              <Heart
                className={`h-4.5 w-4.5 ${isInWishlist ? 'fill-current' : ''}`}
                strokeWidth={2}
              />
            </button>
          </div>

          {/* Discount Badge */}
          {product.discountPrice && (
            <div className="absolute top-3 left-3 bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
              )}
              % OFF
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-zinc-400 text-[10px] tracking-widest uppercase font-semibold mb-1">{product.brand}</p>
          <h3 className="text-black font-medium text-sm truncate group-hover:text-zinc-600 transition-colors">{product.name}</h3>

          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-black font-bold text-sm">
                ${product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <span className="text-zinc-400 line-through text-xs">
                  ${product.price}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-0.5">
              {renderStars(product.rating)}
              <span className="text-zinc-400 text-[10px] ml-1 font-medium">
                ({product.numReviews})
              </span>
            </div>
          </div>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="py-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-1 text-[10px] font-bold tracking-wide uppercase"
            >
              <ShoppingBag className="h-3 w-3" strokeWidth={2} />
              <span>Add to Cart</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyNow}
              className="py-2 bg-black hover:bg-zinc-800 text-white rounded-lg transition-colors duration-300 flex items-center justify-center text-[10px] font-bold tracking-wide uppercase"
            >
              <span>Buy Now</span>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
