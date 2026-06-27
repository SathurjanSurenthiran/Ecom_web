import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  const isInWishlist = (productId) => {
    return items.some((item) => item._id === productId);
  };

  return {
    items,
    isInWishlist,
    addItem: (product) => dispatch(addToWishlist(product)),
    removeItem: (productId) => dispatch(removeFromWishlist(productId)),
    toggleItem: (product) => {
      if (isInWishlist(product._id)) {
        dispatch(removeFromWishlist(product._id));
      } else {
        dispatch(addToWishlist(product));
      }
    },
  };
};