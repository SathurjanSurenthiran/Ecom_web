import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import authReducer, { getCurrentUser, logoutUser, loginUser, registerUser } from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import cartReducer, { clearCartState, fetchCartFromServer, syncCartToServer } from '../features/cart/cartSlice';
import wishlistReducer, { clearWishlistState, fetchWishlistFromServer, syncWishlistToServer } from '../features/wishlist/wishlistSlice';
import orderReducer from '../features/orders/orderSlice';

const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (_key, value) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
});

const createBrowserStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return createNoopStorage();
  }

  try {
    const testKey = '__redux_persist_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
  } catch {
    return createNoopStorage();
  }

  return {
    getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
    setItem: (key, value) => {
      window.localStorage.setItem(key, value);
      return Promise.resolve(value);
    },
    removeItem: (key) => {
      window.localStorage.removeItem(key);
      return Promise.resolve();
    },
  };
};

const storage = createBrowserStorage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'wishlist'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  orders: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const authStateCleanupMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  if (action.type === logoutUser.fulfilled.type || action.type === getCurrentUser.rejected.type) {
    storeAPI.dispatch(clearCartState());
    storeAPI.dispatch(clearWishlistState());
  }

  if (action.type === loginUser.fulfilled.type || action.type === registerUser.fulfilled.type) {
    storeAPI.dispatch(fetchCartFromServer());
    storeAPI.dispatch(fetchWishlistFromServer());
  }

  if (action.type === getCurrentUser.fulfilled.type) {
    storeAPI.dispatch(fetchCartFromServer());
    storeAPI.dispatch(fetchWishlistFromServer());
  }

  return result;
};

const syncStateMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  const state = storeAPI.getState();
  const isAuthenticated = state.auth?.isAuthenticated;

  if (!isAuthenticated) {
    return result;
  }

  if (action.type.startsWith('cart/') && !action.type.includes('syncCartToServer')) {
    storeAPI.dispatch(syncCartToServer({ items: state.cart.items }));
  }

  if (action.type.startsWith('wishlist/') && !action.type.includes('syncWishlistToServer')) {
    storeAPI.dispatch(syncWishlistToServer({ items: state.wishlist.items }));
  }

  return result;
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authStateCleanupMiddleware, syncStateMiddleware),
});

export const persistor = persistStore(store);
