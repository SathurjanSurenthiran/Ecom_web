export const calculateCartTotals = (items = []) => {
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product?.discountPrice ?? item.product?.price ?? 0;
    return sum + price * (item.quantity || 0);
  }, 0);

  return { totalItems, totalPrice };
};

export const normalizeWishlist = (wishlist = []) => {
  const seen = new Set();
  return wishlist.filter((item) => {
    if (seen.has(item)) {
      return false;
    }
    seen.add(item);
    return true;
  });
};
