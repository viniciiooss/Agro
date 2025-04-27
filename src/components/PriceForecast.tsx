import React from 'react';
import { Product } from '../types';

interface PriceForecastProps {
  product: Product;
  darkMode: boolean;
}

interface ForecastRow {
  timeFrame: string;
  price: number;
  change: number;
}

export const PriceForecast: React.FC<PriceForecastProps> = ({ product, darkMode }) => {
  const forecasts: ForecastRow[] = [
    {
      timeFrame: 'Current Price',
      price: product.currentPrice,
      change: 0,
    },
    {
      timeFrame: 'Next Week',
      price: product.currentPrice * 1.0281,
      change: 2.81,
    },
    {
      timeFrame: 'Next Month',
      price: product.currentPrice * 1.0596,
      change: 5.96,
    },
    {
      timeFrame: 'Next Quarter',
      price: product.currentPrice * 1.1053,
      change: 10.53,
    },
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Price Forecast
          </h3>
          <div className="flex items-center mt-2">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Confidence
            </span>
            <div className="ml-3 flex items-center">
              <div className="w-32 h-2 bg-green-200 rounded-full">
                <div
                  className="h-2 bg-green-600 rounded-full"
                  style={{ width: `${product.confidence}%` }}
                />
              </div>
              <span className="ml-2 text-sm text-green-600">{product.confidence}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-2">Time Frame</th>
              <th className="pb-2">Price (USD/Bushel)</th>
              <th className="pb-2">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {forecasts.map((forecast, index) => (
              <tr key={index} className={darkMode ? 'border-gray-700' : ''}>
                <td className="py-3 font-medium">{forecast.timeFrame}</td>
                <td className="py-3">{forecast.price.toFixed(2)}</td>
                <td className={`py-3 ${
                  forecast.change > 0 ? 'text-green-500' : forecast.change < 0 ? 'text-red-500' : ''
                }`}>
                  {forecast.change > 0 ? '+' : ''}{forecast.change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`mt-6 p-4 rounded-lg ${
        darkMode ? 'bg-gray-700' : 'bg-green-50'
      }`}>
        <h4 className={`text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          AI Recommendation
        </h4>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Hold for potential price increases. Consider selling in phases as prices rise.
        </p>
      </div>
    </div>
  );
};