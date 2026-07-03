import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, CreditCard, FileText, RefreshCw, ShoppingBag } from 'lucide-react';

const TermsOfService = () => {
  const terms = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: 'By using our website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services. We reserve the right to update these terms at any time, and continued use constitutes acceptance of changes.',
    },
    {
      icon: ShoppingBag,
      title: 'Products and Pricing',
      content: 'We strive to display accurate product information and pricing. However, we do not warrant that product descriptions, colors, or prices are error-free. We reserve the right to modify or discontinue products without notice.',
    },
    {
      icon: CreditCard,
      title: 'Payments and Billing',
      content: 'By placing an order, you agree to pay all charges incurred. We accept major credit cards and other payment methods as displayed. All prices are in USD and do not include applicable taxes or shipping fees.',
    },
    {
      icon: RefreshCw,
      title: 'Returns and Refunds',
      content: 'Our return policy allows returns within 30 days of purchase. Items must be in original condition with tags attached. Refunds are processed to the original payment method. Shipping fees are non-refundable.',
    },
    {
      icon: AlertCircle,
      title: 'User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend accounts for suspicious activity.',
    },
    {
      icon: FileText,
      title: 'Intellectual Property',
      content: 'All content on our site, including product designs, logos, images, and text, is our intellectual property and protected by copyright laws. You may not use our content without prior written permission.',
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
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-white/70 text-lg">
              Please read these terms carefully before using our website and services.
            </p>
            <div className="mt-4 text-white/40 text-sm">
              Effective Date: January 1, 2026
            </div>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {terms.map((term, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <term.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{term.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{term.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Governing Law */}
            <div className="glass p-6 rounded-xl">
              <h3 className="text-white font-semibold mb-2">Governing Law</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                These terms are governed by the laws of the United States. Any disputes arising from these terms
                will be resolved in the courts of New York. We reserve the right to update these terms periodically.
              </p>
            </div>

            {/* Contact for Questions */}
            <div className="glass p-6 rounded-xl text-center">
              <p className="text-white/70">
                Have questions about our Terms of Service?{' '}
                <a href="/contact" className="text-primary-400 hover:text-primary-300">
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TermsOfService;
