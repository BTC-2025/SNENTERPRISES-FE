import React from 'react';
import { Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { testimonials } from '../data/testimonials';
import './Testimonials.css';

const TestimonialsPage = () => {
    const parallaxRef = useParallax({ speed: 0.4 });

    return (
        <div className="testimonials-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <h1>Customer Testimonials</h1>
                    <p>See what our customers say about SN Enterprises</p>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="section">
                <div className="container">
                    <div className="testimonials-full-grid">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialFullCard key={testimonial.id} testimonial={testimonial} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const TestimonialFullCard = ({ testimonial, index }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`testimonial-full-card reveal reveal-stagger ${isRevealed ? 'revealed' : ''}`}
        >
            <div className="testimonial-header">
                <div className="author-avatar-large">{testimonial.avatar}</div>
                <div>
                    <h3 className="author-name">{testimonial.name}</h3>
                    <p className="author-role">{testimonial.role} • {testimonial.company}</p>
                </div>
            </div>

            <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                ))}
            </div>

            <p className="testimonial-text">"{testimonial.text}"</p>
        </div>
    );
};

export default TestimonialsPage;
