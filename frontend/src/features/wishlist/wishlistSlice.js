import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item._id === product._id);
      
      if (!exists) {
        state.items.push(product);
        toast.success('Added to wishlist ❤️');
      } else {
        toast.info('Already in wishlist');
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
      toast.success('Removed from wishlist');
    },
    
    clearWishlist: (state) => {
      state.items = [];
      toast.success('Wishlist cleared');
    },
    
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item._id === product._id);
      
      if (index === -1) {
        state.items.push(product);
        toast.success('Added to wishlist ❤️');
      } else {
        state.items.splice(index, 1);
        toast.success('Removed from wishlist');
      }
    },
    
    setWishlistLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setWishlistError: (state, action) => {
      state.error = action.payload;
    },
    
    clearWishlistError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
  setWishlistLoading,
  setWishlistError,
  clearWishlistError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;