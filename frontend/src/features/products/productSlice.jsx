import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

const initialState = {
  products: [],
  featured: [],
  newArrivals: [],
  bestSellers: [],
  trending: [],
  currentProduct: null,
  relatedProducts: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
  filters: {},
};

export const getProducts = createAsyncThunk(
  'products/getAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get('/products', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductBySlug = createAsyncThunk(
  'products/getBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products/slug/${slug}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeaturedProducts = createAsyncThunk(
  'products/getFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/products/featured');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNewArrivals = createAsyncThunk(
  'products/getNewArrivals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/products/new-arrivals');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBestSellers = createAsyncThunk(
  'products/getBestSellers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/products/best-sellers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTrendingProducts = createAsyncThunk(
  'products/getTrending',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/products/trending');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRelatedProducts = createAsyncThunk(
  'products/getRelated',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products/${id}/related`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProductReview = createAsyncThunk(
  'products/createReview',
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/products/${productId}/reviews`, reviewData);
      toast.success('Review submitted successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.relatedProducts = [];
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page || 1;
        state.limit = action.payload.limit || 10;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch products';
      })
      
      // Get Product By Slug
      .addCase(getProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.data;
      })
      .addCase(getProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Product not found';
      })
      
      // Featured Products
      .addCase(getFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload.data;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch featured products';
      })
      
      // New Arrivals
      .addCase(getNewArrivals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewArrivals.fulfilled, (state, action) => {
        state.loading = false;
        state.newArrivals = action.payload.data;
      })
      .addCase(getNewArrivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch new arrivals';
      })
      
      // Best Sellers
      .addCase(getBestSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBestSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSellers = action.payload.data;
      })
      .addCase(getBestSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch best sellers';
      })
      
      // Trending Products
      .addCase(getTrendingProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrendingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload.data;
      })
      .addCase(getTrendingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch trending products';
      })
      
      // Related Products
      .addCase(getRelatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload.data;
      })
      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch related products';
      });
  },
});

export const { 
  clearProductError, 
  clearCurrentProduct, 
  setFilters, 
  clearFilters,
  setPage 
} = productSlice.actions;

export default productSlice.reducer;