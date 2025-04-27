import React from 'react';
import { TrendingUp, TrendingDown, Minus, BarChart } from 'lucide-react';
import { Product } from '../types';

interface PriceCardProps {
  product: Product;
  onClick: (product: Product) => void;
  darkMode: boolean;
}

export const PriceCard: React.FC<PriceCardProps> = ({ product, onClick, darkMode }) => {
  const getTrendIcon = () => {
    switch (product.trend) {
      case 'up':
        return <TrendingUp className="text-green-500" />;
      case 'down':
        return <TrendingDown className="text-red-500" />;
      default:
        return <Minus className="text-gray-500" />;
    }
  };

  const priceDifference = product.predictedPrice - product.currentPrice;
  const percentageChange = ((priceDifference / product.currentPrice) * 100).toFixed(2);

  return (
    <div 
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105`}
      onClick={() => onClick(product)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="ml-4">
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{product.category}</p>
          </div>
        </div>
        {getTrendIcon()}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Preço Atual</p>
          <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>R$ {product.currentPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Previsão</p>
          <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>R$ {product.predictedPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Confiança da Previsão</p>
          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.confidence}%</p>
        </div>
        <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 mt-1`}>
          <div 
            className="bg-blue-600 rounded-full h-2"
            style={{ width: `${product.confidence}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`text-sm font-medium ${priceDifference >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {priceDifference >= 0 ? '+' : ''}{percentageChange}%
        </span>
        <button 
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <BarChart className="w-4 h-4 mr-1" />
          Ver Análise
        </button>
      </div>
    </div>
  );
};