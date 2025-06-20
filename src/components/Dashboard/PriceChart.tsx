import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface PriceChartProps {
  data: any[];
  title: string;
  product: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, title, product }) => {
  const chartData = [
    { month: 'Janeiro', atual: data[0]?.preco_atual_jan || 0, previsao: data[0]?.previsao_jan || 0 },
    { month: 'Fevereiro', atual: data[0]?.preco_atual_fev || 0, previsao: data[0]?.previsao_fev || 0 },
    { month: 'Março', atual: data[0]?.preco_atual_mar || null, previsao: data[0]?.previsao_mar || 0 },
    { month: 'Abril', atual: data[0]?.preco_atual_abr || null, previsao: data[0]?.previsao_abr || 0 },
    { month: 'Maio', atual: data[0]?.preco_atual_mai || null, previsao: data[0]?.previsao_mai || 0 },
    { month: 'Junho', atual: null, previsao: data[0]?.previsao_jun || 0 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}:</span> R$ {entry.value?.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const lastMonthWithPrice = chartData.slice().reverse().find(d => d.atual !== null);
  const currentPrice = lastMonthWithPrice ? lastMonthWithPrice.atual : 0;
  const predictedPrice = data[0]?.previsao_jun || 0;

  // Corrigido para evitar divisão por zero
  const change = currentPrice > 0 ? ((predictedPrice - currentPrice) / currentPrice) * 100 : 0;
  const isPositive = change > 0;

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-indigo-800">
              <BarChart3 className="w-5 h-5 mr-2" />
              {title}
            </CardTitle>
            <CardDescription className="text-indigo-600 font-medium">
              {product}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <TrendingUp className={`w-5 h-5 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
              <span className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{change.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-gray-600">Variação prevista</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorAtual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorPrevisao" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#D1D5DB' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#D1D5DB' }}
                tickFormatter={(value) => `R$ ${value.toFixed(1)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Area
                type="monotone"
                dataKey="atual"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorAtual)"
                strokeWidth={3}
                name="Preço Atual"
                connectNulls={false}
              />
              <Area
                type="monotone"
                dataKey="previsao"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorPrevisao)"
                strokeWidth={3}
                strokeDasharray="8 4"
                name="Previsão"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Atual ({lastMonthWithPrice ? lastMonthWithPrice.month : 'N/A'})</p>
            <p className="text-lg font-bold text-blue-600">R$ {currentPrice.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Previsão (Jun)</p>
            <p className="text-lg font-bold text-green-600">R$ {predictedPrice.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Acurácia</p>
            <p className="text-lg font-bold text-indigo-600">{data[0]?.acuracia_modelo_perc.toFixed(1)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;