import React from 'react';

const Footer = ({ isDark }: { isDark: boolean }) => {
  return (
    <footer className={`${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PlantCare</h3>
            <p className="text-sm">
              Empowering farmers with AI-driven solutions for better crop management and disease detection.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm hover:underline">Home</a></li>
              <li><a href="/disease-detection" className="text-sm hover:underline">Disease Detection</a></li>
              <li><a href="/crop-recommendations" className="text-sm hover:underline">Crop Recommendations</a></li>
              <li><a href="/chatbot" className="text-sm hover:underline">Chatbot</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@plantcare.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Agriculture Street</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-80">Twitter</a>
              <a href="#" className="hover:opacity-80">Facebook</a>
              <a href="#" className="hover:opacity-80">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} AgroCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;