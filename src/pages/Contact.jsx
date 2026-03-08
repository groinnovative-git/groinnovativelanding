import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
// emailjs loaded dynamically at form submit time — saves ~50KB from initial bundle
import ParticleCanvas from '../components/ParticleCanvas'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { PAGE_SEO } from '../seo/seoConfig'
import { breadcrumbSchema } from '../seo/schemas'
import './Contact.css'

// ── Web3Forms (admin notification) ────────────────────────────────────────────
// Public-facing key — intentionally hardcoded (client-side, no secret here).
const W3F_KEY = 'd7872b01-645d-48f5-a766-ae856a69913d'
const W3F_URL = 'https://api.web3forms.com/submit'

// ── EmailJS (user auto-reply only) ────────────────────────────────────────────
// Uses ONLY the PUBLIC KEY — never the private key. Safe for frontend use.
const EJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID       // service_f3pbks9
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY // template_xwvza7j
const EJS_PUBKEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY        // LV04WC6YVJ8xspdxO

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ── Services dropdown options ──────────────────────────────────────────────────
const SERVICES = [
    'Landing Website',
    'SaaS / Web Application',
    'Mobile App Development',
    'AI Integration & Automation',
    'SEO Optimization',
    'Site Maintenance',
    'Digital Marketing',
    'Logo & Poster Design',
    'Other',
]

// ── Phone helpers ──────────────────────────────────────────────────────────────
const stripPhone = raw => raw.replace(/[^\d]/g, '')

// ── Validation ─────────────────────────────────────────────────────────────────
function validate(f) {
    const e = {}
    if (!f.name.trim()) e.name = 'Name is required.'
    else if (f.name.trim().length < 3) e.name = 'Name must be at least 3 characters.'
    if (!f.email.trim()) e.email = 'Email is required.'
    else if (!EMAIL_RE.test(f.email)) e.email = 'Enter a valid email address.'
    if (!f.phone.trim()) e.phone = 'Phone number is required.'
    else {
        const digits = stripPhone(f.phone)
        if (digits.length !== 10) e.phone = 'Enter a valid 10-digit mobile number.'
    }
    if (!f.service) e.service = 'Please select a service.'
    if (!f.message.trim()) e.message = 'Message is required.'
    else if (f.message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
    return e
}

// ── Scroll reveal ──────────────────────────────────────────────────────────────
function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal')
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
            })
        }, { threshold: 0.1 })
        els.forEach(el => obs.observe(el))
        return () => obs.disconnect()
    }, [])
}

const BLANK = {
    name: '', email: '', phone: '', service: '',
    subject: '', message: '', botcheck: '',
}

