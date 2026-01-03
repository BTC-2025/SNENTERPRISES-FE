import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { companyInfo } from '../data/content';
import './Contact.css';

const Contact = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [ref1, isRevealed1] = useScrollReveal();
    const [ref2, isRevealed2] = useScrollReveal();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="contact-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>Get in touch with SN Enterprises for all your Astral pipe needs</p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div ref={ref1} className={`contact-info reveal ${isRevealed1 ? 'revealed' : ''}`}>
                            <h2>Get in Touch</h2>
                            <p className="contact-intro">
                                Have questions or need assistance? Our team is here to help. Reach out to us through any of the channels below.
                            </p>

                            <div className="contact-details">
                                <div className="contact-item">
                                    <MapPin size={24} />
                                    <div>
                                        <h4>Address</h4>
                                        <p>{companyInfo.contact.address}</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <Phone size={24} />
                                    <div>
                                        <h4>Phone</h4>
                                        <p><a href={`tel:${companyInfo.contact.phone}`}>{companyInfo.contact.phone}</a></p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <Mail size={24} />
                                    <div>
                                        <h4>Email</h4>
                                        <p><a href={`mailto:${companyInfo.contact.email}`}>{companyInfo.contact.email}</a></p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <Clock size={24} />
                                    <div>
                                        <h4>Business Hours</h4>
                                        <p>{companyInfo.hours.weekdays}</p>
                                        <p>{companyInfo.hours.weekend}</p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={`https://wa.me/${companyInfo.contact.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-lg whatsapp-btn"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>

                        {/* Contact Form */}
                        <div ref={ref2} className={`contact-form-wrapper reveal ${isRevealed2 ? 'revealed' : ''}`}>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <h3>Send us a Message</h3>

                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone" className="form-label">Phone *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="form-textarea"
                                        placeholder="Tell us about your requirements..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg w-full">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
