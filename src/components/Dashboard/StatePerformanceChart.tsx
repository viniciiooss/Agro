import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface StatePerformanceChartProps {
  data: any[];
}

const StatePerformanceChart: React.FC<StatePerformanceChartProps> = ({ data }) => {
  const stateData = data
    .map(item => {
      const currentPrice = item.preco_atual_mai || 0;
      const predictedPrice = item.previsao_jun || 0;
      const change = currentPrice > 0 ? ((predictedPrice - currentPrice) / currentPrice) * 100 : 0;
      return {
        state: item.uf,
        change: change,
      };
    })
    .sort((a, b) => b.change - a.change);

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Desempenho por Estado</CardTitle>
        <CardDescription>Variação de preço prevista para Junho nos estados selecionados.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stateData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" unit="%" tickFormatter={(value) => value.toFixed(0)} />
              <YAxis type="category" dataKey="state" width={60} />
              <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
              <Legend />
              <Bar dataKey="change" name="Variação Prevista (%)" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatePerformanceChart;