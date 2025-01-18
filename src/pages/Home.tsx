import React from 'react';
import { Link } from 'react-router-dom';
import LucideIcon from '../components/common/LucideIcon';

interface HomeProps {
  isDark: boolean;
}

const Home: React.FC<HomeProps> = ({ isDark }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 transform scale-105"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Smart Farming Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed">
            Revolutionize your farming with AI-powered crop disease detection 
            and intelligent management systems
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/disease-detection"
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white/20 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center border border-white/30"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-50/30 to-transparent dark:via-green-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Features</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Empowering farmers with cutting-edge technology for better crop management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Disease Detection",
                description: "Upload images of your crops and get instant disease diagnosis with treatment recommendations.",
                icon: "Microscope",
                color: "green",
                link: "/disease-detection"
              },
              {
                title: "Crop Recommendations",
                description: "Get personalized crop recommendations based on soil conditions and location.",
                icon: "Sprout",
                color: "blue",
                link: "/crop-recommendations"
              },
              {
                title: "AI Assistant",
                description: "24/7 chatbot support for instant answers to your farming queries.",
                icon: "Bot",
                color: "purple",
                link: "#"
              }
            ].map((feature, index) => (
              <Link
                to={feature.link}
                key={index}
                className={`p-8 rounded-2xl ${
                  isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 dark:bg-${feature.color}-900/30 flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110`}>
                  <LucideIcon 
                    name={feature.icon} 
                    className={`w-8 h-8 text-${feature.color}-600 dark:text-${feature.color}-400`} 
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className={`text-gray-600 dark:text-gray-300 leading-relaxed`}>
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home; 