'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { RegistrationFormData, SubmitStatus } from '@/lib/types'
import { fadeInUp, staggerContainer, scaleIn, learningItems, initialFormData } from '@/lib/constants'

export default function Home() {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

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
      setFormData(initialFormData)

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-pink-200/40 to-purple-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/40 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 text-xl shadow-lg shadow-purple-200/50">
                ✨
              </div>
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
                Notion Workshop
              </span>
            </div>
            <a
              href="/registrations"
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 text-sm font-medium text-white shadow-md shadow-purple-300/50 transition-all hover:shadow-lg hover:shadow-purple-300/60"
            >
              Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Success/Error Messages */}
        <AnimatePresence mode="wait">
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-8 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-lg shadow-green-100"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">💚</span>
                <div>
                  <p className="font-semibold text-green-900">Pendaftaran Berhasil!</p>
                  <p className="mt-1 text-sm text-green-700">
                    Terima kasih sudah mendaftar. Kami akan menghubungi Anda segera! ✨
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-8 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 p-6 shadow-lg shadow-red-100"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">💔</span>
                <div>
                  <p className="font-semibold text-red-900">Oops! Ada Kesalahan</p>
                  <p className="mt-1 text-sm text-red-700">
                    Mohon maaf, silakan coba lagi ya! 🙏
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <div className="py-20 text-center lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 shadow-md">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-purple-500"
              />
              Workshop Besok Pagi ☀️
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl lg:text-6xl"
          >
            Notion Workshop ✨
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-2xl font-bold text-gray-700 sm:text-3xl"
          >
            Belajar Basic untuk Pemula 🌸
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg"
          >
            Belajar Notion dari nol! Workshop ini dirancang khusus untuk pemula yang ingin memulai perjalanan produktivitas dengan Notion.
            Pelajari dasar-dasar dan mulai mengorganisir hidup Anda dengan lebih baik! 💖
          </motion.p>
        </div>

        {/* Event Details */}
        <div className="mb-24 grid gap-7 sm:grid-cols-2 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 p-8 shadow-lg shadow-pink-100 transition-all"
          >
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-2xl shadow-lg">
                📅
              </div>
              <h3 className="text-lg font-bold text-gray-800">Jadwal Workshop</h3>
            </div>
            <div className="space-y-4 text-center">
              <div>
                <p className="text-xs font-medium text-gray-500">Tanggal</p>
                <p className="text-sm font-semibold text-gray-900">Besok Pagi</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Waktu</p>
                <p className="text-sm font-semibold text-gray-900">10:00 AM</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Durasi</p>
                <p className="text-sm font-semibold text-gray-900">2 Jam</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 p-8 shadow-lg shadow-purple-100 transition-all"
          >
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-500 text-2xl shadow-lg">
                📍
              </div>
              <h3 className="text-lg font-bold text-gray-800">Detail Acara</h3>
            </div>
            <div className="space-y-4 text-center">
              <div>
                <p className="text-xs font-medium text-gray-500">Format</p>
                <p className="text-sm font-semibold text-gray-900">Online</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Platform</p>
                <p className="text-sm font-semibold text-gray-900">Zoom</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Biaya</p>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 px-3 py-1 text-sm font-bold text-white shadow-md">
                  Gratis! 🎉
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-24 text-center lg:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
          >
            Apa yang Akan Dipelajari 📚
          </motion.h2>
          <div className="grid gap-7 sm:grid-cols-2">
            {learningItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`rounded-2xl bg-gradient-to-br ${item.bg} p-8 shadow-lg transition-all`}
              >
                <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-2xl shadow-lg`}>
                  {item.icon}
                </div>
                <h4 className="mb-3 font-bold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="pb-24 text-center lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
              Daftar Sekarang! 💫
            </h2>
            <p className="text-base text-gray-600">Isi form di bawah untuk mengamankan tempat Anda ✨</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="mx-auto max-w-2xl space-y-7 rounded-3xl bg-white/80 p-8 shadow-2xl shadow-purple-100 backdrop-blur-sm sm:p-12"
          >
            {/* Nama */}
            <div className="text-center">
              <label htmlFor="nama" className="mb-3 block text-sm font-semibold text-gray-700">
                Nama Lengkap 🌸 <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                required
                value={formData.nama}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-purple-200 bg-white px-5 py-4 text-center text-gray-900 transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            {/* Email & WhatsApp */}
            <div className="grid gap-7 text-center sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-3 block text-sm font-semibold text-gray-700">
                  Email 💌 <span className="text-pink-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-purple-200 bg-white px-5 py-4 text-center text-gray-900 transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="mb-3 block text-sm font-semibold text-gray-700">
                  WhatsApp 📱 <span className="text-pink-500">*</span>
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-purple-200 bg-white px-5 py-4 text-center text-gray-900 transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                  placeholder="08123456789"
                />
              </div>
            </div>

            {/* Institusi */}
            <div className="text-center">
              <label htmlFor="institusi" className="mb-3 block text-sm font-semibold text-gray-700">
                Institusi / Perusahaan 🏫 <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                id="institusi"
                name="institusi"
                required
                value={formData.institusi}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-purple-200 bg-white px-5 py-4 text-center text-gray-900 transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                placeholder="Nama universitas atau perusahaan"
              />
            </div>

            {/* Kebutuhan */}
            <div className="text-center">
              <label htmlFor="kebutuhan" className="mb-3 block text-sm font-semibold text-gray-700">
                Mengapa ingin ikut workshop ini? 💭 <span className="text-pink-500">*</span>
              </label>
              <textarea
                id="kebutuhan"
                name="kebutuhan"
                required
                value={formData.kebutuhan}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border-2 border-purple-200 bg-white px-5 py-4 text-center text-gray-900 transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                placeholder="Ceritakan tujuan dan harapan Anda mengikuti workshop ini"
              />
            </div>

            {/* Saran Topik */}
            <div className="text-center">
              <label htmlFor="saranTopik" className="mb-3 block text-sm font-semibold text-gray-700">
                Saran Topik ✏️ <span className="text-gray-400">(Opsional)</span>
              </label>
              <textarea
                id="saranTopik"
                name="saranTopik"
                value={formData.saranTopik}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border-2 border-purple-200 bg-white px-5 py-4 text-center text-gray-900 transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                placeholder="Topik tertentu yang ingin dipelajari"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-10 py-6 text-lg font-bold text-white shadow-lg shadow-purple-300/50 transition-all hover:shadow-xl hover:shadow-purple-300/60 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-6 w-6 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Mengirim...
                </span>
              ) : (
                '✨ Daftar Workshop Sekarang! ✨'
              )}
            </motion.button>
          </motion.form>
        </div>

        {/* Footer */}
        <div className="border-t border-purple-100 py-12 text-center">
          <p className="text-sm text-gray-600">
            Ada pertanyaan? Hubungi kami di 💌{' '}
            <a
              href="mailto:nadya@notion-workshop.com"
              className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text font-semibold text-transparent hover:underline"
            >
              nadya@notion-workshop.com
            </a>
          </p>
          <p className="mt-3 text-xs text-gray-400">Made with 💖 by Nadya</p>
        </div>
      </main>
    </div>
  )
}
