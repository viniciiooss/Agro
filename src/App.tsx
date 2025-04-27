import React, { useState } from 'react';
import { Search, Filter, Layers, Moon, Sun } from 'lucide-react';
import { Product, User } from './types';
import { products, getPriceHistory, getDetailedAnalysis } from './data';
import { PriceCard } from './components/PriceCard';
import { PriceChart } from './components/PriceChart';
import { DetailedAnalysis } from './components/DetailedAnalysis';
import { Login } from './components/Login';
import { MarketInsights } from './components/MarketInsights';
import { PriceForecast } from './components/PriceForecast';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [timeRange, setTimeRange] = useState('3m');
  const [currentView, setCurrentView] = useState<'inicio' | 'forecasts' | 'insights'>('inicio');
  const [selectedCommodity, setSelectedCommodity] = useState(products[0]);

  const handleLogin = (email: string, password: string) => {
    setUser({
      email,
      name: email.split('@')[0],
    });
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (currentView) {
      case 'forecasts':
        return (
          <>
            <div className="flex items-center space-x-4 mb-8">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg flex-1`}>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Selecione o Commodity
                </label>
                <div className="flex space-x-4">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedCommodity(product)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        selectedCommodity.id === product.id
                          ? 'bg-green-600 text-white'
                          : darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span>{product.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Previsão de Preço - {selectedCommodity.name}
                  </h2>
                  <div className="flex space-x-2">
                    {['1w', '1m', '3m', '6m', '1y'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          timeRange === range
                            ? 'bg-green-600 text-white'
                            : darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                <PriceChart data={getPriceHistory(selectedCommodity.id)} darkMode={darkMode} />
              </div>
              <PriceForecast product={selectedCommodity} darkMode={darkMode} />
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Análise Detalhada
              </h2>
              <DetailedAnalysis
                analysis={getDetailedAnalysis(selectedCommodity.id)}
                darkMode={darkMode}
              />
            </div>
          </>
        );
      case 'insights':
        return <MarketInsights darkMode={darkMode} />;
      default:
        return (
          <>
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className={`flex items-center px-4 py-2 border rounded-lg ${
                darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'
              }`}>
                <Filter className="w-5 h-5 mr-2" />
                Filtros
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProducts.map(product => (
                <PriceCard
                  key={product.id}
                  product={product}
                  onClick={setSelectedProduct}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Layers className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-bold">AgriPriceAI</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentView('inicio')}
                className={`${currentView === 'inicio' ? 'text-green-600' : darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium hover:text-green-600`}
              >
                Início
              </button>
              <button
                onClick={() => setCurrentView('forecasts')}
                className={`${currentView === 'forecasts' ? 'text-green-600' : darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium hover:text-green-600`}
              >
                Previsões
              </button>
              <button
                onClick={() => setCurrentView('insights')}
                className={`${currentView === 'insights' ? 'text-green-600' : darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium hover:text-green-600`}
              >
                Insights
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {user.name}
                </span>
                <button
                  onClick={() => setUser(null)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {renderContent()}

        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-4xl w-full p-6`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Previsão de Preços</h3>
                  <div className="flex space-x-2">
                    {['1w', '1m', '3m', '6m', '1y'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          timeRange === range
                            ? 'bg-green-600 text-white'
                            : darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <PriceChart data={getPriceHistory(selectedProduct.id)} darkMode={darkMode} />
                  </div>
                  <div>
                    <DetailedAnalysis 
                      analysis={getDetailedAnalysis(selectedProduct.id)} 
                      darkMode={darkMode}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;