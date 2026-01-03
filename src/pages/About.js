import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { aboutContent } from '../data/content';
import './About.css';

const About = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [ref1, isRevealed1] = useScrollReveal();
    const [ref2, isRevealed2] = useScrollReveal();
    const [ref3, isRevealed3] = useScrollReveal();

    return (
        <div className="about-page">
            {/* Hero Banner */}
            <section className="about-hero">
                <div className="about-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <h1>About SN Enterprises</h1>
                    <p>Your Trusted Partner for Premium Astral Pipe Products Since 2010</p>
                </div>
            </section>

            {/* Story Section */}
            <section className="section">
                <div className="container">
                    <div className="about-content" ref={ref1}>
                        <div className={`about-text reveal ${isRevealed1 ? 'revealed' : ''}`}>
                            <h2>Our Story</h2>
                            <div className="story-content">
                                {aboutContent.story.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="authorized-badge">
                                <CheckCircle size={32} />
                                <div>
                                    <h3>Authorized Astral Pipes Dealer</h3>
                                    <p>Certified and trusted since 2010 • 14+ years of excellence</p>
                                </div>
                            </div>
                        </div>

                        <div className={`about-image reveal ${isRevealed1 ? 'revealed' : ''}`}>
                            <div className="about-image-placeholder">
                                <span>SN</span>
                                <p>Enterprises Warehouse</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="section mission-section">
                <div className="container">
                    <div ref={ref2} className={`mission-box reveal ${isRevealed2 ? 'revealed' : ''}`}>
                        <h3>Our Mission</h3>
                        <p>{aboutContent.mission}</p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section values-section">
                <div className="container">
                    <div ref={ref3} className={`section-header text-center reveal ${isRevealed3 ? 'revealed' : ''}`}>
                        <h2>Our Core Values</h2>
                        <p>The principles that drive us every day</p>
                    </div>

                    <div className="values-grid">
                        {aboutContent.values.map((value, index) => (
                            <ValueCard key={index} value={value} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section about-cta">
                <div className="container">
                    <div className="cta-box">
                        <h2>Ready to Work With Us?</h2>
                        <p>Explore our products or get in touch for personalized assistance</p>
                        <div className="cta-buttons">
                            <Link to="/products" className="btn btn-primary btn-lg">
                                View Products
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary btn-lg">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ValueCard = ({ value, index }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`value-card reveal reveal-stagger ${isRevealed ? 'revealed' : ''}`}
        >
            <h4>{value.title}</h4>
            <p>{value.description}</p>
        </div>
    );
};

export default About;
