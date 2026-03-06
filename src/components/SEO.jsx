import { Helmet } from 'react-helmet-async'
import { BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE, GEO } from '../seo/seoConfig'

/**
 * Enhanced SEO component — manages all <head> tags per page.
 *
 * Props:
 *   title       – Page <title>
 *   description – <meta name="description">
 *   keywords    – <meta name="keywords"> (comma-separated)
 *   path        – URL path (e.g. "/about") — canonical + og:url
 *   ogImage     – (optional) absolute URL to OG image
 *   noindex     – (optional) if true, tells crawlers not to index this page
 *   geo         – (optional) override default geo object
 */
export default function SEO({
    title,
    description,
    keywords = '',
    path = '/',
    ogImage,
    noindex = false,
    geo = GEO,
}) {
    const url = `${BASE_URL}${path}`
    const image = ogImage || DEFAULT_OG_IMAGE

    return (
        <Helmet>
            {/* Core */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={url} />

            {/* Robots */}
            {noindex
                ? <meta name="robots" content="noindex, nofollow" />
                : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            }

            {/* Language */}
            <link rel="alternate" hrefLang="en-IN" href={url} />
            <link rel="alternate" hrefLang="en" href={url} />
            <meta httpEquiv="content-language" content="en-IN" />

            {/* Geo (Local SEO) */}
            {geo && (
                <>
                    <meta name="geo.region" content={geo.region} />
                    <meta name="geo.placename" content={geo.placename} />
                    <meta name="geo.position" content={geo.position} />
                    <meta name="ICBM" content={geo.icbm} />
                </>
            )}

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    )
}
