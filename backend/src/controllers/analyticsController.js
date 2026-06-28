import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// Get analytics stats (Admin only)
export const getAnalyticsStats = async (req, res) => {
  try {
    const { period } = req.query; // 'daily', 'weekly', 'monthly', 'yearly'

    // Determine starting date based on period
    let startDate = new Date();
    if (period === 'daily') {
      startDate.setDate(startDate.getDate() - 1);
    } else if (period === 'weekly') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'yearly') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else {
      // Default to monthly (last 30 days)
      startDate.setDate(startDate.getDate() - 30);
    }

    // 1. Total revenue (sum of totalPrice of completed/delivered/paid orders or all except cancelled)
    const revenueStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' }, createdAt: { $gte: startDate } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const revenue = revenueStats.length > 0 ? revenueStats[0].total : 0;

    // 2. Total orders count
    const ordersCount = await Order.countDocuments({
      createdAt: { $gte: startDate },
    });

    // 3. Total customers count (users with role 'user')
    const customersCount = await User.countDocuments({ role: 'user' });

    // 4. Products sold (sum of items quantity in orders)
    const productsSoldStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' }, createdAt: { $gte: startDate } } },
      { $unwind: '$orderItems' },
      { $group: { _id: null, totalQty: { $sum: '$orderItems.qty' } } },
    ]);
    const productsSold = productsSoldStats.length > 0 ? productsSoldStats[0].totalQty : 0;

    // 5. Top Products sold
    const topProductsStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' }, createdAt: { $gte: startDate } } },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          sold: { $sum: '$orderItems.qty' },
          revenue: { $sum: { $multiply: ['$orderItems.qty', '$orderItems.price'] } },
        },
      },
      { $sort: { sold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      { $unwind: { path: '$productDetails', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          name: { $ifNull: ['$productDetails.name', 'Deleted Product'] },
          price: { $ifNull: ['$productDetails.price', 0] },
          sold: 1,
          revenue: 1,
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        revenue,
        orders: ordersCount,
        customers: customersCount,
        productsSold,
        topProducts: topProductsStats,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
