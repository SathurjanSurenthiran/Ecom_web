import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiStar, FiThumbsUp, FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const ProductReviews = ({ reviews, productId, onAddReview }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [title, setTitle] = useState('');

  const averageRating = reviews?.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews?.filter((r) => r.rating === star).length || 0,
    percentage: reviews?.length > 0
      ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100
      : 0,
  }));

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (onAddReview) {
      onAddReview({ productId, rating, title, comment });
      setShowReviewModal(false);
      setRating(0);
      setTitle('');
      setComment('');
    }
  };

  const renderStars = (value, size = 'sm') => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`${sizes[size]} ${
              i < value
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-zinc-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm">
        <div className="text-center">
          <div className="text-4xl font-poppins font-bold text-black">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center mt-1">
            {renderStars(Math.round(averageRating), 'md')}
          </div>
          <div className="text-zinc-500 text-sm mt-1">
            {reviews?.length || 0} reviews
          </div>
        </div>

        <div className="flex-1 space-y-1 w-full">
          {ratingDistribution.map(({ star, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-zinc-500 text-sm w-12">{star} star</span>
              <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-zinc-400 text-sm w-12">
                {Math.round(percentage)}%
              </span>
            </div>
          ))}
        </div>

        {isAuthenticated && (
          <Button
            onClick={() => setShowReviewModal(true)}
            className="bg-black hover:bg-zinc-800 text-white rounded-lg text-sm font-semibold uppercase tracking-wide"
          >
            Write Review
          </Button>
        )}
      </div>

      {reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-black font-medium">{review.user?.name || 'Anonymous'}</p>
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                      <span className="text-zinc-400 text-xs">
                        <FiClock className="inline mr-1 w-3 h-3" />
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                {review.isVerified && (
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs rounded-full">
                    Verified Purchase
                  </span>
                )}
              </div>
              {review.title && (
                <h4 className="text-black font-semibold mt-3">{review.title}</h4>
              )}
              <p className="text-zinc-600 mt-1">{review.comment}</p>
              <button className="mt-3 text-zinc-400 hover:text-black transition-colors text-sm flex items-center space-x-1">
                <FiThumbsUp className="w-4 h-4" />
                <span>Helpful</span>
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-zinc-200 rounded-2xl shadow-sm text-zinc-500">
          <p className="text-lg text-black font-semibold">No reviews yet</p>
          <p className="text-sm">Be the first to review this product</p>
        </div>
      )}

      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Write a Review"
        className="support-page-light"
      >
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="text-zinc-600 text-sm mb-2 block">Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="text-2xl transition-colors"
                >
                  <FiStar
                    className={`${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-zinc-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-zinc-600 text-sm block mb-1">Title (Optional)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
            />
          </div>

          <div>
            <label className="text-zinc-600 text-sm block mb-1">Review *</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
              placeholder="Share your experience with this product..."
            />
          </div>

          <div className="flex space-x-3">
            <Button type="submit" className="flex-1 bg-black hover:bg-zinc-800 text-white">
              Submit Review
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowReviewModal(false)}
              className="bg-zinc-100 hover:bg-zinc-200 text-black"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductReviews;
