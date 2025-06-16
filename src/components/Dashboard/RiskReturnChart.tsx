// src/components/Dashboard/RiskReturnChart.tsx

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface RiskReturnChartProps {
  data: any[];
}

const RiskReturnChart: React.FC<RiskReturnChartProps> = ({ data }) => {
  const chartData = data.map(item => {
    const currentPrice = item.preco_atual_mai || 0;
    const predictedPrice = item.previsao_jun || 0;
    const returnPerc = currentPrice > 0 ? ((predictedPrice - currentPrice) / currentPrice) * 100 : 0;
    const risk = (item.previsao_max_jun || 0) - (item.previsao_min_jun || 0);
    
    return {
      name: `${item.produto} (${item.uf})`,
      risk: risk,
      return: returnPerc,
      size: 1,
    };
  }).filter(item => item.risk > 0 && item.return !== 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg text-sm">
          <p className="font-bold mb-1">{data.name}</p>
          <p className="text-red-600">Risk (Forecast Range): $ {data.risk.toFixed(2)}</p>
          <p className="text-green-600">Predicted Return: {data.return.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Risk vs. Return Analysis</CardTitle>
        <CardDescription>Compare predicted return with forecast volatility for June.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="risk" name="Risk (Forecast Range)" unit=" $" tick={{ fontSize: 12 }} />
              <YAxis type="number" dataKey="return" name="Predicted Return" unit="%" tickFormatter={(value) => `${value.toFixed(0)}%`} tick={{ fontSize: 12 }} />
              <ZAxis type="number" dataKey="size" range={[100, 101]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
              <Scatter name="Products" data={chartData} fill="#10B981" shape="circle" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskReturnChart;