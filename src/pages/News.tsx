import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Newspaper, AlertTriangle, ArrowLeft } from 'lucide-react';

// Define a interface para um artigo de notícia
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

  useEffect(() => {
    const fetchNews = async () => {
      // Pega a chave da API das variáveis de ambiente
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) {
        setError("A chave da API de notícias não foi configurada.");
        setLoading(false);
        return;
      }
      
      // Busca notícias com os termos 'agronegócio' OU 'agricultura', em português, ordenadas por mais recentes
      const url = `https://newsapi.org/v2/everything?q=(agronegócio OR agricultura)&language=pt&sortBy=publishedAt&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Erro: ${response.status}`);
        }
        const data = await response.json();
        // Filtra artigos sem imagem para manter a UI consistente
        setArticles(data.articles.filter((article: Article) => article.urlToImage));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // O array vazio faz com que o useEffect rode apenas uma vez, quando o componente é montado

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
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
            Voltar ao Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            Notícias do Agronegócio
          </h1>
          <p className="text-base md:text-lg text-gray-600 mt-2">Fique por dentro das últimas atualizações do setor.</p>
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
            <p><strong>Erro ao carregar notícias:</strong> {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <a href={article.url} target="_blank" rel="noopener noreferrer" key={index} className="block group">
                <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
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
      </main>
    </div>
  );
};

export default NewsPage;