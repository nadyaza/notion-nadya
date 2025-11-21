// Form Data Types
export interface RegistrationFormData {
  nama: string
  email: string
  whatsapp: string
  institusi: string
  kebutuhan: string
  saranTopik: string
}

// Registration Database Model
export interface Registration {
  id: number
  nama: string
  email: string
  whatsapp: string
  institusi: string
  kebutuhan: string
  saranTopik: string | null
  createdAt: Date
  updatedAt: Date
}

// Form Submit Status
export type SubmitStatus = 'idle' | 'success' | 'error'

// Learning Item for "What You'll Learn" section
export interface LearningItem {
  icon: string
  color: string
  bg: string
  title: string
  desc: string
}
