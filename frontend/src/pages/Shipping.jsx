import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Globe, MapPin, Package, Truck } from 'lucide-react';

const Shipping = () => {
  const shippingMethods = [
    {
      icon: Truck,
      title: 'Standard Shipping',
      time: '3-5 Business Days',
      price: '$5.99',
      details: 'Free on orders over $100',
    },
    {
      icon: Clock,
      title: 'Express Shipping',
      time: '2-3 Business Days',
      price: '$12.99',
      details: 'Priority processing & tracking',
    },
    {
      icon: Package,
      title: 'Next Day Delivery',
      time: 'Next Business Day',
      price: '$24.99',
      details: 'Order by 2PM EST',
    },
    {
      icon: Globe,
      title: 'International Shipping',
      time: '7-14 Business Days',
      price: 'Varies by location',
      details: 'Customs fees may apply',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfbfe] support-page-light">
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
              Shipping <span className="gradient-text">Information</span>
            </h1>
            <p className="text-white/70 text-lg">
              Learn about our shipping methods, delivery times, and policies to ensure your order arrives on time.
            </p>
          </motion.div>

          {/* Shipping Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {shippingMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <method.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{method.title}</h3>
                    <p className="text-white/60 text-sm">{method.time}</p>
                    <p className="text-white font-bold mt-1">{method.price}</p>
                    <p className="text-green-400 text-sm">{method.details}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Shipping Policy Details */}
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-poppins font-bold text-white mb-4 flex items-center space-x-2">
                <DollarSign className="text-primary-400" />
                <span>Free Shipping</span>
              </h2>
              <p className="text-white/70">
                We offer free standard shipping on all orders over $100 within the United States. 
                This applies to all products except those marked as oversized or with special shipping requirements.
              </p>
            </div>

            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-poppins font-bold text-white mb-4 flex items-center space-x-2">
                <MapPin className="text-primary-400" />
                <span>Delivery Areas</span>
              </h2>
              <p className="text-white/70 mb-3">
                We currently ship to the following locations:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-1">
                <li>Sri Lanka (Island wide)</li>
                <li>Singapor</li>
                <li>Europ</li>
                <li>Australia</li>
                <li>Most European countries</li>
                <li>Select Asian and South American countries</li>
              </ul>
            </div>

            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-poppins font-bold text-white mb-4">
                Important Notes
              </h2>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start space-x-2">
                  <span className="text-primary-400">•</span>
                  <span>Orders placed before 2 PM EST are processed the same business day.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-400">•</span>
                  <span>You will receive a tracking number via email once your order ships.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-400">•</span>
                  <span>International orders may be subject to customs fees, which are the responsibility of the buyer.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-400">•</span>
                  <span>We offer insured shipping for all orders to protect against loss or damage.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Shipping;
