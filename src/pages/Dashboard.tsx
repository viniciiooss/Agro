import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from "@/components/ui/label";
import { ChartBar, Search, User, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import PriceChart from '@/components/Dashboard/PriceChart';
import RecommendationCard from '@/components/Dashboard/RecommendationCard';
import { agriculturalData, getUniqueProducts, filterDataWithClassification } from '@/data/sampleData';
import RiskReturnChart from '@/components/Dashboard/RiskReturnChart';
import StatePerformanceChart from '@/components/Dashboard/StatePerformanceChart';
import SentimentChart from '@/components/Dashboard/SentimentChart';
import AIAnalysisCard from '@/components/Dashboard/AIAnalysisCard';

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedClassification, setSelectedClassification] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  const products = getUniqueProducts();

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

  const findLastPrice = (item: any) => {
    return item.preco_atual_mai ?? item.preco_atual_abr ?? item.preco_atual_mar ?? item.preco_atual_fev ?? item.preco_atual_jan ?? 0;
  }
  
  const filteredData = useMemo(() => {
    return filterDataWithClassification(
      selectedProduct === 'all' ? '' : selectedProduct,
      selectedClassification === 'all' ? '' : selectedClassification,
      selectedState === 'all' ? '' : selectedState
    );
  }, [selectedProduct, selectedClassification, selectedState]);

  const recommendationData = useMemo(() => {
    return filterDataWithClassification(
      selectedProduct === 'all' ? '' : selectedProduct,
      selectedClassification === 'all' ? '' : selectedClassification,
      ''
    );
  }, [selectedProduct, selectedClassification]);

  const sortedRecommendationData = useMemo(() => {
    const dataWithChange = recommendationData.map(item => {
      const lastPrice = findLastPrice(item);
      const predictedPrice = item.previsao_jun || 0;
      
      const percentageChange = lastPrice > 0 
          ? ((predictedPrice - lastPrice) / lastPrice) * 100 
          : 0;

      return { ...item, percentageChange };
    });

    return dataWithChange.sort((a, b) => b.percentageChange - a.percentageChange);
  }, [recommendationData]);

  const chartDisplayData = useMemo(() => {
    if (filteredData.length === 1) {
      return filteredData;
    }

    if (filteredData.length > 0) {
      const averageData: any = {
        produto: selectedProduct === 'all' ? 'Média de Produtos' : selectedProduct,
        classificao_produto: selectedClassification === 'all' ? 'Média' : selectedClassification,
        uf: selectedState === 'all' ? 'Todos' : selectedState,
        acuracia_modelo_perc: 0,
      };

      const keysToAverage = [
        "preco_atual_jan", "previsao_jan", "preco_atual_fev", "previsao_fev",
        "preco_atual_mar", "previsao_mar", "preco_atual_abr", "previsao_abr",
        "preco_atual_mai", "previsao_mai", "previsao_jun", "previsao_min_jun",
        "previsao_max_jun", "acuracia_modelo_perc"
      ];
      
      const counts: { [key: string]: number } = {};

      keysToAverage.forEach(key => {
        averageData[key] = 0;
        counts[key] = 0;
      });

      filteredData.forEach(item => {
        keysToAverage.forEach(key => {
          if (typeof (item as any)[key] === 'number') {
            averageData[key] += (item as any)[key];
            counts[key]++;
          }
        });
      });

      keysToAverage.forEach(key => {
        if (counts[key] > 0) {
          averageData[key] /= counts[key];
        }
      });
      
      return [averageData];
    }

    return [];
  }, [filteredData, selectedProduct, selectedClassification, selectedState]);
  
  const statCardData = filteredData.length > 0 ? filteredData : agriculturalData;
  const monitoredProductsCount = new Set(statCardData.map(p => p.produto)).size;

  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
    setSelectedClassification('all');
    setSelectedState('all');
  };

  const handleClassificationChange = (value: string) => {
    setSelectedClassification(value);
    setSelectedState('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
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
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/news" className="text-sm font-medium text-gray-600 hover:text-emerald-700 hidden sm:block">
                Notícias
            </Link>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              Dashboard
            </Badge>
            <Link to="/profile">
              <Button variant="outline" size="sm" className="hover:bg-emerald-50">
                <User className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Perfil</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            Dashboard de Previsões
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Monitore as tendências e tome decisões estratégicas.
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-800">
              <Search className="w-5 h-5 mr-2" />
              Filtros de Análise
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-select">Produto</Label>
                <Select value={selectedProduct} onValueChange={handleProductChange}>
                  <SelectTrigger id="product-select" className="h-11 border-gray-200">
                    <SelectValue placeholder="Todos os produtos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os produtos</SelectItem>
                    {products.map(product => (
                      <SelectItem key={product} value={product}>{product}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="class-select">Classificação</Label>
                <Select value={selectedClassification} onValueChange={handleClassificationChange}>
                  <SelectTrigger id="class-select" className="h-11 border-gray-200">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as classificações</SelectItem>
                    {availableClassifications.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state-select">Estado</Label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger id="state-select" className="h-11 border-gray-200">
                    <SelectValue placeholder="Todos os estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os estados</SelectItem>
                    {availableStates.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
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
                  className="w-full h-11 border-emerald-200 text-emerald-700"
                >
                  Limpar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-blue-700">
                Produtos Monitorados
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-blue-800">
                {monitoredProductsCount}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 shadow-lg">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-emerald-700">
                Acurácia Média
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-800">
                {statCardData.length > 0 ? (statCardData.reduce((acc, item) => acc + item.acuracia_modelo_perc, 0) / statCardData.length).toFixed(1) : '0'}%
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-green-700">
                Maior Alta Prevista
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-green-800">
                +{statCardData.length > 0 ? Math.max(...statCardData.map(item => {
                  const current = findLastPrice(item);
                  const predicted = item.previsao_jun || 0;
                  return current > 0 ? ((predicted - current) / current) * 100 : 0;
                })).toFixed(1) : '0'}%
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-purple-700">
                Estados Cobertos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-purple-800">
                {selectedState === 'all' ? availableStates.length : 1}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {chartDisplayData.length > 0 ? (
                <PriceChart
                  data={chartDisplayData}
                  title="Evolução de Preços"
                  product={`${chartDisplayData[0].produto} - ${chartDisplayData[0].classificao_produto} - ${chartDisplayData[0].uf}`}
                />
              ) : (
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center text-gray-500">
                    <p>Nenhum dado encontrado para os filtros selecionados.</p>
                  </div>
                </Card>
              )
            }
          </div>
          
          <div className="flex flex-col gap-8">
            <SentimentChart data={statCardData} />
            <AIAnalysisCard data={filteredData} />
          </div>
        </div>

        <div className="pt-8 border-t mt-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
                    Análises Avançadas
                </h2>
                <p className="text-gray-600">Explore as previsões por risco e região.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <RiskReturnChart data={filteredData} />
                 <StatePerformanceChart data={filteredData} />
            </div>
        </div>

        <div className="space-y-6 pt-8 border-t mt-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
              Recomendações Estratégicas
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Oportunidades de mercado ordenadas da maior para a menor variação de preço prevista.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedRecommendationData.map((item, index) => (
              <RecommendationCard
                key={`${item.produto}-${item.classificao_produto}-${item.uf}-${index}`}
                product={item.produto}
                classification={item.classificao_produto}
                currentPrice={findLastPrice(item)}
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