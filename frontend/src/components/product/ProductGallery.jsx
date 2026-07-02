import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Zoom, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import 'swiper/css/free-mode';
import { FiZoomIn } from 'react-icons/fi';

const ProductGallery = ({ images, productName }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-white/5 rounded-xl flex items-center justify-center">
        <div className="text-white/40 text-center">
          <div className="text-6xl mb-4">📸</div>
          <p>No image available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
        <Swiper
          modules={[Navigation, Thumbs, Zoom, FreeMode]}
          navigation
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          zoom={true}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <img
                  src={image.url}
                  alt={`${productName} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 p-2 glass rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          <FiZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <Swiper
          modules={[Thumbs, FreeMode]}
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={10}
          freeMode={true}
          watchSlidesProgress={true}
          className="thumbnail-slider"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary-500 transition-colors">
                <img
                  src={image.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <img
              src={images[0]?.url}
              alt={productName}
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 glass text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductGallery;