import Category from '../models/Category.js';
import Product from '../models/Product.js';
import cloudinary, { assertCloudinaryConfig } from '../config/cloudinary.js';

const CLOUDINARY_FOLDER = 'Ecom';

const slugify = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getUniqueSlug = async (name, categoryId = null) => {
  if (!name) return undefined;

  const baseSlug = slugify(name);
  let slug = baseSlug;
  let suffix = 1;

  while (
    await Category.exists({ slug, ...(categoryId ? { _id: { $ne: categoryId } } : {}) })
  ) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: 'Category not found' });
    }
    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;

    if (req.file) {
      assertCloudinaryConfig();

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: CLOUDINARY_FOLDER,
      });
      categoryData.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // ensure slug exists and is unique
    categoryData.slug = await getUniqueSlug(categoryData.name);

    const category = await Category.create(categoryData);
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: 'Category not found' });
    }

    if (req.file) {
      assertCloudinaryConfig();

      if (category.image) {
        await cloudinary.uploader.destroy(category.image.public_id);
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: CLOUDINARY_FOLDER,
      });
      req.body.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // If name changed, update slug
    if (req.body.name && req.body.name !== category.name) {
      req.body.slug = await getUniqueSlug(req.body.name, req.params.id);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: 'Category not found' });
    }

    // Check if category has products
    const productCount = await Product.countDocuments({
      category: category._id,
    });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with associated products',
      });
    }

    if (category.image) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    await category.deleteOne();
    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
