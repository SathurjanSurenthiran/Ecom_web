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
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-poppins font-bold gradient-text mb-4">
              {shopDetails.name}
            </h3>
            <p className="mb-4">
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

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FiMapPin className="text-primary-500" />
                <span>{shopDetails.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-primary-500" />
                <span>{shopDetails.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-primary-500" />
                <span>{shopDetails.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
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