// ══════════════════════════════════════════════════════════════════════════════
export default function Contact() {
    useReveal()

    const [form, setForm] = useState(BLANK)
    const [errors, setErrors] = useState({})
    const [isSending, setIsSending] = useState(false)
    // null | 'success' | 'success_no_reply' | 'error'
    const [status, setStatus] = useState(null)

    const handle = e => {
        const { name, value } = e.target
        if (name === 'phone') {
            // Only allow digits, max 10
            const digits = value.replace(/[^\d]/g, '').slice(0, 10)
            setForm(f => ({ ...f, phone: digits }))
        } else {
            setForm(f => ({ ...f, [name]: value }))
        }
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // ── Submit ─────────────────────────────────────────────────────────────────
    const submit = async e => {
        e.preventDefault()

        // Anti-spam honeypot
        if (form.botcheck) return

        // Validate
        const errs = validate(form)
        if (Object.keys(errs).length) { setErrors(errs); return }

        setIsSending(true)
        setStatus(null)

        const cleanPhone = '+91' + stripPhone(form.phone)
        const resolvedSubject = form.subject.trim() || `New Inquiry: ${form.service} — Gro Innovative`

        try {
            // ── Step 1: Web3Forms → admin notification ─────────────────────
            // NOTE: No autoresponder fields here — user reply handled by EmailJS.
            const res = await fetch(W3F_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: W3F_KEY,
                    from_name: 'Gro Innovative Website',
                    replyto: form.email,
                    botcheck: form.botcheck,
                    name: form.name,
                    email: form.email,
                    phone: cleanPhone,
                    service: form.service,
                    subject: resolvedSubject,
                    message: form.message,
                    // ── NO autoresponder_subject / autoresponder_message ──
                }),
            })

            const data = await res.json()
            if (!data.success) throw new Error(data.message || 'Web3Forms submission failed')

            // ── Step 2: EmailJS → auto-reply to user ───────────────────────
            // Non-blocking: failure shows a soft note but does NOT cancel success.
            let autoReplyOk = false
            try {
                const { default: emailjs } = await import('@emailjs/browser');
                await emailjs.send(
                    EJS_SERVICE,
                    EJS_TEMPLATE,
                    {
                        // Maps to {{to_email}} in template — EmailJS sends TO this address
                        to_email: form.email,
                        // Template variables (match exactly what's in autoreply.html)
                        name: form.name,
                        service: form.service,
                        subject: resolvedSubject,
                        message: form.message,
                        phone: cleanPhone,
                        page_url: window.location.href,
                        year: String(new Date().getFullYear()),
                        from_name: 'Gro Innovative',
                    },
                    { publicKey: EJS_PUBKEY },
                )
                autoReplyOk = true
            } catch (ejsErr) {
                // Log but don't surface to user as hard error
                console.warn('[EmailJS auto-reply]', ejsErr)
            }

            // Reset form
            setForm(BLANK)
            setErrors({})
            setStatus(autoReplyOk ? 'success' : 'success_no_reply')
            setTimeout(() => setStatus(null), 8000)

        } catch (err) {
            console.error('[Web3Forms]', err)
            setStatus('error')
        } finally {
            setIsSending(false)
        }
    }

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <div className="page-enter">
            <SEO {...PAGE_SEO.contact} />
            <StructuredData data={breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Contact', path: '/contact' },
            ])} />

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section className="page-hero" style={{ padding: 0 }}>
                <ParticleCanvas />
                <div className="page-hero-bg" />
                <div className="container" style={{ paddingTop: 'calc(var(--nav-h) + 64px)', paddingBottom: '64px' }}>
                    <div className="hero-grid-wrapper CenteredLayout" style={{ minHeight: 'auto' }}>
                        <div className="hero-content centered" style={{ maxWidth: 840 }}>
                            <div className="badge reveal" style={{ boxShadow: '0 0 20px rgba(16,185,129,0.15)' }}>
                                <span className="badge-dot" />GET IN TOUCH
                            </div>
                            <h1 className="hero-headline reveal reveal-delay-1">
                                Let's Build Something{' '}
                                <span className="gradient-text">Great Together</span>
                            </h1>
                            <p className="hero-sub reveal reveal-delay-2" style={{ maxWidth: 580 }}>
                                Tell us about your project. We'll get back to you with a plan not a sales pitch within 24 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Content ───────────────────────────────────────────────────── */}
            <section className="section">
                <div className="container">
                    <div className="contact-grid">

                        {/* ── Info column ─────────────────────────────────── */}
                        <div className="contact-info reveal">
                            <h3>Contact Information</h3>
                            <p>Reach out directly or fill the form our team typically responds within 4 business hours.</p>

                            <div className="info-items">
                                {[
                                    {
                                        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
                                        label: 'Email', val: 'groinnovative@gmail.com',
                                    },
                                    {
                                        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
                                        label: 'Phone', val: '+91 9345306018', val2: '+91 9003343806',
                                    },
                                    {
                                        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
                                        label: 'Address', val: 'Coimbatore, Tamil Nadu, India',
                                    },
                                    {
                                        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
                                        label: 'Hours', val: 'Mon – Sat, 9am – 7pm IST',
                                    },
                                ].map(item => (
                                    <div key={item.label} className="info-item">
                                        <div className="info-icon">{item.icon}</div>
                                        <div>
                                            <span className="info-label">{item.label}</span>
                                            <span className="info-val" style={{ display: 'block', marginBottom: '2px' }}>{item.val}</span>
                                            {item.val2 && <span className="info-val" style={{ display: 'block' }}>{item.val2}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="contact-badges">
                                <div className="cbadge">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                    NDA Protected
                                </div>
                                <div className="cbadge">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                                    Free Consultation
                                </div>
                                <div className="cbadge">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                    Remote Friendly
                                </div>
                            </div>
                        </div>

                        {/* ── Form column ──────────────────────────────────── */}
                        <div className="contact-form-wrap reveal reveal-delay-1">

                            <form className="contact-form" onSubmit={submit} noValidate>

                                {/* Web3Forms hidden fields */}
                                <input type="hidden" name="access_key" value={W3F_KEY} />
                                <input type="hidden" name="from_name" value="Gro Innovative Website" />
                                <input type="hidden" name="replyto" value={form.email} />

                                {/* Honeypot — must stay empty */}
                                <input
                                    type="checkbox"
                                    name="botcheck"
                                    checked={!!form.botcheck}
                                    onChange={handle}
                                    style={{ display: 'none' }}
                                    tabIndex={-1}
                                    aria-hidden="true"
                                />

                                {/* Row 1 — Name + Email */}
                                <div className="form-row">
                                    <div className="field">
                                        <label htmlFor="cf-name">Full Name *</label>
                                        <input
                                            id="cf-name"
                                            name="name"
                                            value={form.name}
                                            onChange={handle}
                                            placeholder="Alex Johnson"
                                            autoComplete="name"
                                            className={errors.name ? 'input-error' : ''}
                                        />
                                        {errors.name && <span className="field-error">{errors.name}</span>}
                                    </div>
                                    <div className="field">
                                        <label htmlFor="cf-email">Email *</label>
                                        <input
                                            id="cf-email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handle}
                                            placeholder="alex@company.com"
                                            autoComplete="email"
                                            className={errors.email ? 'input-error' : ''}
                                        />
                                        {errors.email && <span className="field-error">{errors.email}</span>}
                                    </div>
                                </div>

                                {/* Row 2 — Phone + Service */}
                                <div className="form-row">
                                    <div className="field">
                                        <label htmlFor="cf-phone">Phone *</label>
                                        <div className="phone-input-wrap">
                                            <span className="phone-prefix">+91</span>
                                            <input
                                                id="cf-phone"
                                                name="phone"
                                                type="tel"
                                                inputMode="numeric"
                                                maxLength={10}
                                                value={form.phone}
                                                onChange={handle}
                                                placeholder="98765 43210"
                                                autoComplete="tel"
                                                className={errors.phone ? 'input-error' : ''}
                                            />
                                        </div>
                                        {errors.phone && <span className="field-error">{errors.phone}</span>}
                                    </div>
                                    <div className="field">
                                        <label htmlFor="cf-service">Service *</label>
                                        <div className="select-wrap">
                                            <select
                                                id="cf-service"
                                                name="service"
                                                value={form.service}
                                                onChange={handle}
                                                className={errors.service ? 'input-error' : ''}
                                            >
                                                <option value="">Select a service…</option>
                                                {SERVICES.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            <span className="select-arrow" aria-hidden="true">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </span>
                                        </div>
                                        {errors.service && <span className="field-error">{errors.service}</span>}
                                    </div>
                                </div>

                                {/* Row 3 — Subject (optional) */}
                                <div className="field">
                                    <label htmlFor="cf-subject">Subject <span className="field-optional">(optional)</span></label>
                                    <input
                                        id="cf-subject"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handle}
                                        placeholder="Project inquiry, Pricing, Quick question…"
                                    />
                                </div>

                                {/* Row 4 — Message */}
                                <div className="field">
                                    <label htmlFor="cf-message">Message *</label>
                                    <textarea
                                        id="cf-message"
                                        name="message"
                                        value={form.message}
                                        onChange={handle}
                                        rows={5}
                                        placeholder="Tell us about your project, goals, and timeline…"
                                        className={errors.message ? 'input-error' : ''}
                                    />
                                    {errors.message && <span className="field-error">{errors.message}</span>}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg cf-submit-btn"
                                    disabled={isSending}
                                >
                                    {isSending
                                        ? <><span className="btn-spinner" aria-hidden="true" />Sending…</>
                                        : <>Send Message <span className="arr">→</span></>
                                    }
                                </button>

                                <p className="form-note">
                                    By submitting, you agree to our Privacy Policy. We'll respond within 24 hours.
                                </p>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
            {/* ── Toast Notification (portal escapes transform stacking context) ── */}
            {createPortal(
            <AnimatePresence>
                {status && (
                    <motion.div
                        key={status}
                        className={`toast-notif toast-notif--${status.startsWith('success') ? 'success' : 'error'}`}
                        role="alert"
                        aria-live="polite"
                        initial={{ opacity: 0, y: 64, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 32, scale: 0.94 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Icon */}
                        <div className="toast-notif-icon" aria-hidden="true">
                            {status.startsWith('success') ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            )}
                        </div>

                        {/* Content */}
                        <div className="toast-notif-body">
                            <p className="toast-notif-title">
                                {status.startsWith('success') ? 'Message Sent!' : 'Sending Failed'}
                            </p>
                            <p className="toast-notif-msg">
                                {status === 'success' && "We'll get back to you within 24 hours. Check your inbox!"}
                                {status === 'success_no_reply' && 'Submitted! Contact us at groinnovative@gmail.com if you need confirmation.'}
                                {status === 'error' && 'Something went wrong. Please try again or email us directly.'}
                            </p>
                        </div>

                        {/* Close */}
                        <button
                            className="toast-notif-close"
                            onClick={() => setStatus(null)}
                            aria-label="Close notification"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Auto-dismiss progress bar */}
                        <div className="toast-notif-progress" aria-hidden="true" />
                    </motion.div>
                )}
            </AnimatePresence>,
            document.body
            )}

        </div>
    )
}
