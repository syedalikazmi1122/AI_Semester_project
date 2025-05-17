import { ProcessedMessage, PredictionRequest } from '../types/prediction';

const extractNumber = (text: string): number | null => {
  const matches = text.match(/\d+(\.\d+)?/);
  return matches ? parseFloat(matches[0]) : null;
};

const statusKeywords = {
  'for sale': 'for_sale',
  'selling': 'for_sale',
  'build': 'ready_to_build',
  'building': 'ready_to_build',
  'foreclosure': 'foreclosure',
  'foreclosed': 'foreclosure'
};

const extractStatus = (text: string): string | null => {
  const lowercaseText = text.toLowerCase();
  for (const [keyword, value] of Object.entries(statusKeywords)) {
    if (lowercaseText.includes(keyword)) {
      return value;
    }
  }
  return null;
};

export const processMessage = (message: string): ProcessedMessage | null => {
  const lowercaseMsg = message.toLowerCase();

  // Process status
  if (lowercaseMsg.includes('status') || lowercaseMsg.includes('selling') || lowercaseMsg.includes('sale')) {
    const status = extractStatus(message);
    if (status) {
      return {
        type: 'status',
        value: status,
        field: 'status',
        confidence: 0.9
      };
    }
  }

  // Process bedrooms
  if (lowercaseMsg.includes('bed')) {
    const number = extractNumber(message);
    if (number && number >= 1 && number <= 10) {
      return {
        type: 'bedrooms',
        value: number,
        field: 'bed',
        confidence: 0.9
      };
    }
  }

  // Process bathrooms
  if (lowercaseMsg.includes('bath')) {
    const number = extractNumber(message);
    if (number && number >= 1 && number <= 8) {
      return {
        type: 'bathrooms',
        value: number,
        field: 'bath',
        confidence: 0.9
      };
    }
  }

  // Process lot size
  if (lowercaseMsg.includes('acre') || lowercaseMsg.includes('lot size')) {
    const number = extractNumber(message);
    if (number && number >= 0.1 && number <= 100) {
      return {
        type: 'lot_size',
        value: number,
        field: 'acre_lot',
        confidence: 0.85
      };
    }
  }

  // Process house size
  if (lowercaseMsg.includes('square feet') || lowercaseMsg.includes('sq ft') || lowercaseMsg.includes('sqft')) {
    const number = extractNumber(message);
    if (number && number >= 500 && number <= 10000) {
      return {
        type: 'house_size',
        value: number,
        field: 'house_size',
        confidence: 0.9
      };
    }
  }

  // Process price per square foot
  if (lowercaseMsg.includes('price per') || lowercaseMsg.includes('per square')) {
    const number = extractNumber(message);
    if (number && number >= 50 && number <= 2000) {
      return {
        type: 'price_per_sqft',
        value: number,
        field: 'price_per_sqft',
        confidence: 0.85
      };
    }
  }

  // Process location (city, state, zip)
  if (lowercaseMsg.includes('zip') || lowercaseMsg.includes('postal')) {
    const matches = message.match(/\b\d{5}\b/);
    if (matches) {
      return {
        type: 'zip_code',
        value: matches[0],
        field: 'zip_code',
        confidence: 0.95
      };
    }
  }

  return null;
};

export const generateResponse = (processed: ProcessedMessage | null, formData: Partial<PredictionRequest>): string => {
  if (!processed) {
    return "I'm not sure I understood that. Could you please rephrase?";
  }

  const remaining = {
    status: !formData.status,
    bed: !formData.bed,
    bath: !formData.bath,
    acre_lot: !formData.acre_lot,
    city: !formData.city,
    state: !formData.state,
    zip_code: !formData.zip_code,
    house_size: !formData.house_size,
    price_per_sqft: !formData.price_per_sqft
  };

  let nextQuestion = '';
  if (remaining.status) {
    nextQuestion = "What's the property's status? (for sale, ready to build, or foreclosure)";
  } else if (remaining.bed) {
    nextQuestion = 'How many bedrooms does the property have? (1-10)';
  } else if (remaining.bath) {
    nextQuestion = 'How many bathrooms? (1-8)';
  } else if (remaining.acre_lot) {
    nextQuestion = "What's the lot size in acres? (0.1-100)";
  } else if (remaining.city) {
    nextQuestion = 'In which city is the property located?';
  } else if (remaining.state) {
    nextQuestion = "What's the state? (e.g., CA, NY, TX)";
  } else if (remaining.zip_code) {
    nextQuestion = "What's the ZIP code? (5 digits)";
  } else if (remaining.house_size) {
    nextQuestion = "What's the house size in square feet? (500-10000)";
  } else if (remaining.price_per_sqft) {
    nextQuestion = "What's the average price per square foot in the area? ($50-$2000)";
  }

  return `Got it! ${nextQuestion}`;
};