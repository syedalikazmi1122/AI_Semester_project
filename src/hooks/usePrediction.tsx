import { useState } from 'react';
import { makePrediction } from '../api/predictionApi';
import { PredictionResponse } from '../types/prediction';

export const usePrediction = () => {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitPrediction = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await makePrediction(data);
      setPrediction(result);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err instanceof Error ? err.message : 'Failed to get prediction');
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  const resetPrediction = () => {
    setPrediction(null);
    setError(null);
  };

  return {
    prediction,
    loading,
    error,
    submitPrediction,
    resetPrediction
  };
};