import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProductCard from '../components/product/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import {
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
} from '../features/products/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { featured, newArrivals, bestSellers, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getFeaturedProducts());
    dispatch(getNewArrivals());
    dispatch(getBestSellers());
  }, [dispatch]);

  const heroSlides = [
    {
      title: 'New Collection 2026',
      subtitle: 'Discover the latest fashion trends',
      cta: 'Shop Now',
      image:
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
    },
    {
      title: 'Summer Sale',
      subtitle: 'Up to 50% off on selected items',
      cta: 'Explore Deals',
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
    },
    {
      title: 'Premium Collection',
      subtitle: 'Luxury fashion for every occasion',
      cta: 'View Collection',
      image:
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          autoplay={{ delay: 5000 }}
          effect="fade"
          pagination={{ clickable: true }}
          navigation
          className="w-full h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-dark/60"></div>
                </div>
                <div className="relative h-full flex items-center justify-center text-center px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-3xl"
                  >
                    <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-white/80 mb-8">
                      {slide.subtitle}
                    </p>
                    <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105">
                      {slide.cta}
                    </button>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-2">
              Featured Products
            </h2>
            <p className="text-white/60">Our handpicked selection</p>
          </motion.div>

          {loading ? (
            <LoadingSkeleton type="product" count={4} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featured.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 px-4 bg-white/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-2">
              New Arrivals
            </h2>
            <p className="text-white/60">Fresh styles just dropped</p>
          </motion.div>

          {loading ? (
            <LoadingSkeleton type="product" count={4} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;