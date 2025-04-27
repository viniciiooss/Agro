import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { DetailedAnalysis as DetailedAnalysisType } from '../types';

interface DetailedAnalysisProps {
  analysis: DetailedAnalysisType;
}

export const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({ analysis }) => {
  const getSentimentIcon = () => {
    switch (analysis.marketSentiment) {
      case 'positive':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendIcon = () => {
    switch (analysis.seasonalTrend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Tendência Sazonal</h3>
            {getTrendIcon()}
          </div>
          <p className="text-lg font-semibold">
            {analysis.seasonalTrend === 'up' ? 'Alta' : analysis.seasonalTrend === 'down' ? 'Baixa' : 'Estável'}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Sentimento do Mercado</h3>
            {getSentimentIcon()}
          </div>
          <p className="text-lg font-semibold">
            {analysis.marketSentiment === 'positive' ? 'Positivo' : 
             analysis.marketSentiment === 'negative' ? 'Negativo' : 'Neutro'}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Faixa de Preço Esperada</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Mínimo</p>
            <p className="text-lg font-semibold">R$ {analysis.priceRange.min.toFixed(2)}</p>
          </div>
          <div className="h-8 w-px bg-gray-200"></div>
          <div>
            <p className="text-sm text-gray-500">Máximo</p>
            <p className="text-lg font-semibold">R$ {analysis.priceRange.max.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Recomendações</h3>
        <ul className="space-y-2">
          {analysis.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-blue-500 mr-2"></span>
              <span className="text-sm text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};