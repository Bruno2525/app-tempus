import { useState } from 'react'
import TaskCard from './TaskCard.jsx'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

function getMotivation(pct) {
  if (pct === 0) return { msg: 'Vamos lá! Você consegue 💪', color: 'text-indigo-600' }
  if (pct < 0.34) return { msg: 'Ótimo começo! Continue 🚀', color: 'text-indigo-600' }
  if (pct < 0.67) return { msg: 'Na metade! Incrível! ⭐', color: 'text-purple-600' }
  if (pct < 1) return { msg: 'Quase lá! Você está arrasando 🔥', color: 'text-orange-500' }
  return { msg: 'Você completou tudo! Incrível! 🎉', color: 'text-emerald-600' }
}

export default function Dashboard({ tasks, completed, error, onTaskComplete, onNewDay, onResetProfile, onRetry }) {
  const [showMenu, setShowMenu] = useState(false)

  const sorted = [...tasks].sort((a, b) => a.time.localeCompare(b.time))
  const pct = tasks.length ? completed.length / tasks.length : 0
  const allDone = tasks.length > 0 && completed.length === tasks.length
  const noTasks = tasks.length === 0 && !error
  const { msg, color } = getMotivation(pct)

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const todayFormatted = today.charAt(0).toUpperCase() + today.slice(1)

  const totalMinutes = tasks.reduce((s, t) => s + (t.duration || 0), 0)
  const doneMinutes = tasks
    .filter((t) => completed.includes(t.id))
    .reduce((s, t) => s + (t.duration || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="px-5 pt-12 pb-4 relative">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">
                {todayFormatted}
              </p>
              <h1 className="text-2xl font-black text-gray-900 mt-0.5">
                {getGreeting()} 👋
              </h1>
            </div>

            {/* Settings menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu((v) => !v)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-white hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01" />
                  <circle cx="12" cy="5" r=".5" fill="currentColor" />
                  <circle cx="12" cy="12" r=".5" fill="currentColor" />
                  <circle cx="12" cy="19" r=".5" fill="currentColor" />
                </svg>
              </button>
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                  <div className="absolute right-0 top-10 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-52 animate-bounce-in">
                    <button
                      onClick={() => { setShowMenu(false); onResetProfile() }}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Refazer perfil
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Progress bar */}
          {tasks.length > 0 && (
            <div className="mt-5 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-semibold ${color}`}>{msg}</span>
                <span className="text-xs font-bold text-gray-400">
                  {completed.length}/{tasks.length}
                </span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    allDone
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                  }`}
                  style={{ width: `${pct * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>{doneMinutes} min feitos</span>
                <span>{totalMinutes} min no total</span>
              </div>
            </div>
          )}
        </div>

        {/* Content area */}
        <div className="px-5 pb-36">
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-4 animate-slide-up">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">😕</span>
                <div>
                  <p className="font-bold text-red-700 text-sm">Algo deu errado</p>
                  <p className="text-red-600 text-xs mt-1">{error}</p>
                  <button
                    onClick={onRetry}
                    className="mt-3 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-xl active:scale-95 transition-transform"
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty / new day state */}
          {noTasks && (
            <div className="flex flex-col items-center justify-center text-center pt-16 animate-slide-up">
              <div className="text-7xl mb-5">🗓️</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Hora de montar sua agenda!
              </h2>
              <p className="text-gray-500 text-sm mb-8 max-w-xs">
                Vou criar uma lista personalizada de atividades para você aproveitar o dia.
              </p>
              <button
                onClick={onNewDay}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 active:scale-95 transition-all"
              >
                ✨ Gerar agenda de hoje
              </button>
            </div>
          )}

          {/* All done celebration */}
          {allDone && (
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 mb-4 animate-bounce-in">
              <div className="text-center">
                <p className="text-3xl mb-1">🎉</p>
                <p className="text-white font-black text-base">Você zerou o dia!</p>
                <p className="text-emerald-100 text-xs mt-1">
                  {completed.length} tarefas concluídas · {doneMinutes} min de atividades
                </p>
              </div>
            </div>
          )}

          {/* Task list */}
          {tasks.length > 0 && (
            <div className="space-y-3">
              {sorted.map((task, i) => (
                <div key={task.id} style={{ animationDelay: `${i * 60}ms` }}>
                  <TaskCard
                    task={task}
                    isCompleted={completed.includes(task.id)}
                    onComplete={() => onTaskComplete(task.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating action button — new day */}
      {tasks.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-6 bg-gradient-to-t from-indigo-50 via-slate-50/95 to-transparent pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <button
              onClick={onNewDay}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Nova Agenda
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
