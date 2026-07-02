import { createSlice } from '@reduxjs/toolkit';

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
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
    },
    
    clearWishlist: (state) => {
      state.items = [];
    },
    
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item._id === product._id);
      
      if (index === -1) {
        state.items.push(product);
      } else {
        state.items.splice(index, 1);
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
