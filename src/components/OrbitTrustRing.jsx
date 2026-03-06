import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { useAnimationFrame } from 'framer-motion'
import './OrbitTrustRing.css'

/* ── Reduced motion hook ── */
function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(
        typeof window !== 'undefined'
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : false
    )
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        const handler = (e) => setReduced(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])
    return reduced
}

/* ── Trust items ── */
const ITEMS = [
    {
        label: 'Fast Delivery',
        icon: (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
    },
    {
        label: 'NDA Protected',
        icon: (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
    {
        label: 'SEO-Ready Build',
        icon: (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
    },
    {
        label: 'Post-Launch Support',
        icon: (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
]

/*
 * Base angles — placed at cardinal positions so reduced-motion view looks balanced:
 *   0 → top    (Fast Delivery)
 *   1 → right  (NDA Protected)
 *   2 → bottom (SEO-Ready Build)
 *   3 → left   (Post-Launch Support)
 */
const BASE = [
    -Math.PI / 2,  // top
    0,             // right
    Math.PI / 2,  // bottom
    Math.PI,      // left
]

/* Full clockwise rotation every 28 seconds */
const SPEED = (2 * Math.PI) / 28000   // radians per ms

function getRadius() {
    if (typeof window === 'undefined') return 160
    return window.innerWidth < 900 ? 105 : 160
}

/* ── Component ── */
export default function OrbitTrustRing() {
    const reduced = usePrefersReducedMotion()
    const rotRef = useRef(0)
    const posRefs = useRef([null, null, null, null])
    const radiusRef = useRef(getRadius())
    const [hoveredIdx, setHoveredIdx] = useState(-1)

    /* Keep radius ref in sync with viewport */
    useEffect(() => {
        const onResize = () => { radiusRef.current = getRadius() }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    /*
     * Set initial positions before first paint (no flash).
     * Opacity starts 0 in CSS; we set it to 1 here after positioning.
     */
    useLayoutEffect(() => {
        const r = radiusRef.current
        posRefs.current.forEach((el, i) => {
            if (!el) return
            const x = Math.cos(BASE[i]) * r
            const y = Math.sin(BASE[i]) * r
            el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
            el.style.opacity = '1'
        })
    }, [])

    /* Continuous orbit rotation — direct DOM mutation (no React re-renders) */
    /* On mobile, skip entirely — badges stay in static cardinal positions */
    const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches);
    useAnimationFrame((_, delta) => {
        if (reduced || isMobile) return;
        rotRef.current += delta * SPEED;

        const rot = rotRef.current
        const r = radiusRef.current
        const counterDeg = -(rot * 180) / Math.PI   // keep badge text upright

        posRefs.current.forEach((el, i) => {
            if (!el) return
            const angle = BASE[i] + rot
            const x = Math.cos(angle) * r
            const y = Math.sin(angle) * r
            el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%)) rotate(${counterDeg}deg)`
        })
    })

    return (
        <div className="otr-root" aria-hidden="true">

            {/* Dashed orbit track ring */}
            <div className="otr-ring-track" />

            {/* Orbit badges */}
            {ITEMS.map((item, i) => (
                <div
                    key={item.label}
                    ref={el => posRefs.current[i] = el}
                    className="otr-badge-pos"
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(-1)}
                >
                    <div className={`otr-badge${hoveredIdx === i ? ' otr-badge--hov' : ''}`}>
                        <span className="otr-icon">{item.icon}</span>
                        <span className="otr-label">{item.label}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
