import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

const calculateChange = (current, previous) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return Math.round(((current - previous) / previous) * 100);
};

// Get analytics stats (Admin only)
export const getAnalyticsStats = async (req, res) => {
  try {
    const { period } = req.query; // 'daily', 'weekly', 'monthly', 'yearly'

    // Determine starting date based on period
    let startDate = new Date();
    let prevStartDate = new Date();
    if (period === 'daily') {
      startDate.setDate(startDate.getDate() - 1);
      prevStartDate.setDate(prevStartDate.getDate() - 2);
    } else if (period === 'weekly') {
      startDate.setDate(startDate.getDate() - 7);
      prevStartDate.setDate(prevStartDate.getDate() - 14);
    } else if (period === 'yearly') {
      startDate.setFullYear(startDate.getFullYear() - 1);
      prevStartDate.setFullYear(prevStartDate.getFullYear() - 2);
    } else {
      // Default to monthly (last 30 days)
      startDate.setDate(startDate.getDate() - 30);
      prevStartDate.setDate(prevStartDate.getDate() - 60);
    }

    // 1. Total revenue
    const currentRevenueStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' }, createdAt: { $gte: startDate } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const revenue = currentRevenueStats.length > 0 ? currentRevenueStats[0].total : 0;

    const prevRevenueStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' }, createdAt: { $gte: prevStartDate, $lt: startDate } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const prevRevenue = prevRevenueStats.length > 0 ? prevRevenueStats[0].total : 0;
    const revenueChange = calculateChange(revenue, prevRevenue);

    // 2. Total orders count
    const ordersCount = await Order.countDocuments({
      createdAt: { $gte: startDate },
    });
    const prevOrdersCount = await Order.countDocuments({
      createdAt: { $gte: prevStartDate, $lt: startDate },
    });
    const ordersChange = calculateChange(ordersCount, prevOrdersCount);

    // 3. Total customers count (users with role 'user')
    const customersCount = await User.countDocuments({ role: 'user' });
    const currentSignups = await User.countDocuments({ role: 'user', createdAt: { $gte: startDate } });
    const prevSignups = await User.countDocuments({ role: 'user', createdAt: { $gte: prevStartDate, $lt: startDate } });
    const customersChange = calculateChange(currentSignups, prevSignups);

    // 4. Products sold (sum of items quantity in orders)
    const productsSoldStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' }, createdAt: { $gte: startDate } } },
      { $unwind: '$orderItems' },
      { $group: { _id: null, totalQty: { $sum: '$orderItems.quantity' } } },
    ]);
    const productsSold = productsSoldStats.length > 0 ? productsSoldStats[0].totalQty : 0;

    const prevProductsSoldStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' }, createdAt: { $gte: prevStartDate, $lt: startDate } } },
      { $unwind: '$orderItems' },
      { $group: { _id: null, totalQty: { $sum: '$orderItems.quantity' } } },
    ]);
    const prevProductsSold = prevProductsSoldStats.length > 0 ? prevProductsSoldStats[0].totalQty : 0;
    const productsSoldChange = calculateChange(productsSold, prevProductsSold);

    // 5. Top Products sold
    const topProductsStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' }, createdAt: { $gte: startDate } } },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          sold: { $sum: '$orderItems.quantity' },
          revenue: { $sum: { $multiply: ['$orderItems.quantity', '$orderItems.price'] } },
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
        revenueChange,
        orders: ordersCount,
        ordersChange,
        customers: customersCount,
        customersChange,
        productsSold,
        productsSoldChange,
        topProducts: topProductsStats,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get general dashboard stats (Admin only)
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue = revenueStats.length > 0 ? revenueStats[0].total : 0;

    // Monthly changes for dashboard cards
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const prevStartDate = new Date();
    prevStartDate.setDate(prevStartDate.getDate() - 60);

    // 1. Users change
    const usersThisMonth = await User.countDocuments({ role: 'user', createdAt: { $gte: startDate } });
    const usersLastMonth = await User.countDocuments({ role: 'user', createdAt: { $gte: prevStartDate, $lt: startDate } });
    const usersChange = calculateChange(usersThisMonth, usersLastMonth);

    // 2. Products change
    const productsThisMonth = await Product.countDocuments({ createdAt: { $gte: startDate } });
    const productsLastMonth = await Product.countDocuments({ createdAt: { $gte: prevStartDate, $lt: startDate } });
    const productsChange = calculateChange(productsThisMonth, productsLastMonth);

    // 3. Orders change
    const ordersThisMonth = await Order.countDocuments({ createdAt: { $gte: startDate } });
    const ordersLastMonth = await Order.countDocuments({ createdAt: { $gte: prevStartDate, $lt: startDate } });
    const ordersChange = calculateChange(ordersThisMonth, ordersLastMonth);

    // 4. Revenue change
    const revenueThisMonthStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' }, createdAt: { $gte: startDate } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const revenueThisMonth = revenueThisMonthStats.length > 0 ? revenueThisMonthStats[0].total : 0;

    const revenueLastMonthStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' }, createdAt: { $gte: prevStartDate, $lt: startDate } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const revenueLastMonth = revenueLastMonthStats.length > 0 ? revenueLastMonthStats[0].total : 0;
    const revenueChange = calculateChange(revenueThisMonth, revenueLastMonth);

    res.json({
      success: true,
      data: {
        totalUsers,
        usersChange,
        totalProducts,
        productsChange,
        totalOrders,
        ordersChange,
        totalRevenue,
        revenueChange,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
