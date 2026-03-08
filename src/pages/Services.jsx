import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ParticleCanvas from '../components/ParticleCanvas'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { PAGE_SEO } from '../seo/seoConfig'
import { breadcrumbSchema, serviceSchemas } from '../seo/schemas'
import { Zap, Lock, Search, Wrench } from 'lucide-react'
import LiveProjects from '../components/sections/LiveProjects'
import './Services.css'

const services = [
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
        title: 'Website Creation',
        desc: 'High-converting websites and landing pages built with modern UI, fast performance, and lead-focused structure.',
        features: ['Conversion-first UX + mobile responsive', 'Lightning performance + Core Web Vitals', 'SEO-ready structure + clean sitemap', 'Analytics + lead tracking setup'],
        buttonText: 'Get a Quote'
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
        title: 'Software Development',
        desc: 'Custom web and mobile applications engineered for scale, security, and long-term maintainability.',
        features: ['Web apps (React/Next.js) + APIs', 'Admin dashboards + authentication', 'Payment, booking, CRM integrations', 'Scalable architecture + clean code'],
        buttonText: 'Start a Project'
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
        title: 'SEO Optimization',
        desc: 'Technical SEO + on-page optimization to improve rankings, visibility, and qualified traffic.',
        features: ['Technical audit + fixes', 'Keyword strategy + content plan', 'On-page SEO + internal linking', 'Indexing + sitemap + schema setup'],
        buttonText: 'Boost My SEO'
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
        title: 'Digital Marketing',
        desc: 'Growth campaigns designed to generate demand strategy, creatives, ads, and funnels.',
        features: ['Lead-gen funnels + landing pages', 'Google/Meta ads + tracking', 'Social content plan', 'Reporting + optimization cycles'],
        buttonText: 'Grow My Leads'
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
        title: 'Site Maintenance',
        desc: 'Keep your site secure, fast, and updated with ongoing support and monthly improvements.',
        features: ['Security updates + backups', 'Speed optimization + uptime checks', 'Content updates + bug fixes', 'Monthly reporting + recommendations'],
        buttonText: 'Maintain My Site'
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>,
        title: 'Logo & Poster Creation',
        desc: 'Modern brand visuals designed for trust logos and posters for digital + print.',
        features: ['Logo concepts + brand direction', 'Social media posters + banners', 'Print-ready exports', 'Simple brand consistency guide'],
        buttonText: 'Create My Brand'
    },
]

const packages = [
    { name: 'Starter', focus: 'Website', outcomes: ['Conversion ready landing page', 'Basic SEO setup', 'Mobile responsive design'], cta: 'Get a Quote' },
    { name: 'Growth', focus: 'Website + SEO', outcomes: ['Performance business site', 'Complete SEO foundation', 'Lead tracking + Analytics'], cta: 'Get a Quote' },
    { name: 'Scale', focus: 'Software + Growth', outcomes: ['Custom web/mobile application', 'Advanced growth automation', 'Full scale marketing funnel'], cta: 'Get a Quote' },
]

// Framer Motion Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
}
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
}
const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
}

