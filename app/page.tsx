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
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-purple-100/30 to-pink-100/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-blue-100/30 to-purple-100/30 blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-lg sm:text-xl shadow-lg shadow-purple-500/30">
                📚
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-sm sm:text-lg font-bold text-transparent">
                Notion Workshop
              </span>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/registrations"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl"
            >
              <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Data</span>
            </motion.a>
          </div>
        </div>
      </motion.header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Success/Error Messages */}
        <AnimatePresence mode="wait">
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mt-8 overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg"
            >
              <div className="flex items-start gap-4 p-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl"
                >
                  ✅
                </motion.div>
                <div>
                  <p className="text-lg font-semibold text-green-900">Pendaftaran Berhasil!</p>
                  <p className="mt-1 text-sm text-green-700">
                    Terima kasih sudah mendaftar. Kami akan menghubungi Anda segera melalui email atau WhatsApp.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mt-8 overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 shadow-lg"
            >
              <div className="flex items-start gap-4 p-6">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl"
                >
                  ❌
                </motion.div>
                <div>
                  <p className="text-lg font-semibold text-red-900">Terjadi Kesalahan</p>
                  <p className="mt-1 text-sm text-red-700">
                    Mohon maaf, ada kesalahan saat mengirim data. Silakan coba lagi.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="py-16 text-center lg:py-24"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-sm font-semibold text-purple-700 shadow-lg"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-purple-600"
              />
              Upcoming Workshop
            </motion.span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-3xl font-black leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl px-4"
          >
            Notion Workshop:<br />Belajar Basic untuk Pemula
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg px-4 text-center"
          >
            Belajar Notion dari nol! Workshop ini dirancang khusus untuk pemula yang ingin memulai perjalanan produktivitas dengan Notion. Pelajari dasar-dasar dan mulai mengorganisir hidup Anda dengan lebih baik.
          </motion.p>
        </motion.div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group relative mb-16 overflow-hidden rounded-3xl shadow-2xl lg:mb-24"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative flex aspect-[2/1] items-center justify-center backdrop-blur-3xl"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-center"
            >
              <div className="mb-4 text-8xl drop-shadow-2xl">🎯</div>
              <p className="text-lg font-semibold text-white drop-shadow-lg">Event Banner</p>
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 grid gap-8 md:grid-cols-2 lg:mb-24"
        >
          {[
            {
              icon: '📅',
              title: 'Jadwal',
              gradient: 'from-blue-500 to-cyan-500',
              items: [
                { label: 'Tanggal', value: 'Besok' },
                { label: 'Waktu', value: '10:00 Pagi' },
                { label: 'Durasi', value: '2 Jam' }
              ]
            },
            {
              icon: '📍',
              title: 'Lokasi',
              gradient: 'from-green-500 to-emerald-500',
              items: [
                { label: 'Format', value: 'Online' },
                { label: 'Platform', value: 'Zoom' },
                { label: 'Biaya', value: 'Gratis!' }
              ]
            }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all hover:shadow-2xl"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity group-hover:opacity-20" />
              <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-3xl shadow-lg`}>
                {card.icon}
              </div>
              <h3 className="mb-6 text-xl font-bold text-gray-900">{card.title}</h3>
              <div className="space-y-4">
                {card.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">{item.label}:</span>
                    <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* What You'll Learn */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 lg:mb-24"
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-12 text-center text-3xl sm:text-4xl font-bold text-gray-900 px-4"
          >
            Apa yang Akan Dipelajari
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8 px-4">
            {[
              { icon: '📝', title: 'Pengenalan Notion', desc: 'Memahami interface dan fitur dasar Notion untuk pemula' },
              { icon: '🧱', title: 'Blocks & Pages', desc: 'Cara membuat dan mengatur pages serta berbagai jenis blocks' },
              { icon: '✅', title: 'To-Do Lists', desc: 'Membuat daftar tugas sederhana untuk produktivitas harian' },
              { icon: '📚', title: 'Organize Notes', desc: 'Tips mengorganisir catatan dan dokumen dengan mudah' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-5 blur-2xl transition-opacity group-hover:opacity-10" />
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 text-5xl"
                >
                  {item.icon}
                </motion.div>
                <h4 className="mb-3 text-lg font-bold text-gray-900">{item.title}</h4>
                <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent lg:mb-24"
        />

        {/* Registration Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="pb-16 lg:pb-24"
        >
          <motion.div variants={fadeInUp} className="mb-12 text-center px-4">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-gray-900">Daftar Sekarang</h2>
            <p className="text-base sm:text-lg text-gray-600">Isi form di bawah untuk mengamankan tempat Anda</p>
          </motion.div>

          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl sm:p-8 lg:p-12"
          >
            {/* Nama */}
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
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
                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20"
                placeholder="Nama Anda"
              />
            </motion.div>

            {/* Email & WhatsApp */}
            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
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
                  className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20"
                  placeholder="email@contoh.com"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
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
                  className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20"
                  placeholder="08123456789"
                />
              </motion.div>
            </div>

            {/* Institusi */}
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
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
                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20"
                placeholder="Universitas, sekolah, atau nama perusahaan"
              />
            </motion.div>

            {/* Kebutuhan */}
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
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
                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20"
                placeholder="Ceritakan apa yang ingin Anda pelajari atau capai..."
              />
            </motion.div>

            {/* Saran Topik */}
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <label htmlFor="saranTopik" className="mb-2 block text-sm font-semibold text-gray-900">
                Saran Topik <span className="text-gray-400">(Opsional)</span>
              </label>
              <textarea
                id="saranTopik"
                name="saranTopik"
                value={formData.saranTopik}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20"
                placeholder="Topik apa yang ingin Anda pelajari?"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-8 w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-base sm:text-lg font-bold text-white shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <motion.svg
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </motion.svg>
                    Mengirim...
                  </>
                ) : (
                  <>
                    Daftar Workshop
                    <motion.svg
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 py-12 text-center px-4"
        >
          <p className="text-sm sm:text-base text-gray-600">
            Ada pertanyaan? Hubungi kami di{' '}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:nadya@notion-workshop.com"
              className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold text-transparent hover:underline"
            >
              nadya@notion-workshop.com
            </motion.a>
          </p>
        </motion.div>
      </main>
    </div>
  )
}
