import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
        // { path: '/gallery', label: 'Gallery' },
        { path: '/contact', label: 'Contact' },
    ];

    const whatsappNumber = '919844552994';

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

                        {/* Desktop Navigation - Right aligned */}
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
                <div className="mobile-menu-header">
                    <span className="mobile-menu-title">Menu</span>
                    <button
                        className="mobile-close-btn"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>
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
                </nav>
            </div>

            {/* Floating WhatsApp Button */}
            <a
                href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in your Astral pipe products`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-float"
                aria-label="Chat on WhatsApp"
            >
                <svg viewBox="0 0 32 32" fill="currentColor" width="32" height="32">
                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.906 15.906 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.32 22.594c-.39 1.1-1.932 2.014-3.15 2.282-.834.178-1.924.32-5.594-1.202-4.698-1.948-7.718-6.714-7.95-7.024-.224-.31-1.834-2.442-1.834-4.66 0-2.216 1.16-3.306 1.572-3.756.39-.426.912-.534 1.216-.534.304 0 .608.004.874.016.28.012.656-.106.926.708.278.832.948 2.87 1.03 3.078.084.208.14.45.028.724-.112.278-.168.45-.336.694-.168.244-.354.544-.506.73-.168.208-.344.434-.148.852.196.416.872 1.492 1.87 2.416 1.288 1.19 2.372 1.56 2.708 1.732.336.172.532.144.728-.086.196-.23.84-.978 1.064-1.316.224-.336.448-.28.756-.168.308.112 1.952.92 2.288 1.088.336.168.56.252.644.39.084.14.084.808-.306 1.908z" />
                </svg>
                <span className="whatsapp-tooltip">Chat with us!</span>
            </a>
        </>
    );
};

export default Header;
