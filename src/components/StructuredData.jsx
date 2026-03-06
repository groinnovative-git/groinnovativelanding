import { Helmet } from 'react-helmet-async'

/**
 * Injects JSON-LD structured data into <head> via Helmet.
 *
 * Usage:
 *   <StructuredData data={organizationSchema} />
 *   <StructuredData data={[schema1, schema2]} />
 */
export default function StructuredData({ data }) {
    if (!data) return null

    const schemas = Array.isArray(data) ? data : [data]

    return (
        <Helmet>
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </Helmet>
    )
}
