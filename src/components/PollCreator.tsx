import { useState } from 'react'

interface PollCreatorProps {
  onCreatePoll: (pollData: {
    title: string
    question: string
    options: string[]
    allowMultipleChoice: boolean
    deadline?: Date
  }) => void
}

const PollCreator = ({ onCreatePoll }: PollCreatorProps) => {
  const [title, setTitle] = useState('')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [allowMultipleChoice, setAllowMultipleChoice] = useState(false)
  const [hasDeadline, setHasDeadline] = useState(false)
  const [deadline, setDeadline] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const addOption = () => {
    setOptions([...options, ''])
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const validateForm = () => {
    const newErrors: string[] = []

    if (!title.trim()) {
      newErrors.push('Poll title is required')
    }

    if (!question.trim()) {
      newErrors.push('Poll question is required')
    }

    const validOptions = options.filter(opt => opt.trim())
    if (validOptions.length < 2) {
      newErrors.push('At least 2 options are required')
    }

    if (hasDeadline && !deadline) {
      newErrors.push('Deadline date is required when enabled')
    }

    if (hasDeadline && deadline && new Date(deadline) <= new Date()) {
      newErrors.push('Deadline must be in the future')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const validOptions = options.filter(opt => opt.trim())
    
    onCreatePoll({
      title: title.trim(),
      question: question.trim(),
      options: validOptions,
      allowMultipleChoice,
      deadline: hasDeadline && deadline ? new Date(deadline) : undefined
    })

    // Reset form
    setTitle('')
    setQuestion('')
    setOptions(['', ''])
    setAllowMultipleChoice(false)
    setHasDeadline(false)
    setDeadline('')
    setErrors([])
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <div className="text-4xl mb-3">📝</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Poll</h2>
        <p className="text-gray-600">Set up a new poll with custom options and settings</p>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h3>
          <ul className="text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Poll Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Poll Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a descriptive title for your poll"
          />
        </div>

        {/* Poll Question */}
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Poll Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What question would you like to ask voters?"
          />
        </div>

        {/* Poll Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poll Options
          </label>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Option ${index + 1}`}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addOption}
            className="mt-3 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors flex items-center space-x-1"
          >
            <span>+</span>
            <span>Add Option</span>
          </button>
        </div>

        {/* Poll Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Poll Settings</h3>
          
          {/* Multiple Choice Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="multipleChoice"
              checked={allowMultipleChoice}
              onChange={(e) => setAllowMultipleChoice(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="multipleChoice" className="text-sm font-medium text-gray-700">
              Allow multiple choice selection
            </label>
          </div>

          {/* Deadline Toggle */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hasDeadline"
                checked={hasDeadline}
                onChange={(e) => setHasDeadline(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hasDeadline" className="text-sm font-medium text-gray-700">
                Set voting deadline
              </label>
            </div>
            
            {hasDeadline && (
              <div className="ml-2">
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Create Poll
          </button>
        </div>
      </form>
    </div>
  )
}

export default PollCreator