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
    Shop: [
      { label: 'Men', path: '/shop?category=men' },
      { label: 'Women', path: '/shop?category=women' },
      { label: 'Kids', path: '/shop?category=kids' },
      { label: 'Accessories', path: '/shop?category=accessories' },
      { label: 'Sportswear', path: '/shop?category=sportswear' },
    ],
    Support: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'FAQs', path: '/faqs' },
      { label: 'Shipping Info', path: '/shipping' },
      { label: 'Returns', path: '/returns' },
      { label: 'Size Guide', path: '/size-guide' },
    ],
    Company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Service', path: '/terms-of-service' },
      { label: 'Cookie Policy', path: '/cookie-policy' },
    ],
  };

  return (
    <footer className="bg-[#f5f5f7] text-zinc-600 border-t border-zinc-200/80 tracking-wide">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand & Socials Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-poppins font-extrabold tracking-widest text-black">
              {shopDetails.name}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              {shopDetails.description}
            </p>
            <div className="flex space-x-3 pt-2">
              {shopDetails.socialLinks.map(({ name, href }) => {
                const Icon = socialIcons[name];
                if (!Icon) return null;

                return (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="w-10 h-10 bg-white border border-zinc-200 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white hover:bg-black hover:border-black transition-all duration-300 shadow-sm group"
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-[6deg]" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-black font-semibold mb-4 text-xs uppercase tracking-widest">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.Shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="inline-block text-sm text-zinc-500 hover:text-black transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-300 pb-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-black font-semibold mb-4 text-xs uppercase tracking-widest">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.Support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="inline-block text-sm text-zinc-500 hover:text-black transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-300 pb-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info  */}
          <div>
            <h4 className="text-black font-semibold mb-4 text-xs uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm text-zinc-500">
              <li className="flex items-start space-x-3 group">
                <FiMapPin className="text-black mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="group-hover:text-black transition-colors duration-300">
                  {shopDetails.address}
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <FiPhone className="text-black flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="group-hover:text-black transition-colors duration-300">
                  {shopDetails.phone}
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <FiMail className="text-black mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="break-all group-hover:text-black transition-colors duration-300">
                  {shopDetails.email}
                </span>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-black font-semibold mb-4 text-xs uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.Company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="inline-block text-sm text-zinc-500 hover:text-black transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-300 pb-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar Section */}
       <div className="border-t border-zinc-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400">
          <p>&copy; {new Date().getFullYear()} {shopDetails.name}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="hover:text-black transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-300 pb-0.5"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-black transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-300 pb-0.5"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;