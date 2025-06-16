import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';

interface RecommendationCardProps {
  product: string;
  classification: string;
  currentPrice: number;
  predictedPrice: number;
  accuracy: number;
  state: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ product, classification, currentPrice, predictedPrice, accuracy, state }) => {
  const change = currentPrice > 0 ? ((predictedPrice - currentPrice) / currentPrice) * 100 : 0;
  const isPositive = change > 0;

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-emerald-800">{product}</CardTitle>
            <CardDescription className="text-emerald-600">{classification} - {state}</CardDescription>
          </div>
          <Badge variant={isPositive ? 'default' : 'destructive'} className={isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {change.toFixed(1)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-baseline">
          <div className="text-center">
            <p className="text-xs text-gray-500">Current</p>
            <p className="text-lg font-semibold text-gray-700">$ {currentPrice.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Forecast (Jun)</p>
            <p className="text-2xl font-bold text-emerald-700">$ {predictedPrice.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-600 bg-gray-50 p-2 rounded-md">
          <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
          <span>Model Accuracy: {accuracy.toFixed(1)}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;