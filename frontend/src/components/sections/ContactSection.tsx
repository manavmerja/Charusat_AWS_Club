"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { CobeGlobe } from "@/components/ui/cobe-globe"

// Subject options ─

const SUBJECT_OPTIONS = [
  "Workshop Inquiry",
  "Partnership",
  "Sponsorship",
  "General Question",
  "Event Collaboration",
  "Other",
]

// Contact Form ─

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate dispatch
    await new Promise((resolve) => setTimeout(resolve, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center gap-6 py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
        <p className="text-slate-400 text-sm max-w-xs">
          Thank you for reaching out. We&apos;ll get back to you within 24–48 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFormData({ fullName: "", email: "", subject: "", message: "" }) }}
          className="mt-2 px-6 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400 border border-emerald-500/40 rounded-full hover:bg-emerald-500/10 transition-colors"
        >
          Send Another
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your full name"
          required
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_2px_rgba(0,230,118,0.08)] transition-all"
        />
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email address"
          required
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_2px_rgba(0,230,118,0.08)] transition-all"
        />
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Subject
        </label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_2px_rgba(0,230,118,0.08)] transition-all appearance-none cursor-pointer"
        >
          <option value="" className="bg-black text-slate-500">Workshop Inquiry / Partnership</option>
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-black text-white">
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Detailed Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Detailed Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about your inquiry..."
          required
          rows={5}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_2px_rgba(0,230,118,0.08)] transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="relative mt-1 w-full py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] text-black overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #00e676 0%, #00c853 50%, #69f0ae 100%)",
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Dispatching...
          </span>
        ) : (
          "Dispatch Message"
        )}
      </motion.button>
    </form>
  )
}

// Main Contact Section ─

export function ContactSection() {
  return (
    <section
      id="contacts"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 py-24 bg-black overflow-hidden"
    >
      {/* Seamless Blend Transitions */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-black/70 to-black pointer-events-none z-20" />

      {/* Subtle radial glow background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.04] blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.04] blur-[80px]" />
      </div>

      {/* Section header (Left-aligned title + Right-aligned paragraph like Events/TeamSection) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
      >
        <div className="max-w-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00e676]">
            CONTACT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2 leading-tight">
            Connect With Us
          </h2>
        </div>

        <p className="text-slate-400 text-sm sm:text-base max-w-md leading-relaxed lg:pb-1">
          Have an idea, want to collaborate, or curious about our workshops? We&apos;d love to hear from you.
        </p>
      </motion.div>

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── LEFT: Interactive 3D COBE Globe ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center"
        >
          <CobeGlobe className="w-full max-w-[480px]" />
        </motion.div>

        {/* ── RIGHT: Contact Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full"
        >
          {/* Glass card */}
          <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-8 shadow-[0_0_60px_rgba(0,0,0,0.4)]">
            {/* Card top accent line */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent rounded-full" />

            <div className="mb-7">
              <h3 className="text-xl font-bold text-white mb-1">Send us a Message</h3>
              <p className="text-slate-500 text-xs">Usually responds within 24–48 hours.</p>
            </div>

            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
