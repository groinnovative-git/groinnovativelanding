/**
 * Centralized SEO Configuration — Single Source of Truth
 *
 * Change BASE_URL when switching from Vercel preview → production domain.
 * All per-page SEO data is defined here for easy maintenance.
 */

// ─── Domain ─────────────────────────────────────────────────────
export const BASE_URL = 'https://groinnovative.in'

// ─── Brand ──────────────────────────────────────────────────────
export const SITE_NAME = 'Gro Innovative'
export const BRAND_TAGLINE = 'Gro Innovative | Software & IT Solutions'
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.png`

// ─── Geo (Coimbatore HQ) ───────────────────────────────────────
export const GEO = {
    region: 'IN-TN',
    placename: 'Coimbatore',
    position: '11.0168;76.9558',
    icbm: '11.0168, 76.9558',
    lat: 11.0168,
    lng: 76.9558,
}

// ─── Contact / NAP ──────────────────────────────────────────────
export const NAP = {
    name: 'Gro Innovative',
    streetAddress: 'Coimbatore',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    postalCode: '641001',
    country: 'IN',
    phone1: '+919345306018',
    phone2: '+919003343806',
    email: 'groinnovative@gmail.com',
}

// ─── Social Profiles ────────────────────────────────────────────
export const SOCIAL_PROFILES = [
    'https://www.linkedin.com/company/groinnovative',
    'https://www.instagram.com/groinnovative',
    'https://github.com/groinnovative',
    'https://x.com/groinnovative',
]

// ─── Service Areas ──────────────────────────────────────────────
export const SERVICE_AREAS = [
    'Coimbatore', 'Rajapalayam', 'Karur', 'Virudhunagar',
    'Madurai', 'Theni', 'Tamil Nadu', 'South India', 'India',
]

// ─── Per-Page SEO Config ────────────────────────────────────────

export const PAGE_SEO = {
    home: {
        title: 'Best Software Development Company in Coimbatore | Gro Innovative',
        description:
            'Gro Innovative is a top-rated software development & IT solutions company in Coimbatore, Tamil Nadu. We deliver web development, mobile apps, SEO, digital marketing, and cloud solutions for startups & businesses across Rajapalayam, Karur, Madurai & South India.',
        keywords:
            'software company Coimbatore, best IT company Coimbatore, web development company Coimbatore, app development Coimbatore, Gro Innovative, software company Tamil Nadu, IT solutions Rajapalayam, affordable software company Coimbatore, startup software development Coimbatore, MVP development company India',
        path: '/',
    },

    about: {
        title: "About Gro Innovative — Coimbatore's Trusted Software & IT Partner",
        description:
            'Learn about Gro Innovative — a software development company headquartered in Coimbatore, Tamil Nadu, serving businesses across Rajapalayam, Karur, Madurai & South India with world-class web, mobile, and AI-powered solutions.',
        keywords:
            'about Gro Innovative, software company Tamil Nadu, IT company Coimbatore, Gro Innovative team, software company Rajapalayam, IT solutions Karur, Coimbatore tech company',
        path: '/about',
    },

    services: {
        title: 'Software Development & IT Services in Coimbatore, Tamil Nadu | Gro Innovative',
        description:
            'Explore our services: website creation, custom software development, mobile app development, SEO optimization, digital marketing, site maintenance, and branding — delivered from Coimbatore to clients across Tamil Nadu & India.',
        keywords:
            'web development Coimbatore, app development Coimbatore, SEO services Tamil Nadu, software development services Coimbatore, React development company India, custom software Tamil Nadu, e-commerce development Coimbatore, mobile app development Coimbatore',
        path: '/services',
    },

    contact: {
        title: 'Contact Gro Innovative — Software Company in Coimbatore, Tamil Nadu',
        description:
            'Get in touch with Gro Innovative for a free consultation. Located in Coimbatore, Tamil Nadu — we serve startups and businesses across Rajapalayam, Karur, Madurai & all of India. Call +91 9345306018.',
        keywords:
            'contact Gro Innovative, software company Coimbatore contact, IT company near me Tamil Nadu, Gro Innovative phone number, Gro Innovative email, software quotation Coimbatore',
        path: '/contact',
    },

    notFound: {
        title: 'Page Not Found | Gro Innovative',
        description: 'The page you are looking for does not exist or has been moved.',
        keywords: '',
        path: '/404',
        noindex: true,
    },

    // Uncomment when the page is added to the router:
    // getAQuote: {
    //   title: 'Get a Quote — Affordable Software Development | Gro Innovative Coimbatore',
    //   description:
    //     'Request a free quote for website development, mobile apps, SEO, or custom software from Gro Innovative — affordable IT solutions in Coimbatore, Tamil Nadu.',
    //   keywords:
    //     'get a quote software development, affordable IT solutions Coimbatore, software quotation Tamil Nadu, website cost Coimbatore',
    //   path: '/get-a-quote',
    // },
}
