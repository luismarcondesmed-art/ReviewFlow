import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { VitePWA } from 'vite-plugin-pwa'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function aiServerPlugin() {
  return {
    name: 'ai-server-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/ai/fafipa-questions' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              const { topic, subtopics, count = 3 } = JSON.parse(body || '{}');
              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: false, error: 'GEMINI_API_KEY not configured' }));
                return;
              }

              const { GoogleGenAI } = await import('@google/genai');
              const ai = new GoogleGenAI({ apiKey });
              const prompt = `Você é um elaborador oficial de provas de concursos públicos da banca Fundação FAFIPA.
Gere ${count} questões de múltipla escolha (A, B, C, D, E) sobre "${topic}" ${subtopics?.length ? `(subtemas: ${subtopics.join(', ')})` : ''}.
Mantenha o rigor característico da Fundação FAFIPA: literalidade em legislação/normas e casos clínicos objetivos com condutas escalonadas pelo Ministério da Saúde.

Retorne ESTRITAMENTE em formato JSON (sem markdown ou texto antes/depois):
{
  "questions": [
    {
      "id": "fafipa-gen-1",
      "topic": "${topic}",
      "banca": "Fundação FAFIPA",
      "ano": 2024,
      "concurso": "Concurso Público Oficial - FAFIPA",
      "enunciado": "Enunciado claro e objetivo...",
      "alternativas": [
        { "letra": "A", "texto": "..." },
        { "letra": "B", "texto": "..." },
        { "letra": "C", "texto": "..." },
        { "letra": "D", "texto": "..." },
        { "letra": "E", "texto": "..." }
      ],
      "respostaCorreta": "A",
      "justificativa": "Explicação fundamentada do gabarito...",
      "dicaBanca": "Dica sobre como a FAFIPA aborda este tema..."
    }
  ]
}`;

              const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                  responseMimeType: 'application/json'
                }
              });

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(response.text || '{}');
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ ok: false, error: err?.message || 'Error generating questions' }));
            }
          });
          return;
        }

        if (req.url === '/api/ai/analyze-topic' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              const { topicName, areaName, items } = JSON.parse(body || '{}');
              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: false, error: 'GEMINI_API_KEY not configured' }));
                return;
              }

              const { GoogleGenAI } = await import('@google/genai');
              const ai = new GoogleGenAI({ apiKey });
              const prompt = `Analise a importância e o perfil de cobrança da banca examinadora Fundação FAFIPA para o tema "${topicName}" da área "${areaName}".

Retorne ESTRITAMENTE em formato JSON:
{
  "analysis": {
    "priority": "high",
    "relevanceScore": 92,
    "targetQuestionsR0": 20,
    "targetQuestionsR1": 15,
    "fafipaProfile": "Resumo do perfil da banca FAFIPA...",
    "keyPoints": ["Ponto chave 1", "Ponto chave 2"],
    "commonTraps": ["Pegadinha frequente 1"]
  }
}`;

              const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                  responseMimeType: 'application/json'
                }
              });

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(response.text || '{}');
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ ok: false, error: err?.message || 'Error analyzing topic' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '')

  return {
    plugins: [
      react(),
      aiServerPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'ReviewFlow • Medical Plan',
          short_name: 'ReviewFlow',
          description: 'Estude medicina com inteligência. Repetição espaçada automática e métricas de desempenho.',
          theme_color: '#f2f4f7',
          background_color: '#f2f4f7',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: 'icon-192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icon-512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true
        },
        devOptions: {
          enabled: true
        }
      })
    ],
    base: '/',
    define: {
      'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify(env.VITE_FIREBASE_API_KEY),
      'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(env.VITE_FIREBASE_AUTH_DOMAIN),
      'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(env.VITE_FIREBASE_PROJECT_ID),
      'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(env.VITE_FIREBASE_STORAGE_BUCKET),
      'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(env.VITE_FIREBASE_MESSAGING_SENDER_ID),
      'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify(env.VITE_FIREBASE_APP_ID),
      'import.meta.env.VITE_FIREBASE_MEASUREMENT_ID': JSON.stringify(env.VITE_FIREBASE_MEASUREMENT_ID),
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
            'vendor-ui': ['framer-motion', 'lucide-react', 'canvas-confetti']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    }
  }
})
