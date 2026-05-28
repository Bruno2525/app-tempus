export const CATEGORIES = {
  exercicio:      { icon: '🏃', label: 'Exercício',      bg: 'bg-emerald-100',  text: 'text-emerald-700',  dot: 'bg-emerald-400',  border: 'border-l-emerald-400' },
  leitura:        { icon: '📚', label: 'Leitura',        bg: 'bg-blue-100',     text: 'text-blue-700',     dot: 'bg-blue-400',     border: 'border-l-blue-400' },
  aprendizado:    { icon: '💡', label: 'Aprendizado',    bg: 'bg-indigo-100',   text: 'text-indigo-700',   dot: 'bg-indigo-400',   border: 'border-l-indigo-400' },
  entretenimento: { icon: '🎮', label: 'Entretenimento', bg: 'bg-purple-100',   text: 'text-purple-700',   dot: 'bg-purple-400',   border: 'border-l-purple-400' },
  social:         { icon: '👥', label: 'Social',         bg: 'bg-pink-100',     text: 'text-pink-700',     dot: 'bg-pink-400',     border: 'border-l-pink-400' },
  criatividade:   { icon: '🎨', label: 'Criatividade',   bg: 'bg-orange-100',   text: 'text-orange-700',   dot: 'bg-orange-400',   border: 'border-l-orange-400' },
  relaxamento:    { icon: '🧘', label: 'Relaxamento',    bg: 'bg-teal-100',     text: 'text-teal-700',     dot: 'bg-teal-400',     border: 'border-l-teal-400' },
  produtividade:  { icon: '⚡', label: 'Produtividade',  bg: 'bg-amber-100',    text: 'text-amber-700',    dot: 'bg-amber-400',    border: 'border-l-amber-400' },
  culinaria:      { icon: '🍳', label: 'Culinária',      bg: 'bg-red-100',      text: 'text-red-700',      dot: 'bg-red-400',      border: 'border-l-red-400' },
}

export const getCategory = (key) => CATEGORIES[key] ?? CATEGORIES.produtividade
