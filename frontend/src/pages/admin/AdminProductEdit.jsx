import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProductForm from '../../components/forms/ProductForm';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import axios from '../../api/axios';

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        const data = response.data.data;
        
        // Format initial data if needed for the form
        const formattedData = {
          ...data,
          category: data.category?._id || data.category || '',
          colors: data.colors?.length > 0 ? data.colors : [{ name: '', hex: '#000000', stock: '' }],
          sizes: data.sizes?.length > 0 ? data.sizes : [{ size: '', stock: '' }],
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '',
        };
        
        setProduct(formattedData);
      } catch {
        toast.error('Failed to fetch product details');
        navigate('/admin/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const onSubmit = async (productData) => {
    setIsUpdating(true);
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

      await axios.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-white">
        Edit Product
      </h1>
      {loading ? (
        <LoadingSkeleton type="product" count={3} />
      ) : (
        <ProductForm
          onSubmit={onSubmit}
          initialData={product}
          isLoading={isUpdating}
        />
      )}
    </div>
  );
};

export default AdminProductEdit;
