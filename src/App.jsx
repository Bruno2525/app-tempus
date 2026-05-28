import { useState, useEffect } from 'react'
import Onboarding from './components/Onboarding.jsx'
import Dashboard from './components/Dashboard.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'

const KEYS = {
  PROFILE: 'movase_profile',
  TASKS: 'movase_tasks',
  TASKS_DATE: 'movase_tasks_date',
  COMPLETED: 'movase_completed',
}

export default function App() {
  const [profile, setProfile] = useState(null)
  const [tasks, setTasks] = useState([])
  const [completed, setCompleted] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const savedProfile = localStorage.getItem(KEYS.PROFILE)
    const savedTasks = localStorage.getItem(KEYS.TASKS)
    const savedDate = localStorage.getItem(KEYS.TASKS_DATE)
    const savedCompleted = localStorage.getItem(KEYS.COMPLETED)

    if (savedProfile) setProfile(JSON.parse(savedProfile))

    const today = new Date().toDateString()
    if (savedTasks && savedDate === today) {
      setTasks(JSON.parse(savedTasks))
      if (savedCompleted) setCompleted(JSON.parse(savedCompleted))
    }

    setReady(true)
  }, [])

  const generateAgenda = async (profileData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/generate-agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: profileData }),
      })
      const text = await res.text()
      console.log('[API Response]', text)
      const data = JSON.parse(text)
      if (!res.ok) throw new Error(data.error || 'Erro desconhecido')

      const today = new Date().toDateString()
      localStorage.setItem(KEYS.TASKS, JSON.stringify(data.tasks))
      localStorage.setItem(KEYS.TASKS_DATE, today)
      localStorage.setItem(KEYS.COMPLETED, JSON.stringify([]))
      setTasks(data.tasks)
      setCompleted([])
    } catch (err) {
      setError(err.message || 'Algo deu errado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleOnboardingComplete = (profileData) => {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profileData))
    setProfile(profileData)
    generateAgenda(profileData)
  }

  const handleTaskComplete = (taskId) => {
    const next = completed.includes(taskId)
      ? completed.filter((id) => id !== taskId)
      : [...completed, taskId]
    setCompleted(next)
    localStorage.setItem(KEYS.COMPLETED, JSON.stringify(next))
  }

  const handleNewDay = () => generateAgenda(profile)

  const handleResetProfile = () => {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
    setProfile(null)
    setTasks([])
    setCompleted([])
    setError(null)
  }

  if (!ready) return null
  if (loading) return <LoadingScreen />
  if (!profile) return <Onboarding onComplete={handleOnboardingComplete} />

  return (
    <Dashboard
      tasks={tasks}
      completed={completed}
      error={error}
      onTaskComplete={handleTaskComplete}
      onNewDay={handleNewDay}
      onResetProfile={handleResetProfile}
      onRetry={() => generateAgenda(profile)}
    />
  )
}