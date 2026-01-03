import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { services } from '../data/content';
import * as Icons from 'lucide-react';
import './Services.css';

const Services = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [ref, isRevealed] = useScrollReveal();

    return (
        <div className="services-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <h1>Our Services</h1>
                    <p>Comprehensive pipe supply solutions for contractors, retailers, and industries</p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section">
                <div className="container">
                    <div ref={ref} className={`intro-text text-center reveal ${isRevealed ? 'revealed' : ''}`}>
                        <p>SN Enterprises provides end-to-end solutions for all your Astral pipe product needs. From bulk contractor supply to retail sales and technical guidance, we're here to serve you.</p>
                    </div>

                    <div className="services-grid">
                        {services.map((service, index) => (
                            <ServiceCard key={service.id} service={service} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const ServiceCard = ({ service, index }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.2 });
    const Icon = Icons[service.icon];

    return (
        <div
            ref={ref}
            className={`service-card reveal reveal-stagger ${isRevealed ? 'revealed' : ''}`}
        >
            <div className="service-icon">
                <Icon size={40} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
        </div>
    );
};

export default Services;
