import { useState } from 'react'

const QUESTIONS = [
  {
    id: 'hobbies',
    q: 'O que você gosta de fazer nas horas vagas?',
    sub: 'Selecione tudo que você curte',
    type: 'multi',
    cols: 2,
    options: [
      { v: 'leitura', l: 'Leitura', e: '📚' },
      { v: 'gaming', l: 'Games', e: '🎮' },
      { v: 'musica', l: 'Música', e: '🎵' },
      { v: 'filmes', l: 'Filmes e Séries', e: '🎬' },
      { v: 'cozinhar', l: 'Cozinhar', e: '🍳' },
      { v: 'arte', l: 'Arte', e: '🎨' },
      { v: 'esportes', l: 'Esportes', e: '⚽' },
      { v: 'meditacao', l: 'Meditação', e: '🧘' },
      { v: 'podcasts', l: 'Podcasts', e: '🎙️' },
      { v: 'fotografia', l: 'Fotografia', e: '📷' },
    ],
  },
  {
    id: 'occupation',
    q: 'O que você faz da vida atualmente?',
    sub: 'Escolha a opção que melhor te descreve',
    type: 'single',
    cols: 1,
    options: [
      { v: 'estudante', l: 'Estudante', e: '🎓' },
      { v: 'home_office', l: 'Trabalho em home office', e: '🏠' },
      { v: 'presencial', l: 'Trabalho presencialmente', e: '🏢' },
      { v: 'freelancer', l: 'Freelancer', e: '💻' },
      { v: 'empreendedor', l: 'Empreendedor', e: '🚀' },
      { v: 'buscando', l: 'Buscando oportunidades', e: '🔍' },
    ],
  },
  {
    id: 'interests',
    q: 'Quais assuntos você gosta de acompanhar?',
    sub: 'Selecione seus interesses',
    type: 'multi',
    cols: 2,
    options: [
      { v: 'tecnologia', l: 'Tecnologia', e: '💡' },
      { v: 'saude', l: 'Saúde', e: '💪' },
      { v: 'negocios', l: 'Negócios', e: '📈' },
      { v: 'arte_cultura', l: 'Arte e Cultura', e: '🎭' },
      { v: 'ciencia', l: 'Ciência', e: '🔬' },
      { v: 'esportes', l: 'Esportes', e: '🏆' },
      { v: 'culinaria', l: 'Culinária', e: '🍽️' },
      { v: 'sustentabilidade', l: 'Sustentabilidade', e: '🌱' },
      { v: 'psicologia', l: 'Psicologia', e: '🧠' },
      { v: 'politica', l: 'Política', e: '🗳️' },
    ],
  },
  {
    id: 'freeHours',
    q: 'Quantas horas livres você tem por dia?',
    sub: 'Em média, considerando sua rotina atual',
    type: 'single',
    cols: 1,
    options: [
      { v: 'menos_1h', l: 'Menos de 1 hora', e: '⚡' },
      { v: '1_2h', l: '1 a 2 horas', e: '⏰' },
      { v: '2_4h', l: '2 a 4 horas', e: '🕐' },
      { v: 'mais_4h', l: 'Mais de 4 horas', e: '🗓️' },
    ],
  },
  {
    id: 'taskDuration',
    q: 'Como você prefere suas tarefas?',
    sub: 'Qual ritmo combina mais com você?',
    type: 'single',
    cols: 1,
    options: [
      { v: 'curtas', l: 'Curtas (15–30 min)', e: '⚡' },
      { v: 'medias', l: 'Médias (30–60 min)', e: '⏱️' },
      { v: 'longas', l: 'Longas (1h ou mais)', e: '🏋️' },
      { v: 'mix', l: 'Mix de todas', e: '🎯' },
    ],
  },
  {
    id: 'exercise',
    q: 'Você pratica algum exercício físico?',
    sub: 'Seja honesto — sem julgamentos!',
    type: 'single',
    cols: 1,
    options: [
      { v: 'sim_regularmente', l: 'Sim, regularmente', e: '🏃' },
      { v: 'as_vezes', l: 'Às vezes', e: '🚶' },
      { v: 'raramente', l: 'Raramente', e: '😅' },
      { v: 'quero_comecar', l: 'Quero começar!', e: '💪' },
    ],
  },
  {
    id: 'wakeTime',
    q: 'Que horas você costuma acordar?',
    sub: 'Para distribuir bem os horários',
    type: 'single',
    cols: 1,
    options: [
      { v: 'antes_6h', l: 'Antes das 6h', e: '🌅' },
      { v: '6_8h', l: 'Entre 6h e 8h', e: '☀️' },
      { v: '8_10h', l: 'Entre 8h e 10h', e: '🌤️' },
      { v: 'depois_10h', l: 'Depois das 10h', e: '😴' },
    ],
  },
  {
    id: 'goals',
    q: 'O que você quer melhorar na sua rotina?',
    sub: 'Selecione suas metas',
    type: 'multi',
    cols: 2,
    options: [
      { v: 'ler_mais', l: 'Ler mais', e: '📖' },
      { v: 'exercitar', l: 'Me exercitar mais', e: '🏃' },
      { v: 'aprender', l: 'Aprender mais', e: '🎯' },
      { v: 'produtividade', l: 'Ser mais produtivo', e: '⚡' },
      { v: 'relaxar', l: 'Relaxar mais', e: '🧘' },
      { v: 'socializar', l: 'Socializar mais', e: '👥' },
      { v: 'hobbies', l: 'Cultivar hobbies', e: '🎨' },
      { v: 'saude_mental', l: 'Saúde mental', e: '💚' },
    ],
  },
]

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [fading, setFading] = useState(false)

  const q = QUESTIONS[step]
  const isLast = step === QUESTIONS.length - 1
  const cur = answers[q.id]
  const hasAnswer = q.type === 'multi' ? cur && cur.length > 0 : !!cur

  const toggleMulti = (v) => {
    const prev = answers[q.id] || []
    setAnswers((a) => ({
      ...a,
      [q.id]: prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    }))
  }

  const setSingle = (v) => setAnswers((a) => ({ ...a, [q.id]: v }))

  const next = () => {
    if (!hasAnswer) return
    if (isLast) {
      onComplete(answers)
      return
    }
    setFading(true)
    setTimeout(() => {
      setStep((s) => s + 1)
      setFading(false)
    }, 180)
  }

  const back = () => {
    if (step > 0) {
      setFading(true)
      setTimeout(() => {
        setStep((s) => s - 1)
        setFading(false)
      }, 180)
    }
  }

  const progress = ((step + 1) / QUESTIONS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Top bar */}
      <div className="px-5 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={back}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              step === 0 ? 'invisible' : 'text-gray-500 hover:bg-gray-100 active:bg-gray-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            {step + 1} / {QUESTIONS.length}
          </span>
          <div className="w-9" />
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question area */}
      <div
        className={`flex-1 px-5 pb-4 overflow-y-auto scrollbar-hide transition-opacity duration-180 ${
          fading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {step === 0 && (
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-lg mb-4">
              <span className="text-4xl">🏃</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900">Mova-se</h1>
            <p className="text-gray-500 mt-1 text-sm">Sua agenda diária personalizada</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 leading-snug">{q.q}</h2>
          <p className="text-sm text-gray-500 mt-1">{q.sub}</p>
        </div>

        <div className={`grid gap-3 ${q.cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {q.options.map((opt) => {
            const selected =
              q.type === 'multi'
                ? (answers[q.id] || []).includes(opt.v)
                : answers[q.id] === opt.v

            return (
              <button
                key={opt.v}
                onClick={() => (q.type === 'multi' ? toggleMulti(opt.v) : setSingle(opt.v))}
                className={`relative flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all duration-200 active:scale-95 ${
                  selected
                    ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-indigo-200'
                }`}
              >
                <span className="text-2xl leading-none flex-shrink-0">{opt.e}</span>
                <span
                  className={`text-sm font-medium leading-tight ${
                    selected ? 'text-indigo-700' : 'text-gray-700'
                  }`}
                >
                  {opt.l}
                </span>
                {selected && (
                  <div className="ml-auto flex-shrink-0 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-10 pt-3 flex-shrink-0">
        <button
          onClick={next}
          disabled={!hasAnswer}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 ${
            hasAnswer
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200 active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLast ? '✨ Gerar minha agenda!' : 'Próximo →'}
        </button>
      </div>
    </div>
  )
}
