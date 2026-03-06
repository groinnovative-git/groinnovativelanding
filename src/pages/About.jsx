import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Search, PenTool, Code, Bug, Rocket, LifeBuoy } from 'lucide-react'
import ParticleCanvas from '../components/ParticleCanvas'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { PAGE_SEO } from '../seo/seoConfig'
import { breadcrumbSchema } from '../seo/schemas'
import './About.css'

/* ── Scroll reveal (same as homepage) ── */
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

/* ── Framer Motion variants ── */
const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}
const fadeUpBlur = {
    hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } }
}
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
}
const staggerFast = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } }
}

/* Vision: from left / Mission: from right */
const slideFromLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}
const slideFromRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}

/* Why Us: left column from left, right from right */
const slideTextLeft = {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}
const slideCheckRight = {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

/* Check icon scale pop */
const checkPop = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
}

/* Heading underline */
const lineGrow = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } }
}

const cardAnim = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}
const teamCardAnim = {
    hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } }
}

/* ── Count-up component (same pattern as home page) ── */
function CountUp({ target, prefersReduced }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (prefersReduced) { el.textContent = target; return }
        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            obs.disconnect()
            const dur = 1200, start = performance.now()
            const tick = (now) => {
                const p = Math.min((now - start) / dur, 1)
                const ease = 1 - Math.pow(1 - p, 3)
                el.textContent = Math.round(ease * target)
                if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
        }, { threshold: 0.5 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [target, prefersReduced])
    return <span ref={ref} className="team-count">0</span>
}

const teamRoles = [
    { role: 'UI/UX Designers', count: 2, line: 'Design systems, UX flows, and conversion-focused UI.' },
    { role: 'Flutter Developers', count: 3, line: 'Cross-platform mobile apps with native performance.' },
    { role: 'Frontend Developers', count: 3, line: 'Pixel-perfect interfaces with React and modern stacks.' },
    { role: 'Backend Developers', count: 3, line: 'Scalable APIs, databases, and server architecture.' },
    { role: 'QA Testers', count: 3, line: 'Rigorous testing for flawless, production-ready releases.' },
    { role: 'Deployment Engineers', count: 2, line: 'CI/CD pipelines, cloud infra, and zero-downtime deploys.' },
]

const processSteps = [
    {
        n: '01', icon: Search, title: 'Discovery & Scoping',
        desc: 'We start with a detailed conversation about your goals, timeline, and budget. We map out the project scope, technologies, and deliverables in a clear proposal.'
    },
    {
        n: '02', icon: PenTool, title: 'Design & Prototyping',
        desc: 'Our designers create wireframes and highfidelity mockups. You see exactly what you\'re getting before a single line of code is written.'
    },
    {
        n: '03', icon: Code, title: 'Agile Development',
        desc: 'Development in 2-week sprints. You get weekly demos, can give feedback anytime, and always know exactly where your project stands.'
    },
    {
        n: '04', icon: Bug, title: 'Testing & QA',
        desc: 'Rigorous automated and manual testing across devices and browsers. Performance benchmarks, security reviews, and bug free deployment.'
    },
    {
        n: '05', icon: Rocket, title: 'Launch & Deploy',
        desc: 'We handle the full deployment to your cloud infrastructure, set up monitoring, and ensure a smooth go live with zero downtime.'
    },
    {
        n: '06', icon: LifeBuoy, title: 'Support & Growth',
        desc: 'Your product doesn\'t stop at launch. We offer ongoing maintenance, feature additions, and growth consulting as your business scales.'
    },
]

/* ── Data ── */
const checklistItems = [
    'Clean & Scalable Code',
    'Modern UI/UX Design',
    'Performance Optimized',
    'Custom Business Solutions',
    'Ongoing Support & Maintenance',
    'Agile Development Process',
]

const approachSteps = [
    { num: '01', title: 'Discover', desc: 'Understand goals, audience, and needs through deep research and stakeholder alignment.' },
    { num: '02', title: 'Design', desc: 'Create wireframes, UI systems, and prototypes that prioritize usability and conversion.' },
    { num: '03', title: 'Develop', desc: 'Build scalable solutions with clean code, modern architecture, and seamless integrations.' },
    { num: '04', title: 'Optimize & Support', desc: 'Performance tuning, SEO refinement, ongoing maintenance, and continuous improvement.' },
]

