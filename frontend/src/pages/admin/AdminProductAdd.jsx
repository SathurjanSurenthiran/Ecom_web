import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProductForm from '../../components/forms/ProductForm';
import axios from '../../api/axios';

const AdminProductAdd = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (productData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === 'images') {
          if (productData.images) {
            Array.from(productData.images)
              .filter((image) => image instanceof File)
              .forEach((image) => {
                formData.append('images', image);
              });
          }
        } else if (key === 'colors' || key === 'sizes') {
          formData.append(key, JSON.stringify(productData[key]));
        } else if (productData[key] !== undefined && productData[key] !== null) {
          formData.append(key, productData[key]);
        }
      });

      await axios.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Product created successfully');
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Action Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center pb-6 border-b border-zinc-200 dark:border-zinc-800 mb-8">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-zinc-900 dark:text-white tracking-tight uppercase">
            Add New Product
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 font-light">Create a new item in your store inventory</p>
        </div>
      </div>
      <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};

export default AdminProductAdd;
