import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import logoImg from '../assets/logo.png'
import { useHideOnScroll } from '../hooks/useHideOnScroll'

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const location = useLocation()

    // Hide on scroll-down, show on scroll-up
    const hidden = useHideOnScroll({ threshold: 120, delta: 10 })

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', fn, { passive: true })
        return () => window.removeEventListener('scroll', fn)
    }, [])

    useEffect(() => { setOpen(false) }, [location.pathname])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (open) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }
        return () => document.body.classList.remove('menu-open')
    }, [open])

    // Build class string
    const navClass = [
        'gi-nav',
        scrolled ? 'scrolled' : '',
        hidden ? 'nav-hidden' : '',
    ].filter(Boolean).join(' ')

    return (
        <>
            <header className={navClass}>
                <div className="container gi-nav-inner">

                    {/* LEFT — Logo (independent; any size won't affect pill) */}
                    <Link to="/" className="gi-logo" onClick={() => { setOpen(false); window.scrollTo(0, 0); }}>
                        <img src={logoImg} alt="GroInnovative" className="gi-logo-img" />
                    </Link>

                    {/* RIGHT — Pill (desktop) + Hamburger (mobile/tablet) */}
                    <div className="gi-nav-actions">

                        {/* Floating pill — desktop only */}
                        <div className="gi-nav-pill">
                            <nav className="gi-links">
                                {navLinks.map(l => (
                                    <NavLink
                                        key={l.to}
                                        to={l.to}
                                        end={l.to === '/'}
                                        className={({ isActive }) =>
                                            `gi-link${isActive ? ' active' : ''}`
                                        }
                                    >
                                        {l.label}
                                    </NavLink>
                                ))}
                            </nav>
                            <Link
                                to="/contact"
                                className="gi-pill-cta"
                                onClick={() => setOpen(false)}
                            >
                                Get a Quote
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2.5"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>

                        {/* Hamburger — mobile / tablet */}
                        <button
                            className={`gi-ham${open ? ' open' : ''}`}
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle menu"
                        >
                            <span /><span /><span />
                        </button>

                    </div>
                </div>
            </header>

            {/* Mobile / tablet slide-in menu */}
            <div className={`gi-mobile-menu${open ? ' open' : ''}`}>
                <div className="mobile-menu-header">
                    <button
                        className="gi-close-btn"
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {navLinks.map(l => (
                    <NavLink
                        key={l.to}
                        to={l.to}
                        end={l.to === '/'}
                        className={({ isActive }) =>
                            `gi-mobile-link${isActive ? ' active' : ''}`
                        }
                        onClick={() => setOpen(false)}
                    >
                        {l.label}
                    </NavLink>
                ))}

                <div className="mobile-cta-wrapper">
                    <Link
                        to="/contact"
                        className="btn btn-primary btn-block"
                        onClick={() => setOpen(false)}
                    >
                        Get a Quote
                    </Link>
                </div>
            </div>
        </>
    )
}
