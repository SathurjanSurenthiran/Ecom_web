import Product from '../models/Product.js';
import Category from '../models/Category.js';
import APIFeatures from '../utils/apiFeatures.js';
import cloudinary, { assertCloudinaryConfig } from '../config/cloudinary.js';

const CLOUDINARY_FOLDER = 'Ecom';

const slugify = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const escapeRegExp = (value) =>
  value.toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const parseJsonField = (value, fallback) => {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value !== 'string') return value;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const normalizeProductData = (body) => {
  const data = { ...body };

  data.colors = parseJsonField(data.colors, []);
  data.sizes = parseJsonField(data.sizes, []);

  if (typeof data.tags === 'string') {
    data.tags = data.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (data.discountPrice === '') {
    delete data.discountPrice;
  }

  return data;
};

const getUniqueSlug = async (name, productId = null) => {
  if (!name) return undefined;

  const baseSlug = slugify(name);
  let slug = baseSlug;
  let suffix = 1;

  while (
    await Product.exists({
      slug,
      ...(productId ? { _id: { $ne: productId } } : {}),
    })
  ) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
};

const uploadProductImages = async (files = []) => {
  const images = [];

  if (files.length > 0) {
    assertCloudinaryConfig();
  }

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: CLOUDINARY_FOLDER,
    });
    images.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  return images;
};

export const getProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      size,
      color,
      availability,
      rating,
      deals,
      ...queryParams
    } = req.query;

    const filter = {};

    if (category) {
      const categoryDoc = await Category.findOne({
        $or: [
          { slug: category },
          { name: new RegExp(`^${escapeRegExp(category)}$`, 'i') },
        ],
      }).select('_id');

      filter.category = categoryDoc?._id || null;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    if (deals === 'true') {
      filter.discountPrice = { $exists: true, $ne: null };
    }

    if (size) {
      filter.sizes = {
        $elemMatch: {
          size,
          stock: { $gt: 0 },
        },
      };
    }

    if (color) {
      filter.colors = {
        $elemMatch: {
          name: new RegExp(`^${escapeRegExp(color)}$`, 'i'),
          stock: { $gt: 0 },
        },
      };
    }

    if (availability === 'in-stock') {
      filter.$or = [{ 'sizes.stock': { $gt: 0 } }, { 'colors.stock': { $gt: 0 } }];
    }

    if (availability === 'out-of-stock') {
      filter.$and = [
        { $or: [{ sizes: { $size: 0 } }, { sizes: { $not: { $elemMatch: { stock: { $gt: 0 } } } } }] },
        { $or: [{ colors: { $size: 0 } }, { colors: { $not: { $elemMatch: { stock: { $gt: 0 } } } } }] },
      ];
    }

    const features = new APIFeatures(Product.find(filter), queryParams)
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate();

    const products = await features.query.populate('category', 'name slug');
    const total = await features.getTotalCount();

    res.json({
      success: true,
      data: products,
      total,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'category',
      'name slug'
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      'category',
      'name slug'
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = normalizeProductData(req.body);
    productData.slug = await getUniqueSlug(productData.name);
    productData.images = await uploadProductImages(req.files);

    const product = await Product.create(productData);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    if (req.files && req.files.length > 0) {
      // Delete old images from cloudinary
      for (const image of product.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      product.images = await uploadProductImages(req.files);
    }

    const productData = normalizeProductData(req.body);
    if (productData.name && productData.name !== product.name) {
      productData.slug = await getUniqueSlug(productData.name, req.params.id);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...productData, images: product.images },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    // Delete images from cloudinary
    for (const image of product.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await product.deleteOne();
    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true })
      .limit(10)
      .populate('category', 'name slug');
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({ isNewArrival: true })
      .limit(10)
      .populate('category', 'name slug');
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getBestSellers = async (req, res) => {
  try {
    const products = await Product.find({ isBestSeller: true })
      .limit(10)
      .populate('category', 'name slug');
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isTrending: true })
      .limit(10)
      .populate('category', 'name slug');
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .limit(6)
      .populate('category', 'name slug');

    res.json({
      success: true,
      data: related,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
