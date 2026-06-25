import React from 'react';

const LoadingSkeleton = ({ type = 'product', count = 4 }) => {
  if (type === 'product') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white/5 rounded-lg h-64 w-full"></div>
            <div className="mt-4 space-y-2">
              <div className="bg-white/5 h-4 w-3/4 rounded"></div>
              <div className="bg-white/5 h-4 w-1/2 rounded"></div>
              <div className="bg-white/5 h-6 w-1/3 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-white/5 h-12 w-full rounded"></div>
      <div className="bg-white/5 h-12 w-full rounded"></div>
      <div className="bg-white/5 h-12 w-full rounded"></div>
    </div>
  );
};

export default LoadingSkeleton;