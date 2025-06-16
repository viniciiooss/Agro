import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, LoaderCircle, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface AIAnalysisCardProps {
  data: any[];
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
        throw new Error(errorData.error || 'Failed to fetch AI analysis.');
      }

      const result = await response.json();
      setAnalysis(result.analysis);

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
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
        product: `${d.produto} (${d.uf})`,
        predicted_change_perc: parseFloat(percentageChange.toFixed(1)),
        model_accuracy_perc: d.acuracia_modelo_perc,
        forecast_volatility_brl: parseFloat((d.previsao_max_jun - d.previsao_min_jun).toFixed(2))
      };
    });

    return `
      **PERSONA:** You are a senior financial consultant and market analyst specializing in agricultural commodities for the Brazilian market. Your language is professional, direct, and focused on actionable insights.

      **TASK:** Analyze the summary of agricultural price forecast data below. Based exclusively on this data, write a consulting report for a client (investor or producer).

      **DATA FOR ANALYSIS:**
      ${JSON.stringify(summary, null, 2)}

      **MANDATORY REPORT STRUCTURE (use this format):**

      ### Agricultural Market Analysis Report

      **1. Sentiment Analysis:**
      Describe the overall market sentiment (optimistic, pessimistic, or mixed) based on the proportion of products with a predicted rise versus a fall in the provided data. Justify your analysis.

      **2. Key Opportunities:**
      List the 2 or 3 best investment opportunities (highest positive variations). For each, comment on the balance between the expected return (predicted_change_perc) and the confidence in the forecast (model_accuracy_perc and forecast_volatility_brl). High accuracy and low volatility make an opportunity more solid.

      **3. Points of Concern and Risks:**
      List the 2 or 3 biggest risks (most negative variations). For each, besides citing the drop, comment on the volatility. If volatility is high, the risk is even greater. Suggest an action for each point (e.g., "Monitor closely," "Consider early selling," "Avoid exposure").

      **4. Investment Thesis (Strategic Recommendation):**
      Conclude with a clear and actionable final recommendation, in 2-3 sentences, as a consultant would for a client. Example: "Given the scenario, the recommended strategy is to concentrate capital on [Product A] opportunities, which present the best risk/return balance, while hedging against risks in [Product B] through [suggested action]."

      Use Markdown to format the report.
    `;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <Sparkles className="w-5 h-5 mr-2" />
          AI Analysis
        </CardTitle>
        <CardDescription>
          Get AI-generated insights based on the current filters.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <Button onClick={handleGenerateAnalysis} disabled={loading || data.length === 0}>
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Generate Analysis'
          )}
        </Button>
        {data.length === 0 && <p className="text-xs text-center mt-2 text-gray-500">Select filters to generate an analysis.</p>}

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
