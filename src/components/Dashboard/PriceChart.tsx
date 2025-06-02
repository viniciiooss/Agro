
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PriceChartProps {
  data: any[];
  title: string;
  product: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, title, product }) => {
  const chartData = [
    { month: 'Jan', atual: data[0]?.preco_atual_jan || 0, previsao: data[0]?.previsao_jan || 0 },
    { month: 'Fev', atual: data[0]?.preco_atual_fev || 0, previsao: data[0]?.previsao_fev || 0 },
    { month: 'Mar', atual: data[0]?.preco_atual_mar || 0, previsao: data[0]?.previsao_mar || 0 },
    { month: 'Abr', atual: data[0]?.preco_atual_abr || 0, previsao: data[0]?.previsao_abr || 0 },
    { month: 'Mai', atual: data[0]?.preco_atual_mai || 0, previsao: data[0]?.previsao_mai || 0 },
    { month: 'Jun', atual: 0, previsao: data[0]?.previsao_jun || 0 },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{product}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [`R$ ${Number(value).toFixed(2)}`, name === 'atual' ? 'Preço Atual' : 'Previsão']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="atual" 
              stroke="#16a34a" 
              strokeWidth={2}
              name="Preço Atual"
            />
            <Line 
              type="monotone" 
              dataKey="previsao" 
              stroke="#22c55e" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Previsão"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
