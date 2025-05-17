import React, { useEffect, useRef } from 'react';
import { RefreshCw, DollarSign, TrendingUp, Loader2, Info, MapPin, Home, Scale } from 'lucide-react';
import ResultsChart from './ResultsChart';
import { AreaChart } from 'lucide-react';
import PredictionFeature from './PredictionFeature';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

const PredictionResults = ({ prediction, loading, error, onReset }) => {
  const resultsRef = useRef(null);
  
  useEffect(() => {
    if (prediction && resultsRef.current) {
      resultsRef.current.classList.add('opacity-100', 'translate-y-0');
      resultsRef.current.classList.remove('opacity-0', 'translate-y-10');
    }
  }, [prediction]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 animate-pulse" style={{animationDuration: '2s'}}></div>
          <Loader2 className="h-12 w-12 text-emerald-400 animate-spin relative z-10" />
        </div>
        <p className="mt-6 text-gray-300 font-medium">Analyzing land data...</p>
        <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all">
        <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4 w-full">
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
        <h3 className="text-xl font-medium text-gray-300">No Prediction Yet</h3>
        <p className="mt-2 text-gray-400 text-center">Fill out the form to get a detailed land value prediction</p>
      </div>
    );
  }

  return (
    <div 
      ref={resultsRef} 
      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-500 opacity-0 translate-y-10 transform hover:shadow-xl hover:shadow-emerald-900/20"
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Prediction Results</h2>
        <button 
          onClick={onReset}
          className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-1.5" />
          New Prediction
        </button>
      </div>
      
      {/* Main Prediction Value Card */}
      <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border border-emerald-700/30 rounded-xl p-6 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full filter blur-3xl transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-500/10 rounded-full filter blur-3xl transform -translate-x-16 translate-y-16 group-hover:-translate-x-12 group-hover:translate-y-12 transition-transform duration-700"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
          <div>
            <p className="text-emerald-300 font-medium mb-2 flex items-center">
              <DollarSign className="h-5 w-5 mr-1" />
              Estimated Land Value
            </p>
            <div className="flex items-baseline">
              <p className="text-4xl font-bold text-white">
                {console.log(prediction.predicted_price)}
                {formatCurrency(prediction.predicted_price)}
              </p>
              <span className="ml-2 text-emerald-400 text-sm font-medium px-2 py-0.5 bg-emerald-900/30 rounded-full">
                ±5%
              </span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-lg p-3 md:self-center">
            <div className="flex items-center">
              <Info className="h-4 w-4 text-emerald-400 mr-2" />
              <p className="text-sm text-gray-300">Prediction based on {prediction.model || 'AI'} model</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Value Comparison</h3>
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 h-72">
          <ResultsChart prediction={prediction} />
        </div>
      </div>

      {/* Property Features */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Key Property Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PredictionFeature 
            icon={<Home className="h-5 w-5 text-emerald-400" />} 
            label="Property Size" 
            value={`${prediction.house_size || 2000} sq ft`} 
          />
          <PredictionFeature 
            icon={<AreaChart className="h-5 w-5 text-emerald-400" />} 
            label="Lot Size" 
            value={`${prediction.acre_lot || 0.25} acres`} 
          />
          <PredictionFeature 
            icon={<MapPin className="h-5 w-5 text-emerald-400" />} 
            label="Location" 
            value={prediction.city || 'Los Angeles, CA'} 
          />
          <PredictionFeature 
            icon={<Scale className="h-5 w-5 text-emerald-400" />} 
            label="Beds/Baths" 
            value={`${prediction.bed || 3}bd/${prediction.bath || 2}ba`} 
          />
          <PredictionFeature 
            icon={<DollarSign className="h-5 w-5 text-emerald-400" />} 
            label="Price per sq ft" 
            value={`$${prediction.price_per_sqft || 200}`} 
          />
          <PredictionFeature 
            icon={<TrendingUp className="h-5 w-5 text-emerald-400" />} 
            label="Market Status" 
            value={prediction.status || 'For Sale'} 
          />
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;