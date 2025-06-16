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
      risco: risk,
      retorno: returnPerc,
      size: 1, // Base size, can be used for another dimension if needed
    };
  }).filter(item => item.risco > 0 && item.retorno !== 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg text-sm">
          <p className="font-bold mb-1">{data.name}</p>
          <p className="text-red-600">Risco (Amplitude): R$ {data.risco.toFixed(2)}</p>
          <p className="text-green-600">Retorno Previsto: {data.retorno.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Análise de Risco vs. Retorno</CardTitle>
        <CardDescription>Compare o retorno previsto com a volatilidade da previsão para Junho.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="risco" 
                name="Risco (Amplitude da Previsão)" 
                unit=" R$"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                type="number" 
                dataKey="retorno" 
                name="Retorno Previsto" 
                unit="%"
                tickFormatter={(value) => `${value.toFixed(0)}%`}
                tick={{ fontSize: 12 }}
              />
              <ZAxis type="number" dataKey="size" range={[100, 101]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
              <Scatter name="Produtos" data={chartData} fill="#10B981" shape="circle" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskReturnChart;