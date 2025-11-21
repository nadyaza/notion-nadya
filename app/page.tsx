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
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-blue-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-purple-100/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
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
              style={{ minHeight: '44px' }}
            >
              Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] safe-px px-6 md:px-12 lg:px-20">
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

        {/* Hero Section - 80px top, 60px bottom */}
        <section className="py-hero md:py-hero text-center md:py-20 lg:py-hero">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
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

            {/* Judul - mb-6 (24px) ke subtitle */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Notion Workshop
            </motion.h1>

            {/* Subtitle - mb-8 (32px) ke paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-xl font-semibold text-gray-700 sm:text-2xl"
            >
              Belajar Basic untuk Pemula
            </motion.p>

            {/* Deskripsi - mb-16 (64px) ke section berikutnya */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16 text-base leading-relaxed text-gray-600"
            >
              Belajar Notion dari nol! Workshop ini dirancang khusus untuk pemula yang ingin memulai perjalanan produktivitas dengan Notion.
            </motion.p>
          </div>
        </section>

        {/* Event Details - margin bottom 80px (mb-20) */}
        <section className="mb-20 md:mb-20 lg:mb-20">
          {/* Gap 32px horizontal (gap-8), stack on mobile */}
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-200 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-md"
              style={{ padding: '32px' }} /* 32px all sides desktop */
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 text-xl">
                  📅
                </div>
                <h3 className="text-lg font-bold text-gray-900">Jadwal Workshop</h3>
              </div>
              {/* space-y-4 = 16px between rows */}
              <div className="space-y-4">
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
              className="rounded-2xl border border-gray-200 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-md"
              style={{ padding: '32px' }} /* 32px all sides desktop */
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-xl">
                  📍
                </div>
                <h3 className="text-lg font-bold text-gray-900">Detail Acara</h3>
              </div>
              {/* space-y-4 = 16px between rows */}
              <div className="space-y-4">
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

        {/* What You'll Learn - padding top 80px (pt-20), margin bottom 80px (mb-20) */}
        <section className="mb-14 pt-14 md:mb-20 md:pt-20 lg:mb-20 lg:pt-20">
          {/* Container padding 80px on desktop handled by main container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center" /* 48px heading to grid */
          >
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Apa yang Akan Dipelajari
            </h2>
            <p className="text-base leading-relaxed text-gray-600">
              Materi workshop yang akan dibahas
            </p>
          </motion.div>

          {/* Grid gap: gap-x-8 gap-y-10 (32px horizontal, 40px vertical) */}
          <div className="grid gap-x-6 gap-y-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {learningItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group rounded-2xl border border-gray-200 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all hover:border-purple-200 hover:shadow-md"
                /* Card padding: 32px vertical, 24px horizontal on desktop, 20px on mobile */
                style={{ padding: '32px' }}
              >
                {/* Icon to title: 20px (mb-5) */}
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 text-2xl">
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    {/* Title to description: 12px (mb-3) */}
                    <h4 className="mb-3 text-lg font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Registration Form - padding top 100px (pt-25), margin bottom 60px (pb-15) */}
        <section className="pt-15 pb-15 md:pt-25 md:pb-15 lg:pt-25 lg:pb-15">
          {/* Heading to CTA: 16px (mb-4), CTA to form: 40px (mb-10) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Daftar Sekarang
            </h2>
            <p className="text-base leading-relaxed text-gray-600">
              Isi form di bawah untuk mengamankan tempat Anda
            </p>
          </motion.div>

          {/* Form container: max-w-xl (600px), padding 48px desktop, 24px mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-gradient-to-br from-pink-50/40 to-purple-50/30 shadow-sm"
            style={{ padding: '48px' }} /* 48px all sides on desktop */
          >
            {/* Form fields gap: 24px (space-y-6) */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama */}
              <div>
                {/* Label to input: 8px (mb-2) */}
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
                  /* py-4 px-5 = 16px vertical, 20px horizontal, min-h-14 = 56px */
                  className="h-14 w-full rounded-lg border border-gray-300 bg-white px-5 py-4 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  placeholder="Masukkan nama lengkap Anda"
                  style={{ minHeight: '56px' }}
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
                    className="h-14 w-full rounded-lg border border-gray-300 bg-white px-5 py-4 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    placeholder="nama@example.com"
                    style={{ minHeight: '56px' }}
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
                    className="h-14 w-full rounded-lg border border-gray-300 bg-white px-5 py-4 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    placeholder="08123456789"
                    style={{ minHeight: '56px' }}
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
                  className="h-14 w-full rounded-lg border border-gray-300 bg-white px-5 py-4 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  placeholder="Nama universitas atau perusahaan"
                  style={{ minHeight: '56px' }}
                />
              </div>

              {/* Kebutuhan - min height 120px */}
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
                  className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  placeholder="Ceritakan tujuan dan harapan Anda mengikuti workshop ini"
                  style={{ minHeight: '120px' }}
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
                  className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  placeholder="Topik tertentu yang ingin dipelajari"
                  style={{ minHeight: '100px' }}
                />
              </div>

              {/* Submit Button - mt-10 (40px from last input), py-4.5 px-12, h-14 (56px), rounded-xl (12px) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-10 h-14 w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-16 text-base font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                style={{ minHeight: '56px', paddingTop: '18px', paddingBottom: '18px' }}
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

        {/* Footer - margin bottom 24px (mb-6 after button handled above), pb-15 (60px) */}
        <footer className="border-t border-gray-200 py-12 text-center">
          <p className="text-sm leading-relaxed text-gray-600" style={{ lineHeight: '1.6' }}>
            Ada pertanyaan? Hubungi kami di{' '}
            <a
              href="mailto:nadya@notion-workshop.com"
              className="font-semibold text-purple-600 hover:text-purple-700 hover:underline"
            >
              nadya@notion-workshop.com
            </a>
          </p>
          <p className="mt-2 text-xs leading-relaxed text-gray-400">Made with care by Nadya</p>
        </footer>
      </main>
    </div>
  )
}
