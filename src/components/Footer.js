import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import snLogo from '../assets/SN-logo.png';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const whatsappNumber = '919844552994';

    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Company Info */}
                        <div className="footer-col">
                            <div className="footer-logo">
                                <img src={snLogo} alt="S.N Enterprises" className="footer-logo-img" />
                            </div>
                            <p className="footer-desc">
                                Your trusted partner for premium Astral pipe products. Genuine supply, competitive
                                pricing, and reliable delivery for contractors and retailers.
                            </p>
                            <p className="footer-gstin">GSTIN: 29ADNPU0612J1Z7</p>
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
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Products */}
                        <div className="footer-col">
                            <h4 className="footer-heading">Our Products</h4>
                            <ul className="footer-links">
                                <li><Link to="/cpvc-catalog">CPVC Pro Pipes</Link></li>
                                <li><Link to="/aquarius-catalog">Aquarius Pipes</Link></li>
                                <li><Link to="/silencio-catalog">Silencio Pipes</Link></li>
                                <li><Link to="/drainmaster-catalog">DrainMaster Pipes</Link></li>
                                <li><Link to="/drainpro-catalog">DrainPro Pipes</Link></li>
                                <li><Link to="/drex-catalog">D-Rex Pipes</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-col">
                            <h4 className="footer-heading">Contact Us</h4>
                            <ul className="footer-contact">
                                <li>
                                    <MapPin size={18} />
                                    <span>GROUND FLOOR, SHOP SITE NO 118, KUDUKU VILLAGE, SARJAPURA HOBLI, Kammasandra, Anekal, Bangalore - 560100</span>
                                </li>
                                <li>
                                    <Phone size={18} />
                                    <a href="tel:+919844552994">+91 9844552994</a>
                                </li>
                                <li>
                                    <Mail size={18} />
                                    <a href="mailto:snpipes2020@gmail.com">snpipes2020@gmail.com</a>
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
                    <p>&copy; {currentYear} S.N Enterprises. All rights reserved. Authorized Astral Pipes Dealer.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
