import 'dotenv/config'
import express from 'express'
import Anthropic from '@anthropic-ai/sdk'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

const WAKE_TIME_MAP = {
  antes_6h: '05:30',
  '6_8h': '07:00',
  '8_10h': '09:00',
  depois_10h: '10:30',
}

const FREE_HOURS_MAP = {
  menos_1h: 'menos de 1 hora livre',
  '1_2h': '1 a 2 horas livres',
  '2_4h': '2 a 4 horas livres',
  mais_4h: 'mais de 4 horas livres',
}

const TASK_DURATION_MAP = {
  curtas: 'tarefas curtas de 15 a 30 minutos',
  medias: 'tarefas médias de 30 a 60 minutos',
  longas: 'tarefas longas de 1 hora ou mais',
  mix: 'mix variado de durações',
}

const EXERCISE_MAP = {
  sim_regularmente: 'pratica exercícios regularmente',
  as_vezes: 'pratica exercícios às vezes',
  raramente: 'raramente pratica exercícios',
  quero_comecar: 'quer começar a praticar exercícios',
}

app.post('/api/generate-agenda', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY não configurada. Crie um arquivo .env com sua chave de API.',
    })
  }

  const { profile } = req.body
  if (!profile) {
    return res.status(400).json({ error: 'Perfil do usuário é obrigatório.' })
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const today = new Date()
  const dayOfWeek = today.toLocaleDateString('pt-BR', { weekday: 'long' })
  const wakeTime = WAKE_TIME_MAP[profile.wakeTime] || '08:00'
  const freeHours = FREE_HOURS_MAP[profile.freeHours] || '2 a 4 horas livres'
  const taskDuration = TASK_DURATION_MAP[profile.taskDuration] || 'mix variado'
  const exercise = EXERCISE_MAP[profile.exercise] || 'raramente pratica exercícios'

  const hobbies = Array.isArray(profile.hobbies) ? profile.hobbies.join(', ') : 'variados'
  const interests = Array.isArray(profile.interests) ? profile.interests.join(', ') : 'variados'
  const goals = Array.isArray(profile.goals) ? profile.goals.join(', ') : 'melhorar a rotina'

  const prompt = `Você é um especialista em produtividade e bem-estar. Crie uma agenda diária personalizada e motivadora para hoje (${dayOfWeek}).

PERFIL DO USUÁRIO:
- Hobbies e lazer: ${hobbies}
- Situação atual: ${profile.occupation || 'não informado'}
- Interesses: ${interests}
- Tempo livre disponível: ${freeHours}
- Preferência de duração: ${taskDuration}
- Exercício físico: ${exercise}
- Horário que acorda: por volta das ${wakeTime}
- Metas para a rotina: ${goals}

INSTRUÇÕES:
- Gere entre 6 e 8 tarefas distribuídas ao longo do dia
- O primeiro horário deve ser próximo de ${wakeTime}
- Misture lazer e produtividade respeitando o perfil
- Cada tarefa deve ser específica e prática (não genérica)
- Adapte ao máximo os hobbies e interesses do usuário
- Inclua pelo menos uma atividade de movimento/exercício
- Varie as categorias para um dia interessante e equilibrado

CATEGORIAS DISPONÍVEIS (use exatamente um desses valores):
exercicio, leitura, aprendizado, entretenimento, social, criatividade, relaxamento, produtividade, culinaria

Retorne SOMENTE um JSON válido, sem texto, markdown ou explicação adicional:
{"tasks":[{"id":"1","time":"08:00","title":"Título da tarefa","description":"O que fazer especificamente","category":"exercicio","duration":30,"type":"lazer"}]}`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    })

    const raw = message.content[0].text.trim()
console.log('[Raw response]', raw)
const jsonMatch = raw.match(/\{[\s\S]*\}/)
if (!jsonMatch) throw new Error('Formato de resposta inválido')

let parsed
try {
  parsed = JSON.parse(jsonMatch[0])
} catch (e) {
  console.error('[JSON parse error]', e.message, jsonMatch[0])
  throw new Error('Erro ao parsear JSON')
}

    const validCategories = [
      'exercicio','leitura','aprendizado','entretenimento',
      'social','criatividade','relaxamento','produtividade','culinaria',
    ]

    const tasks = parsed.tasks.map((task, i) => ({
      id: String(i + 1),
      time: task.time || '09:00',
      title: String(task.title || 'Tarefa').slice(0, 50),
      description: String(task.description || '').slice(0, 300),
      category: validCategories.includes(task.category) ? task.category : 'produtividade',
      duration: Number(task.duration) || 30,
      type: task.type === 'lazer' ? 'lazer' : 'produtividade',
    }))

    res.json({ tasks })
  } catch (err) {
    console.error('[API Error]', err.message)
    if (err.status === 401) {
      res.status(500).json({ error: 'API key inválida. Verifique o arquivo .env.' })
    } else if (err.status === 429) {
      res.status(429).json({ error: 'Limite de requisições atingido. Aguarde alguns minutos.' })
    } else if (err instanceof SyntaxError) {
      res.status(500).json({ error: 'Erro ao processar resposta da IA. Tente novamente.' })
    } else {
      res.status(500).json({ error: 'Não foi possível gerar a agenda. Tente novamente.' })
    }
  }
})

// Serve built frontend in production
const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath))
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) res.status(404).send('Execute npm run build para gerar o frontend.')
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠️  ATENÇÃO: ANTHROPIC_API_KEY não configurada! Crie um arquivo .env')
  }
})
