'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

export default function Home() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    whatsapp: '',
    institusi: '',
    kebutuhan: '',
    saranTopik: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Gagal mengirim data')

      setSubmitStatus('success')
      setFormData({
        nama: '',
        email: '',
        whatsapp: '',
        institusi: '',
        kebutuhan: '',
        saranTopik: ''
      })

      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl">📝</div>
              <span className="text-base font-semibold text-gray-900">
                Notion Workshop
              </span>
            </div>
            <a
              href="/registrations"
              className="inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        {/* Success/Error Messages */}
        <AnimatePresence mode="wait">
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4"
            >
              <div className="flex gap-3">
                <span className="text-xl">✅</span>
                <div>
                  <p className="font-medium text-green-900">Pendaftaran Berhasil!</p>
                  <p className="mt-1 text-sm text-green-700">
                    Terima kasih sudah mendaftar. Kami akan menghubungi Anda segera melalui email atau WhatsApp.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4"
            >
              <div className="flex gap-3">
                <span className="text-xl">❌</span>
                <div>
                  <p className="font-medium text-red-900">Terjadi Kesalahan</p>
                  <p className="mt-1 text-sm text-red-700">
                    Mohon maaf, ada kesalahan saat mengirim data. Silakan coba lagi.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <div className="py-16 lg:py-20">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              Workshop Besok
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Notion Workshop
          </h1>

          <p className="mb-2 text-xl font-medium text-gray-700 sm:text-2xl">
            Belajar Basic untuk Pemula
          </p>

          <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Belajar Notion dari nol! Workshop ini dirancang khusus untuk pemula yang ingin memulai perjalanan produktivitas dengan Notion. Pelajari dasar-dasar dan mulai mengorganisir hidup Anda dengan lebih baik.
          </p>
        </div>

        {/* Banner - Removed for cleaner Notion-style */}

        {/* Event Details */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:mb-20">
          <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">📅</span>
              <h3 className="text-base font-semibold text-gray-900">Jadwal</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-500">Tanggal</span>
                <span className="text-sm font-medium text-gray-900">Besok</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-500">Waktu</span>
                <span className="text-sm font-medium text-gray-900">10:00 Pagi</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-500">Durasi</span>
                <span className="text-sm font-medium text-gray-900">2 Jam</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <h3 className="text-base font-semibold text-gray-900">Lokasi</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-500">Format</span>
                <span className="text-sm font-medium text-gray-900">Online</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-500">Platform</span>
                <span className="text-sm font-medium text-gray-900">Zoom</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-500">Biaya</span>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-0.5 text-sm font-medium text-green-700">Gratis!</span>
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-16 lg:mb-20">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Apa yang Akan Dipelajari
          </h2>
          <div className="space-y-3">
            {[
              { icon: '📝', title: 'Pengenalan Notion', desc: 'Memahami interface dan fitur dasar Notion untuk pemula' },
              { icon: '🧱', title: 'Blocks & Pages', desc: 'Cara membuat dan mengatur pages serta berbagai jenis blocks' },
              { icon: '✅', title: 'To-Do Lists', desc: 'Membuat daftar tugas sederhana untuk produktivitas harian' },
              { icon: '📚', title: 'Organize Notes', desc: 'Tips mengorganisir catatan dan dokumen dengan mudah' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-sm"
              >
                <div className="flex-shrink-0 text-2xl">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="mb-1 font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="pb-16 lg:pb-20">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Daftar Sekarang</h2>
            <p className="text-base text-gray-600">Isi form di bawah untuk mengamankan tempat Anda</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 sm:p-8"
          >
            {/* Nama */}
            <div>
              <label htmlFor="nama" className="mb-1.5 block text-sm font-medium text-gray-700">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                required
                value={formData.nama}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Nama Anda"
              />
            </div>

            {/* Email & WhatsApp */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="email@contoh.com"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="mb-1.5 block text-sm font-medium text-gray-700">
                  WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="08123456789"
                />
              </div>
            </div>

            {/* Institusi */}
            <div>
              <label htmlFor="institusi" className="mb-1.5 block text-sm font-medium text-gray-700">
                Institusi / Perusahaan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="institusi"
                name="institusi"
                required
                value={formData.institusi}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Universitas, sekolah, atau nama perusahaan"
              />
            </div>

            {/* Kebutuhan */}
            <div>
              <label htmlFor="kebutuhan" className="mb-1.5 block text-sm font-medium text-gray-700">
                Mengapa ingin ikut workshop ini? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="kebutuhan"
                name="kebutuhan"
                required
                value={formData.kebutuhan}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ceritakan apa yang ingin Anda pelajari atau capai..."
              />
            </div>

            {/* Saran Topik */}
            <div>
              <label htmlFor="saranTopik" className="mb-1.5 block text-sm font-medium text-gray-700">
                Saran Topik <span className="text-gray-400">(Opsional)</span>
              </label>
              <textarea
                id="saranTopik"
                name="saranTopik"
                value={formData.saranTopik}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Topik apa yang ingin Anda pelajari?"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Mengirim...
                </span>
              ) : (
                'Daftar Workshop'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 py-8">
          <p className="text-sm text-gray-500">
            Ada pertanyaan? Hubungi kami di{' '}
            <a
              href="mailto:nadya@notion-workshop.com"
              className="text-blue-600 hover:underline"
            >
              nadya@notion-workshop.com
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
