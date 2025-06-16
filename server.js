import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Inicializa o servidor Express
const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:8080' }));  // Permite requisições do seu app React
app.use(express.json());

// Rota para análise com IA
app.post('/api/analyze', async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.TOGETHER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'A chave da API da Together AI não foi configurada no servidor.' });
    }

    if (!prompt) {
        return res.status(400).json({ error: 'O prompt é um campo obrigatório.' });
    }

    try {
        const response = await fetch('https://api.together.xyz/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free', // Modelo recomendado por custo/performance
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 512,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Erro na API da Together AI: ${response.statusText} - ${errorBody}`);
        }

        const data = await response.json();
        const analysis = data.choices[0]?.message?.content || 'Não foi possível obter uma resposta da IA.';

        res.status(200).json({ analysis });

    } catch (error) {
        console.error('Erro detalhado:', error);
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
    }
});

// Inicia o servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});