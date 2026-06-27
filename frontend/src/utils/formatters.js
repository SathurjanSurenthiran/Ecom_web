export const formatters = {
  currency: (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  },
  
  date: (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  },
  
  dateTime: (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  },
  
  relativeTime: (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return formatters.date(date);
  },
  
  truncate: (text, length = 100) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  },
  
  slugify: (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
  
  capitalize: (text) => {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },
  
  getInitials: (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },
  
  formatPrice: (price, discountPrice = null) => {
    if (discountPrice) {
      const discount = Math.round(((price - discountPrice) / price) * 100);
      return {
        original: formatters.currency(price),
        discounted: formatters.currency(discountPrice),
        discountPercent: discount,
        savings: formatters.currency(price - discountPrice),
      };
    }
    return {
      original: formatters.currency(price),
      discounted: null,
      discountPercent: 0,
      savings: null,
    };
  },
};