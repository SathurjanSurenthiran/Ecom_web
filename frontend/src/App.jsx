import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './features/auth/authSlice';
import { clearCartState } from './features/cart/cartSlice';
import { clearWishlistState } from './features/wishlist/wishlistSlice';

// Layouts
import { MainLayout, AuthLayout, AdminLayout } from './layouts';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductAdd from './pages/admin/AdminProductAdd';
import AdminProductEdit from './pages/admin/AdminProductEdit';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCategories from './pages/admin/AdminCategories';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import NotFound from './pages/NotFound';

// Support Pages
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import SizeGuide from './pages/SizeGuide';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Careers from './pages/Careers';

// Routes
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(clearCartState());
      dispatch(clearWishlistState());
      return;
    }

    dispatch(getCurrentUser())
      .unwrap()
      .catch(() => {
        dispatch(clearCartState());
        dispatch(clearWishlistState());
      });
  }, [dispatch]);

  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(18px)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: '14px',
            boxShadow: '0 18px 45px rgba(0,0,0,0.28)',
            padding: '14px 16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/shipping-info" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/careers" element={<Careers />} />
        </Route>

        {/* Auth Routes with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Protected Routes with MainLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Admin Routes with AdminLayout */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/add" element={<AdminProductAdd />} />
            <Route path="/admin/products/new" element={<Navigate to="/admin/products/add" replace />} />
            <Route path="/admin/products/edit/:id" element={<AdminProductEdit />} />
            <Route path="/admin/products/:id/edit" element={<AdminProductEdit />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/coupons" element={<AdminCoupons />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
