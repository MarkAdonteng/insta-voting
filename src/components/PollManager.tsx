import { useState } from 'react'
import type { Poll, Vote } from '../types.ts'
import QRCode from 'react-qr-code'

interface PollManagerProps {
  polls: Poll[]
  votes: Vote[]
  onUpdatePoll: (pollId: string, updates: Partial<Poll>) => void
}

const PollManager = ({ polls, votes, onUpdatePoll }: PollManagerProps) => {
  const [showQRCode, setShowQRCode] = useState<string | null>(null)

  const getVoteCount = (pollId: string) => {
    return votes.filter(vote => vote.pollId === pollId).length
  }

  const handleStartVoting = (pollId: string) => {
    const pollUrl = `${window.location.origin}/vote/${pollId}`
    onUpdatePoll(pollId, { 
      isActive: true, 
      qrCodeUrl: pollUrl 
    })
    setShowQRCode(pollId)
  }

  const handleStopVoting = (pollId: string) => {
    onUpdatePoll(pollId, { 
      isActive: false, 
      isCompleted: true 
    })
    setShowQRCode(null)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Link copied to clipboard!')
  }

  const downloadQRCode = (pollId: string) => {
    const svg = document.getElementById(`qr-${pollId}`)
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = `poll-${pollId}-qr.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString()
  }

  const isExpired = (poll: Poll) => {
    return poll.deadline && new Date() > new Date(poll.deadline)
  }

  const getStatusBadge = (poll: Poll) => {
    if (poll.isCompleted) {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Completed</span>
    }
    if (poll.isActive) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
    }
    if (isExpired(poll)) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Expired</span>
    }
    return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Draft</span>
  }

  if (polls.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No polls created yet</h3>
        <p className="text-gray-600">Create your first poll to get started with voting</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Polls</h2>
        <p className="text-gray-600">Start voting, monitor progress, and manage your polls</p>
      </div>

      <div className="space-y-6">
        {polls.map((poll) => (
          <div key={poll.id} className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{poll.title}</h3>
                  {getStatusBadge(poll)}
                </div>
                <p className="text-gray-600 mb-2">{poll.question}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <div>Created: {formatDate(poll.createdAt)}</div>
                  {poll.deadline && (
                    <div>Deadline: {formatDate(poll.deadline)}</div>
                  )}
                  <div>Vote Type: {poll.allowMultipleChoice ? 'Multiple Choice' : 'Single Choice'}</div>
                  <div>Total Votes: <span className="font-medium">{getVoteCount(poll.id)}</span></div>
                </div>
              </div>
            </div>

            {/* Poll Options Preview */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Options:</h4>
              <div className="grid grid-cols-2 gap-2">
                {poll.options.map((option, index) => (
                  <div key={option.id} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
                    {index + 1}. {option.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {!poll.isActive && !poll.isCompleted && !isExpired(poll) && (
                <button
                  onClick={() => handleStartVoting(poll.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  🚀 Start Voting
                </button>
              )}
              
              {poll.isActive && (
                <button
                  onClick={() => handleStopVoting(poll.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  ⏹️ Stop Voting
                </button>
              )}
              
              {poll.qrCodeUrl && (
                <>
                  <button
                    onClick={() => setShowQRCode(showQRCode === poll.id ? null : poll.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    📱 {showQRCode === poll.id ? 'Hide' : 'Show'} QR Code
                  </button>
                  <button
                    onClick={() => copyToClipboard(poll.qrCodeUrl!)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    📋 Copy Link
                  </button>
                </>
              )}
            </div>

            {/* QR Code Display */}
            {showQRCode === poll.id && poll.qrCodeUrl && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">QR Code for Voting</h4>
                  <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
                    <QRCode
                      id={`qr-${poll.id}`}
                      value={poll.qrCodeUrl}
                      size={200}
                      level="M"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">Scan this QR code or share the link:</p>
                    <div className="bg-white p-3 rounded border text-sm font-mono break-all">
                      {poll.qrCodeUrl}
                    </div>
                    <div className="flex justify-center space-x-3 mt-4">
                      <button
                        onClick={() => downloadQRCode(poll.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        💾 Download QR Code
                      </button>
                      <button
                        onClick={() => copyToClipboard(poll.qrCodeUrl!)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                      >
                        📋 Copy Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Real-time Vote Count */}
            {poll.isActive && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 font-medium">🔴 Live Voting in Progress</span>
                  <span className="text-blue-600 font-bold">{getVoteCount(poll.id)} votes received</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PollManager