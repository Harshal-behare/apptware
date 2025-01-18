import React from 'react';
import CropRecommendationsComponent from '../components/features/crops/CropRecommendations';

interface CropRecommendationsPageProps {
  isDark: boolean;
}

const CropRecommendations: React.FC<CropRecommendationsPageProps> = ({ isDark }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className={`text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Crop Recommendations
      </h1>
      <CropRecommendationsComponent isDark={isDark} />
    </div>
  );
};

export default CropRecommendations; 