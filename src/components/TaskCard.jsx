import { getCategory } from '../utils/categories.js'

export default function TaskCard({ task, isCompleted, onComplete }) {
  const cat = getCategory(task.category)

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${cat.border} overflow-hidden transition-all duration-300 animate-slide-up ${
        isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-4 p-4">
        {/* Time */}
        <div className="flex-shrink-0 text-center w-12">
          <p className="text-xs font-bold text-gray-400 tracking-wide">{task.time}</p>
          <div className={`mt-1.5 w-8 h-8 mx-auto rounded-full flex items-center justify-center text-base ${cat.bg}`}>
            {cat.icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={`font-bold text-gray-900 text-sm leading-tight ${
              isCompleted ? 'line-through text-gray-400' : ''
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat.bg} ${cat.text}`}>
              {cat.label}
            </span>
            <span className="text-xs text-gray-400">⏱ {task.duration} min</span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                task.type === 'lazer'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-amber-100 text-amber-600'
              }`}
            >
              {task.type === 'lazer' ? '🎉 Lazer' : '⚡ Prod.'}
            </span>
          </div>
        </div>

        {/* Complete button */}
        <button
          onClick={onComplete}
          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 active:scale-90 ${
            isCompleted
              ? 'bg-emerald-500 border-emerald-500'
              : 'border-gray-300 hover:border-indigo-400'
          }`}
          aria-label={isCompleted ? 'Desmarcar tarefa' : 'Marcar como concluído'}
        >
          {isCompleted && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
