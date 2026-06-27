import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { FiPlus, FiTrash2, FiImage } from 'react-icons/fi';
import axios from '../../api/axios';

const ProductForm = ({ onSubmit, initialData, isLoading }) => {
  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      description: '',
      price: '',
      discountPrice: '',
      category: '',
      brand: '',
      gender: 'unisex',
      colors: [{ name: '', hex: '#000000', stock: '' }],
      sizes: [{ size: '', stock: '' }],
      isFeatured: false,
      isNewArrival: false,
      isBestSeller: false,
      isTrending: false,
      tags: [],
      material: '',
      careInstructions: '',
    },
  });

  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
    control,
    name: 'colors',
  });

  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
    control,
    name: 'sizes',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data.data.map(c => ({ value: c._id, label: c.name })));
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    setValue('images', files);
  };

  const genderOptions = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
    { value: 'unisex', label: 'Unisex' },
  ];

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="glass p-6 rounded-xl">
        <h3 className="text-white font-semibold text-lg mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Product Name *"
            {...register('name', { required: 'Product name is required' })}
            error={errors.name?.message}
            placeholder="Enter product name"
          />
          <Input
            label="Brand *"
            {...register('brand', { required: 'Brand is required' })}
            error={errors.brand?.message}
            placeholder="Enter brand name"
          />
        </div>

        <div className="mt-4">
          <label className="text-white/60 text-sm block mb-1">Description *</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Select
            label="Category *"
            {...register('category', { required: 'Category is required' })}
            options={categories}
            error={errors.category?.message}
          />
          <Select
            label="Gender *"
            {...register('gender', { required: 'Gender is required' })}
            options={genderOptions}
            error={errors.gender?.message}
          />
          <Input
            label="Tags (comma separated)"
            {...register('tags')}
            placeholder="summer, casual, premium"
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="glass p-6 rounded-xl">
        <h3 className="text-white font-semibold text-lg mb-4">Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Price *"
            type="number"
            step="0.01"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0, message: 'Price must be greater than 0' }
            })}
            error={errors.price?.message}
            placeholder="99.99"
          />
          <Input
            label="Discount Price"
            type="number"
            step="0.01"
            {...register('discountPrice')}
            placeholder="79.99"
          />
        </div>
      </div>

      {/* Colors & Sizes */}
      <div className="glass p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold text-lg">Colors & Sizes</h3>
        </div>

        {/* Colors */}
        <div className="space-y-3">
          <label className="text-white/60 text-sm block">Colors</label>
          {colorFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-3">
              <Input
                {...register(`colors.${index}.name`)}
                placeholder="Color name"
                className="flex-1"
              />
              <input
                type="color"
                {...register(`colors.${index}.hex`)}
                className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg cursor-pointer"
              />
              <Input
                type="number"
                {...register(`colors.${index}.stock`)}
                placeholder="Stock"
                className="w-24"
              />
              <button
                type="button"
                onClick={() => removeColor(index)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => appendColor({ name: '', hex: '#000000', stock: '' })}
            className="w-full"
          >
            <FiPlus className="mr-2" />
            Add Color
          </Button>
        </div>

        {/* Sizes */}
        <div className="space-y-3 mt-6">
          <label className="text-white/60 text-sm block">Sizes</label>
          {sizeFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-3">
              <select
                {...register(`sizes.${index}.size`)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select size</option>
                {sizeOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <Input
                type="number"
                {...register(`sizes.${index}.stock`)}
                placeholder="Stock"
                className="w-32"
              />
              <button
                type="button"
                onClick={() => removeSize(index)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => appendSize({ size: '', stock: '' })}
            className="w-full"
          >
            <FiPlus className="mr-2" />
            Add Size
          </Button>
        </div>
      </div>

      {/* Images */}
      <div className="glass p-6 rounded-xl">
        <h3 className="text-white font-semibold text-lg mb-4">Images</h3>
        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <FiImage className="w-12 h-12 mx-auto text-white/40 mb-4" />
            <p className="text-white/60">Click to upload product images</p>
            <p className="text-white/40 text-sm">PNG, JPG, WEBP up to 5MB</p>
          </label>
        </div>
        {imagePreviews.length > 0 && (
          <div className="flex gap-4 mt-4 flex-wrap">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="glass p-6 rounded-xl">
        <h3 className="text-white font-semibold text-lg mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Material"
            {...register('material')}
            placeholder="Cotton, Polyester"
          />
          <Input
            label="Care Instructions"
            {...register('careInstructions')}
            placeholder="Machine wash cold, hang dry"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <label className="flex items-center space-x-2 text-white/70">
            <input type="checkbox" {...register('isFeatured')} />
            <span>Featured</span>
          </label>
          <label className="flex items-center space-x-2 text-white/70">
            <input type="checkbox" {...register('isNewArrival')} />
            <span>New Arrival</span>
          </label>
          <label className="flex items-center space-x-2 text-white/70">
            <input type="checkbox" {...register('isBestSeller')} />
            <span>Best Seller</span>
          </label>
          <label className="flex items-center space-x-2 text-white/70">
            <input type="checkbox" {...register('isTrending')} />
            <span>Trending</span>
          </label>
        </div>
      </div>

      <Button
        type="submit"
        loading={isLoading}
        className="w-full text-lg py-4"
      >
        {initialData ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  );
};

export default ProductForm;