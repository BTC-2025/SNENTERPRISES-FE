import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import snLogo from '../assets/SN-logo.png';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/products', label: 'Products' },
        { path: '/services', label: 'Services' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/contact', label: 'Contact' },
    ];

    const whatsappNumber = '919844552994';
    const phoneNumber = '+919844552994';

    return (
        <>
            <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
                <div className="container">
                    <div className="header-content">
                        {/* Logo */}
                        <Link to="/" className="header-logo">
                            <img src={snLogo} alt="S.N Enterprises" className="logo-image" />
                            <span className="logo-text-below">Enterprises</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="header-nav">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Buttons */}
                        <div className="header-cta">
                            <a href={`tel:${phoneNumber}`} className="btn btn-secondary btn-sm">
                                <Phone size={16} />
                                Call Now
                            </a>
                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-sm whatsapp-btn"
                            >
                                WhatsApp
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                <nav className="mobile-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="mobile-nav-cta">
                        <a href={`tel:${phoneNumber}`} className="btn btn-secondary w-full">
                            <Phone size={16} />
                            Call Now
                        </a>
                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary w-full whatsapp-btn"
                        >
                            WhatsApp
                        </a>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
