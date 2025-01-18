import React from 'react';
import DiseaseDetectionComponent from '../components/features/disease/DiseaseDetection';

interface DiseaseDetectionPageProps {
  isDark: boolean;
}

const DiseaseDetection: React.FC<DiseaseDetectionPageProps> = ({ isDark }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className={`text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Disease Detection
      </h1>
      <DiseaseDetectionComponent isDark={isDark} />
    </div>
  );
};

export default DiseaseDetection; 