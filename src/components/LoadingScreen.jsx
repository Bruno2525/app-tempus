const messages = [
  'Analisando seu perfil...',
  'Montando sua agenda personalizada...',
  'Escolhendo as melhores atividades...',
  'Quase lá!',
]

import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIdx((i) => (i + 1) % messages.length)
    }, 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col items-center justify-center px-6">
      <div className="text-center animate-fade-in">
        <div className="text-7xl mb-8 animate-bounce">🏃</div>
        <h2 className="text-2xl font-bold text-white mb-3">Mova-se</h2>
        <p className="text-indigo-200 text-base mb-10 h-6 transition-all duration-500">
          {messages[msgIdx]}
        </p>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-pulse-slow"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
