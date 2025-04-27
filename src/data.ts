import { Product, PriceHistory, DetailedAnalysis } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Soja',
    currentPrice: 150.75,
    predictedPrice: 162.30,
    confidence: 85,
    trend: 'up',
    category: 'Grãos',
    image: 'https://images.unsplash.com/photo-1601014868946-d3147ad328b5?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    name: 'Milho',
    currentPrice: 45.20,
    predictedPrice: 43.80,
    confidence: 78,
    trend: 'down',
    category: 'Grãos',
    image: 'https://images.unsplash.com/photo-1601591539749-f14c83f327c7?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '3',
    name: 'Café',
    currentPrice: 890.50,
    predictedPrice: 905.20,
    confidence: 92,
    trend: 'up',
    category: 'Commodities',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1000',
  },
];

export const getPriceHistory = (productId: string): PriceHistory[] => {
  const basePrice = products.find(p => p.id === productId)?.currentPrice || 100;
  const history: PriceHistory[] = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const randomVariation = (Math.random() - 0.5) * 10;
    const price = basePrice + randomVariation;
    const volume = Math.floor(Math.random() * 1000) + 500;
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: Number(price.toFixed(2)),
      volume,
    });
  }
  
  return history;
};

export const getDetailedAnalysis = (productId: string): DetailedAnalysis => {
  const product = products.find(p => p.id === productId);
  const basePrice = product?.currentPrice || 100;

  return {
    seasonalTrend: Math.random() > 0.5 ? 'up' : 'down',
    marketSentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as 'positive' | 'negative' | 'neutral',
    priceRange: {
      min: basePrice * 0.9,
      max: basePrice * 1.1,
    },
    recommendations: [
      'Considerar venda nos próximos 30 dias',
      'Monitorar condições climáticas',
      'Acompanhar demanda internacional',
    ],
  };
};