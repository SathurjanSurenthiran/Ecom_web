import Cart from '../models/Cart.js';
import { calculateCartTotals } from '../utils/cartWishlistUtils.js';

export const getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    res.json({
      success: true,
      data: cart || { user: req.user._id, items: [], totalItems: 0, totalPrice: 0 },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const saveMyCart = async (req, res) => {
  try {
    const { items = [] } = req.body;
    const { totalItems, totalPrice } = calculateCartTotals(items);

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        items,
        totalItems,
        totalPrice,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    ).populate('items.product');

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const clearMyCart = async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user._id });

    res.json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
