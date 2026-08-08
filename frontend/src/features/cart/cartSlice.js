import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  discount: 0,
  couponCode: null,
};

export const syncCartToServer = createAsyncThunk(
  'cart/syncCartToServer',
  async (cartState, { rejectWithValue }) => {
    try {
      const response = await axios.post('/cart', {
        items: cartState.items,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to sync cart');
    }
  }
);

export const fetchCartFromServer = createAsyncThunk(
  'cart/fetchCartFromServer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/cart');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, size, color } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product._id === product._id &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        toast.success(`Updated ${product.name} quantity`);
      } else {
        state.items.push({
          product,
          quantity,
          size,
          color,
        });
        toast.success(`Added ${product.name} to cart`);
      }

      // Update totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce(
        (sum, item) => {
          const price = item.product.discountPrice || item.product.price;
          return sum + price * item.quantity;
        },
        0
      );
    },
    
    removeFromCart: (state, action) => {
      const { productId, size, color } = action.payload;
      const item = state.items.find(
        (item) =>
          item.product._id === productId && 
          item.size === size && 
          item.color === color
      );
      
      if (item) {
        toast.success(`Removed ${item.product.name} from cart`);
        state.items = state.items.filter(
          (item) =>
            !(item.product._id === productId && item.size === size && item.color === color)
        );
      }
      
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce(
        (sum, item) => {
          const price = item.product.discountPrice || item.product.price;
          return sum + price * item.quantity;
        },
        0
      );
    },
    
    updateQuantity: (state, action) => {
      const { productId, size, color, quantity } = action.payload;
      const item = state.items.find(
        (item) =>
          item.product._id === productId && 
          item.size === size && 
          item.color === color
      );
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) =>
              !(item.product._id === productId && item.size === size && item.color === color)
          );
          toast.success('Item removed from cart');
        } else {
          item.quantity = quantity;
        }
        
        state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.totalPrice = state.items.reduce(
          (sum, item) => {
            const price = item.product.discountPrice || item.product.price;
            return sum + price * item.quantity;
          },
          0
        );
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.discount = 0;
      state.couponCode = null;
      toast.success('Cart cleared');
    },
    
    applyCoupon: (state, action) => {
      const { code, discount } = action.payload;
      state.couponCode = code;
      state.discount = discount;
      toast.success(`Coupon ${code} applied!`);
    },
    
    removeCoupon: (state) => {
      state.couponCode = null;
      state.discount = 0;
      toast.success('Coupon removed');
    },
    
    setCartState: (state, action) => {
      const { items = [], totalItems = 0, totalPrice = 0, discount = 0, couponCode = null } = action.payload || {};
      state.items = items;
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      state.discount = discount;
      state.couponCode = couponCode;
    },
    
    clearCartState: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.discount = 0;
      state.couponCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromServer.fulfilled, (state, action) => {
        const cart = action.payload || { items: [], totalItems: 0, totalPrice: 0 };
        state.items = cart.items || [];
        state.totalItems = cart.totalItems || 0;
        state.totalPrice = cart.totalPrice || 0;
        state.discount = 0;
        state.couponCode = null;
      })
      .addCase(syncCartToServer.fulfilled, (state, action) => {
        const cart = action.payload || { items: [], totalItems: 0, totalPrice: 0 };
        state.items = cart.items || [];
        state.totalItems = cart.totalItems || 0;
        state.totalPrice = cart.totalPrice || 0;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  setCartState,
  clearCartState,
} = cartSlice.actions;

export default cartSlice.reducer;