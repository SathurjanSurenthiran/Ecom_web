import express from 'express';
import { getAnalyticsStats } from '../controllers/analyticsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getAnalyticsStats);

export default router;
