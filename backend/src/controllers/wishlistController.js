import User from '../models/User.js';
import { normalizeWishlist } from '../utils/cartWishlistUtils.js';

export const getMyWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');

    res.json({
      success: true,
      data: user?.wishlist || [],
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const saveMyWishlist = async (req, res) => {
  try {
    const { items = [] } = req.body;
    const normalized = normalizeWishlist(items);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { wishlist: normalized },
      { new: true }
    ).populate('wishlist');

    res.json({
      success: true,
      data: user?.wishlist || [],
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const clearMyWishlist = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { wishlist: [] });

    res.json({
      success: true,
      message: 'Wishlist cleared successfully',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
