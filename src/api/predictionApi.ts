import axios from 'axios';
import { PredictionResponse } from '../types/prediction';

const API_URL = 'http://127.0.0.1:5001/api';

export const makePrediction = async (data: any): Promise<PredictionResponse> => {
  try {
    console.log("calling prediction API with data",data);
    const response = await axios.post(`${API_URL}/predict`, data);
     console.log("response",response.data);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Network error occurred');
    }
    throw new Error('An unexpected error occurred');
  }
};
export const makeforestPrediction = async (data: any): Promise<PredictionResponse> => {
  try {
    const response = await axios.post(`${API_URL}/forestpredict`, data);
    return response.data;
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Network error occurred');
    }
    throw new Error('An unexpected error occurred');
  }
}
export const makeLightGBMPrediction = async (data: any): Promise<PredictionResponse> => {
  try {
    const response = await axios.post(`${API_URL}/lightgbmpredict`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Network error occurred');
    }
    throw new Error('An unexpected error occurred');
  }
};


export const getParameters = async () => {
  const statusRes = await fetch('http://localhost:5001/api/parameters');
  
  const statusData = await statusRes.json();
  

  return {
    status: statusData.status,
  };
};

