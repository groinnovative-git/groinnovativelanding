import { Link } from 'react-router-dom'
import './Footer.css'
import logoImg from '../assets/logo.png'

const services = ['Web Development', 'Mobile Apps', 'Cloud Solutions', 'Digital Marketing', 'Logo Design', 'IT Consulting']
const company = [
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' },
]
const social = [
    { icon: '𝕏', label: 'Twitter', href: '#' },
    { icon: 'in', label: 'LinkedIn', href: '#' },
    { icon: 'f', label: 'Facebook', href: '#' },
]

export default function Footer() {
    return (
        <footer className="gi-footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="gi-logo" onClick={() => window.scrollTo(0, 0)} style={{ marginBottom: 16, display: 'inline-block' }}>
                            <img src={logoImg} alt="GroInnovative" className="gi-logo-img" width="274" height="64" loading="lazy" style={{ height: '64px', width: 'auto', display: 'block' }} />
                        </Link>
                        <p className="footer-tagline">
                            We build software that scales.<br />
                            Trusted by 50+ clients.
                        </p>
                        <div className="footer-socials">
                            {social.map(s => (
                                <a key={s.label} href={s.href} className="social-icon" aria-label={s.label}>{s.icon}</a>
                            ))}
                        </div>
                    </div>
                    {/* Services */}
                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul>
                            {services.map(s => <li key={s}><Link to="/services">{s}</Link></li>)}
                        </ul>
                    </div>
                    {/* Company */}
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            {company.map(c => (
                                <li key={c.label}><Link to={c.to}>{c.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    {/* Contact */}
                    <div className="footer-col">
                        <h4>Get in Touch</h4>
                        <ul className="footer-contact-list">
                            <li>groinnovative@gmail.com</li>
                            <li> +91 9345306018 , +91 9003343806</li>
                            <li> Coimbatore, Tamil Nadu, India</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} GroInnovative Pvt. Ltd. All rights reserved.</p>
                    <p>Made with ❤️ by GroInnovative</p>
                </div>
            </div>
        </footer>
    )
}
