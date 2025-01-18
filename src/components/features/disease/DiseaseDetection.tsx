import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

const DiseaseDetection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedImage(URL.createObjectURL(file));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <section id="disease-detection" className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Crop Disease Detection</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop your crop image here or click to upload
              </p>
              <p className="text-sm text-gray-500">
                Supports: JPG, PNG (max. 10MB)
              </p>
            </label>
          </div>

          {selectedImage && (
            <div className="mt-4">
              <img
                src={selectedImage}
                alt="Selected crop"
                className="rounded-lg max-h-[300px] mx-auto"
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {selectedImage ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Analysis Results</h3>
                <p className="text-gray-600">Upload an image to receive disease detection results and treatment recommendations.</p>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-2">Recommended Treatment</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Apply treatment steps here</li>
                  <li>Fertilizer recommendations</li>
                  <li>Pesticide suggestions</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <AlertCircle className="h-12 w-12 mb-4" />
              <p>No image selected</p>
              <p className="text-sm">Upload an image to see analysis results</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DiseaseDetection;