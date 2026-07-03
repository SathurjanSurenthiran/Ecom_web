import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Cookie, Info, Settings, Shield } from 'lucide-react';

const CookiePolicy = () => {
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);

  const cookieTypes = [
    {
      type: 'Essential Cookies',
      icon: Shield,
      description: 'Necessary for the website to function properly. These cookies enable basic features like page navigation and access to secure areas.',
      alwaysOn: true,
    },
    {
      type: 'Analytics Cookies',
      icon: Info,
      description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      alwaysOn: false,
    },
    {
      type: 'Marketing Cookies',
      icon: Settings,
      description: 'Used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.',
      alwaysOn: false,
    },
    {
      type: 'Preference Cookies',
      icon: CheckCircle,
      description: 'Remember your preferences and settings to enhance your browsing experience.',
      alwaysOn: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="w-20 h-20 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Cookie className="w-10 h-10 text-primary-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
              Cookie <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-white/70 text-lg">
              We use cookies to enhance your browsing experience. Learn how we use cookies and how you can control them.
            </p>
            <div className="mt-4 text-white/40 text-sm">
              Last Updated: January 1, 2026
            </div>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* What are Cookies */}
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-poppins font-bold text-white mb-4">What Are Cookies?</h2>
              <p className="text-white/70 leading-relaxed">
                Cookies are small text files stored on your device when you visit our website. They help us provide
                you with a better experience by remembering your preferences, analyzing site usage, and delivering
                personalized content and advertisements.
              </p>
            </div>

            {/* Cookie Types */}
            <div className="glass p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-poppins font-bold text-white">Types of Cookies We Use</h2>
                <button
                  onClick={() => setShowCookiePreferences(!showCookiePreferences)}
                  className="text-primary-400 hover:text-primary-300 text-sm"
                >
                  {showCookiePreferences ? 'Hide Preferences' : 'Customize Preferences'}
                </button>
              </div>

              <div className="space-y-4">
                {cookieTypes.map((cookie, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start justify-between p-4 glass rounded-xl"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <cookie.icon className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{cookie.type}</h4>
                        <p className="text-white/60 text-sm">{cookie.description}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {cookie.alwaysOn ? (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          Always On
                        </span>
                      ) : showCookiePreferences ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-white/10 peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        </label>
                      ) : (
                        <span className="text-white/40 text-sm">Enabled</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {showCookiePreferences && (
                <div className="mt-4 flex justify-end">
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                    Save Preferences
                  </button>
                </div>
              )}
            </div>

            {/* How to Manage Cookies */}
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-poppins font-bold text-white mb-4">How to Manage Cookies</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                You can manage or disable cookies through your browser settings. Please note that disabling certain
                cookies may affect the functionality of our website.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Chrome', 'Firefox', 'Safari', 'Edge'].map((browser) => (
                  <button
                    key={browser}
                    className="px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-colors text-sm"
                  >
                    {browser}
                  </button>
                ))}
              </div>
            </div>

            {/* Update Notice */}
            <div className="glass p-6 rounded-xl text-center">
              <p className="text-white/60 text-sm">
                We update our cookie policy periodically to reflect changes in technology and regulations.
                Last reviewed: January 2026
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CookiePolicy;
