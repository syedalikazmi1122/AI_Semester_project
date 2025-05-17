export interface PredictionRequest {
  status: string;
  bed: number;
  bath: number;
  acre_lot: number;
  city: string;
  state: string;
  house_size: number;
  price_per_sqft: number;
  zip_code: string;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface ComparableProperty {
  location: string;
  value: number;
  similarity?: number;
}

export interface PredictionResponse {
  predicted_price: number;
  confidence_score?: number;
  feature_importance?: FeatureImportance[];
  comparableProperties?: ComparableProperty[];
}