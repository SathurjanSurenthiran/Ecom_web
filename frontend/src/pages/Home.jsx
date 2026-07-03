import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

import home1 from '../assets/images/home1.webp';
import home2 from '../assets/images/home2.avif';
import home3 from '../assets/images/home3.jpg';
import ProductCard from '../components/product/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import {
  getNewArrivals,
  getTrendingProducts,
} from '../features/products/productSlice';

const heroImages = [
  { src: home1, alt: 'Editorial model wearing a silk outfit' },
  { src: home2, alt: 'Editorial fashion styling detail' },
  { src: home3, alt: 'Minimal luxury outfit editorial' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { trending, newArrivals, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getTrendingProducts());
    dispatch(getNewArrivals());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  return (
    <div className="bg-[#fcfbfe] text-black pt-20">
      {/* Editorial Hero Section */}
      <section className="relative min-h-[75vh] lg:min-h-0 flex items-center px-4 md:px-8 py-12 md:py-16 border-b border-zinc-100">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-poppins font-extrabold tracking-tight text-black leading-[1.1] uppercase">
              The Art of <br />
              Presence.
            </h1>
            <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed max-w-md">
              Explore our Spring/Summer 2026 editorial, where structural minimalism meets fluid motion in a symphony of high-end minimalism and raw craftsmanship.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-3 bg-black hover:bg-zinc-800 text-white px-7 py-3.5 rounded-full font-medium tracking-wide uppercase transition-all duration-300 transform hover:scale-[1.02] shadow-sm text-sm"
              >
                <span>Shop the Collection</span>
                <FiArrowRight className="text-base" />
              </Link>
            </div>
          </motion.div>

          {/* Right Floating Image Column */}
          <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group bg-zinc-100">
            <motion.div
              animate={{
                x: ['0%', '0%', '-16.6667%', '-16.6667%', '-33.3333%', '-33.3333%', '-50%'],
                scale: [1, 1, 0.94, 1, 0.94, 1, 1], 
              }}
              transition={{
                duration: 8, 
                ease: [0.25, 1, 0.5, 1], 
                repeat: Infinity,
                repeatType: 'loop',
                times: [0, 0.22, 0.30, 0.52, 0.60, 0.84, 1],
              }}
              className="absolute inset-y-0 left-0 flex h-full w-[600%]"
            >
              {[...heroImages, ...heroImages].map((image, index) => (
                <div key={`${image.src}-${index}`} className="h-full w-1/6 shrink-0 overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
              ))}
            </motion.div>
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-5 left-5 text-white backdrop-blur-md bg-white/10 px-5 py-3 rounded-xl border border-white/20">
              <p className="text-[9px] tracking-widest uppercase font-semibold text-white/70">Crafted In Italy</p>
              <p className="text-xs font-semibold tracking-wide">100% Raw Organic Silk</p>
            </div>
          </div>
        </motion.div>
        </div>
      </section>

      {/* Curated Collections Section */}
      <section className="py-16 px-4 md:px-8 border-b border-zinc-100">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mb-1">Curated Selects</p>
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-black uppercase">Collections</h2>
            </div>
            <Link to="/shop" className="text-xs font-medium tracking-wide uppercase hover:underline text-black">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Tall Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 group relative aspect-[4/3] lg:aspect-auto lg:h-[480px] rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50"
            >
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="Collections"
                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white max-w-sm backdrop-blur-md bg-black/30 p-5 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold uppercase mb-1.5">A Structural Stance</h3>
                <p className="text-xs text-white/80 font-light mb-3 leading-relaxed">
                  Structured silhouettes, clean architectural lines, and neutral colorways optimized for the modern minimalist.
                </p>
                <Link
                  to="/shop?category=outerwear"
                  className="inline-flex items-center space-x-2 text-[11px] font-semibold tracking-widest uppercase border-b border-white pb-0.5 hover:opacity-85"
                >
                  <span>Discover</span>
                  <FiArrowRight />
                </Link>
              </div>
            </motion.div>

            {/* Right Stacked Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Stack 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative h-[228px] rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50"
              >
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80"
                  alt="Accessories"
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20"></div>
                <div className="absolute top-5 left-5 text-white bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
                  <h4 className="text-xs font-semibold uppercase tracking-wider">Premium Bags</h4>
                </div>
              </motion.div>

              {/* Stack 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative h-[228px] rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50"
              >
                <img
                  src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80"
                  alt="Tailored Suits"
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover:bg-black/25"></div>
                <div className="absolute top-5 left-5 text-white bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
                  <h4 className="text-xs font-semibold uppercase tracking-wider">Luxury Hemline</h4>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Pieces Section */}
      <section className="py-16 px-4 md:px-8 bg-zinc-50 border-b border-zinc-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-black uppercase">Trending Pieces</h2>
            <p className="text-zinc-400 font-light mt-1.5 text-xs tracking-wider uppercase">Our handpicked seasonal selection</p>
          </motion.div>

          {loading ? (
            <LoadingSkeleton type="product" count={4} />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {trending.slice(0, 4).map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-4 md:px-8 bg-white border-b border-zinc-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-black uppercase">New Arrivals</h2>
            <p className="text-zinc-400 font-light mt-1.5 text-xs tracking-wider uppercase">Freshly added pieces from the latest drop</p>
          </motion.div>

          {loading ? (
            <LoadingSkeleton type="product" count={4} />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {newArrivals.slice(0, 4).map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* lifestyle Photo Grid  */}
      <section className="py-16 px-4 md:px-8 border-b border-zinc-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mb-1">Follow @FitFlex</p>
            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-black uppercase">Lived In FitFlex</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'src/assets/images/img2.webp',
              'src/assets/images/img1.webp',
              'src/assets/images/img4.webp',
              'src/assets/images/img3.webp'
            ].map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative aspect-square rounded-xl overflow-hidden border border-zinc-200/40 shadow-sm group"
              >
                <img
                  src={url}
                  alt={`Lived in Fitflex ${i}`}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The FitFlex Journal - Newsletter Block */}
      <section className="bg-black text-white py-14 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left max-w-lg">
            <h3 className="text-xl font-poppins font-bold tracking-wide uppercase">The FitFlex Journal</h3>
            <p className="text-zinc-400 text-xs font-light">
              Join our inner circle for exclusive access to archival releases, private previews, and editorial insights.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch gap-3 flex-shrink-0">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-white rounded-xl placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 min-w-[260px] text-xs"
            />
            <button className="px-6 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors uppercase tracking-wider text-[10px]">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
