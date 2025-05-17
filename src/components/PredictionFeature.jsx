import React from 'react';

const PredictionFeature = ({ icon, label, value }) => {
  return (
    <div className="flex items-center bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:bg-gray-700/40 transition-colors group">
      <div className="flex-shrink-0 p-2 bg-gray-700/50 rounded-lg group-hover:bg-emerald-900/30 transition-colors">
        {icon}
      </div>
      <div className="ml-3">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
};

export default PredictionFeature;