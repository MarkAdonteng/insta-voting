import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard'
import VotingInterface from './components/VotingInterface'
import type { Poll, Vote } from './types.ts'
import './App.css'

function App() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [votes, setVotes] = useState<Vote[]>([])

  // Load data from localStorage on app start
  useEffect(() => {
    const savedPolls = localStorage.getItem('voting-app-polls')
    const savedVotes = localStorage.getItem('voting-app-votes')
    
    if (savedPolls) {
      setPolls(JSON.parse(savedPolls))
    }
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes))
    }
  }, [])

  // Save data to localStorage whenever polls or votes change
  useEffect(() => {
    localStorage.setItem('voting-app-polls', JSON.stringify(polls))
  }, [polls])

  useEffect(() => {
    localStorage.setItem('voting-app-votes', JSON.stringify(votes))
  }, [votes])

  const addPoll = (poll: Poll) => {
    setPolls(prev => [...prev, poll])
  }

  const updatePoll = (pollId: string, updates: Partial<Poll>) => {
    setPolls(prev => prev.map(poll => 
      poll.id === pollId ? { ...poll, ...updates } : poll
    ))
  }

  const addVote = (vote: Vote) => {
    setVotes(prev => [...prev, vote])
  }

  const VotingPage = () => {
    const { pollId } = useParams<{ pollId: string }>()
    const poll = polls.find(p => p.id === pollId)
    
    if (!poll) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Poll Not Found</h1>
            <p className="text-gray-600">The poll you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      )
    }

    return (
      <VotingInterface 
        poll={poll} 
        votes={votes.filter(v => v.pollId === pollId)}
        onVote={addVote}
      />
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/" 
            element={
              <AdminDashboard 
                polls={polls}
                votes={votes}
                onAddPoll={addPoll}
                onUpdatePoll={updatePoll}
              />
            } 
          />
          <Route path="/vote/:pollId" element={<VotingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
