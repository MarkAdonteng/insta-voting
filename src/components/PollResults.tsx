import { useState } from 'react'
import type { Poll, Vote, VoteResult, PollResults as PollResultsType } from '../types.ts'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface PollResultsProps {
  polls: Poll[]
  votes: Vote[]
}

const PollResults = ({ polls, votes }: PollResultsProps) => {
  const [selectedPollId, setSelectedPollId] = useState<string | null>(null)
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar')
  const [isExporting, setIsExporting] = useState(false)

  const calculateResults = (poll: Poll): PollResultsType => {
    const pollVotes = votes.filter(vote => vote.pollId === poll.id)
    const totalVotes = pollVotes.length
    
    const optionCounts: { [optionId: string]: number } = {}
    
    // Initialize counts
    poll.options.forEach(option => {
      optionCounts[option.id] = 0
    })
    
    // Count votes
    pollVotes.forEach(vote => {
      vote.selectedOptions.forEach(optionId => {
        if (optionCounts[optionId] !== undefined) {
          optionCounts[optionId]++
        }
      })
    })
    
    const results: VoteResult[] = poll.options.map(option => ({
      optionId: option.id,
      optionText: option.text,
      count: optionCounts[option.id],
      percentage: totalVotes > 0 ? (optionCounts[option.id] / totalVotes) * 100 : 0
    }))
    
    return {
      pollId: poll.id,
      totalVotes,
      results
    }
  }

  const completedPolls = polls.filter(poll => poll.isCompleted || !poll.isActive)
  const selectedPoll = selectedPollId ? polls.find(p => p.id === selectedPollId) : null
  const selectedResults = selectedPoll ? calculateResults(selectedPoll) : null

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6B7280', '#14B8A6']

  const exportToPDF = async () => {
    if (!selectedPoll || !selectedResults) return
    
    setIsExporting(true)
    
    try {
      const resultsElement = document.getElementById('poll-results-export')
      if (!resultsElement) return
      
      const canvas = await html2canvas(resultsElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      // Add title
      pdf.setFontSize(20)
      pdf.text('Poll Results Report', 20, 20)
      
      // Add poll info
      pdf.setFontSize(12)
      pdf.text(`Poll: ${selectedPoll.title}`, 20, 35)
      pdf.text(`Question: ${selectedPoll.question}`, 20, 45)
      pdf.text(`Total Votes: ${selectedResults.totalVotes}`, 20, 55)
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 65)
      
      // Add chart image
      const imgWidth = 170
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 20, 80, imgWidth, imgHeight)
      
      // Add detailed results
      let yPosition = 80 + imgHeight + 20
      pdf.setFontSize(14)
      pdf.text('Detailed Results:', 20, yPosition)
      
      yPosition += 10
      pdf.setFontSize(10)
      selectedResults.results.forEach((result, index) => {
        pdf.text(
          `${index + 1}. ${result.optionText}: ${result.count} votes (${result.percentage.toFixed(1)}%)`,
          25,
          yPosition
        )
        yPosition += 7
      })
      
      pdf.save(`poll-results-${selectedPoll.id}.pdf`)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Error exporting PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const exportToCSV = () => {
    if (!selectedPoll || !selectedResults) return
    
    const csvContent = [
      ['Poll Title', selectedPoll.title],
      ['Question', selectedPoll.question],
      ['Total Votes', selectedResults.totalVotes.toString()],
      ['Generated', new Date().toLocaleString()],
      [''],
      ['Option', 'Votes', 'Percentage'],
      ...selectedResults.results.map(result => [
        result.optionText,
        result.count.toString(),
        `${result.percentage.toFixed(1)}%`
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `poll-results-${selectedPoll.id}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  if (completedPolls.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No completed polls</h3>
        <p className="text-gray-600">Complete some polls to view their results here</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Poll Results</h2>
        <p className="text-gray-600">View and export results from completed polls</p>
      </div>

      {/* Poll Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select a poll to view results:
        </label>
        <select
          value={selectedPollId || ''}
          onChange={(e) => setSelectedPollId(e.target.value || null)}
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose a poll...</option>
          {completedPolls.map(poll => (
            <option key={poll.id} value={poll.id}>
              {poll.title} ({votes.filter(v => v.pollId === poll.id).length} votes)
            </option>
          ))}
        </select>
      </div>

      {selectedPoll && selectedResults && (
        <div id="poll-results-export" className="space-y-6">
          {/* Poll Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedPoll.title}</h3>
            <p className="text-gray-600 mb-4">{selectedPoll.question}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="font-medium text-blue-900">Total Votes</div>
                <div className="text-2xl font-bold text-blue-600">{selectedResults.totalVotes}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="font-medium text-green-900">Poll Type</div>
                <div className="text-green-600">{selectedPoll.allowMultipleChoice ? 'Multiple' : 'Single'} Choice</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="font-medium text-purple-900">Created</div>
                <div className="text-purple-600">{new Date(selectedPoll.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-gray-900">Status</div>
                <div className="text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          {/* Chart Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Chart Type:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    chartType === 'bar'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  📊 Bar Chart
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    chartType === 'pie'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🥧 Pie Chart
                </button>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={exportToCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                📄 Export CSV
              </button>
              <button
                onClick={exportToPDF}
                disabled={isExporting}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {isExporting ? '⏳ Exporting...' : '📑 Export PDF'}
              </button>
            </div>
          </div>

          {/* Chart Display */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Results Visualization</h4>
            
            {selectedResults.totalVotes === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-2">📭</div>
                <p>No votes received for this poll</p>
              </div>
            ) : (
              <div className="h-96">
                {chartType === 'bar' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedResults.results}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="optionText" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [`${value} votes`, 'Votes']}
                        labelFormatter={(label) => `Option: ${label}`}
                      />
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={selectedResults.results}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ optionText, percentage }) => `${optionText}: ${percentage.toFixed(1)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {selectedResults.results.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value} votes`, 'Votes']} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            )}
          </div>

          {/* Detailed Results Table */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Detailed Results</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">#</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Option</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Votes</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Percentage</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Visual</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedResults.results.map((result, index) => (
                    <tr key={result.optionId} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{result.optionText}</td>
                      <td className="py-3 px-4 text-gray-600">{result.count}</td>
                      <td className="py-3 px-4 text-gray-600">{result.percentage.toFixed(1)}%</td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${result.percentage}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PollResults