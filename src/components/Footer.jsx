import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-base-200 to-base-300 text-base-content dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-3">UrbanNest</h2>
            <p className="text-sm opacity-80 mb-4">
              Find your dream property with ease and trust. Discover premium listings and trusted agents.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-xl hover:text-primary">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xl hover:text-primary">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xl hover:text-primary">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-xl hover:text-primary">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xl hover:text-primary">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Navigation - Services */}
          <div>
            <h6 className="footer-title text-lg font-semibold mb-2">Services</h6>
            <ul className="space-y-2 text-sm">
              <li><a className="link link-hover">Buy Property</a></li>
              <li><a className="link link-hover">Sell Property</a></li>
              <li><a className="link link-hover">Agent Support</a></li>
              <li><a className="link link-hover">Property Listing</a></li>
            </ul>
          </div>

          {/* Navigation - Company */}
          <div>
            <h6 className="footer-title text-lg font-semibold mb-2">Company</h6>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="link link-hover">Home</Link></li>
              <li><Link to="/about" className="link link-hover">About Us</Link></li>
              <li><Link to="/contact" className="link link-hover">Contact</Link></li>
              {/* <li><a className="link link-hover">Careers</a></li>
              <li><a className="link link-hover">Blog</a></li> */}
            </ul>
          </div>

          {/* Navigation - Legal */}
          <div>
            <h6 className="footer-title text-lg font-semibold mb-2">Legal</h6>
            <ul className="space-y-2 text-sm">
              <li><a className="link link-hover">Terms & Conditions</a></li>
              <li><a className="link link-hover">Privacy Policy</a></li>
              <li><Link to="/faq" className="link link-hover">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="divider my-3"></div>

        <div className="text-center text-xs opacity-70">
          &copy; {new Date().getFullYear()} UrbanNest. All rights reserved. | Developed by Nurul Islam Rayhan
        </div>
      </div>
    </footer>
  );
};

export default Footer;
