import { useSelector, useDispatch } from 'react-redux';
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} from '../features/cart/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);

  return {
    items,
    totalItems,
    totalPrice,
    addItem: (product, quantity = 1, size, color) => 
      dispatch(addToCart({ product, quantity, size, color })),
    removeItem: (productId, size, color) => 
      dispatch(removeFromCart({ productId, size, color })),
    updateQuantity: (productId, size, color, quantity) => 
      dispatch(updateQuantity({ productId, size, color, quantity })),
    clearCart: () => dispatch(clearCart()),
  };
};