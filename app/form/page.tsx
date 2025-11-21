'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  nama: string
  email: string
  whatsapp: string
  institusi: string
  kebutuhan: string
  saranTopik: string
}

type SubmitStatus = 'idle' | 'success' | 'error'

export default function FormPage() {
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    email: '',
    whatsapp: '',
    institusi: '',
    kebutuhan: '',
    saranTopik: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/form-submit', {
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
    <div className="min-h-screen bg-[#fafafa]" style={{ fontFamily: 'ui-monospace, monospace' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-sm font-bold text-white">
                N
              </div>
              <span className="text-base font-semibold text-gray-900">
                Notion Workshop
              </span>
            </a>
            <div className="text-xs text-gray-500">Registration Form</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-24">
        {/* Success/Error Messages */}
        <AnimatePresence mode="wait">
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 rounded-lg border border-green-200 bg-green-50 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-900">Form submitted successfully</p>
                  <p className="mt-1 text-xs text-green-700">
                    Thank you for your registration. We'll contact you soon.
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
              className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  !
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-900">Submission failed</p>
                  <p className="mt-1 text-xs text-red-700">
                    Please try again.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Workshop Registration
          </h1>
          <p className="text-sm text-gray-600">
            Please fill out the form below to register for the workshop.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Nama Lengkap */}
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
                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            {/* Email & WhatsApp */}
            <div className="grid gap-8 md:grid-cols-2">
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
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
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
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
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
                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
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
                rows={5}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                placeholder="Ceritakan tujuan dan harapan Anda mengikuti workshop ini"
              />
            </div>

            {/* Saran Topik */}
            <div>
              <label htmlFor="saranTopik" className="mb-2 block text-sm font-semibold text-gray-900">
                Saran Topik <span className="text-xs font-normal text-gray-500">(Opsional)</span>
              </label>
              <textarea
                id="saranTopik"
                name="saranTopik"
                value={formData.saranTopik}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                placeholder="Topik tertentu yang ingin dipelajari"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Submit Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500">
                Fields marked with <span className="text-red-500">*</span> are required
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 rounded-lg bg-gray-900 px-6 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Registration'
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500">
            Need help? Contact us at{' '}
            <a
              href="mailto:nadya@notion-workshop.com"
              className="font-semibold text-gray-900 hover:underline"
            >
              nadya@notion-workshop.com
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
