
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ChartBar, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import PriceChart from '@/components/Dashboard/PriceChart';
import RecommendationCard from '@/components/Dashboard/RecommendationCard';
import { agriculturalData, getUniqueProducts, getUniqueStates, filterData } from '@/data/sampleData';

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  
  const products = getUniqueProducts();
  const states = getUniqueStates();
  const filteredData = filterData(selectedProduct, selectedState);

  // Dados para gráficos e recomendações
  const displayData = filteredData.length > 0 ? filteredData : agriculturalData.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-agro-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-agro-600 to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gradient">AgriPredict</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="outline">Dashboard</Badge>
            <Link to="/login">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard de Previsões
          </h1>
          <p className="text-gray-600">
            Monitore as tendências e tome decisões estratégicas baseadas em dados
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Filtros de Análise
            </CardTitle>
            <CardDescription>
              Selecione o produto e estado para análise detalhada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Produto</label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os produtos" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="">Todos os produtos</SelectItem>
                    {products.map(product => (
                      <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Estado</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os estados" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="">Todos os estados</SelectItem>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={() => {
                    setSelectedProduct('');
                    setSelectedState('');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Produtos Monitorados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-agro-700">
                {displayData.length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Acurácia Média
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-agro-700">
                {(displayData.reduce((acc, item) => acc + item.acuracia_modelo_perc, 0) / displayData.length).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Maior Alta Prevista
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                +{Math.max(...displayData.map(item => {
                  const current = item.preco_atual_mai || 0;
                  const predicted = item.previsao_jun || 0;
                  return current > 0 ? ((predicted - current) / current) * 100 : 0;
                })).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Estados Cobertos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-agro-700">
                {selectedState ? 1 : states.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {displayData.slice(0, 1).map((item, index) => (
            <PriceChart
              key={index}
              data={[item]}
              title="Evolução de Preços"
              product={`${item.produto} - ${item.uf}`}
            />
          ))}
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ChartBar className="w-5 h-5 mr-2" />
                Resumo Executivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-1">Oportunidades</h4>
                  <p className="text-sm text-green-700">
                    {displayData.filter(item => {
                      const current = item.preco_atual_mai || 0;
                      const predicted = item.previsao_jun || 0;
                      return predicted > current * 1.05;
                    }).length} produtos com alta prevista acima de 5%
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-1">Atenção</h4>
                  <p className="text-sm text-yellow-700">
                    {displayData.filter(item => {
                      const current = item.preco_atual_mai || 0;
                      const predicted = item.previsao_jun || 0;
                      return predicted < current * 0.95;
                    }).length} produtos com queda prevista acima de 5%
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Estáveis</h4>
                  <p className="text-sm text-blue-700">
                    {displayData.filter(item => {
                      const current = item.preco_atual_mai || 0;
                      const predicted = item.previsao_jun || 0;
                      const change = Math.abs((predicted - current) / current);
                      return change <= 0.05;
                    }).length} produtos com preços estáveis
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recomendações Estratégicas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.slice(0, 6).map((item, index) => (
              <RecommendationCard
                key={index}
                product={item.produto}
                currentPrice={item.preco_atual_mai || 0}
                predictedPrice={item.previsao_jun || 0}
                accuracy={item.acuracia_modelo_perc}
                state={item.uf}
              />
            ))}
          </div>
        </div>

        {/* Data Upload Section - Onde você pode adicionar o resto do CSV */}
        <Card className="border-dashed border-2 border-agro-200">
          <CardHeader className="text-center">
            <CardTitle className="text-agro-700">
              <ArrowDown className="w-8 h-8 mx-auto mb-2" />
              Adicionar Mais Dados
            </CardTitle>
            <CardDescription>
              Para adicionar o resto dos dados do CSV, edite o arquivo: 
              <code className="bg-gray-100 px-2 py-1 rounded text-sm ml-1">
                src/data/sampleData.ts
              </code>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              O arquivo atual contém apenas uma amostra dos dados. 
              Você pode expandir o array <code>agriculturalData</code> 
              com o resto das informações do seu CSV.
            </p>
            <Badge variant="outline" className="bg-agro-50">
              Localização: src/data/sampleData.ts
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
