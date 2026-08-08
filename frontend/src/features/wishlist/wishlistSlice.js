import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const syncWishlistToServer = createAsyncThunk(
  'wishlist/syncWishlistToServer',
  async (wishlistState, { rejectWithValue }) => {
    try {
      const response = await axios.post('/wishlist', {
        items: wishlistState.items.map((item) => item._id || item),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to sync wishlist');
    }
  }
);

export const fetchWishlistFromServer = createAsyncThunk(
  'wishlist/fetchWishlistFromServer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/wishlist');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load wishlist');
    }
  }
);

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

    setWishlistState: (state, action) => {
      state.items = action.payload || [];
    },

    clearWishlistState: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistFromServer.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(syncWishlistToServer.fulfilled, (state, action) => {
        state.items = action.payload || [];
      });
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
  setWishlistState,
  clearWishlistState,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
