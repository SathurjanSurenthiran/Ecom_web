import Coupon from '../models/Coupon.js';

// Get all coupons (Admin only)
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.json({
      success: true,
      count: coupons.length,
      data: coupons,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Create coupon (Admin only)
export const createCoupon = async (req, res) => {
  try {
    const {
      code,
      description,
      discountType,
      discountValue,
      minPurchase,
      maxDiscount,
      startDate,
      endDate,
      usageLimit,
    } = req.body;

    const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
    if (couponExists) {
      return res.status(400).json({ success: false, message: 'Coupon code already exists' });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      description,
      discountType,
      discountValue,
      minPurchase: minPurchase || 0,
      maxDiscount: maxDiscount || undefined,
      startDate,
      endDate,
      usageLimit: usageLimit || 1,
    });

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      data: coupon,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update coupon (Admin only)
export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Coupon updated successfully',
      data: updatedCoupon,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete coupon (Admin only)
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    await Coupon.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Coupon deleted successfully',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
