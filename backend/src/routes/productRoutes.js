import express from 'express';
import {
  getProducts,
  getProduct,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  getTrendingProducts,
  getRelatedProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadMultiple } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/best-sellers', getBestSellers);
router.get('/trending', getTrendingProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id/related', getRelatedProducts);
router.get('/:id', getProduct);
router.post('/', protect, admin, uploadMultiple, createProduct);
router.put('/:id', protect, admin, uploadMultiple, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;