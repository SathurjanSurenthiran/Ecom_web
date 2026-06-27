import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiStar, FiMinus, FiPlus, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import toast from 'react-hot-toast';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProductCard from '../components/product/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { getProductBySlug, getRelatedProducts } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';

const ProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, relatedProducts, loading } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    dispatch(getProductBySlug(slug));
    window.scrollTo(0, 0);
  }, [dispatch, slug]);

  useEffect(() => {
    if (currentProduct) {
      dispatch(getRelatedProducts(currentProduct._id));
      if (currentProduct.sizes?.length > 0) {
        setSelectedSize(currentProduct.sizes[0].size);
      }
      if (currentProduct.colors?.length > 0) {
        setSelectedColor(currentProduct.colors[0].name);
      }
    }
  }, [currentProduct, dispatch]);

  if (loading || !currentProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <LoadingSkeleton type="product" count={1} />
        </div>
        <Footer />
      </div>
    );
  }

  const isInWishlist = wishlistItems.some((item) => item._id === currentProduct._id);

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(currentProduct._id));
      toast.error('Removed from wishlist');
    } else {
      dispatch(addToWishlist(currentProduct));
      toast.success('Added to wishlist');
    }
  };

  const handleAddToCart = () => {
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
    toast.success('Added to cart');
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="text-white/60 text-sm mb-8">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-white">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{currentProduct.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Swiper
              modules={[Navigation, Thumbs, Zoom]}
              zoom={true}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              className="rounded-xl overflow-hidden"
            >
              {currentProduct.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container">
                    <img
                      src={image.url}
                      alt={currentProduct.name}
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              spaceBetween={10}
              className="thumbnail-slider"
            >
              {currentProduct.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.url}
                    alt={`${currentProduct.name} ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-primary-500 transition-colors"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-2">
                {currentProduct.name}
              </h1>
              <p className="text-white/60">{currentProduct.brand}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {renderStars(currentProduct.rating)}
                <span className="text-white/60 ml-2">({currentProduct.numReviews} reviews)</span>
              </div>
              <span className="text-white/40">|</span>
              <span className="text-green-400">In Stock</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-white">
                ${currentProduct.discountPrice || currentProduct.price}
              </span>
              {currentProduct.discountPrice && (
                <span className="text-xl text-white/40 line-through">
                  ${currentProduct.price}
                </span>
              )}
              {currentProduct.discountPrice && (
                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                  {Math.round(((currentProduct.price - currentProduct.discountPrice) / currentProduct.price) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Size Selection */}
            {currentProduct.sizes?.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-3">Select Size</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size.size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                        selectedSize === size.size
                          ? 'border-primary-500 bg-primary-500/20 text-white'
                          : 'border-white/20 text-white/60 hover:border-primary-500 hover:text-white'
                      }`}
                    >
                      {size.size}
                      {size.stock === 0 && (
                        <span className="text-xs text-red-400 ml-1">(Out of stock)</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {currentProduct.colors?.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-3">Select Color</h4>
                <div className="flex flex-wrap gap-3">
                  {currentProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        selectedColor === color.name
                          ? 'border-primary-500 scale-110'
                          : 'border-white/20 hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.hex || '#000' }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h4 className="text-white font-semibold mb-3">Quantity</h4>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20"
                >
                  <FiMinus />
                </button>
                <span className="text-white text-xl w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <FiShoppingBag />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleWishlist}
                className={`py-3 px-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isInWishlist
                    ? 'border-red-500 bg-red-500/20 text-red-500'
                    : 'border-white/20 text-white/60 hover:border-primary-500 hover:text-white'
                }`}
              >
                <FiHeart className={isInWishlist ? 'fill-red-500' : ''} />
                <span>{isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="text-center">
                <FiTruck className="w-6 h-6 mx-auto text-primary-400 mb-2" />
                <p className="text-white/60 text-sm">Free Shipping</p>
              </div>
              <div className="text-center">
                <FiRefreshCw className="w-6 h-6 mx-auto text-primary-400 mb-2" />
                <p className="text-white/60 text-sm">Easy Returns</p>
              </div>
              <div className="text-center">
                <FiShield className="w-6 h-6 mx-auto text-primary-400 mb-2" />
                <p className="text-white/60 text-sm">Secure Checkout</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-white/10">
            {['description', 'reviews', 'care'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'text-primary-400 border-b-2 border-primary-400'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div className="text-white/80 space-y-4">
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
              <div className="text-white/60">
                <p>Reviews will be displayed here</p>
              </div>
            )}
            {activeTab === 'care' && (
              <div className="text-white/80 space-y-4">
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

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-poppins font-bold text-white mb-6">
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

      <Footer />
    </div>
  );
};

export default ProductDetail;