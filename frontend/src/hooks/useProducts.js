import { useSelector, useDispatch } from 'react-redux';
import { 
  getProducts, 
  getProductBySlug,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  getTrendingProducts,
  getRelatedProducts
} from '../features/products/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const { 
    products, 
    featured, 
    newArrivals, 
    bestSellers, 
    trending,
    currentProduct,
    relatedProducts,
    loading,
    total 
  } = useSelector((state) => state.products);

  return {
    products,
    featured,
    newArrivals,
    bestSellers,
    trending,
    currentProduct,
    relatedProducts,
    loading,
    total,
    fetchProducts: (params) => dispatch(getProducts(params)),
    fetchProductBySlug: (slug) => dispatch(getProductBySlug(slug)),
    fetchFeatured: () => dispatch(getFeaturedProducts()),
    fetchNewArrivals: () => dispatch(getNewArrivals()),
    fetchBestSellers: () => dispatch(getBestSellers()),
    fetchTrending: () => dispatch(getTrendingProducts()),
    fetchRelated: (id) => dispatch(getRelatedProducts(id)),
  };
};