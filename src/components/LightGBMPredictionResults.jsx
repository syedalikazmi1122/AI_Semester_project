import React, { useEffect, useRef } from 'react';
import { RefreshCw, DollarSign, TrendingUp, Loader2, Info } from 'lucide-react';
import LightGBMResultsChart from './LightGBMResultCard';



const LightGBMPredictionResults = ({
  prediction,
  loading,
  error,
  onReset
}) => {
  const resultsRef = useRef(null);

  useEffect(() => {
    if (prediction && resultsRef.current) {
      resultsRef.current.classList.add('opacity-100', 'translate-y-0');
      resultsRef.current.classList.remove('opacity-0', 'translate-y-10');
    }
  }, [prediction]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 animate-pulse"></div>
          <Loader2 className="h-12 w-12 text-emerald-400 animate-spin relative z-10" />
        </div>
        <p className="mt-6 text-gray-300 font-medium">LightGBM model processing...</p>
        <p className="text-sm text-gray-400 mt-2">Analyzing with gradient boosting</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4">
          <p className="text-red-400">Error: {error}</p>
          <button 
            onClick={onReset}
            className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-red-300 bg-red-900/30 hover:bg-red-900/50 border border-red-700/30 rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
        <TrendingUp className="h-16 w-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-300">No LightGBM Prediction Yet</h3>
        <p className="mt-2 text-gray-400 text-center">Fill out the form to get a gradient boosting prediction</p>
      </div>
    );
  }

  return (
    <div 
      ref={resultsRef}
      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-500 opacity-0 translate-y-10"
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">LightGBM Results</h2>
        <button 
          onClick={onReset}
          className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          <RefreshCw className="h-4 w-4 mr-1.5" />
          New Prediction
        </button>
      </div>

      <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border border-emerald-700/30 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <p className="text-emerald-300 font-medium mb-2 flex items-center">
              Estimated Property Value
            </p>
            <div className="flex items-baseline">
              <p className="text-4xl font-bold text-white">
                {formatCurrency(prediction.predicted_price)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
            <div className="flex items-center">
              <Info className="h-4 w-4 text-emerald-400 mr-2" />
              <p className="text-sm text-gray-300">LightGBM Model Prediction</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Prediction Analysis</h3>
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 h-72">
          <LightGBMResultsChart prediction={prediction} />
        </div>
      </div>

      {prediction.feature_importance && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Feature Importance</h3>
          <div className="grid gap-2">
            {prediction.feature_importance.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 flex items-center"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-emerald-300">{feature.feature}</p>
                  <div className="mt-1 bg-gray-700/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                      style={{ width: `${feature.importance * 100}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm text-gray-400">
                  {(feature.importance * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LightGBMPredictionResults;