import { useState, useEffect } from 'react'
import type { Poll, Vote } from '../types.ts'
import { v4 as uuidv4 } from 'uuid'

interface VotingInterfaceProps {
  poll: Poll
  votes: Vote[]
  onVote: (vote: Vote) => Promise<void>
}

const VotingInterface = ({ poll, votes, onVote }: VotingInterfaceProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [hasVoted, setHasVoted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [voterFingerprint, setVoterFingerprint] = useState('')

  // Generate browser fingerprint for duplicate vote prevention
  useEffect(() => {
    const generateFingerprint = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      ctx?.fillText('fingerprint', 10, 10)
      
      const fingerprint = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset(),
        canvas.toDataURL()
      ].join('|')
      
      return btoa(fingerprint).slice(0, 32)
    }

    const fp = generateFingerprint()
    setVoterFingerprint(fp)

    // Check if this fingerprint has already voted
    const existingVote = votes.find(vote => vote.voterFingerprint === fp)
    if (existingVote) {
      setHasVoted(true)
    }
  }, [votes])

  const handleOptionChange = (optionId: string) => {
    if (poll.allowMultipleChoice) {
      setSelectedOptions(prev => 
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      )
    } else {
      setSelectedOptions([optionId])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedOptions.length === 0) {
      alert('Please select at least one option')
      return
    }

    if (hasVoted) {
      alert('You have already voted in this poll')
      return
    }

    setIsSubmitting(true)

    try {
      const vote: Vote = {
        id: uuidv4(),
        pollId: poll.id,
        selectedOptions,
        timestamp: new Date(),
        voterFingerprint
      }

      await onVote(vote)
      setHasVoted(true)
      
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error('Error submitting vote:', error)
      alert('Error submitting vote. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isExpired = poll.deadline && new Date() > new Date(poll.deadline)
  const isPollClosed = !poll.isActive || poll.isCompleted || isExpired

  if (isPollClosed && !hasVoted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Poll Closed</h1>
          <p className="text-lg text-gray-700 mb-6">
            {poll.isCompleted ? 'This poll has been completed by the administrator.' :
             isExpired ? 'This poll has expired.' :
             'This poll is not currently active.'}
          </p>
          
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-gray-900 mb-2">{poll.title}</h3>
            {poll.deadline && (
              <div className="text-red-700">
                <p className="font-semibold">Deadline was:</p>
                <p className="text-sm">{new Date(poll.deadline).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (hasVoted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Vote Submitted Successfully!</h1>
          <p className="text-lg text-gray-700 mb-6">Thank you for participating in this poll</p>
          
          <div className="bg-green-50 rounded-lg p-4 text-left border border-green-200">
            <h3 className="font-bold text-gray-900 mb-2">{poll.title}</h3>
            <p className="text-gray-700 mb-3">{poll.question}</p>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-800">Your selections:</p>
              {selectedOptions.map(optionId => {
                const option = poll.options.find(opt => opt.id === optionId)
                return (
                  <div key={optionId} className="flex items-center space-x-2 text-green-700">
                    <span>✓</span>
                    <span>{option?.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🗳️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{poll.title}</h1>
          <p className="text-lg text-gray-600">{poll.question}</p>
          
          {poll.deadline && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⏰ Voting closes: {new Date(poll.deadline).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Voting Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {poll.options.map((option) => (
              <label
                key={option.id}
                className={`block p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedOptions.includes(option.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type={poll.allowMultipleChoice ? 'checkbox' : 'radio'}
                    name="poll-option"
                    value={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionChange(option.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-base font-medium text-gray-800">{option.text}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Vote Type Info */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="text-center text-blue-700 text-sm">
              {poll.allowMultipleChoice ? 'Multiple selections allowed' : 'Single selection only'}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={selectedOptions.length === 0 || isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-blue-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Vote'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span className="text-lg">🔒</span>
            <p className="text-sm">
              Your vote is anonymous and secure. You can only vote once.
            </p>
            <span className="text-lg">🛡️</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default VotingInterface