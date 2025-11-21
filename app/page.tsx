'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { RegistrationFormData, SubmitStatus } from '@/lib/types'
import { fadeInUp, learningItems, initialFormData } from '@/lib/constants'

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/40">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-purple-100/60 bg-white/85 backdrop-blur-xl shadow-sm">
        <div className="mx-auto max-w-[1400px] px-8 md:px-16 lg:px-24">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-purple-600 text-xl font-bold text-white shadow-md shadow-purple-200/50">
                N
              </div>
              <span className="text-xl font-bold text-gray-900">
                Notion Workshop
              </span>
            </div>
            <a
              href="/registrations"
              className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200/50 transition-all hover:shadow-lg hover:shadow-purple-300/50 active:scale-95"
            >
              Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] safe-px px-8 md:px-16 lg:px-24">
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
                  <p className="mt-1 text-sm leading-relaxed text-green-700">
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
                  <p className="mt-1 text-sm leading-relaxed text-red-700">
                    Mohon maaf, silakan coba lagi.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="py-24 md:py-28 lg:py-32 text-center">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-5 py-2 text-sm font-semibold text-purple-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
                </span>
                Workshop Besok Pagi
              </span>
            </motion.div>

            {/* Judul */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-5xl font-black tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
            >
              Notion Workshop
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10 text-2xl font-semibold text-gray-700 sm:text-3xl"
            >
              Belajar Basic untuk Pemula
            </motion.p>

            {/* Deskripsi */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-20 text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto"
            >
              Belajar Notion dari nol! Workshop ini dirancang khusus untuk pemula yang ingin memulai perjalanan produktivitas dengan Notion.
            </motion.p>
          </div>
        </section>

        {/* Event Details */}
        <section className="mb-24 md:mb-28 lg:mb-32">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-pink-100 bg-gradient-to-br from-white to-pink-50/30 p-8 shadow-lg shadow-pink-100/50 transition-all hover:shadow-xl hover:shadow-pink-200/50 hover:border-pink-200"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 text-2xl shadow-sm">
                  📅
                </div>
                <h3 className="text-xl font-bold text-gray-900">Jadwal Workshop</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm">
                  <span className="text-sm font-semibold text-gray-600">Tanggal</span>
                  <span className="text-sm font-bold text-gray-900">Besok Pagi</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm">
                  <span className="text-sm font-semibold text-gray-600">Waktu</span>
                  <span className="text-sm font-bold text-gray-900">10:00 AM</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm">
                  <span className="text-sm font-semibold text-gray-600">Durasi</span>
                  <span className="text-sm font-bold text-gray-900">2 Jam</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-purple-100 bg-gradient-to-br from-white to-purple-50/30 p-8 shadow-lg shadow-purple-100/50 transition-all hover:shadow-xl hover:shadow-purple-200/50 hover:border-purple-200"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 text-2xl shadow-sm">
                  📍
                </div>
                <h3 className="text-xl font-bold text-gray-900">Detail Acara</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm">
                  <span className="text-sm font-semibold text-gray-600">Format</span>
                  <span className="text-sm font-bold text-gray-900">Online</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm">
                  <span className="text-sm font-semibold text-gray-600">Platform</span>
                  <span className="text-sm font-bold text-gray-900">Zoom</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm">
                  <span className="text-sm font-semibold text-gray-600">Biaya</span>
                  <span className="inline-flex items-center rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1.5 text-sm font-bold text-green-800 shadow-sm">
                    Gratis
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-24 md:mb-28 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              Apa yang Akan Dipelajari
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Materi workshop yang akan dibahas
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
            {learningItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group rounded-3xl border border-purple-100 bg-gradient-to-br from-white to-purple-50/20 p-8 shadow-lg shadow-purple-100/50 transition-all hover:border-purple-200 hover:shadow-xl hover:shadow-purple-200/50"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 text-3xl shadow-sm">
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="mb-3 text-xl font-bold text-gray-900">{item.title}</h4>
                    <p className="text-base leading-relaxed text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-24 md:py-28 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              Daftar Sekarang
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Isi form di bawah untuk mengamankan tempat Anda
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl rounded-3xl border border-purple-100 bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50 p-10 md:p-12 shadow-xl shadow-purple-100/50"
          >
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Nama */}
              <div>
                <label htmlFor="nama" className="mb-3 block text-base font-bold text-gray-900">
                  Nama Lengkap <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  required
                  value={formData.nama}
                  onChange={handleChange}
                  className="h-16 w-full rounded-xl border-2 border-purple-200 bg-white px-6 py-4 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              {/* Email & WhatsApp */}
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-3 block text-base font-bold text-gray-900">
                    Email <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="h-16 w-full rounded-xl border-2 border-purple-200 bg-white px-6 py-4 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                    placeholder="nama@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="mb-3 block text-base font-bold text-gray-900">
                    WhatsApp <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="h-16 w-full rounded-xl border-2 border-purple-200 bg-white px-6 py-4 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              {/* Institusi */}
              <div>
                <label htmlFor="institusi" className="mb-3 block text-base font-bold text-gray-900">
                  Institusi / Perusahaan <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  id="institusi"
                  name="institusi"
                  required
                  value={formData.institusi}
                  onChange={handleChange}
                  className="h-16 w-full rounded-xl border-2 border-purple-200 bg-white px-6 py-4 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                  placeholder="Nama universitas atau perusahaan"
                />
              </div>

              {/* Kebutuhan */}
              <div>
                <label htmlFor="kebutuhan" className="mb-3 block text-base font-bold text-gray-900">
                  Mengapa ingin ikut workshop ini? <span className="text-pink-500">*</span>
                </label>
                <textarea
                  id="kebutuhan"
                  name="kebutuhan"
                  required
                  value={formData.kebutuhan}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-xl border-2 border-purple-200 bg-white px-6 py-4 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 min-h-[140px]"
                  placeholder="Ceritakan tujuan dan harapan Anda mengikuti workshop ini"
                />
              </div>

              {/* Saran Topik */}
              <div>
                <label htmlFor="saranTopik" className="mb-3 block text-base font-bold text-gray-900">
                  Saran Topik <span className="text-sm font-normal text-gray-500">(Opsional)</span>
                </label>
                <textarea
                  id="saranTopik"
                  name="saranTopik"
                  value={formData.saranTopik}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border-2 border-purple-200 bg-white px-6 py-4 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 min-h-[120px]"
                  placeholder="Topik tertentu yang ingin dipelajari"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-10 h-16 w-full rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 px-8 text-lg font-bold text-white shadow-lg shadow-purple-200/50 transition-all hover:shadow-xl hover:shadow-purple-300/60 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg
                      className="h-6 w-6 animate-spin"
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
        <footer className="border-t border-purple-100 py-16 text-center">
          <p className="text-base leading-relaxed text-gray-600">
            Ada pertanyaan? Hubungi kami di{' '}
            <a
              href="mailto:nadya@notion-workshop.com"
              className="font-bold text-purple-600 hover:text-purple-700 hover:underline"
            >
              nadya@notion-workshop.com
            </a>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">Made with care by Nadya</p>
        </footer>
      </main>
    </div>
  )
}
