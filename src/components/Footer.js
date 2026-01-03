import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const whatsappNumber = '+919876543210'; // Replace with actual number

    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Company Info */}
                        <div className="footer-col">
                            <div className="footer-logo">
                                <div className="logo-text">
                                    <span className="logo-primary">SN</span>
                                    <span className="logo-secondary">Enterprises</span>
                                </div>
                                <div className="logo-tagline">Authorized Astral Pipes Dealer</div>
                            </div>
                            <p className="footer-desc">
                                Your trusted partner for premium Astral pipe products. Genuine supply, competitive
                                pricing, and reliable delivery for contractors and retailers.
                            </p>
                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary whatsapp-btn"
                            >
                                Contact on WhatsApp
                            </a>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-col">
                            <h4 className="footer-heading">Quick Links</h4>
                            <ul className="footer-links">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/products">Product Categories</Link></li>
                                <li><Link to="/services">Services</Link></li>
                                <li><Link to="/gallery">Gallery</Link></li>
                                <li><Link to="/testimonials">Testimonials</Link></li>
                                <li><Link to="/blog">Guides & Tips</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Products */}
                        <div className="footer-col">
                            <h4 className="footer-heading">Our Products</h4>
                            <ul className="footer-links">
                                <li><Link to="/products/cpvc">CPVC Pipes</Link></li>
                                <li><Link to="/products/upvc">UPVC Pipes</Link></li>
                                <li><Link to="/products/swr">SWR Pipes</Link></li>
                                <li><Link to="/products/industrial">Industrial Pipes</Link></li>
                                <li><Link to="/products/tanks">Water Tanks</Link></li>
                                <li><Link to="/products/fittings">Fittings & Accessories</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-col">
                            <h4 className="footer-heading">Contact Us</h4>
                            <ul className="footer-contact">
                                <li>
                                    <MapPin size={18} />
                                    <span>123 Industrial Area, Sector 45, City Name - 110001</span>
                                </li>
                                <li>
                                    <Phone size={18} />
                                    <a href="tel:+919876543210">+91 98765 43210</a>
                                </li>
                                <li>
                                    <Mail size={18} />
                                    <a href="mailto:info@snenterprises.com">info@snenterprises.com</a>
                                </li>
                                <li>
                                    <Clock size={18} />
                                    <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {currentYear} SN Enterprises. All rights reserved. Authorized Astral Pipes Dealer.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
