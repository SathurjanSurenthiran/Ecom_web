import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
  stats: null,
  products: [],
  orders: [],
  users: [],
  categories: [],
  coupons: [],
  loading: false,
  error: null,
};

// Dashboard Stats
export const getDashboardStats = createAsyncThunk(
  'admin/getStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/admin/stats');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Admin Products
export const getAdminProducts = createAsyncThunk(
  'admin/getProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('/admin/products', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach(key => {
        if (key === 'images') {
          productData.images.forEach(image => {
            formData.append('images', image);
          });
        } else if (key === 'colors' || key === 'sizes') {
          formData.append(key, JSON.stringify(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      });
      
      const response = await axios.post('/admin/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach(key => {
        if (key === 'images') {
          productData.images.forEach(image => {
            formData.append('images', image);
          });
        } else if (key === 'colors' || key === 'sizes') {
          formData.append(key, JSON.stringify(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      });
      
      const response = await axios.put(`/admin/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/admin/products/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Admin Orders
export const getAdminOrders = createAsyncThunk(
  'admin/getOrders',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('/admin/orders', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/admin/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Admin Users
export const getAdminUsers = createAsyncThunk(
  'admin/getUsers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('/admin/users', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/admin/users/${id}/role`, { role });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/admin/users/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Admin Categories
export const getAdminCategories = createAsyncThunk(
  'admin/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/admin/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  'admin/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(categoryData).forEach(key => {
        if (key === 'image') {
          formData.append('image', categoryData.image);
        } else {
          formData.append(key, categoryData[key]);
        }
      });
      
      const response = await axios.post('/admin/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'admin/updateCategory',
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(categoryData).forEach(key => {
        if (key === 'image') {
          formData.append('image', categoryData.image);
        } else {
          formData.append(key, categoryData[key]);
        }
      });
      
      const response = await axios.put(`/admin/categories/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'admin/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/admin/categories/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Admin Coupons
export const getAdminCoupons = createAsyncThunk(
  'admin/getCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/admin/coupons');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCoupon = createAsyncThunk(
  'admin/createCoupon',
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/admin/coupons', couponData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCoupon = createAsyncThunk(
  'admin/updateCoupon',
  async ({ id, couponData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/admin/coupons/${id}`, couponData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  'admin/deleteCoupon',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/admin/coupons/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Admin Analytics
export const getAnalytics = createAsyncThunk(
  'admin/getAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('/admin/analytics', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
    clearAdminData: (state) => {
      state.stats = null;
      state.products = [];
      state.orders = [];
      state.users = [];
      state.categories = [];
      state.coupons = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard Stats
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch stats';
      })
      
      // Products
      .addCase(getAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch products';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload.data);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload.data._id);
        if (index !== -1) {
          state.products[index] = action.payload.data;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload.id);
      })
      
      // Orders
      .addCase(getAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(getAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch orders';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o._id === action.payload.data._id);
        if (index !== -1) {
          state.orders[index] = action.payload.data;
        }
      })
      
      // Users
      .addCase(getAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(getAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch users';
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u._id === action.payload.data._id);
        if (index !== -1) {
          state.users[index] = action.payload.data;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u._id !== action.payload.id);
      })
      
      // Categories
      .addCase(getAdminCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(getAdminCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch categories';
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload.data);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(c => c._id === action.payload.data._id);
        if (index !== -1) {
          state.categories[index] = action.payload.data;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(c => c._id !== action.payload.id);
      })
      
      // Coupons
      .addCase(getAdminCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload.data;
      })
      .addCase(getAdminCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch coupons';
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.coupons.push(action.payload.data);
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        const index = state.coupons.findIndex(c => c._id === action.payload.data._id);
        if (index !== -1) {
          state.coupons[index] = action.payload.data;
        }
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(c => c._id !== action.payload.id);
      })
      
      // Analytics
      .addCase(getAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(getAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch analytics';
      });
  },
});

export const { clearAdminError, clearAdminData } = adminSlice.actions;
export default adminSlice.reducer;