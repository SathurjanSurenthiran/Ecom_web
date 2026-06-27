import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  total: 0,
};

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/orders', orderData);
      toast.success('Order placed successfully! 🎉');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrders = createAsyncThunk(
  'orders/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/orders/my-orders');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrder = createAsyncThunk(
  'orders/getOne',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancel',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/orders/${id}/cancel`);
      toast.success('Order cancelled');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel order');
      return rejectWithValue(error.response.data);
    }
  }
);

export const trackOrder = createAsyncThunk(
  'orders/track',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/orders/${id}/track`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload.data);
        state.currentOrder = action.payload.data;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create order';
      })
      
      // Get Orders
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.total = action.payload.total || action.payload.data.length;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch orders';
      })
      
      // Get Order
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Order not found';
      })
      
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(o => o._id === action.payload.data._id);
        if (index !== -1) {
          state.orders[index] = action.payload.data;
        }
        if (state.currentOrder?._id === action.payload.data._id) {
          state.currentOrder = action.payload.data;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to cancel order';
      });
  },
});

export const { clearOrderError, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;