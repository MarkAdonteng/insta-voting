import { useState } from 'react'
import type { Poll, Vote, PollOption } from '../types.ts'
import PollCreator from './PollCreator'
import PollManager from './PollManager'
import PollResults from './PollResults'
import { v4 as uuidv4 } from 'uuid'

interface AdminDashboardProps {
  polls: Poll[]
  votes: Vote[]
  onAddPoll: (poll: Poll) => Promise<void>
  onUpdatePoll: (pollId: string, updates: Partial<Poll>) => Promise<void>
}

type ActiveTab = 'create' | 'manage' | 'results'

const AdminDashboard = ({ polls, votes, onAddPoll, onUpdatePoll }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('create')

  const handleCreatePoll = async (pollData: {
    title: string
    question: string
    options: string[]
    allowMultipleChoice: boolean
    deadline?: Date
  }) => {
    const pollOptions: PollOption[] = pollData.options.map(text => ({
      id: uuidv4(),
      text
    }))

    const newPoll: Poll = {
      id: uuidv4(),
      title: pollData.title,
      question: pollData.question,
      options: pollOptions,
      allowMultipleChoice: pollData.allowMultipleChoice,
      isActive: true,
      isCompleted: false,
      deadline: pollData.deadline,
      createdAt: new Date()
    }

    await onAddPoll(newPoll)
    setActiveTab('manage')
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="card rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="text-3xl">🗳️</div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">E-Voting Admin</h1>
                    <p className="text-gray-600 mt-1">Create and manage polls</p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{polls.length}</div>
                      <div className="text-gray-600 text-sm">Total Polls</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{polls.filter(p => p.isActive).length}</div>
                      <div className="text-gray-600 text-sm">Active Polls</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                activeTab === 'create'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              📝 Create Poll
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                activeTab === 'manage'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              ⚙️ Manage Polls
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                activeTab === 'results'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              📊 View Results
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow p-6">
            {activeTab === 'create' && (
              <PollCreator onCreatePoll={handleCreatePoll} />
            )}
            {activeTab === 'manage' && (
              <PollManager polls={polls} votes={votes} onUpdatePoll={onUpdatePoll} />
            )}
            {activeTab === 'results' && (
              <PollResults polls={polls} votes={votes} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard