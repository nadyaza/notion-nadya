import type { LearningItem } from './types'

// Framer Motion Animation Variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

// Learning Items Data
export const learningItems: LearningItem[] = [
  {
    icon: '📝',
    color: 'from-pink-400 to-rose-500',
    bg: 'from-pink-50 to-rose-50',
    title: 'Pengenalan Notion',
    desc: 'Memahami interface dan fitur dasar Notion untuk pemula'
  },
  {
    icon: '🧱',
    color: 'from-purple-400 to-violet-500',
    bg: 'from-purple-50 to-violet-50',
    title: 'Blocks & Pages',
    desc: 'Cara membuat dan mengatur pages serta berbagai jenis blocks'
  },
  {
    icon: '✅',
    color: 'from-blue-400 to-cyan-500',
    bg: 'from-blue-50 to-cyan-50',
    title: 'To-Do Lists',
    desc: 'Membuat daftar tugas sederhana untuk produktivitas harian'
  },
  {
    icon: '📚',
    color: 'from-emerald-400 to-teal-500',
    bg: 'from-emerald-50 to-teal-50',
    title: 'Organize Notes',
    desc: 'Tips mengorganisir catatan dan dokumen dengan mudah'
  },
]

// Initial Form Data
export const initialFormData = {
  nama: '',
  email: '',
  whatsapp: '',
  institusi: '',
  kebutuhan: '',
  saranTopik: ''
}
