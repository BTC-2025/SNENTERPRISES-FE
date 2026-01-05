import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { productCategories } from '../data/products';
import { testimonials } from '../data/testimonials';
import { whyChooseUs } from '../data/content';
import pipe1 from '../assets/pipe-1.jpg';
import pipe2 from '../assets/pipe-2.jpg';
import pipe3 from '../assets/pipe-3.jpg';
import pipe4 from '../assets/pipe-4.jpg'
import './Home.css';

const Home = () => {
    const parallaxRef = useParallax({ speed: 0.3 });

    return (
        <div className="home">
            {/* Hero Section - Full Width Carousel */}
            <section className="hero-carousel-section">
                <HeroCarousel images={[pipe1, pipe2]} />
            </section>

            {/* Trust Badges */}
            <section className="trust-badges section-sm">
                <div className="container">
                    <div className="trust-grid">
                        <TrustBadge icon={<CheckCircle />} text="100% Genuine Astral Products" delay={0} />
                        <TrustBadge icon={<CheckCircle />} text="Bulk Supply Available" delay={100} />
                        <TrustBadge icon={<CheckCircle />} text="Fast & Reliable Delivery" delay={200} />
                        <TrustBadge icon={<CheckCircle />} text="Best Dealer Pricing" delay={300} />
                    </div>
                </div>
            </section>

            {/* Product Categories - Compact Grid */}
            <section className="section product-categories">
                <div className="container">
                    <RevealSection>
                        <div className="section-header text-center">
                            <h2>Our Product Categories</h2>
                            <p>Complete range of premium Astral pipe products available at our dealership</p>
                        </div>
                    </RevealSection>

                    <div className="products-showcase">
                        {productCategories
                            .filter(cat => ['cpvc', 'aquarius', 'silencio', 'drainmaster', 'drex'].includes(cat.slug))
                            .map((category, index) => (
                                <ProductTile key={category.id} category={category} index={index} />
                            ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/products" className="btn btn-primary">
                            View All Products
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section why-choose-us">
                <div className="container">
                    <RevealSection>
                        <div className="section-header text-center">
                            <h2>Why Choose SN Enterprises?</h2>
                            <p>Your trusted partner for genuine Astral pipe products</p>
                        </div>
                    </RevealSection>

                    <div className="why-grid">
                        {whyChooseUs.map((item, index) => (
                            <WhyCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section testimonials-section">
                <div className="container">
                    <RevealSection>
                        <div className="section-header text-center">
                            <h2>What Our Customers Say</h2>
                            <p>Trusted by contractors, builders, and retailers across the region</p>
                        </div>
                    </RevealSection>

                    <div className="testimonials-grid">
                        {testimonials.slice(0, 3).map((testimonial, index) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/testimonials" className="btn btn-secondary">
                            View All Testimonials
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <RevealSection>
                        <div className="cta-content">
                            <h2>Ready to Order?</h2>
                            <p>Get genuine Astral pipes delivered to your doorstep. Request a quote today!</p>
                            <div className="cta-buttons">
                                <Link to="/quote" className="btn btn-primary btn-lg">
                                    Request a Quote
                                    <ArrowRight size={20} />
                                </Link>
                                <Link to="/contact" className="btn btn-secondary btn-lg">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </RevealSection>
                </div>
            </section>
        </div>
    );
};

// Reusable reveal section wrapper
const RevealSection = ({ children }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.1 });
    return (
        <div ref={ref} className={`reveal ${isRevealed ? 'revealed' : ''}`}>
            {children}
        </div>
    );
};

// Trust Badge Component
const TrustBadge = ({ icon, text, delay }) => {
    const [ref, isRevealed] = useScrollReveal();
    return (
        <div
            ref={ref}
            className={`trust-badge reveal ${isRevealed ? 'revealed' : ''}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="trust-icon">{icon}</div>
            <span>{text}</span>
        </div>
    );
};

// Product Tile Component - Compact Design with Images
const ProductTile = ({ category, index }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.2 });
    const catalogLink = category.catalogLinks?.[0]?.url;

    return (
        <Link
            to={catalogLink || `/products/${category.slug}`}
            ref={ref}
            className={`product-tile reveal reveal-stagger ${isRevealed ? 'revealed' : ''}`}
            style={{ '--delay': `${index * 50}ms` }}
        >
            <div className="tile-image">
                {category.image ? (
                    <img src={category.image} alt={category.name} />
                ) : (
                    <span className="tile-letter">{category.name[0]}</span>
                )}
            </div>
            <div className="tile-content">
                <h4>{category.name}</h4>
                <p className="tile-tagline">{category.tagline}</p>
                {category.productCount && (
                    <span className="tile-count">{category.productCount} Products</span>
                )}
            </div>
            <ChevronRight className="tile-arrow" size={20} />
        </Link>
    );
};

// Why Choose Us Card
const WhyCard = ({ item, index }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.2 });
    const Icon = require('lucide-react')[item.icon];

    return (
        <div
            ref={ref}
            className={`why-card reveal reveal-stagger ${isRevealed ? 'revealed' : ''}`}
        >
            <div className="why-icon">
                <Icon size={32} />
            </div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
        </div>
    );
};

// Testimonial Card
const TestimonialCard = ({ testimonial, index }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`testimonial-card reveal reveal-stagger ${isRevealed ? 'revealed' : ''}`}
        >
            <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                ))}
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div>
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">
                        {testimonial.role} • {testimonial.company}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Hero Carousel Component
const HeroCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="hero-carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((img, i) => (
                    <div key={i} className="carousel-slide">
                        <img src={img} alt={`Astral Pipes ${i + 1}`} />
                    </div>
                ))}
            </div>
            <div className="carousel-dots">
                {images.map((_, i) => (
                    <button
                        key={i}
                        className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;

