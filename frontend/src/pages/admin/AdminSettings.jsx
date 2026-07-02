import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiGlobe, FiDollarSign, FiShield,
  FiMail, FiPhone, FiMapPin, FiSave, FiEye, FiEyeOff
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Sathurjan Store',
    supportEmail: 'support@sathurjanstore.com',
    phone: '+1 (555) 019-2834',
    address: '123 E-Commerce Blvd, Tech City, TC 10101',
    currency: 'USD',
    taxRate: '8.25',
    stripePublicKey: 'pk_test_51Nx...xyz',
    stripeSecretKey: 'sk_test_51Nx...abc',
    maintenanceMode: false,
    allowRegistration: true,
  });

  const handleInputChange = (key, value) => {
    setStoreSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings updated successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General Info', icon: FiGlobe },
    { id: 'payment', label: 'Payments', icon: FiDollarSign },
    { id: 'security', label: 'Security & System', icon: FiShield },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-poppins font-bold text-white">
          Settings
        </h1>
        <p className="text-white/60">Configure your e-commerce platform settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6">
        {/* Settings Navigation Tabs */}
        <div className="glass p-3 rounded-xl h-fit space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Card */}
        <div className="glass p-6 rounded-xl">
          <form onSubmit={handleSave} className="space-y-6">
            
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <FiGlobe className="text-primary-400" />
                  General Store Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Store Name</label>
                    <input
                      type="text"
                      value={storeSettings.storeName}
                      onChange={(e) => handleInputChange('storeName', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Currency</label>
                    <select
                      value={storeSettings.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="input-field"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Support Email</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="email"
                        value={storeSettings.supportEmail}
                        onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Store Phone</label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="text"
                        value={storeSettings.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Store Address</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-white/40" />
                    <textarea
                      value={storeSettings.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="input-field pl-10 h-20 resize-none pt-2"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'payment' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <FiDollarSign className="text-primary-400" />
                  Stripe Payment Integration
                </h3>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Stripe Publishable Key</label>
                  <input
                    type="text"
                    value={storeSettings.stripePublicKey}
                    onChange={(e) => handleInputChange('stripePublicKey', e.target.value)}
                    className="input-field font-mono text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Stripe Secret Key</label>
                  <div className="relative">
                    <input
                      type={showStripeSecret ? 'text' : 'password'}
                      value={storeSettings.stripeSecretKey}
                      onChange={(e) => handleInputChange('stripeSecretKey', e.target.value)}
                      className="input-field font-mono text-sm pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowStripeSecret(!showStripeSecret)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      {showStripeSecret ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Tax Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={storeSettings.taxRate}
                    onChange={(e) => handleInputChange('taxRate', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <FiShield className="text-primary-400" />
                  System & Security Controls
                </h3>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Maintenance Mode</h4>
                    <p className="text-xs text-white/60">Put store in offline mode. Only admins will have access.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={storeSettings.maintenanceMode}
                      onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Allow Public Registration</h4>
                    <p className="text-xs text-white/60">Allow guest users to create accounts on the storefront.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={storeSettings.allowRegistration}
                      onChange={(e) => handleInputChange('allowRegistration', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </motion.div>
            )}

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                type="submit"
                className="btn-primary flex items-center gap-2 font-medium"
              >
                <FiSave />
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSettings;
