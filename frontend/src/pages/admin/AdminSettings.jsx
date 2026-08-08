import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiGlobe, FiDollarSign, FiShield,
  FiMail, FiPhone, FiMapPin, FiSave, FiEye, FiEyeOff
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`admin-toggle-btn relative w-11 h-6 flex items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
        checked 
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_2px_8px_rgba(124,58,237,0.3)] justify-end' 
          : 'bg-zinc-200 dark:bg-white/10 border border-zinc-300 dark:border-white/5 justify-start'
      }`}
    >
      <motion.span
        layout
        className="block w-4 h-4 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] mx-0.5"
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </button>
  );
};

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
      {/* Action Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center pb-6 border-b border-zinc-200 dark:border-zinc-800 mb-8">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-zinc-900 dark:text-white tracking-tight uppercase">
            Settings
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 font-light">Configure your e-commerce platform settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
        {/* Settings Navigation Tabs */}
        <div className="glass p-3 rounded-[24px] h-fit space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`settings-tab-btn relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors duration-300 z-10 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-zinc-500 dark:text-white/60 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSettingsTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl -z-10 shadow-[0_4px_12px_rgba(124,58,237,0.25)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Card */}
        <div className="glass p-6 rounded-[28px] border border-white/10 shadow-[0_26px_70px_-30px_rgba(0,0,0,0.55)]">
          <form onSubmit={handleSave} className="space-y-6">
            
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setShowStripeSecret(!showStripeSecret)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setShowStripeSecret(!showStripeSecret);
                        }
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-white/40 dark:hover:text-white cursor-pointer select-none focus:outline-none p-1"
                      title={showStripeSecret ? 'Hide secret key' : 'Show secret key'}
                    >
                      {showStripeSecret ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </div>
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                  <ToggleSwitch
                    checked={storeSettings.maintenanceMode}
                    onChange={(checked) => handleInputChange('maintenanceMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Allow Public Registration</h4>
                    <p className="text-xs text-white/60">Allow guest users to create accounts on the storefront.</p>
                  </div>
                  <ToggleSwitch
                    checked={storeSettings.allowRegistration}
                    onChange={(checked) => handleInputChange('allowRegistration', checked)}
                  />
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
