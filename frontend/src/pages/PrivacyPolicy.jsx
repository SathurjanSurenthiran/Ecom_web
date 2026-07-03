import React from 'react';
import { motion } from 'framer-motion';
import { CircleDot, Database, Eye, Lock, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { shopDetails } from '../data/shopDetails';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      content: [
        'Personal information you provide (name, email, address, phone number)',
        'Payment information (processed securely through third-party providers)',
        'Order history and preferences',
        'Device and browsing information (IP address, browser type, pages visited)',
        'Cookies and tracking data for personalized experiences',
      ],
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'Process and fulfill your orders',
        'Send order confirmations and updates',
        'Provide customer support',
        'Send marketing communications (with your consent)',
        'Improve our products and services',
        'Detect and prevent fraud',
      ],
    },
    {
      icon: Eye,
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information',
        'Share only with trusted partners for order fulfillment (shipping, payment processing)',
        'Comply with legal obligations when required',
        'Protect the rights and safety of our customers and company',
      ],
    },
    {
      icon: Mail,
      title: 'Your Rights & Choices',
      content: [
        'Access and update your personal information',
        'Opt-out of marketing communications',
        'Request deletion of your account and data',
        'Decline cookies through browser settings',
        'Export your personal data',
      ],
    },
    {
      icon: Database,
      title: 'Data Security',
      content: [
        'SSL encryption for all transactions',
        'Secure storage of personal information',
        'Regular security audits and updates',
        'Limited employee access to customer data',
        'Compliance with GDPR and CCPA regulations',
      ],
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
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-white/70 text-lg">
              Your privacy matters to us. Learn how we collect, use, and protect your personal information.
            </p>
            <div className="mt-4 text-white/40 text-sm">
              Last Updated: January 1, 2026
            </div>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;

              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass p-6 rounded-xl"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-poppins font-bold text-white mb-3">
                        {section.title}
                      </h2>
                      <ul className="space-y-2 text-white/70">
                        {section.content.map((item) => (
                          <li key={item} className="flex items-start space-x-2">
                            <CircleDot className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <div className="glass p-6 rounded-xl">
              <h2 className="text-xl font-poppins font-bold text-white mb-3">Questions About Privacy?</h2>
              <p className="text-white/70 mb-4">
                If you have any questions about our privacy policy or how we handle your data, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${shopDetails.privacyEmail}`}
                  className="px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-colors text-center"
                >
                  <Mail className="inline-block w-4 h-4 mr-2" />
                  {shopDetails.privacyEmail}
                </a>
                <Link
                  to="/contact"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
