import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import gymImg from '../../assets/gym.png'
import dressImg from '../../assets/dress.png'
import petImg from '../../assets/pet.png'
import './LiveProjects.css'

const projects = [
    {
        id: 'flexforce',
        title: 'FlexForce Fitness',
        category: 'Gym & Fitness',
        description: 'A modern and energetic landing page designed for gyms, fitness centers, and personal trainers.',
        demoUrl: 'https://flexforcegymlandingpage.vercel.app/',
        badges: ['Live Demo', 'Responsive', 'Modern UI'],
        img: gymImg,
        imgAlt: 'FlexForce Fitness gym landing page preview',
        accent: '#10B981',
        accentRgb: '16,185,129',
        fallbackBg: 'linear-gradient(160deg, #020f07 0%, #041a0c 45%, #073520 100%)',
    },
    {
        id: 'lumiere',
        title: 'Lumière Boutique',
        category: 'Fashion & Boutique',
        description: 'A stylish and elegant boutique website template crafted for clothing brands and fashion stores.',
        demoUrl: 'https://botiquesite.vercel.app/',
        badges: ['Live Demo', 'Responsive', 'Modern UI'],
        img: dressImg,
        imgAlt: 'Lumière Boutique fashion website preview',
        accent: '#C084FC',
        accentRgb: '192,132,252',
        fallbackBg: 'linear-gradient(160deg, #0f0818 0%, #1c0d30 45%, #2a1248 100%)',
    },
    {
        id: 'pawpalace',
        title: 'PawPalace Pet Shop',
        category: 'Pet Store',
        description: 'A friendly and engaging landing page built for pet shops, pet care brands, and animal services.',
        demoUrl: 'https://petshoplanding.vercel.app/',
        badges: ['Live Demo', 'Responsive', 'Modern UI'],
        img: petImg,
        imgAlt: 'PawPalace Pet Shop landing page preview',
        accent: '#F59E0B',
        accentRgb: '245,158,11',
        fallbackBg: 'linear-gradient(160deg, #120900 0%, #221300 45%, #2e1a00 100%)',
    },
]

export default function LiveProjects() {
    return (
        <section className="section lp-section" aria-labelledby="lp-heading">
            <div className="container">

                {/* ── Section Header ── */}
                <div className="section-header">
                    <motion.div
                        className="badge badge-accent"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                        <span className="badge-dot" style={{ background: 'var(--accent)' }} />
                        LIVE PROJECTS
                    </motion.div>

                    <motion.h2
                        id="lp-heading"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
                    >
                        Our Live Projects
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.2 }}
                    >
                        Explore some of our modern landing page templates and live client-style website demos.
                    </motion.p>
                </div>

                {/* ── Cards Grid ── */}
                <div className="grid-3">
                    {projects.map((project, i) => (
                        <motion.article
                            key={project.id}
                            className="lp-card"
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.38, ease: 'easeOut', delay: i * 0.1 }}
                            aria-label={`${project.title} — ${project.category}`}
                        >
                            {/* ── Screenshot Preview ── */}
                            <div className="lp-preview">
                                {/* Browser chrome bar */}
                                <div className="lp-browser-bar" aria-hidden="true">
                                    <div className="lp-dots">
                                        <span className="lp-dot lp-dot-r" />
                                        <span className="lp-dot lp-dot-y" />
                                        <span className="lp-dot lp-dot-g" />
                                    </div>
                                    <span className="lp-url-pill">
                                        {project.demoUrl.replace('https://', '').replace(/\/$/, '')}
                                    </span>
                                </div>

                                {/* Real screenshot image */}
                                <div
                                    className="lp-screen"
                                    style={{ background: project.fallbackBg }}
                                >
                                    <img
                                        src={project.img}
                                        alt={project.imgAlt}
                                        className="lp-screen-img"
                                        loading="lazy"
                                        width="600"
                                        height="380"
                                        decoding="async"
                                    />
                                </div>

                                {/* Hover overlay */}
                                <div className="lp-overlay" aria-hidden="true">
                                    <ExternalLink size={20} />
                                    <span>Preview Site</span>
                                </div>
                            </div>

                            {/* ── Card Body ── */}
                            <div className="lp-body">
                                <div className="lp-meta-row">
                                    <span
                                        className="lp-category"
                                        style={{
                                            color: project.accent,
                                            background: `rgba(${project.accentRgb}, 0.12)`,
                                            borderColor: `rgba(${project.accentRgb}, 0.28)`,
                                        }}
                                    >
                                        {project.category}
                                    </span>
                                    {project.badges.map(badge => (
                                        <span key={badge} className="lp-badge">{badge}</span>
                                    ))}
                                </div>

                                <h3 className="lp-title">{project.title}</h3>
                                <p className="lp-desc">{project.description}</p>

                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary lp-demo-btn"
                                    aria-label={`View demo for ${project.title}, opens in new tab`}
                                >
                                    View Demo <span className="arr">→</span>
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>

            </div>
        </section>
    )
}
