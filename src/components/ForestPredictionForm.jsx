import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, ChevronDown, MapPin, Home, AreaChart, DollarSign } from 'lucide-react';
import { getParameters } from '../api/predictionApi';
// import {  PredictionRequest} from './../types/prediction';

// Custom Input component
const FormInput = ({ label, icon, register, name, type = "text", error, ...rest }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-emerald-300 mb-1.5">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">
          {icon}
        </div>
        <input
          type={type}
          className={`w-full bg-gray-800/40 backdrop-blur-sm border ${error ? 'border-red-500' : 'border-gray-700/50'} rounded-xl py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all`}
          {...register(name)}
          {...rest}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    </div>
  );
};

// Custom Select component
const FormSelect = ({ label, icon, register, name, options, error, ...rest }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-emerald-300 mb-1.5">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">
          {icon}
        </div>
        <select
          className={`w-full appearance-none bg-gray-800/40 backdrop-blur-sm border ${error ? 'border-red-500' : 'border-gray-700/50'} rounded-xl py-3 pl-10 pr-10 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all`}
          {...register(name)}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none">
          <ChevronDown size={16} />
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    </div>
  );
};



const ForestPredictionForm = ({ onSubmit, isLoading }) => {
  const [parameters, setParameters] = useState(null);
  const [parametersLoading, setParametersLoading] = useState(true);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      status: 'for_sale',
      bed: 3,
      bath: 2,
      acre_lot: 0.25,
      city: '',
      state: 'Newyork',
      house_size: 2000,
      price_per_sqft: 200,
      zip_code: ''
    }
  });
  

  useEffect(() => {
    const loadParameters = async () => {
      try {
        const params = await getParameters();
        setParameters(params);
      } catch (error) {
        console.error('Error loading parameters:', error);
      } finally {
        setParametersLoading(false);
      }
    };

    loadParameters();
  }, []);

  if (parametersLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
        <Loader2 className="h-12 w-12 text-emerald-400 animate-spin" />
        <p className="mt-4 text-gray-300">Loading form data...</p>
      </div>
    );
  }

  const statusOptions = parameters?.status.map((s) => ({
    value: s,
    label: s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  })) || [];

  const stateOptions = [
    { value: 'CA', label: 'California' },
    { value: 'Newyork', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' }
  ];

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Forest Regressor Model</h2>
        <p className="text-gray-400">Advanced ensemble-based prediction for complex property valuations</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSelect 
          label="Property Status"
          icon={<Home size={18} />}
          register={register}
          name="status"
          options={statusOptions}
          error={errors.status}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Bedrooms"
            icon={<Home size={18} />}
            register={register}
            name="bed"
            type="number"
            min="1"
            max="10"
            error={errors.bed}
          />
          
          <FormInput
            label="Bathrooms"
            icon={<Home size={18} />}
            register={register}
            name="bath"
            type="number"
            min="1"
            max="8"
            step="0.5"
            error={errors.bath}
          />
        </div>

        <FormInput
          label="Lot Size (acres)"
          icon={<AreaChart size={18} />}
          register={register}
          name="acre_lot"
          type="number"
          min="0.1"
          max="100"
          step="0.01"
          error={errors.acre_lot}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="State"
            icon={<MapPin size={18} />}
            register={register}
            name="state"
            placeholder ="e.g, New york"
            error={errors.state}
          />
          
          <FormInput
            label="City"
            icon={<MapPin size={18} />}
            register={register}
            name="city"
            placeholder="e.g. Los Angeles"
            error={errors.city}
          />
        </div>

        <FormInput
          label="Zip Code"
          icon={<MapPin size={18} />}
          register={register}
          name="zip_code"
          placeholder="e.g. 90210"
          error={errors.zip_code}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="House Size (sq ft)"
            icon={<Home size={18} />}
            register={register}
            name="house_size"
            type="number"
            min="500"
            max="10000"
            error={errors.house_size}
          />
          
          <FormInput
            label="Price per sq ft ($)"
            icon={<DollarSign size={18} />}
            register={register}
            name="price_per_sqft"
            type="number"
            min="50"
            max="2000"
            error={errors.price_per_sqft}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-400 text-white font-medium py-3.5 px-4 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center"
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Processing...
            </span>
          ) : (
            'Get Forest Prediction'
          )}
        </button>
      </form>
    </div>
  );
};

export default ForestPredictionForm;