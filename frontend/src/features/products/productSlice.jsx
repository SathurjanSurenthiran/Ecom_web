import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

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
};

export const getProducts = createAsyncThunk(
  'products/getAll',
  async (params, { rejectWithValue }) => {
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

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
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
        state.error = action.payload.message;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.featured = action.payload.data;
      })
      .addCase(getNewArrivals.fulfilled, (state, action) => {
        state.newArrivals = action.payload.data;
      })
      .addCase(getBestSellers.fulfilled, (state, action) => {
        state.bestSellers = action.payload.data;
      })
      .addCase(getTrendingProducts.fulfilled, (state, action) => {
        state.trending = action.payload.data;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.relatedProducts = action.payload.data;
      });
  },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;