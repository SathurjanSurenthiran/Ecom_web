import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';
import { shopDetails } from '../../data/shopDetails';

const socialIcons = {
  Facebook: FiFacebook,
  Instagram: FiInstagram,
  Twitter: FiTwitter,
  YouTube: FiYoutube,
};

const Footer = () => {
  const footerLinks = {
    Shop: ['Men', 'Women', 'Kids', 'Accessories', 'Sportswear'],
    Support: ['Contact Us', 'FAQs', 'Shipping Info', 'Returns', 'Size Guide'],
    Company: ['About Us', 'Careers', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  };

  return (
    <footer className="bg-dark text-white/80 border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-poppins font-bold gradient-text mb-4">
              {shopDetails.name}
            </h3>
            <p className="mb-4 text-sm leading-relaxed">
              {shopDetails.description}
            </p>
            <div className="flex space-x-4">
              {shopDetails.socialLinks.map(({ name, href }) => {
                const Icon = socialIcons[name];

                return (
                  <motion.a
                    key={name}
                    href={href}
                    aria-label={name}
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors duration-300"
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.Shop.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.Support.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <FiMapPin className="text-primary-500 mt-1 flex-shrink-0" />
                <span>{shopDetails.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-primary-500 flex-shrink-0" />
                <span>{shopDetails.phone}</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiMail className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="break-all">{shopDetails.email}</span>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.Company.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-4 pt-3 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2026 {shopDetails.name}. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
