import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';
import toast from 'react-hot-toast';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart({
      productId: item.product._id,
      size: item.size,
      color: item.color,
    }));
    toast.success('Removed from cart');
  };

  const handleUpdateQuantity = (quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({
      productId: item.product._id,
      size: item.size,
      color: item.color,
      quantity,
    }));
  };

  const price = item.product.discountPrice || item.product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 glass rounded-xl"
    >
      <Link
        to={`/product/${item.product.slug || item.product._id}`}
        className="flex-shrink-0"
      >
        <img
          src={item.product.images?.[0]?.url || 'https://via.placeholder.com/100'}
          alt={item.product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          to={`/product/${item.product.slug || item.product._id}`}
          className="text-white font-semibold hover:text-primary-400 transition-colors truncate block"
        >
          {item.product.name}
        </Link>
        <div className="flex flex-wrap gap-2 text-sm text-white/60">
          <span>Size: {item.size}</span>
          <span>•</span>
          <span>Color: {item.color}</span>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-white font-bold">${price.toFixed(2)}</span>
          {item.product.discountPrice && (
            <span className="text-white/40 line-through text-sm">
              ${item.product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
            className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <FiMinus className="w-4 h-4" />
          </button>
          <span className="text-white w-8 text-center font-medium">
            {item.quantity}
          </span>
          <button
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
            className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={handleRemove}
          className="text-red-400 hover:text-red-300 transition-colors p-2"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
