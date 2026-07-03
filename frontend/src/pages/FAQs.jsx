import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { shopDetails } from '../data/shopDetails';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  const faqCategories = [
    {
      title: 'Orders & Shipping',
      questions: [
        {
          q: 'How do I place an order?',
          a: 'To place an order, simply browse our collection, select the items you like, choose your size and color, and add them to your cart. When you\'re ready, proceed to checkout, enter your shipping information, select a payment method, and confirm your order.',
        },
        {
          q: 'How long does shipping take?',
          a: 'Standard shipping typically takes 3-5 business days. Express shipping (2-3 business days) is also available at checkout. International orders may take 5-10 business days depending on the destination.',
        },
        {
          q: 'Do you ship internationally?',
          a: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see the exact shipping cost at checkout.',
        },
        {
          q: 'How can I track my order?',
          a: 'Once your order ships, you\'ll receive a confirmation email with a tracking number. You can also track your order from your account dashboard under "My Orders".',
        },
      ],
    },
    {
      title: 'Returns & Exchanges',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 30-day return policy for all items in their original condition with tags attached. Return shipping is free for exchanges and standard returns within the US.',
        },
        {
          q: 'How do I initiate a return?',
          a: 'To initiate a return, log into your account, go to "My Orders", select the order you want to return, and click "Return Item". Follow the instructions to print your return label.',
        },
        {
          q: 'Can I exchange an item?',
          a: 'Yes, exchanges are easy! Select "Exchange" instead of "Return" when initiating your return. We\'ll send you the new item once we receive your return.',
        },
        {
          q: 'How long do refunds take?',
          a: 'Refunds are processed within 3-5 business days after we receive your return. The refund will be credited to your original payment method.',
        },
      ],
    },
    {
      title: 'Products & Sizing',
      questions: [
        {
          q: 'How do I find my size?',
          a: 'We provide a detailed size guide on each product page. You can also find our universal size chart in the footer. For the best fit, measure yourself and compare with our size guide.',
        },
        {
          q: 'Are your products true to size?',
          a: 'Our products are designed to fit true to size. However, we recommend checking the specific measurements in our size guide for each item, as different styles may fit differently.',
        },
        {
          q: 'What materials do you use?',
          a: 'We use high-quality materials including 100% cotton, sustainable fabrics, and premium blends. Each product page lists the specific materials used.',
        },
        {
          q: 'Do you offer plus sizes?',
          a: 'Yes, we offer a wide range of sizes from XS to 3XL across most of our collections. Check the product page for available sizes.',
        },
      ],
    },
    {
      title: 'Payment & Security',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. We also offer Buy Now, Pay Later options through Afterpay and Klarna.',
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your credit card details on our servers.',
        },
        {
          q: 'Do you offer gift cards?',
          a: 'Yes, we offer digital gift cards that can be purchased and sent via email. They\'re perfect for any occasion and never expire.',
        },
        {
          q: 'What is your privacy policy?',
          a: 'We take your privacy seriously. We never share your personal information with third parties without your consent. Read our full privacy policy for more details.',
        },
      ],
    },
    {
      title: 'Account & Support',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on the "Login" button at the top right of our site, then select "Create Account". Fill in your details and you\'re ready to go!',
        },
        {
          q: 'I forgot my password. What do I do?',
          a: 'Click on "Forgot Password" on the login page. Enter your email address and we\'ll send you a link to reset your password.',
        },
        {
          q: 'How do I update my account information?',
          a: 'Log in to your account, go to "Profile", and you can update your personal information, shipping addresses, and communication preferences.',
        },
        {
          q: 'How do I contact customer support?',
          a: `You can reach us through our Contact page, email us at ${shopDetails.supportEmail}, or call us at ${shopDetails.phone}. We're here to help!`,
        },
      ],
    },
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Find answers to the most common questions about ordering, shipping, returns, and more.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {filteredFAQs.map((category) => (
            <div key={category.title} className="mb-8">
              <h2 className="text-2xl font-poppins font-bold text-white mb-4">
                {category.title}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, index) => {
                  const globalIndex = `${category.title}-${index}`;
                  const isActive = activeIndex === globalIndex;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(globalIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left"
                      >
                        <span className="text-white font-medium">{faq.q}</span>
                        <ChevronDown
                          className={`text-primary-400 transition-transform duration-300 ${
                            isActive ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-4"
                          >
                            <p className="text-white/70">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">No FAQs found matching your search.</p>
            </div>
          )}

          {/* Still Have Questions */}
          <div className="glass p-8 rounded-xl text-center mt-12">
            <h3 className="text-xl font-poppins font-bold text-white mb-2">
              Still Have Questions?
            </h3>
            <p className="text-white/60 mb-4">
              Can't find the answer you're looking for? We're here to help.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FAQs;