export default function Services() {


    return (
        <div className="page-enter">
            <SEO {...PAGE_SEO.services} />
            <StructuredData data={[
                breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Services', path: '/services' },
                ]),
                ...serviceSchemas,
            ]} />
            {/* ── Services Hero ── */}
            <section className="relative w-full page-hero" style={{ padding: 0 }}>
                <ParticleCanvas />
                <div className="page-hero-bg" />

                {/* Radial vignette / spotlight overlay */}
                <div
                    className="pointer-events-none absolute inset-0 z-[1]"
                    style={{
                        background:
                            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(16,185,129,0.08) 0%, transparent 70%)',
                    }}
                />

                <div className="container relative z-[2]" style={{ paddingTop: 'calc(var(--nav-h) + 64px)', paddingBottom: '64px', paddingLeft: 16, paddingRight: 16 }}>
                    <div className="hero-grid-wrapper CenteredLayout" style={{ minHeight: 'auto' }}>
                        <div className="hero-content centered" style={{ maxWidth: 880 }}>

                            {/* Pill badge */}
                            <motion.div
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                className="badge badge-accent"
                                style={{
                                    padding: '5px 14px',
                                    letterSpacing: '0.08em',
                                    boxShadow: '0 0 20px rgba(16,185,129,0.15)',
                                    marginBottom: 28,
                                }}
                            >
                                <span className="badge-dot" style={{ background: 'var(--accent)' }} />
                                WHAT WE OFFER
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.1 }}
                                className="hero-headline services-hero-headline"
                                style={{
                                    fontSize: 'clamp(1.85rem, 5vw, 3.6rem)',
                                    fontWeight: 700,
                                    lineHeight: 1.12,
                                    letterSpacing: '-0.025em',
                                    marginBottom: 24,
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                High Performance Websites,{' '}
                                <span className="gradient-text">Software & Growth Systems</span>
                            </motion.h1>

                            {/* Paragraph */}
                            <motion.p
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.2 }}
                                style={{
                                    maxWidth: 620,
                                    margin: '0 auto',
                                    fontSize: '1.1rem',
                                    lineHeight: 1.75,
                                    color: 'rgba(255,255,255,0.6)',
                                }}
                            >
                                From strategy to launch  we build conversion focused websites, scalable applications, SEO foundations, and marketing systems designed to generate leads and long-term growth.
                            </motion.p>

                            {/* Trust pills */}
                            <motion.div
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.35 }}
                                className="flex flex-wrap justify-center gap-3"
                                style={{ marginTop: 40 }}
                            >
                                {[
                                    { label: 'Fast Delivery', icon: Zap },
                                    { label: 'NDA Protected', icon: Lock },
                                    { label: 'SEO-Ready Build', icon: Search },
                                    { label: 'Post-Launch Support', icon: Wrench },
                                ].map(item => {
                                    const Icon = item.icon;
                                    return (
                                        <span
                                            key={item.label}
                                            className="services-trust-pill"
                                        >
                                            <Icon className="services-trust-pill-icon" />
                                            {item.label}
                                        </span>
                                    )
                                })}
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>


            {/* Services list */}
            <section className="section">
                <div className="container">
                    <motion.div
                        className="services-list"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {services.map((s, i) => (
                            <motion.div
                                key={s.title}
                                variants={i === 0 ? undefined : cardVariants}
                                initial={i === 0 ? { opacity: 1, y: 0 } : undefined}
                                animate={i === 0 ? { opacity: 1, y: 0 } : undefined}
                                className="svc-card"
                            >
                                <div className="svc-left">
                                    <div className="icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', fontSize: '2rem', width: 64, height: 64 }}>{s.icon}</div>
                                    <div>
                                        {s.tag && <div className="badge badge-accent" style={{ marginBottom: 10 }}><span className="badge-dot" style={{ background: 'var(--accent)' }} />{s.tag}</div>}
                                        <h3>{s.title}</h3>
                                        <p style={{ marginTop: 10 }}>{s.desc}</p>
                                        <Link to="/contact" className="btn btn-primary" style={{ marginTop: 20 }}>{s.buttonText} <span className="arr">→</span></Link>
                                    </div>
                                </div>
                                <div className="svc-right">
                                    <ul className="svc-features">
                                        {s.features.map(f => (
                                            <li key={f}><span className="check">✔</span>{f}</li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Our Live Projects */}
            <LiveProjects />

            {/* Service Packages */}
            <section className="section bg-dim">
                <div className="container">
                    <div className="section-header">
                        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="badge badge-accent">
                            <span className="badge-dot" style={{ background: 'var(--accent)' }} />
                            SERVICE PACKAGES
                        </motion.div>
                        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            Choose the Right Solution<br />for Your Growth Stage
                        </motion.h2>
                        <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            Flexible packages designed for startups, growing businesses, and scalable digital products.
                        </motion.p>
                    </div>
                    <div className="grid-3">
                        {packages.map((pkg, i) => (
                            <motion.div
                                key={pkg.name}
                                className="pkg-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="pkg-header">
                                    <div className="pkg-focus">{pkg.focus}</div>
                                    <h3>{pkg.name}</h3>
                                </div>
                                <ul className="pkg-outcomes">
                                    {pkg.outcomes.map(o => (
                                        <li key={o}><span className="check">✔</span> {o}</li>
                                    ))}
                                </ul>
                                <Link to="/contact" className="btn btn-secondary w-full" style={{ marginTop: 'auto' }}>{pkg.cta} →</Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
