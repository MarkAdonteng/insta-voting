export interface PollOption {
  id: string
  text: string
}

export interface Poll {
  id: string
  title: string
  question: string
  options: PollOption[]
  allowMultipleChoice: boolean
  isActive: boolean
  isCompleted: boolean
  deadline?: Date
  createdAt: Date
  qrCodeUrl?: string
}

export interface Vote {
  id: string
  pollId: string
  selectedOptions: string[] // Array of option IDs
  timestamp: Date
  voterFingerprint: string // Browser fingerprint to prevent duplicate voting
}

export interface VoteResult {
  optionId: string
  optionText: string
  count: number
  percentage: number
}

export interface PollResults {
  pollId: string
  totalVotes: number
  results: VoteResult[]
}