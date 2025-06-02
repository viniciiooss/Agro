
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ChartBar, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-agro-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-agro-600 to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gradient">AgriPredict</span>
          </div>
          <Link to="/login">
            <Button variant="outline" className="border-agro-200 hover:bg-agro-50">
              <User className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Previsões Inteligentes para o
            <span className="block text-gradient">Agronegócio Brasileiro</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
            Antecipe as flutuações de preços dos produtos agrícolas com nossa plataforma de 
            análise preditiva. Tome decisões mais informadas baseadas em dados históricos e 
            tendências de mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-agro-600 to-primary hover:from-agro-700 hover:to-agro-600">
                Começar Agora
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-agro-200 hover:bg-agro-50">
              <ArrowDown className="w-4 h-4 mr-2" />
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o AgriPredict?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma oferece as ferramentas mais avançadas para análise e previsão 
              de preços no setor agrícola.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card hover:shadow-lg transition-all duration-300 animate-slide-up">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-agro-600 to-primary rounded-lg flex items-center justify-center mb-4">
                  <ChartBar className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Análise Preditiva</CardTitle>
                <CardDescription>
                  Algoritmos avançados que analisam dados históricos para prever tendências futuras de preços.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Modelos de machine learning</li>
                  <li>• Precisão superior a 90%</li>
                  <li>• Atualizações em tempo real</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-agro-600 to-primary rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Análise Detalhada</CardTitle>
                <CardDescription>
                  Explore dados por produto, região e período com nossa interface intuitiva.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Filtros avançados</li>
                  <li>• Visualizações interativas</li>
                  <li>• Exportação de relatórios</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-agro-600 to-primary rounded-lg flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Recomendações Personalizadas</CardTitle>
                <CardDescription>
                  Receba insights específicos para seu perfil e região de atuação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Alertas personalizados</li>
                  <li>• Estratégias de compra/venda</li>
                  <li>• Análise de risco</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-gradient mb-2">150+</div>
              <p className="text-gray-600">Produtos Monitorados</p>
            </div>
            <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold text-gradient mb-2">27</div>
              <p className="text-gray-600">Estados Cobertos</p>
            </div>
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold text-gradient mb-2">94%</div>
              <p className="text-gray-600">Precisão Média</p>
            </div>
            <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold text-gradient mb-2">5k+</div>
              <p className="text-gray-600">Usuários Ativos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-agro-600 to-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para revolucionar suas decisões?
          </h2>
          <p className="text-xl text-agro-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de produtores e empresários que já usam nossa plataforma 
            para maximizar seus resultados.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="bg-white text-agro-700 hover:bg-agro-50">
              Começar Gratuitamente
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-agro-600 to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold">AgriPredict</span>
          </div>
          <p className="text-gray-400 mb-4">
            Transformando dados em decisões inteligentes para o agronegócio brasileiro.
          </p>
          <p className="text-sm text-gray-500">
            © 2024 AgriPredict. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
