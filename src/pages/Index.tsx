
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChartBar, Search, User, TrendingUp, Sparkles, Star, BarChart3, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-emerald-100/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              AgriPredict
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-emerald-700 hover:bg-emerald-50">
                Dashboard
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white shadow-lg">
                <User className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 via-transparent to-green-100/30 pointer-events-none"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-6 flex justify-center">
            <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              IA para Agronegócio
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Previsões
            <span className="block bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              Inteligentes
            </span>
            <span className="block text-4xl md:text-6xl text-gray-700">
              para o Agronegócio
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Antecipe as flutuações de preços dos produtos agrícolas com nossa plataforma de 
            análise preditiva alimentada por <span className="font-semibold text-emerald-600">inteligência artificial</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white shadow-xl text-lg px-8 py-6 h-auto">
                Começar Gratuitamente
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-6 h-auto">
                <BarChart3 className="w-5 h-5 mr-2" />
                Ver Dashboard
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
                150+
              </div>
              <p className="text-gray-600 font-medium">Produtos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
                27
              </div>
              <p className="text-gray-600 font-medium">Estados</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
                94%
              </div>
              <p className="text-gray-600 font-medium">Precisão</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
                5k+
              </div>
              <p className="text-gray-600 font-medium">Usuários</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4">
              Recursos Avançados
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Por que escolher o
              <span className="block bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                AgriPredict?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma oferece as ferramentas mais avançadas para análise e previsão 
              de preços no setor agrícola brasileiro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ChartBar className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">Análise Preditiva</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Algoritmos avançados de machine learning que analisam dados históricos para prever tendências futuras.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Star className="w-5 h-5 text-yellow-500 mr-3" />
                    <span>Modelos de IA avançados</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Star className="w-5 h-5 text-yellow-500 mr-3" />
                    <span>Precisão superior a 90%</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Star className="w-5 h-5 text-yellow-500 mr-3" />
                    <span>Atualizações em tempo real</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">Análise Detalhada</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Explore dados por produto, classificação, região e período com nossa interface intuitiva.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Zap className="w-5 h-5 text-orange-500 mr-3" />
                    <span>Filtros avançados</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Zap className="w-5 h-5 text-orange-500 mr-3" />
                    <span>Visualizações interativas</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Zap className="w-5 h-5 text-orange-500 mr-3" />
                    <span>Exportação de relatórios</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">Recomendações IA</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Receba insights personalizados e estratégias otimizadas para seu perfil e região.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Shield className="w-5 h-5 text-green-500 mr-3" />
                    <span>Alertas personalizados</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Shield className="w-5 h-5 text-green-500 mr-3" />
                    <span>Estratégias de compra/venda</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Shield className="w-5 h-5 text-green-500 mr-3" />
                    <span>Análise de risco</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge className="bg-white/20 text-white border-white/30 mb-6">
            Comece Hoje Mesmo
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Pronto para revolucionar
            <span className="block">suas decisões?</span>
          </h2>
          <p className="text-xl md:text-2xl text-emerald-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Junte-se a milhares de produtores e empresários que já usam nossa plataforma 
            para maximizar seus resultados no agronegócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl text-lg px-8 py-6 h-auto font-semibold">
                Começar Gratuitamente
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto">
                <BarChart3 className="w-5 h-5 mr-2" />
                Explorar Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                AgriPredict
              </span>
            </div>
            <p className="text-xl text-gray-400 mb-6 max-w-2xl mx-auto">
              Transformando dados em decisões inteligentes para o agronegócio brasileiro.
            </p>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2024 AgriPredict. Todos os direitos reservados. Desenvolvido com ❤️ para o agronegócio brasileiro.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
