import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCartTotals, normalizeWishlist } from './cartWishlistUtils.js';

test('calculateCartTotals sums items and prices correctly', () => {
  const result = calculateCartTotals([
    { product: { price: 100, discountPrice: 80 }, quantity: 2 },
    { product: { price: 50, discountPrice: 50 }, quantity: 1 },
  ]);

  assert.equal(result.totalItems, 3);
  assert.equal(result.totalPrice, 210);
});

test('normalizeWishlist removes duplicates while preserving order', () => {
  const result = normalizeWishlist(['prod-1', 'prod-2', 'prod-1', 'prod-3']);

  assert.deepEqual(result, ['prod-1', 'prod-2', 'prod-3']);
});
