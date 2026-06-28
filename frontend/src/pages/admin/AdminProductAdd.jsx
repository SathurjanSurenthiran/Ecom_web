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
            Array.from(productData.images).forEach((image) => {
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
      <h1 className="mb-6 text-3xl font-bold text-white">
        Add New Product
      </h1>
      <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};

export default AdminProductAdd;
