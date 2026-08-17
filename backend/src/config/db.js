import './env.js';
import mongoose from 'mongoose';
import User from '../models/User.js';

const seedAdminUsers = async () => {
  try {
    // 1. Check/Ensure superadmin admin@gmail.com exists
    const superAdminEmail = 'admin@gmail.com';
    let superAdmin = await User.findOne({ email: superAdminEmail });
    if (!superAdmin) {
      superAdmin = await User.create({
        name: 'Super Admin',
        email: superAdminEmail,
        password: 'admin123',
        role: 'superadmin',
        isVerified: true
      });
      console.log('Super Admin user created');
    } else {
      // Ensure its role is superadmin
      if (superAdmin.role !== 'superadmin') {
        superAdmin.role = 'superadmin';
        await superAdmin.save();
        console.log('Super Admin role updated to superadmin');
      }
    }

    // 2. Check/Ensure admin sathu@gmail.com exists and has admin role
    const adminEmail = 'sathu@gmail.com';
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Sathu Admin',
        email: adminEmail,
        password: 'sathu123',
        role: 'admin',
        isVerified: true
      });
      console.log('Admin user sathu@gmail.com created');
    } else {
      // Ensure its role is admin
      if (adminUser.role !== 'admin') {
        adminUser.role = 'admin';
        await adminUser.save();
        console.log('Admin user sathu@gmail.com role updated to admin');
      }
    }
  } catch (error) {
    console.error('Error seeding admin users:', error.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedAdminUsers();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
