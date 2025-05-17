import React, { useState } from 'react';
import ForestPredictionForm from './../../components/ForestPredictionForm';
import ForestPredictionResults from './../../components/ForestPredictionResults';
// import { PredictionRequest , PredictionResponse } from './../../types/prediction.ts';
import { makeforestPrediction } from './../../api/predictionApi';

export default function ForestPrediction () {
    console.log("called");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await makeforestPrediction(data);
      console.log("result", result);
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/30 via-gray-900 to-green-900/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '15s'}}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '20s'}}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Forest Model <span className="relative">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">Prediction</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-emerald-500/30 to-green-500/30 rounded-full blur-sm"></span>
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Advanced ensemble-based predictions using Random Forest algorithm
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <ForestPredictionForm 
              onSubmit={handleSubmit} 
              isLoading={loading} 
            />
            
            <ForestPredictionResults 
              prediction={prediction} 
              loading={loading} 
              error={error} 
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
