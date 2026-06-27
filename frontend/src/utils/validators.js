export const validators = {
  email: (value) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value) ? null : 'Invalid email address';
  },
  
  required: (value) => {
    return value && value.trim() !== '' ? null : 'This field is required';
  },
  
  minLength: (min) => (value) => {
    return value && value.length >= min ? null : `Must be at least ${min} characters`;
  },
  
  maxLength: (max) => (value) => {
    return value && value.length <= max ? null : `Must be at most ${max} characters`;
  },
  
  password: (value) => {
    if (!value || value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(value)) {
      return 'Password must contain at least one number';
    }
    return null;
  },
  
  confirmPassword: (password) => (value) => {
    return value === password ? null : 'Passwords do not match';
  },
  
  phone: (value) => {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(value) ? null : 'Invalid phone number';
  },
  
  zipCode: (value) => {
    const regex = /^[0-9]{5}(-[0-9]{4})?$/;
    return regex.test(value) ? null : 'Invalid ZIP code';
  },
  
  price: (value) => {
    const num = parseFloat(value);
    return num >= 0 ? null : 'Price must be greater than or equal to 0';
  },
  
  stock: (value) => {
    const num = parseInt(value);
    return num >= 0 ? null : 'Stock must be greater than or equal to 0';
  },
};