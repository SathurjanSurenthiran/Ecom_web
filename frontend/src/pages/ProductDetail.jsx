import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, RefreshCw, Shield, ShoppingBag, Star, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

import ProductCard from '../components/product/ProductCard';
import ProductGallery from '../components/product/ProductGallery';
import ProductReviews from '../components/product/ProductReviews';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { addToCart } from '../features/cart/cartSlice';
import {
  createProductReview,
  getProductBySlug,
  getRelatedProducts,
} from '../features/products/productSlice';
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct, relatedProducts, loading, error } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [selectedOptions, setSelectedOptions] = useState({
    productId: null,
    size: '',
    color: '',
  });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    dispatch(getProductBySlug(slug));
    window.scrollTo(0, 0);
  }, [dispatch, slug]);

  useEffect(() => {
    if (currentProduct) {
      dispatch(getRelatedProducts(currentProduct._id));
    }
  }, [currentProduct, dispatch]);

  if (loading) {
    return (
      <div className="bg-[#fcfbfe] min-h-screen px-4 pt-28 pb-16">
        <LoadingSkeleton type="product" count={1} />
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="bg-[#fcfbfe] min-h-screen px-4 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white border border-zinc-200 p-8 rounded-2xl shadow-sm"
        >
          <div className="text-zinc-300 text-6xl mb-4">?</div>
          <h2 className="text-2xl font-bold text-black mb-2">Product Not Found</h2>
          <p className="text-zinc-500 mb-6">
            {error || 'The product you are looking for does not exist or has been removed.'}
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-black hover:bg-zinc-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Back to Shop
          </Link>
        </motion.div>
      </div>
    );
  }

  const isInWishlist = wishlistItems.some((item) => item._id === currentProduct._id);
  const hasCurrentSelection = selectedOptions.productId === currentProduct._id;
  const selectedSize = hasCurrentSelection
    ? selectedOptions.size
    : currentProduct.sizes?.[0]?.size || '';
  const selectedColor = hasCurrentSelection
    ? selectedOptions.color
    : currentProduct.colors?.[0]?.name || '';

  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast.error('Please login to save favourites');
      navigate('/login');
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(currentProduct._id));
      toast.error('Removed from wishlist');
    } else {
      dispatch(addToWishlist(currentProduct));
      toast.success('Added to favourites', {
        icon: <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />,
      });
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login first to add items to cart');
      navigate('/login');
      return;
    }
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    dispatch(addToCart({
      product: currentProduct,
      quantity,
      size: selectedSize,
      color: selectedColor,
    }));
  };

  const handleAddReview = (reviewData) => {
    dispatch(createProductReview({ productId: currentProduct._id, reviewData }));
  };

  const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-300'}`}
        strokeWidth={1.8}
      />
    ));
  };

  return (
    <div className="bg-[#fcfbfe] text-black min-h-screen px-4 md:px-8 pt-28 pb-16">
      <div className="container mx-auto max-w-6xl">
        <nav className="text-zinc-500 text-sm mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <Link to="/shop" className="hover:text-black">Shop</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="text-black">{currentProduct.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ProductGallery images={currentProduct.images} productName={currentProduct.name} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mb-2">
                {currentProduct.brand}
              </p>
              <h1 className="text-3xl md:text-5xl font-poppins font-extrabold text-black mb-3 uppercase tracking-tight leading-tight">
                {currentProduct.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-1 text-sm">
                {renderStars(currentProduct.rating)}
                <span className="text-zinc-500 ml-2">({currentProduct.numReviews} reviews)</span>
              </div>
              <span className="text-zinc-300">|</span>
              <span className="text-emerald-600 text-sm font-medium">In Stock</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-black">
                ${currentProduct.discountPrice || currentProduct.price}
              </span>
              {currentProduct.discountPrice && (
                <span className="text-xl text-zinc-400 line-through">${currentProduct.price}</span>
              )}
              {currentProduct.discountPrice && (
                <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {Math.round(((currentProduct.price - currentProduct.discountPrice) / currentProduct.price) * 100)}% OFF
                </span>
              )}
            </div>

            {currentProduct.sizes?.length > 0 && (
              <div>
                <h4 className="text-black font-semibold mb-3">Select Size</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedOptions((prev) => ({
                        productId: currentProduct._id,
                        size: size.size,
                        color: prev.productId === currentProduct._id ? prev.color : selectedColor,
                      }))}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                        selectedSize === size.size
                          ? 'border-black bg-black text-white'
                          : 'border-zinc-200 bg-white text-zinc-600 hover:border-black hover:text-black'
                      }`}
                    >
                      {size.size}
                      {size.stock === 0 && (
                        <span className="text-xs text-red-500 ml-1">(Out)</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentProduct.colors?.length > 0 && (
              <div>
                <h4 className="text-black font-semibold mb-3">Select Color</h4>
                <div className="flex flex-wrap gap-3">
                  {currentProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedOptions((prev) => ({
                        productId: currentProduct._id,
                        size: prev.productId === currentProduct._id ? prev.size : selectedSize,
                        color: color.name,
                      }))}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        selectedColor === color.name
                          ? 'border-black scale-110 shadow-sm'
                          : 'border-zinc-200 hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.hex || '#000' }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-black font-semibold mb-3">Quantity</h4>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center text-black hover:bg-zinc-100 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-black text-xl w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center text-black hover:bg-zinc-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-[1.02] text-sm font-semibold uppercase tracking-wide"
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={1.9} />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleWishlist}
                className={`py-3 px-6 rounded-lg border transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_12px_28px_rgba(0,0,0,0.06)] ${
                  isInWishlist
                    ? 'border-black bg-black text-white'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 hover:text-black'
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} strokeWidth={1.9} />
                <span>{isInWishlist ? 'Favourited' : 'Add to Favourites'}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-zinc-200">
              <div className="text-center bg-white border border-zinc-200 rounded-xl p-4">
                <Truck className="w-6 h-6 mx-auto text-black mb-2" />
                <p className="text-zinc-500 text-sm">Free Shipping</p>
              </div>
              <div className="text-center bg-white border border-zinc-200 rounded-xl p-4">
                <RefreshCw className="w-6 h-6 mx-auto text-black mb-2" />
                <p className="text-zinc-500 text-sm">Easy Returns</p>
              </div>
              <div className="text-center bg-white border border-zinc-200 rounded-xl p-4">
                <Shield className="w-6 h-6 mx-auto text-black mb-2" />
                <p className="text-zinc-500 text-sm">Secure Checkout</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <div className="flex border-b border-zinc-200 overflow-x-auto">
            {['description', 'reviews', 'care'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'text-black border-b-2 border-black'
                    : 'text-zinc-400 hover:text-black'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-zinc-700 space-y-4 leading-relaxed">
                <p>{currentProduct.description}</p>
                {currentProduct.material && (
                  <p><strong>Material:</strong> {currentProduct.material}</p>
                )}
                {currentProduct.careInstructions && (
                  <p><strong>Care Instructions:</strong> {currentProduct.careInstructions}</p>
                )}
              </div>
            )}
            {activeTab === 'reviews' && (
              <ProductReviews
                reviews={currentProduct.reviews || []}
                productId={currentProduct._id}
                onAddReview={handleAddReview}
              />
            )}
            {activeTab === 'care' && (
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-zinc-700 space-y-4">
                <p>Care instructions for this product:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Machine wash cold</li>
                  <li>Do not bleach</li>
                  <li>Hang dry</li>
                  <li>Iron on low heat</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mb-1">
              Complete the look
            </p>
            <h2 className="text-2xl font-poppins font-bold text-black mb-6 uppercase">
              Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
