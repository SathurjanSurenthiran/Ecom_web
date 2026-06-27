import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiUser, FiClock, FiThumbsUp } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

const ProductReviews = ({ reviews, productId, onAddReview }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
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
    count: reviews?.filter(r => r.rating === star).length || 0,
    percentage: reviews?.length > 0
      ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100
      : 0,
  }));

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (onAddReview) {
      onAddReview({ rating, title, comment });
      setShowReviewModal(false);
      setRating(0);
      setTitle('');
      setComment('');
    }
  };

  const renderStars = (rating, size = 'sm') => {
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
              i < rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-white/20'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 glass rounded-xl">
        <div className="text-center">
          <div className="text-4xl font-poppins font-bold text-white">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center mt-1">
            {renderStars(Math.round(averageRating), 'md')}
          </div>
          <div className="text-white/60 text-sm mt-1">
            {reviews?.length || 0} reviews
          </div>
        </div>

        <div className="flex-1 space-y-1">
          {ratingDistribution.map(({ star, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-white/60 text-sm w-8">{star}★</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-white/40 text-sm w-12">
                {Math.round(percentage)}%
              </span>
            </div>
          ))}
        </div>

        {isAuthenticated && (
          <Button onClick={() => setShowReviewModal(true)}>
            Write Review
          </Button>
        )}
      </div>

      {/* Reviews List */}
      {reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-4 rounded-xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{review.user?.name || 'Anonymous'}</p>
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                      <span className="text-white/40 text-xs">
                        <FiClock className="inline mr-1 w-3 h-3" />
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                {review.isVerified && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    Verified Purchase
                  </span>
                )}
              </div>
              {review.title && (
                <h4 className="text-white font-semibold mt-2">{review.title}</h4>
              )}
              <p className="text-white/70 mt-1">{review.comment}</p>
              <button className="mt-2 text-white/40 hover:text-white/70 transition-colors text-sm flex items-center space-x-1">
                <FiThumbsUp className="w-4 h-4" />
                <span>Helpful</span>
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-white/40">
          <p className="text-lg">No reviews yet</p>
          <p className="text-sm">Be the first to review this product</p>
        </div>
      )}

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Write a Review"
      >
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="text-white/60 text-sm mb-2 block">Rating</label>
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
                        : 'text-white/20'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Title (Optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
          />

          <div>
            <label className="text-white/60 text-sm block mb-1">Review *</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Share your experience with this product..."
            />
          </div>

          <div className="flex space-x-3">
            <Button type="submit" className="flex-1">
              Submit Review
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowReviewModal(false)}
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