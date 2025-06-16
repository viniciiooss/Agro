import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, LoaderCircle, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface AIAnalysisCardProps {
  data: any[]; // Os dados filtrados do dashboard
}

const AIAnalysisCard: React.FC<AIAnalysisCardProps> = ({ data }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateAnalysis = useCallback(async () => {
    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const prompt = createPrompt(data);

      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao buscar análise da IA.');
      }

      const result = await response.json();
      setAnalysis(result.analysis);

    } catch (err: any) { // <-- ESTA É A LINHA CORRIGIDA
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  }, [data]);

  const createPrompt = (analysisData: any[]) => {
    const summary = analysisData.slice(0, 15).map(d => {
      const lastPrice = d.preco_atual_mai ?? d.preco_atual_abr ?? 0;
      const predictedPrice = d.previsao_jun || 0;
      const percentageChange = lastPrice > 0 ? ((predictedPrice - lastPrice) / lastPrice) * 100 : 0;
      
      return {
        produto: `${d.produto} (${d.uf})`,
        variacao_prevista_perc: parseFloat(percentageChange.toFixed(1)),
        acuracia_modelo_perc: d.acuracia_modelo_perc,
        volatilidade_previsao_brl: parseFloat((d.previsao_max_jun - d.previsao_min_jun).toFixed(2))
      };
    });

    return `
      **PERSONA:** Você é um consultor financeiro sênior e analista de mercado, especializado em commodities agrícolas para o mercado brasileiro. Sua linguagem é profissional, direta e focada em insights acionáveis.

      **TAREFA:** Analise o resumo de dados de previsão de preços agrícolas abaixo. Com base exclusivamente nestes dados, elabore um relatório de consultoria para um cliente (investidor ou produtor).

      **DADOS PARA ANÁLISE:**
      ${JSON.stringify(summary, null, 2)}

      **ESTRUTURA OBRIGATÓRIA DO RELATÓRIO (use este formato):**

      ### Relatório de Análise de Mercado Agrícola

      **1. Análise de Sentimento:**
      Descreva o sentimento geral do mercado (otimista, pessimista ou misto) com base na proporção de produtos com previsão de alta versus queda nos dados fornecidos. Justifique sua análise.

      **2. Oportunidades de Destaque:**
      Liste as 2 ou 3 melhores oportunidades de investimento (maiores variações positivas). Para cada uma, comente sobre o balanço entre o retorno previsto (variacao_prevista_perc) e a confiança na previsão (acuracia_modelo_perc e volatilidade_previsao_brl). Uma alta acurácia e baixa volatilidade tornam a oportunidade mais sólida.

      **3. Pontos de Atenção e Riscos:**
      Liste os 2 ou 3 maiores riscos (variações mais negativas). Para cada um, além de citar a queda, comente sobre a volatilidade. Se a volatilidade for alta, o risco é ainda maior. Sugira uma ação para cada ponto (ex: "Monitorar de perto", "Considerar venda antecipada", "Evitar exposição").

      **4. Tese de Investimento (Recomendação Estratégica):**
      Conclua com uma recomendação final clara e acionável, em 2-3 frases, como um consultor faria para um cliente. Exemplo: "Dado o cenário, a estratégia recomendada é concentrar capital nas oportunidades de [Produto A], que apresenta o melhor balanço risco/retorno, enquanto se protege dos riscos em [Produto B] através de [ação sugerida]."

      Use Markdown para formatar o relatório.
    `;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <Sparkles className="w-5 h-5 mr-2" />
          Análise com IA
        </CardTitle>
        <CardDescription>
          Obtenha insights gerados por IA com base nos filtros atuais.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <Button onClick={handleGenerateAnalysis} disabled={loading || data.length === 0}>
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
              Analisando...
            </>
          ) : (
            'Gerar Análise'
          )}
        </Button>
        {data.length === 0 && <p className="text-xs text-center mt-2 text-gray-500">Selecione algum filtro para gerar a análise.</p>}

        <div className="mt-4 flex-grow min-h-[150px]">
          {loading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          )}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
          {analysis && (
            <div className="text-sm bg-emerald-50/50 p-4 rounded-lg prose prose-sm max-w-none">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAnalysisCard;