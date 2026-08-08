import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMyCart, saveMyCart, clearMyCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', protect, getMyCart);
router.post('/', protect, saveMyCart);
router.delete('/', protect, clearMyCart);

export default router;
