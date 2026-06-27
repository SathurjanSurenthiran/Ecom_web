import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiTruck, FiShield } from 'react-icons/fi';
import { clearCart } from '../../features/cart/cartSlice';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const CartSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const shippingPrice = totalPrice > 100 ? 0 : 10;
  const finalTotal = totalPrice + shippingPrice;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
      toast.success('Cart cleared');
    }
  };

  if (items.length === 0) {
    return (
      <div className="glass p-8 rounded-xl text-center">
        <FiShoppingBag className="w-16 h-16 mx-auto text-white/20 mb-4" />
        <h3 className="text-white font-semibold text-lg">Your cart is empty</h3>
        <p className="text-white/60 text-sm mt-2">
          Start shopping to add items to your cart
        </p>
        <Button onClick={() => navigate('/shop')} className="mt-4">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-xl sticky top-24"
    >
      <h3 className="text-xl font-poppins font-bold text-white mb-4">
        Order Summary
      </h3>

      <div className="space-y-2 text-white/80">
        <div className="flex justify-between py-2">
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/10">
          <span>Shipping</span>
          <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-white font-bold text-lg pt-2">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {shippingPrice === 0 && (
        <div className="mt-3 text-green-400 text-sm flex items-center space-x-1">
          <FiTruck className="w-4 h-4" />
          <span>Free shipping applied!</span>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <Button
          onClick={handleCheckout}
          className="w-full text-lg"
        >
          Proceed to Checkout
        </Button>

        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => navigate('/shop')}
            className="flex-1"
          >
            Continue Shopping
          </Button>
          <Button
            variant="danger"
            onClick={handleClearCart}
            className="flex-1"
          >
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center space-x-6 text-white/40 text-xs">
        <div className="flex items-center space-x-1">
          <FiShield className="w-4 h-4" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center space-x-1">
          <FiTruck className="w-4 h-4" />
          <span>Fast Delivery</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CartSummary;