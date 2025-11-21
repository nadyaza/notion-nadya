'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { RegistrationFormData, SubmitStatus } from '@/lib/types'
import { fadeInUp, staggerContainer, learningItems, initialFormData } from '@/lib/constants'

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-blue-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-purple-100/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 text-lg font-bold text-white shadow-sm">
                N
              </div>
              <span className="text-lg font-bold text-gray-900">
                Notion Workshop
              </span>
            </div>
            <a
              href="/registrations"
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-purple-700 active:scale-95"
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 rounded-xl border border-green-200 bg-green-50 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-green-900">Pendaftaran Berhasil!</p>
                  <p className="mt-1 text-sm text-green-700">
                    Terima kasih sudah mendaftar. Kami akan menghubungi Anda segera.
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
              className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  !
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-red-900">Terjadi Kesalahan</p>
                  <p className="mt-1 text-sm text-red-700">
                    Mohon maaf, silakan coba lagi.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="py-16 text-center sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
              </span>
              Workshop Besok Pagi
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Notion Workshop
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3 text-xl font-semibold text-gray-700 sm:text-2xl"
          >
            Belajar Basic untuk Pemula
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600"
          >
            Belajar Notion dari nol! Workshop ini dirancang khusus untuk pemula yang ingin memulai perjalanan produktivitas dengan Notion.
          </motion.p>
        </section>

        {/* Event Details - 64px spacing */}
        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 text-xl">
                  📅
                </div>
                <h3 className="text-lg font-bold text-gray-900">Jadwal Workshop</h3>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="text-sm font-medium text-gray-600">Tanggal</span>
                  <span className="text-sm font-semibold text-gray-900">Besok Pagi</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="text-sm font-medium text-gray-600">Waktu</span>
                  <span className="text-sm font-semibold text-gray-900">10:00 AM</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="text-sm font-medium text-gray-600">Durasi</span>
                  <span className="text-sm font-semibold text-gray-900">2 Jam</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-xl">
                  📍
                </div>
                <h3 className="text-lg font-bold text-gray-900">Detail Acara</h3>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="text-sm font-medium text-gray-600">Format</span>
                  <span className="text-sm font-semibold text-gray-900">Online</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="text-sm font-medium text-gray-600">Platform</span>
                  <span className="text-sm font-semibold text-gray-900">Zoom</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="text-sm font-medium text-gray-600">Biaya</span>
                  <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-800">
                    Gratis
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What You'll Learn - 64px spacing, card-based layout with left-aligned text */}
        <section className="pb-16 sm:pb-20 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Apa yang Akan Dipelajari
            </h2>
            <p className="text-base text-gray-600">
              Materi workshop yang akan dibahas
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {learningItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-purple-200 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 text-2xl">
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Registration Form - 64px spacing, proper card container */}
        <section className="pb-16 sm:pb-20 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Daftar Sekarang
            </h2>
            <p className="text-base text-gray-600">
              Isi form di bawah untuk mengamankan tempat Anda
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama */}
              <div>
                <label htmlFor="nama" className="mb-2 block text-sm font-semibold text-gray-900">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  required
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              {/* Email & WhatsApp */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-900">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    placeholder="nama@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-gray-900">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              {/* Institusi */}
              <div>
                <label htmlFor="institusi" className="mb-2 block text-sm font-semibold text-gray-900">
                  Institusi / Perusahaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="institusi"
                  name="institusi"
                  required
                  value={formData.institusi}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  placeholder="Nama universitas atau perusahaan"
                />
              </div>

              {/* Kebutuhan */}
              <div>
                <label htmlFor="kebutuhan" className="mb-2 block text-sm font-semibold text-gray-900">
                  Mengapa ingin ikut workshop ini? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="kebutuhan"
                  name="kebutuhan"
                  required
                  value={formData.kebutuhan}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  placeholder="Ceritakan tujuan dan harapan Anda mengikuti workshop ini"
                  style={{ minHeight: '100px' }}
                />
              </div>

              {/* Saran Topik */}
              <div>
                <label htmlFor="saranTopik" className="mb-2 block text-sm font-semibold text-gray-900">
                  Saran Topik <span className="text-sm font-normal text-gray-500">(Opsional)</span>
                </label>
                <textarea
                  id="saranTopik"
                  name="saranTopik"
                  value={formData.saranTopik}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  placeholder="Topik tertentu yang ingin dipelajari"
                  style={{ minHeight: '80px' }}
                />
              </div>

              {/* Submit Button - 44px minimum height, clean design */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                style={{ minHeight: '44px' }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  'Daftar Workshop Sekarang'
                )}
              </button>
            </form>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-12 text-center">
          <p className="text-sm text-gray-600">
            Ada pertanyaan? Hubungi kami di{' '}
            <a
              href="mailto:nadya@notion-workshop.com"
              className="font-semibold text-purple-600 hover:text-purple-700 hover:underline"
            >
              nadya@notion-workshop.com
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-400">Made with care by Nadya</p>
        </footer>
      </main>
    </div>
  )
}
