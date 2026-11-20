'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { personalInfo } from '@/data/personal'
import { useUniverse } from '@/context/UniverseContext'
import { trackEvent } from '@/lib/analytics'

const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '4b6c6d27-bc00-4c44-8f74-634ce223b9e3'

const SOCIAL_ROWS = [
  { label: 'GITHUB', value: 'github.com/risterz', href: personalInfo.github },
  { label: 'LINKEDIN', value: 'in/haris-al-harraz', href: personalInfo.linkedin },
  { label: 'PHONE', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/[^\d+]/g, '')}` },
  { label: 'LOCATION', value: personalInfo.location, href: null },
]

export default function ContactSection() {
  const { setCursor, resetCursor } = useUniverse()
  const [formData, setFormData] = useState({ name: '', email: '', message: '', botcheck: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      toast.success('Email copied to clipboard')
      trackEvent('contact_email_copy')
    } catch {
      window.location.href = `mailto:${personalInfo.email}`
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return

    // Honeypot spam guard
    if (formData.botcheck) return

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill all fields')
      return
    }

    setStatus('sending')
    trackEvent('contact_form_submit', { name: formData.name })

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `HRZ // 02 Portfolio Inquiry from ${formData.name}`,
          from_name: 'HRZ // 02 Portfolio',
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          botcheck: false,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('sent')
        toast.success('Message delivered to Haris!')
        setFormData({ name: '', email: '', message: '', botcheck: '' })
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (err) {
      setStatus('error')
      const msg = err instanceof Error ? err.message : 'Unable to send right now'
      toast.error(msg)
    }
  }

  const statusBadge =
    status === 'sending'
      ? 'SENDING...'
      : status === 'sent'
        ? 'DELIVERED'
        : status === 'error'
          ? 'RETRY'
          : 'FAST REPLY'

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-36 md:pt-40 md:pb-44 px-5 md:px-10 xl:px-14 overflow-hidden border-t border-white/10"
      style={{ zIndex: 'var(--z-content)' }}
    >
      {/* Translucent Crimson Exclusion Radial Aura */}
      <div className="contact-aura" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between gap-20">
        {/* Center Hero Email CTA */}
        <div className="text-center pt-8 md:pt-14">
          <p className="font-display text-[11px] tracking-[4px] uppercase text-white/75 mb-6">
            {personalInfo.availability.status} · {personalInfo.availability.internshipStart}
          </p>

          <button
            type="button"
            onClick={handleCopyEmail}
            onMouseEnter={() => setCursor({ big: true, text: 'COPY' })}
            onMouseLeave={resetCursor}
            className="font-display font-bold uppercase text-white underline decoration-2 underline-offset-8 hover:text-[#d32941] transition-colors break-all text-xl sm:text-3xl md:text-5xl xl:text-[54px]"
          >
            {personalInfo.email}
          </button>

          <p className="font-display text-[10px] tracking-[2.5px] uppercase text-white/55 mt-4">
            Click email to copy · Or send a direct message below
          </p>
        </div>

        {/* Bottom Split: Hollow LET'S CONNECT. + Ruled Links & Sharp Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-end">
          {/* Left: Hollow Display Headline + Thin-Ruled Social Links */}
          <div className="lg:col-span-6 space-y-10">
            <h2 className="font-display font-bold uppercase text-hollow-white text-[clamp(3rem,9vw,7.5rem)] leading-[0.86] max-w-[9ch]">
              LET&apos;S CONNECT.
            </h2>

            <div className="border-t border-white">
              {SOCIAL_ROWS.map((row) =>
                row.href ? (
                  <a
                    key={row.label}
                    href={row.href}
                    target={row.href.startsWith('http') ? '_blank' : undefined}
                    rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onMouseEnter={() => setCursor({ big: true, icon: true })}
                    onMouseLeave={resetCursor}
                    className="group flex items-center justify-between py-4 border-b border-white text-white hover:text-[#d32941] transition-colors"
                  >
                    <span className="font-display text-base md:text-xl uppercase tracking-[1.5px]">
                      {row.label}
                    </span>
                    <span className="flex items-center gap-4 font-display text-xs md:text-sm tracking-[1.5px] text-white/70 group-hover:text-white">
                      <span className="hidden sm:inline">{row.value}</span>
                      <span className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                        ↗
                      </span>
                    </span>
                  </a>
                ) : (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-4 border-b border-white/60 text-white/85"
                  >
                    <span className="font-display text-base md:text-xl uppercase tracking-[1.5px]">
                      {row.label}
                    </span>
                    <span className="font-display text-xs md:text-sm tracking-[1.5px] text-white/70">
                      {row.value}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right: Sharp Brutalist Contact Form (Web3Forms -> harisharraz02@gmail.com) */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="border border-white bg-[#1d1d1b]/75 backdrop-blur-md p-6 md:p-8 space-y-6"
            >
              {/* Hidden spam honeypot */}
              <input
                type="text"
                name="botcheck"
                value={formData.botcheck}
                onChange={(e) => setFormData((prev) => ({ ...prev, botcheck: e.target.value }))}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="flex items-center justify-between border-b border-white/25 pb-4">
                <span className="font-display text-xs tracking-[3px] uppercase text-white">
                  DIRECT MESSAGE
                </span>
                <span className="font-display text-[10px] tracking-[2px] uppercase text-[#d32941]">
                  {statusBadge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-display text-[10px] tracking-[2px] uppercase text-white/65 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    disabled={status === 'sending'}
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-3.5 py-3 bg-transparent border border-white/40 text-white placeholder:text-white/30 font-display text-sm focus:border-[#d32941] focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-display text-[10px] tracking-[2px] uppercase text-white/65 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    disabled={status === 'sending'}
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-3 bg-transparent border border-white/40 text-white placeholder:text-white/30 font-display text-sm focus:border-[#d32941] focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-display text-[10px] tracking-[2px] uppercase text-white/65 mb-2"
                >
                  Brief / Role Details
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  disabled={status === 'sending'}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell me about the role or project..."
                  className="w-full px-3.5 py-3 bg-transparent border border-white/40 text-white placeholder:text-white/30 font-display text-sm focus:border-[#d32941] focus:outline-none transition-colors resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                onMouseEnter={() => setCursor({ big: true, text: 'SEND' })}
                onMouseLeave={resetCursor}
                className="frame-cta w-full h-12 disabled:opacity-50 disabled:cursor-wait"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message ↗'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
