import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiZoomIn } from 'react-icons/fi';
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

const ProductGallery = ({ images, productName }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-white border border-zinc-200 rounded-2xl flex items-center justify-center shadow-sm">
        <div className="text-zinc-400 text-center">
          <div className="text-6xl mb-4">?</div>
          <p>No image available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm">
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
          onClick={() => setIsZoomed(true)}
          className="absolute bottom-4 right-4 p-2 bg-white/95 border border-zinc-200 rounded-lg text-black hover:bg-zinc-100 transition-colors shadow-sm backdrop-blur"
          aria-label="Zoom product image"
        >
          <FiZoomIn className="w-5 h-5" />
        </button>
      </div>

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
              <div className="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-zinc-200 hover:border-black transition-colors bg-zinc-100">
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
              className="absolute top-4 right-4 p-2 bg-white text-black rounded-lg hover:bg-zinc-100 transition-colors shadow-sm"
              aria-label="Close zoomed image"
            >
              X
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductGallery;