/* ══════════════════════════════════════════════════════════════════════════════ */
export default function About() {
    useReveal()
    const prefersReduced = useReducedMotion()

    return (
        <div className="page-enter">
            <SEO {...PAGE_SEO.about} />
            <StructuredData data={breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
            ])} />

            {/* ─── 1. HERO ───────────────────────────────────────────────────── */}
            <section className="hero-section about-hero">
                <ParticleCanvas />
                <div className="container">
                    <div className="hero-grid-wrapper CenteredLayout">
                        <div className="hero-content centered" style={{ maxWidth: 880 }}>
                            <div className="badge reveal" style={{ boxShadow: '0 0 20px rgba(16,185,129,0.15)' }}>
                                <span className="badge-dot" />ABOUT GRO INNOVATIVE
                            </div>
                            <h1 className="hero-headline reveal reveal-delay-1">
                                Building Smart Digital Growth for{' '}
                                <span className="gradient-text">Modern Businesses</span>
                            </h1>
                            <p className="hero-sub reveal reveal-delay-2" style={{ maxWidth: 640 }}>
                                Gro Innovative builds scalable websites, software, and AI-integrated solutions that help businesses launch faster, convert better, and grow sustainably with strong design, clean engineering, and long-term support.
                            </p>
                            <div className="hero-actions reveal reveal-delay-3">
                                <Link to="/contact" className="btn btn-primary">
                                    Contact Us <span className="arr">→</span>
                                </Link>
                                <Link to="/services" className="btn btn-secondary">
                                    Explore Services <span className="arr">→</span>
                                </Link>
                            </div>
                            <div className="trust-pills reveal reveal-delay-4">
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg>Free Consultation</span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg>NDA Protected</span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg>Remote Friendly</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 2. WHO WE ARE ─────────────────────────────────────────────── */}
            <section className="section about-who">
                <div className="container">
                    <div className="about-who-inner">
                        <div className="about-who-text">
                            <div className="badge reveal"><span className="badge-dot" />WHO WE ARE</div>
                            <h2 className="reveal reveal-delay-1">Who We Are</h2>
                            <p className="reveal reveal-delay-2" style={{ marginBottom: 32 }}>
                                Gro Innovative is a modern digital solutions company helping startups, founders, and growing businesses build high performing digital products. We combine strategy, UI/UX design, development, automation, and AI integration to create solutions that are visually premium, technically strong, scalable, and business-focused.
                            </p>
                            <motion.ul
                                className="about-highlights"
                                variants={stagger}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                {[
                                    'Product first UI/UX and conversion focused design',
                                    'Clean architecture and scalable development',
                                    'AI-enabled workflows and practical automation',
                                ].map(item => (
                                    <motion.li key={item} variants={cardAnim}>
                                        <span className="about-check">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                        </span>
                                        {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 3. VISION & MISSION (Fix #1: tight spacing, Fix #3A: premium anim) ── */}
            <section className="section section-alt about-vm-section">
                <div className="container">
                    <div className="about-vm-header">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="badge"
                        >
                            <span className="badge-dot" />OUR DIRECTION
                        </motion.div>
                        <motion.h2
                            variants={fadeUpBlur}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            Vision & Mission
                        </motion.h2>
                        {/* Animated underline */}
                        {!prefersReduced && (
                            <motion.div
                                className="vm-underline"
                                variants={lineGrow}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                            />
                        )}
                    </div>
                    <motion.div
                        className="vm-grid"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        <motion.div variants={prefersReduced ? fadeUp : slideFromLeft} className="card vm-card">
                            <div className="vm-icon-wrap">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                            </div>
                            <h3>Vision</h3>
                            <p>To become a trusted digital growth partner for businesses worldwide by delivering intelligent, scalable, and impactful digital experiences powered by innovation, technology, and creativity.</p>
                        </motion.div>
                        <motion.div variants={prefersReduced ? fadeUp : slideFromRight} className="card vm-card">
                            <div className="vm-icon-wrap">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            </div>
                            <h3>Mission</h3>
                            <p>To help businesses grow faster with modern websites, software applications, AI-integrated solutions, SEO, branding, and ongoing support delivered through an agile, transparent, and results driven process.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ─── OUR TEAM ──────────────────────────────────────────────── */}
            <section className="section about-team-section">
                <div className="container">
                    <div className="about-vm-header">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="badge"
                        >
                            <span className="badge-dot" />OUR TEAM
                        </motion.div>
                        <motion.h2
                            variants={fadeUpBlur}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            The Team Behind Gro Innovative
                        </motion.h2>
                        {!prefersReduced && (
                            <motion.div
                                className="vm-underline"
                                variants={lineGrow}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                            />
                        )}
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="team-subtitle"
                        >
                            A multi disciplinary team delivering design, development, testing, and deployment with a clean agile workflow.
                        </motion.p>
                    </div>
                    <motion.div
                        className="team-grid"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {teamRoles.map(t => (
                            <motion.div key={t.role} variants={teamCardAnim} className="team-card">
                                <CountUp target={t.count} prefersReduced={prefersReduced} />
                                <h3>{t.role}</h3>
                                <p>{t.line}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── WHY BUSINESSES CHOOSE US ───────────────────────────────── */}
            <section className="section">
                <div className="container">
                    <motion.div
                        className="why-choose-inner"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <motion.div className="why-choose-text" variants={prefersReduced ? fadeUp : slideTextLeft}>
                            <div className="badge"><span className="badge-dot" />WHY US</div>
                            <h2>Why Businesses Choose Gro Innovative</h2>
                            <p>
                                We don't just build digital products we create growth focused solutions engineered for performance, usability, scalability, and long-term business value.
                            </p>
                        </motion.div>
                        <motion.div
                            className="checklist-grid"
                            variants={prefersReduced ? stagger : { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
                        >
                            {checklistItems.map(item => (
                                <motion.div
                                    key={item}
                                    variants={prefersReduced ? cardAnim : slideCheckRight}
                                    className="checklist-item"
                                >
                                    <motion.div className="checklist-icon" variants={checkPop}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                    </motion.div>
                                    <span>{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ─── 5. HOW WE WORK (Migrated 6-Steps) ─────────────────────────── */}
            <section className="section section-alt about-process-section">
                <div className="container">
                    <motion.div
                        className="process-section-inner"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <div className="about-vm-header">
                            <motion.div variants={fadeUp} className="badge">
                                <span className="badge-dot" />HOW IT WORKS
                            </motion.div>
                            <motion.h2 variants={fadeUpBlur}>
                                How We Work
                            </motion.h2>
                            {!prefersReduced && (
                                <motion.div className="vm-underline" variants={lineGrow} />
                            )}
                            <motion.p variants={fadeUp} className="team-subtitle">
                                A clear, agile workflow designed for speed, quality, and long-term support.
                            </motion.p>
                        </div>

                        <div className="process-wrapper">
                            <motion.div className="steps-grid" variants={staggerFast}>
                                {processSteps.map((s) => {
                                    const Icon = s.icon;
                                    return (
                                        <motion.div key={s.n} variants={cardAnim} className="step-card">
                                            <div className="step-num">{s.n}</div>
                                            <div className="step-icon-badge">
                                                <Icon size={20} strokeWidth={1.8} />
                                            </div>
                                            <h3>{s.title}</h3>
                                            <p>{s.desc}</p>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── 6. OUR APPROACH ───────────────────────────────────────────── */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="badge reveal"><span className="badge-dot" />THE JOURNEY</div>
                        <h2 className="reveal reveal-delay-1">Our Approach</h2>
                        <p className="reveal reveal-delay-2">A proven 4-step process that takes your idea from concept to a high performing digital product.</p>
                    </div>
                    <motion.div
                        className="approach-grid"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        {approachSteps.map(step => (
                            <motion.div key={step.num} variants={cardAnim} className="approach-card">
                                <span className="approach-num">{step.num}</span>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── 7. FINAL CTA ──────────────────────────────────────────────── */}
            <section className="cta-banner section section-dark">
                <div className="container">
                    <div className="cta-banner-inner about-cta">
                        <div className="about-cta-content">
                            <h2 className="reveal" style={{ color: '#fff' }}>Ready to Build Something Smarter?</h2>
                            <p className="reveal reveal-delay-1">
                                Let's transform your idea into a high performing digital product with strategy, design, development, and AI-powered execution.
                            </p>
                            <div className="about-cta-btns reveal reveal-delay-2">
                                <Link to="/contact" className="btn btn-primary btn-lg">
                                    Start Your Project <span className="arr">→</span>
                                </Link>
                                <Link to="/services" className="btn btn-secondary btn-lg">
                                    Explore Services <span className="arr">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
