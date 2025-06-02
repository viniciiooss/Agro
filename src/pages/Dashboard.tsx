
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChartBar, Search, User, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import PriceChart from '@/components/Dashboard/PriceChart';
import RecommendationCard from '@/components/Dashboard/RecommendationCard';
import { agriculturalData, getUniqueProducts, filterDataWithClassification } from '@/data/sampleData';

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedClassification, setSelectedClassification] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  
  const products = getUniqueProducts();
  
  // Filtros dependentes
  const availableClassifications = useMemo(() => {
    if (selectedProduct === 'all') {
      return [...new Set(agriculturalData.map(item => item.classificao_produto))];
    }
    return [...new Set(agriculturalData
      .filter(item => item.produto === selectedProduct)
      .map(item => item.classificao_produto))];
  }, [selectedProduct]);

  const availableStates = useMemo(() => {
    if (selectedProduct === 'all' && selectedClassification === 'all') {
      return [...new Set(agriculturalData.map(item => item.uf))];
    }
    return [...new Set(agriculturalData
      .filter(item => {
        const matchesProduct = selectedProduct === 'all' || item.produto === selectedProduct;
        const matchesClassification = selectedClassification === 'all' || item.classificao_produto === selectedClassification;
        return matchesProduct && matchesClassification;
      })
      .map(item => item.uf))];
  }, [selectedProduct, selectedClassification]);
  
  // Dados filtrados para gráficos (com estado)
  const filteredData = useMemo(() => {
    if (selectedProduct === 'all' && selectedClassification === 'all' && selectedState === 'all') {
      return agriculturalData.slice(0, 5);
    }
    return filterDataWithClassification(
      selectedProduct === 'all' ? '' : selectedProduct,
      selectedClassification === 'all' ? '' : selectedClassification, 
      selectedState === 'all' ? '' : selectedState
    );
  }, [selectedProduct, selectedClassification, selectedState]);

  // Dados para recomendações (sem filtro de estado)
  const recommendationData = useMemo(() => {
    if (selectedProduct === 'all' && selectedClassification === 'all') {
      return agriculturalData;
    }
    return filterDataWithClassification(
      selectedProduct === 'all' ? '' : selectedProduct,
      selectedClassification === 'all' ? '' : selectedClassification,
      '' // Sem filtro de estado para recomendações
    );
  }, [selectedProduct, selectedClassification]);

  const displayData = filteredData.length > 0 ? filteredData : agriculturalData.slice(0, 5);

  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
    // Reset classificação e estado quando produto muda
    setSelectedClassification('all');
    setSelectedState('all');
  };

  const handleClassificationChange = (value: string) => {
    setSelectedClassification(value);
    // Reset estado quando classificação muda
    setSelectedState('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              AgriPredict
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              Dashboard
            </Badge>
            <Link to="/login">
              <Button variant="outline" size="sm" className="hover:bg-emerald-50">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            Dashboard de Previsões
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Monitore as tendências e tome decisões estratégicas baseadas em dados inteligentes
          </p>
        </div>

        {/* Filters */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg">
            <CardTitle className="flex items-center text-emerald-800">
              <Search className="w-5 h-5 mr-2" />
              Filtros de Análise
            </CardTitle>
            <CardDescription className="text-emerald-600">
              Selecione o produto, classificação e estado para análise detalhada
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Produto</label>
                <Select value={selectedProduct} onValueChange={handleProductChange}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-emerald-300 transition-colors">
                    <SelectValue placeholder="Todos os produtos" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-xl border-0 z-50">
                    <SelectItem value="all" className="font-medium">Todos os produtos</SelectItem>
                    {products.map(product => (
                      <SelectItem key={product} value={product} className="hover:bg-emerald-50">
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Classificação</label>
                <Select value={selectedClassification} onValueChange={handleClassificationChange}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-emerald-300 transition-colors">
                    <SelectValue placeholder="Todas as classificações" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-xl border-0 z-50">
                    <SelectItem value="all" className="font-medium">Todas as classificações</SelectItem>
                    {availableClassifications.map(classification => (
                      <SelectItem key={classification} value={classification} className="hover:bg-emerald-50">
                        {classification}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Estado</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-emerald-300 transition-colors">
                    <SelectValue placeholder="Todos os estados" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-xl border-0 z-50">
                    <SelectItem value="all" className="font-medium">Todos os estados</SelectItem>
                    {availableStates.map(state => (
                      <SelectItem key={state} value={state} className="hover:bg-emerald-50">
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={() => {
                    setSelectedProduct('all');
                    setSelectedClassification('all');
                    setSelectedState('all');
                  }}
                  variant="outline"
                  className="w-full h-12 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Produtos Monitorados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">
                {displayData.length}
              </div>
              <p className="text-xs text-blue-600 mt-1">ativos no sistema</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Acurácia Média
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-800">
                {displayData.length > 0 ? (displayData.reduce((acc, item) => acc + item.acuracia_modelo_perc, 0) / displayData.length).toFixed(1) : '0'}%
              </div>
              <p className="text-xs text-emerald-600 mt-1">precisão do modelo</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Maior Alta Prevista
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">
                +{displayData.length > 0 ? Math.max(...displayData.map(item => {
                  const current = item.preco_atual_mai || 0;
                  const predicted = item.previsao_jun || 0;
                  return current > 0 ? ((predicted - current) / current) * 100 : 0;
                })).toFixed(1) : '0'}%
              </div>
              <p className="text-xs text-green-600 mt-1">oportunidade de ganho</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 flex items-center">
                <ChartBar className="w-4 h-4 mr-2" />
                Estados Cobertos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-800">
                {selectedState === 'all' ? availableStates.length : 1}
              </div>
              <p className="text-xs text-purple-600 mt-1">regiões analisadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart and Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {displayData.slice(0, 1).map((item, index) => (
              <PriceChart
                key={index}
                data={[item]}
                title="Evolução de Preços"
                product={`${item.produto} - ${item.classificao_produto} - ${item.uf}`}
              />
            ))}
          </div>
          
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg">
              <CardTitle className="flex items-center text-emerald-800">
                <ChartBar className="w-5 h-5 mr-2" />
                Resumo Executivo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-800">Oportunidades</h4>
                  </div>
                  <p className="text-sm text-green-700">
                    {displayData.filter(item => {
                      const current = item.preco_atual_mai || 0;
                      const predicted = item.previsao_jun || 0;
                      return predicted > current * 1.05;
                    }).length} produtos com alta prevista acima de 5%
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
                  <div className="flex items-center mb-2">
                    <TrendingDown className="w-5 h-5 text-yellow-600 mr-2" />
                    <h4 className="font-semibold text-yellow-800">Atenção</h4>
                  </div>
                  <p className="text-sm text-yellow-700">
                    {displayData.filter(item => {
                      const current = item.preco_atual_mai || 0;
                      const predicted = item.previsao_jun || 0;
                      return predicted < current * 0.95;
                    }).length} produtos com queda prevista acima de 5%
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex items-center mb-2">
                    <Activity className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-800">Estáveis</h4>
                  </div>
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
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
              Recomendações Estratégicas
            </h2>
            <p className="text-gray-600">Insights baseados em inteligência artificial para suas decisões</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendationData.slice(0, 6).map((item, index) => (
              <RecommendationCard
                key={`${item.produto}-${item.classificao_produto}-${item.uf}-${index}`}
                product={item.produto}
                classification={item.classificao_produto}
                currentPrice={item.preco_atual_mai || 0}
                predictedPrice={item.previsao_jun || 0}
                accuracy={item.acuracia_modelo_perc}
                state={item.uf}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
