import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface SentimentChartProps {
  data: any[];
}

const COLORS = {
  Opportunities: '#10B981',
  Risks: '#F59E0B',      
  Stable: '#3B82F6',     
};

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const getRecommendationCategory = (item: any) => {
    const lastPrice = item.preco_atual_mai ?? item.preco_atual_abr ?? item.preco_atual_mar ?? item.preco_atual_fev ?? item.preco_atual_jan ?? 0;
    const predictedPrice = item.previsao_jun || 0;
    if (lastPrice === 0) return 'Stable';
    const change = (predictedPrice - lastPrice) / lastPrice;
    if (change > 0.05) return 'Opportunities';
    if (change < -0.05) return 'Risks';
    return 'Stable';
  };
  
  const sentimentData = [
    { name: 'Opportunities', value: data.filter(item => getRecommendationCategory(item) === 'Opportunities').length },
    { name: 'Risks', value: data.filter(item => getRecommendationCategory(item) === 'Risks').length },
    { name: 'Stable', value: data.filter(item => getRecommendationCategory(item) === 'Stable').length },
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded-lg shadow-lg text-sm">
          <p className="font-bold">{dataPoint.name}: {dataPoint.value} products</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <TrendingUp className="w-5 h-5 mr-2" />
          Market Sentiment
        </CardTitle>
        <CardDescription>Distribution of current trends.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name" labelLine={false} label={false}>
                {sentimentData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" align="center" height={40} iconSize={10} wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} formatter={(value, entry) => ( <span className="text-gray-700">{value} ({entry.payload?.value})</span> )} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentChart;