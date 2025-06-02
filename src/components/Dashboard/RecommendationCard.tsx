
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface RecommendationCardProps {
  product: string;
  classification: string;
  currentPrice: number;
  predictedPrice: number;
  accuracy: number;
  state: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  product,
  classification,
  currentPrice,
  predictedPrice,
  accuracy,
  state
}) => {
  const trend = predictedPrice > currentPrice ? 'up' : 'down';
  const percentage = Math.abs(((predictedPrice - currentPrice) / currentPrice) * 100);
  
  const getRecommendation = () => {
    if (trend === 'up' && percentage > 5) {
      return {
        action: 'COMPRAR',
        color: 'bg-green-100 text-green-800',
        message: 'Boa oportunidade de compra antes da alta'
      };
    } else if (trend === 'down' && percentage > 5) {
      return {
        action: 'VENDER',
        color: 'bg-red-100 text-red-800',
        message: 'Considere vender antes da queda'
      };
    } else {
      return {
        action: 'AGUARDAR',
        color: 'bg-yellow-100 text-yellow-800',
        message: 'Preço estável, aguarde melhor momento'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{product}</CardTitle>
            <CardDescription className="text-sm">{classification}</CardDescription>
            <CardDescription className="text-xs text-gray-500">{state}</CardDescription>
          </div>
          <Badge className={recommendation.color}>
            {recommendation.action}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Preço Atual:</span>
            <span className="font-medium">R$ {currentPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Previsão Junho:</span>
            <div className="flex items-center space-x-1">
              <span className="font-medium">R$ {predictedPrice.toFixed(2)}</span>
              {trend === 'up' ? (
                <ArrowUp className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-600" />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Variação:</span>
            <span className={`font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? '+' : '-'}{percentage.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Acurácia:</span>
            <span className="font-medium">{accuracy.toFixed(1)}%</span>
          </div>
          <div className="pt-2 border-t">
            <p className="text-sm text-gray-700">{recommendation.message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
