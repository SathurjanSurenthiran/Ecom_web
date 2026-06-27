import React, { forwardRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Select = forwardRef(({
  label,
  error,
  options,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-white/60 text-sm block mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full px-4 py-2 pr-10
            bg-white/5 border border-white/10 
            rounded-lg text-white 
            focus:outline-none focus:ring-2 focus:ring-primary-500 
            transition-all duration-300 appearance-none
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 pointer-events-none" />
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;