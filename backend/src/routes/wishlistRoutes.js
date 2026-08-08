import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMyWishlist, saveMyWishlist, clearMyWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

router.get('/', protect, getMyWishlist);
router.post('/', protect, saveMyWishlist);
router.delete('/', protect, clearMyWishlist);

export default router;
