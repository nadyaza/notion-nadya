'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Registration } from '@/lib/types'
import { fadeInUp, staggerContainer } from '@/lib/constants'

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/registrations')
      .then(res => res.json())
      .then(data => {
        setRegistrations(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-purple-200 border-t-purple-600"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/10 to-white">
      {/* Animated Background */}
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
          className="absolute -top-1/2 -right-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-purple-100/20 to-pink-100/20 blur-3xl"
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
              href="/"
              className="flex items-center gap-2 rounded-lg border-2 border-purple-200 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-purple-600 transition-all hover:border-purple-300 hover:bg-purple-50"
            >
              <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Kembali</span>
              <span className="sm:hidden">←</span>
            </motion.a>
          </div>
        </div>
      </motion.header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="py-12 sm:py-16 lg:py-20 text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6 px-4">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 text-xs sm:text-sm font-semibold text-blue-700 shadow-lg"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-blue-600"
              />
              Admin Dashboard
            </motion.span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-3xl font-black leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl px-4"
          >
            Data Pendaftaran
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="mx-auto flex max-w-2xl items-center justify-center gap-4 sm:gap-6 text-sm sm:text-lg text-gray-600 px-4"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-purple-100 px-3 py-1 text-sm sm:text-base font-bold text-purple-600">
                {registrations.length}
              </span>
              <span className="text-sm sm:text-base">Total Pendaftaran</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Registrations List */}
        {registrations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-gray-100 bg-white p-8 sm:p-16 text-center shadow-xl mx-4"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6 text-6xl sm:text-8xl"
            >
              📭
            </motion.div>
            <h3 className="mb-3 text-xl sm:text-2xl font-bold text-gray-900">Belum Ada Pendaftaran</h3>
            <p className="text-base sm:text-lg text-gray-600">
              Data pendaftaran akan muncul di sini setelah ada yang mendaftar.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-4 sm:space-y-6 pb-12 sm:pb-16 lg:pb-20"
          >
            {registrations.map((registration, index) => (
              <motion.div
                key={registration.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.01, y: -4 }}
                className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 lg:p-8 shadow-xl transition-all hover:shadow-2xl"
              >
                {/* Header */}
                <div className="mb-4 sm:mb-6 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="flex h-10 w-10 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-base sm:text-xl font-bold text-white shadow-lg shadow-purple-500/30"
                    >
                      {registration.nama.charAt(0).toUpperCase()}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-xl font-bold text-gray-900 truncate">{registration.nama}</h3>
                      <p className="mt-1 text-xs sm:text-sm text-gray-500">
                        {new Date(registration.createdAt).toLocaleDateString('id-ID', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold text-white shadow-lg shadow-green-500/30 flex-shrink-0"
                  >
                    #{index + 1}
                  </motion.span>
                </div>

                {/* Content Grid */}
                <div className="mb-4 sm:mb-6 grid gap-3 sm:gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4"
                  >
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                      <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </div>
                    <p className="break-all text-xs sm:text-sm font-medium text-gray-900">{registration.email}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-3 sm:p-4"
                  >
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-green-600">
                      <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      WhatsApp
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{registration.whatsapp}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-3 sm:p-4 sm:col-span-2 lg:col-span-1"
                  >
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-purple-600">
                      <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Institusi
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{registration.institusi}</p>
                  </motion.div>
                </div>

                {/* Kebutuhan */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6"
                >
                  <div className="mb-2 sm:mb-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                    Tujuan / Kebutuhan
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-gray-900">{registration.kebutuhan}</p>
                </motion.div>

                {/* Saran Topik */}
                {registration.saranTopik && (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="rounded-xl sm:rounded-2xl border-2 border-purple-100 bg-purple-50/50 p-4 sm:p-6"
                  >
                    <div className="mb-2 sm:mb-3 text-xs font-bold uppercase tracking-wide text-purple-600">
                      💡 Saran Topik
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-900">{registration.saranTopik}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Export Options */}
        {registrations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 border-t border-gray-200 py-8 sm:py-12 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline">Export ke CSV</span>
              <span className="sm:hidden">CSV</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </motion.button>
          </motion.div>
        )}
      </main>
    </div>
  )
}
