import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'
import { collection, addDoc, onSnapshot, updateDoc, doc, query, orderBy, QuerySnapshot } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { db } from './firebase'
import AdminDashboard from './components/AdminDashboard'
import VotingInterface from './components/VotingInterface'
import type { Poll, Vote } from './types.ts'
import './App.css'

function App() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [votes, setVotes] = useState<Vote[]>([])
  const [loading, setLoading] = useState(true)

  // Set up real-time listeners for polls and votes
  useEffect(() => {
    // Listen to polls collection
    const pollsQuery = query(collection(db, 'polls'), orderBy('createdAt', 'desc'))
    const unsubscribePolls = onSnapshot(pollsQuery, (snapshot: QuerySnapshot<DocumentData>) => {
      const pollsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Poll[]
      setPolls(pollsData)
      setLoading(false)
    })

    // Listen to votes collection
    const votesQuery = query(collection(db, 'votes'), orderBy('timestamp', 'desc'))
    const unsubscribeVotes = onSnapshot(votesQuery, (snapshot: QuerySnapshot<DocumentData>) => {
      const votesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Vote[]
      setVotes(votesData)
    })

    // Cleanup listeners on unmount
    return () => {
      unsubscribePolls()
      unsubscribeVotes()
    }
  }, [])

  const addPoll = async (poll: Poll) => {
    try {
      await addDoc(collection(db, 'polls'), {
        ...poll,
        createdAt: new Date()
      })
    } catch (error) {
      console.error('Error adding poll:', error)
    }
  }

  const updatePoll = async (pollId: string, updates: Partial<Poll>) => {
    try {
      const pollRef = doc(db, 'polls', pollId)
      await updateDoc(pollRef, updates)
    } catch (error) {
      console.error('Error updating poll:', error)
    }
  }

  const addVote = async (vote: Vote) => {
    try {
      await addDoc(collection(db, 'votes'), {
        ...vote,
        timestamp: new Date()
      })
    } catch (error) {
      console.error('Error adding vote:', error)
    }
  }

  const VotingPage = () => {
    const { pollId } = useParams<{ pollId: string }>()
    const poll = polls.find(p => p.id === pollId)
    
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading poll...</p>
          </div>
        </div>
      )
    }
    
    if (!poll) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
