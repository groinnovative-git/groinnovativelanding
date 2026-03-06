/**
 * JSON-LD Schema Definitions for Gro Innovative
 *
 * All structured data schemas used across the site.
 * Schemas reference seoConfig for consistency.
 */

import {
    BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE,
    GEO, NAP, SOCIAL_PROFILES, SERVICE_AREAS,
} from './seoConfig'

// ─── Organization ───────────────────────────────────────────────
export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'GroInnovative',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.png`,
    image: DEFAULT_OG_IMAGE,
    description:
        'Gro Innovative is a software development & IT solutions company based in Coimbatore, Tamil Nadu, India. We deliver web development, mobile apps, SEO, digital marketing, and cloud solutions.',
    foundingDate: '2024',
    founder: {
        '@type': 'Person',
        name: 'Gro Innovative Team',
    },
    address: {
        '@type': 'PostalAddress',
        streetAddress: NAP.streetAddress,
        addressLocality: NAP.city,
        addressRegion: NAP.state,
        postalCode: NAP.postalCode,
        addressCountry: NAP.country,
    },
    contactPoint: [
        {
            '@type': 'ContactPoint',
            telephone: NAP.phone1,
            contactType: 'customer service',
            email: NAP.email,
            areaServed: SERVICE_AREAS.map(city => ({
                '@type': 'City',
                name: city,
            })),
            availableLanguage: ['English', 'Tamil'],
        },
    ],
    sameAs: SOCIAL_PROFILES,
}

// ─── LocalBusiness (SoftwareCompany) ────────────────────────────
export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareCompany',
    name: SITE_NAME,
    alternateName: 'GroInnovative',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.png`,
    image: DEFAULT_OG_IMAGE,
    description:
        'Best software development company in Coimbatore offering web development, mobile app development, SEO optimization, digital marketing, and IT consulting for startups and businesses.',
    telephone: NAP.phone1,
    email: NAP.email,
    priceRange: '₹₹',
    address: {
        '@type': 'PostalAddress',
        streetAddress: NAP.streetAddress,
        addressLocality: NAP.city,
        addressRegion: NAP.state,
        postalCode: NAP.postalCode,
        addressCountry: NAP.country,
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: GEO.lat,
        longitude: GEO.lng,
    },
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
    },
    areaServed: SERVICE_AREAS.map(city => ({
        '@type': 'City',
        name: city,
    })),
    sameAs: SOCIAL_PROFILES,
}

// ─── WebSite + SearchAction ─────────────────────────────────────
export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description:
        'Gro Innovative — Best software development company in Coimbatore, Tamil Nadu. Web development, mobile apps, SEO, and IT solutions.',
    publisher: { '@id': BASE_URL },
    potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
    },
}

// ─── BreadcrumbList (per-page) ──────────────────────────────────
export function breadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: `${BASE_URL}${item.path}`,
        })),
    }
}

// ─── Service Schema ─────────────────────────────────────────────
export const serviceSchemas = [
    {
        name: 'Website Creation',
        description: 'High-converting websites and landing pages with modern UI, SEO-ready structure, and fast performance — built in Coimbatore for clients across Tamil Nadu and India.',
    },
    {
        name: 'Software Development',
        description: 'Custom web and mobile application development with scalable architecture, clean code, and production-ready delivery from Coimbatore.',
    },
    {
        name: 'SEO Optimization',
        description: 'Technical SEO, on-page optimization, and keyword strategy to improve Google rankings for businesses in Coimbatore, Tamil Nadu, and India.',
    },
    {
        name: 'Digital Marketing',
        description: 'Growth campaigns, Google Ads, social media marketing, and lead generation funnels for businesses in Coimbatore and South India.',
    },
    {
        name: 'Mobile App Development',
        description: 'Cross-platform mobile app development using React Native and Flutter for startups and enterprises in Coimbatore and beyond.',
    },
    {
        name: 'Site Maintenance',
        description: 'Ongoing website maintenance, security updates, performance optimization, and monthly support plans from Coimbatore.',
    },
    {
        name: 'Logo & Poster Creation',
        description: 'Professional logo design, brand identity, and marketing creatives for businesses in Coimbatore, Tamil Nadu.',
    },
].map(svc => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: svc.name,
    name: `${svc.name} — ${SITE_NAME}`,
    description: svc.description,
    provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
    },
    areaServed: {
        '@type': 'State',
        name: 'Tamil Nadu',
    },
}))

// ─── FAQ Schema ─────────────────────────────────────────────────
export const faqData = [
    {
        q: 'What is the best software company in Coimbatore?',
        a: 'Gro Innovative is a top-rated software development company in Coimbatore, Tamil Nadu, delivering web development, mobile apps, SEO, and IT solutions for startups and businesses with fast delivery and affordable pricing.',
    },
    {
        q: 'How much does it cost to build a website in Coimbatore?',
        a: 'Website development costs in Coimbatore start from ₹15,000 for a landing page and go up to ₹2,00,000+ for complex web applications. At Gro Innovative, we offer transparent pricing with no hidden charges. Contact us for a free quote.',
    },
    {
        q: 'Which company provides IT solutions in Rajapalayam?',
        a: 'Gro Innovative, headquartered in Coimbatore, actively serves businesses in Rajapalayam, Karur, Virudhunagar, Madurai, and across Tamil Nadu with software development, website creation, and digital marketing services.',
    },
    {
        q: 'How long does it take to develop a mobile app?',
        a: 'A typical mobile app takes 4 to 12 weeks depending on complexity. At Gro Innovative, we follow agile development with weekly demos so you always know where your project stands.',
    },
    {
        q: 'Does Gro Innovative offer ongoing website maintenance?',
        a: 'Yes. We offer monthly website maintenance plans that include security updates, performance optimization, content updates, bug fixes, backups, and uptime monitoring — keeping your site fast and secure.',
    },
    {
        q: 'Can I hire developers from Gro Innovative for my startup?',
        a: 'Absolutely. We provide dedicated development teams for startups and growing businesses. Whether you need frontend, backend, mobile, or full-stack developers — we scale with your needs from Coimbatore.',
    },
]

export const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
        },
    })),
}
