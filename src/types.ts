export interface Product {
  id: string;
  name: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  image: string;
}

export interface PriceHistory {
  date: string;
  price: number;
  volume: number;
}

export interface User {
  email: string;
  name: string;
}

export interface DetailedAnalysis {
  seasonalTrend: 'up' | 'down' | 'stable';
  marketSentiment: 'positive' | 'negative' | 'neutral';
  priceRange: {
    min: number;
    max: number;
  };
  recommendations: string[];
}