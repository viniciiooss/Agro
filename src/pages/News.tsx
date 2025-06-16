import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Newspaper, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getUniqueProducts } from '@/data/sampleData';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const NewsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState('all');

  const products = getUniqueProducts();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) {
        setError("News API key is not configured.");
        setLoading(false);
        return;
      }
      
      const query = selectedProduct === 'all' 
        ? '(agribusiness OR agriculture)' 
        : `"${selectedProduct}"`; 
      
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles.filter((article: Article) => article.urlToImage && article.description));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedProduct]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
           <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-emerald-600 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            Agribusiness News
          </h1>
          <p className="text-base md:text-lg text-gray-600 mt-2">Stay up to date with the latest from the sector.</p>
        </div>

        <div className="mb-8 max-w-sm mx-auto">
          <label htmlFor="news-filter" className="block text-sm font-medium text-gray-700 mb-2 text-center">Filter news by product:</label>
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger id="news-filter">
              <SelectValue placeholder="Select product..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">General Agro News</SelectItem>
              {products.map(product => (
                <SelectItem key={product} value={product}>{product}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <p><strong>Error loading news:</strong> {error}</p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <a href={article.url} target="_blank" rel="noopener noreferrer" key={index} className="block group">
                <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/EEE/31343C?text=Image+Not+Found'; }} />
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow">
                    <CardDescription>{article.description}</CardDescription>
                  </CardContent>
                  <div className="p-4 pt-2 text-xs text-gray-500 border-t mt-auto">
                    <span>{article.source.name}</span> &bull; <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        )}
        
        {!loading && !error && articles.length === 0 && (
            <div className="text-center py-12">
                <Newspaper className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No news found</h3>
                <p className="mt-1 text-sm text-gray-500">Try selecting another category or check back later.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default NewsPage;