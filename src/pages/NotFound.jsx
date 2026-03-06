import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import ParticleCanvas from '../components/ParticleCanvas'
import SEO from '../components/SEO'
import { PAGE_SEO } from '../seo/seoConfig'
import './NotFound.css'

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal')
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible')
                    obs.unobserve(e.target)
                }
            })
        }, { threshold: 0.12 })
        els.forEach(el => obs.observe(el))
        return () => obs.disconnect()
    }, [])
}

export default function NotFound() {
    useReveal()

    return (
        <div className="page-enter not-found-page">
            <SEO {...PAGE_SEO.notFound} />
            {/* ── HERO ── */}
            <section className="hero-section min-h-screen">
                <ParticleCanvas />
                <div className="container">
                    <div className="hero-grid-wrapper CenteredLayout" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                        <div className="hero-content centered">
                            <div className="badge reveal">
                                <span className="badge-dot" />
                                404 ERROR
                            </div>
                            <h1 className="hero-headline reveal reveal-delay-1">
                                <span className="gradient-text">Page Not Found</span>
                            </h1>
                            <p className="hero-sub reveal reveal-delay-2" style={{ maxWidth: '500px', margin: '0 auto' }}>
                                Sorry, the page you’re looking for doesn’t exist or has been moved. Let’s get you back to the right place.
                            </p>

                            <div className="hero-actions reveal reveal-delay-3" style={{ justifyContent: 'center' }}>
                                <Link to="/" className="btn btn-primary">
                                    Return to Home
                                </Link>
                                <Link to="/contact" className="btn btn-outline">
                                    Contact Support
                                </Link>
                            </div>

                            <div className="popular-links reveal reveal-delay-4">
                                <p className="popular-links-title">Popular Links</p>
                                <ul className="popular-links-list">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/services">Services</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
