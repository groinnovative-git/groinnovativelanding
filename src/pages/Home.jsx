import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import ParticleCanvas from '../components/ParticleCanvas'
import EyeFollowIcon from '../components/EyeFollowIcon'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { PAGE_SEO } from '../seo/seoConfig'
import { breadcrumbSchema, faqSchema } from '../seo/schemas'
import './Home.css'

/* Scroll reveal hook */
function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal')
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
        }, { threshold: 0.12 })
        els.forEach(el => obs.observe(el))
        return () => obs.disconnect()
    }, [])
}

/* Count-up */
function CountUp({ target, suffix = '' }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            obs.disconnect()
            const dur = 1800; const start = performance.now()
            const tick = (now) => {
                const p = Math.min((now - start) / dur, 1)
                const ease = 1 - Math.pow(1 - p, 3)
                el.textContent = Math.floor(ease * target) + suffix
                if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
        }, { threshold: 0.5 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [target, suffix])
    return <span ref={ref}>0{suffix}</span>
}

const services = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>, title: 'Website Creation', desc: 'High converting landing pages and business websites built for speed, SEO, and modern UI optimized for leads and trust.', color: 'rgba(16, 185, 129, 0.1)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>, title: 'SEO Optimization', desc: 'Technical SEO, on-page optimization, keyword strategy, and performance fixes to improve rankings, visibility, and organic growth.', color: 'rgba(16, 185, 129, 0.1)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>, title: 'Software Development', desc: 'Custom web and mobile applications using modern stacks scalable architecture, clean code, and production ready delivery.', color: 'rgba(16, 185, 129, 0.1)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>, title: 'Digital Marketing', desc: 'Growth campaigns across search and social content, ads, funnels, and analytics built to generate consistent demand.', color: 'rgba(16, 185, 129, 0.1)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, title: 'Site Maintenance', desc: 'Ongoing updates, security checks, performance tuning, backups, and support to keep your website reliable and fast.', color: 'rgba(16, 185, 129, 0.1)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>, title: 'Logo & Poster Creation', desc: 'Clean, modern brand visuals — logos, posters, and marketing creatives designed for digital and print use.', color: 'rgba(16, 185, 129, 0.1)' },
]

const stats = [
    { value: 10, suffix: '+', label: 'Clients Served' },
    { value: 15, suffix: '+', label: 'Projects Delivered' },
    { value: 2, suffix: '+', label: 'Years Experience' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

const whyUs = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, title: 'Fast Execution', desc: 'Agile delivery with clear milestones. Most projects move from concept to launch in weeks not months  with full transparency.' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>, title: 'Enterprise Quality', desc: 'Built with modern architectures, clean code, and rigorous testing standards to ensure long-term performance and reliability.' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" /><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" /></svg>, title: 'Long-Term Partnership', desc: 'From development to maintenance and optimization, we support your growth beyond launch ensuring continuous improvement.' },
]

// Framer Motion Variants for Why Section
const fadeInUpBadge = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
const fadeInUpHeading = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.05 } }
}
const fadeInUpP = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.12 } }
}
const staggerContainerLeft = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}
const itemLeft = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
const staggerContainerRight = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}
const itemRight = {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
const lineDraw = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
}

const serviceContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}
const serviceCardAnim = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export default function Home() {
    useReveal()
    const prefersReducedMotion = useReducedMotion()
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

    const handleMouseMove = (e) => {
        if (prefersReducedMotion) return
        const { currentTarget, clientX, clientY } = e
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div className="page-enter">
            <SEO {...PAGE_SEO.home} />
            <StructuredData data={[
                breadcrumbSchema([{ name: 'Home', path: '/' }]),
                faqSchema,
            ]} />
            {/* ── HERO ── */}
            <section className="hero-section">
                <ParticleCanvas />
                <div className="container">
                    <div className="hero-grid-wrapper CenteredLayout">
                        <div className="hero-content centered">
                            <div className="badge reveal">
                                <span className="badge-dot" />
                                ACCELERATE YOUR BUSINESSES
                            </div>
                            <h1 className="hero-headline reveal reveal-delay-1">
                                AI Driven Software &<br />
                                <span className="hero-nowrap-line">
                                    <EyeFollowIcon />
                                    <span className="gradient-text">Growth Systems</span>
                                </span><br />
                                for Modern Businesses
                            </h1>
                            <p className="hero-sub reveal reveal-delay-2">
                                We design and build scalable SaaS platforms, intelligent websites, and automation-ready digital products engineered for performance, visibility, and long-term growth.
                            </p>
                            <div className="hero-actions reveal reveal-delay-3">
                                <Link to="/contact" className="btn btn-primary">
                                    ✔ Start a Project
                                </Link>
                                <Link to="/services" className="btn btn-secondary">
                                    ✔ Explore Services
                                </Link>
                            </div>
                            {/* Floating trust pills */}
                            <div className="trust-pills reveal reveal-delay-4">
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg> Free Consultation</span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg> No Lock-in Contracts</span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg> NDA Protected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ── STATS ── */}
            <section className="stats-section section-alt">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map(s => (
                            <div className="stat-card reveal" key={s.label}>
                                <div className="stat-num"><CountUp target={s.value} suffix={s.suffix} /></div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="section services-section">
                <div className="services-particles-wrap">
                    <ParticleCanvas />
                </div>
                <div className="container relative-z">
                    <div className="section-header">
                        <div className="badge reveal"><span className="badge-dot" />What We Do</div>
                        <h2 className="reveal reveal-delay-1">End-to-End Digital & Software Solutions</h2>
                        <p className="reveal reveal-delay-2">From idea to launch we handle every layer of your digital product.</p>
                    </div>
                    <motion.div
                        className="grid-3 services-grid"
                        variants={serviceContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        {services.map((s) => (
                            <motion.div
                                key={s.title}
                                variants={serviceCardAnim}
                                className="card service-card"
                            >
                                <div className="icon-box" style={{ background: s.color, color: 'var(--primary)' }}>{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                                <Link to="/services" className="card-link">Explore Service <span className="arr">→</span></Link>
                            </motion.div>
                        ))}
                    </motion.div>
                    <div style={{ textAlign: 'center', marginTop: 48, position: 'relative', zIndex: 1 }}>
                        <Link to="/services" className="btn btn-secondary">View All Services <span className="arr">→</span></Link>
                    </div>
                </div>
            </section>

            {/* ── WHY US ── */}
            <section className="why-section section-alt section" onMouseMove={handleMouseMove}>
                {!prefersReducedMotion && (
                    <motion.div
                        className="mouse-glow-overlay"
                        style={{ x: smoothX, y: smoothY }}
                    />
                )}
                <div className="container">
                    <div className="why-inner">
                        <div className="why-text">
                            <motion.div variants={fadeInUpBadge} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="badge"><span className="badge-dot" />WHY GRO INNOVATIVE</motion.div>
                            <motion.h2 variants={fadeInUpHeading} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>Your Technology Partner for Scalable Growth</motion.h2>
                            <motion.p variants={fadeInUpP} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} style={{ marginBottom: 32 }}>
                                We build scalable digital systems that turn ideas into real business growth combining AI powered software development, performance focused web solutions, and strategic digital execution.
                            </motion.p>
                            <motion.div variants={staggerContainerLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
                                {whyUs.map((w) => (
                                    <motion.div variants={itemLeft} key={w.title} className="why-item">
                                        <div className="why-icon" style={{ color: 'var(--primary)' }}>{w.icon}</div>
                                        <div>
                                            <strong>{w.title}</strong>
                                            <p>{w.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <div className="why-visual">
                            <motion.div variants={lineDraw} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="why-line" />
                            <motion.div variants={staggerContainerRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="why-card-stack">
                                <motion.div variants={itemRight} className="why-card wc-1">
                                    <strong>Strategy & Discovery</strong>
                                    <p>Week 1: Strategy, planning & system architecture</p>
                                </motion.div>
                                <motion.div variants={itemRight} className="why-card wc-2">
                                    <strong>Engineering & Development</strong>
                                    <p>Weeks 2–6: Agile development & iterative delivery</p>
                                </motion.div>
                                <motion.div variants={itemRight} className="why-card wc-3">
                                    <strong>Deployment & Scaling</strong>
                                    <p>Week 7+: Deployment, optimization & scaling support</p>
                                </motion.div>
                            </motion.div>
                        </div>
                        <motion.div variants={fadeInUpBadge} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="why-cta-wrap">
                            <Link to="/how-it-works" className="btn btn-primary">
                                See How We Work <span className="arr">→</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="cta-banner section section-dark">
                <div className="container">
                    <div className="cta-banner-inner">
                        <div>
                            <h2 className="reveal" style={{ color: '#fff' }}>Ready to build something great?</h2>
                            <p className="reveal reveal-delay-1">Get a free consultation and project estimate within 24 hours.</p>
                        </div>
                        <div className="reveal reveal-delay-2">
                            <Link to="/contact" className="btn btn-white btn-lg">
                                Start Your Project <span className="arr">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
