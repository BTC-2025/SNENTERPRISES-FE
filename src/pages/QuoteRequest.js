import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { productCategories } from '../data/products';
import { companyInfo } from '../data/content';
import './QuoteRequest.css';

const QuoteRequest = () => {
    const parallaxRef = useParallax({ speed: 0.3 });
    const [ref1, isRevealed1] = useScrollReveal();
    const [ref2, isRevealed2] = useScrollReveal();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        product: '',
        quantity: '',
        location: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Quote request:', formData);
        alert('Thank you! We will send you a quote shortly.');
        setFormData({
            name: '',
            phone: '',
            email: '',
            product: '',
            quantity: '',
            location: '',
            message: '',
        });
    };

    return (
        <div className="quote-page">
            {/* Background */}
            <div className="quote-bg" ref={parallaxRef}></div>

            <section className="section quote-section">
                <div className="container">
                    <div className="quote-grid">
                        {/* Quote Form */}
                        <div ref={ref1} className={`quote-form-wrapper reveal ${isRevealed1 ? 'revealed' : ''}`}>
                            <h1>Request a Quote</h1>
                            <p className="form-intro">Fill in your details and we'll get back to you with the best pricing</p>

                            <form onSubmit={handleSubmit} className="quote-form">
                                <div className="form-row">
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
                                            placeholder="Your full name"
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
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email (Optional)</label>
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

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="product" className="form-label">Product Category *</label>
                                        <select
                                            id="product"
                                            name="product"
                                            value={formData.product}
                                            onChange={handleChange}
                                            required
                                            className="form-select"
                                        >
                                            <option value="">Select a product</option>
                                            {productCategories.map((cat) => (
                                                <option key={cat.id} value={cat.slug}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="quantity" className="form-label">Quantity *</label>
                                        <input
                                            type="text"
                                            id="quantity"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                            placeholder="e.g., 100 pieces"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="location" className="form-label">Delivery Location *</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="City, State"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Additional Details</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="form-textarea"
                                        placeholder="Any specific requirements or questions..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg w-full">
                                    Submit Quote Request
                                </button>
                            </form>
                        </div>

                        {/* Trust Panel */}
                        <div ref={ref2} className={`trust-panel reveal ${isRevealed2 ? 'revealed' : ''}`}>
                            <h2>Why Request a Quote?</h2>
                            <p>Get the best prices for genuine Astral products tailored to your needs</p>

                            <div className="trust-list">
                                <div className="trust-point">
                                    <CheckCircle size={24} />
                                    <div>
                                        <h4>Authorized Dealer</h4>
                                        <p>100% genuine Astral products</p>
                                    </div>
                                </div>

                                <div className="trust-point">
                                    <CheckCircle size={24} />
                                    <div>
                                        <h4>Best Pricing</h4>
                                        <p>Competitive dealer rates for bulk & retail</p>
                                    </div>
                                </div>

                                <div className="trust-point">
                                    <CheckCircle size={24} />
                                    <div>
                                        <h4>Fast Delivery</h4>
                                        <p>Prompt dispatch and reliable delivery</p>
                                    </div>
                                </div>

                                <div className="trust-point">
                                    <CheckCircle size={24} />
                                    <div>
                                        <h4>Expert Guidance</h4>
                                        <p>Technical support for product selection</p>
                                    </div>
                                </div>
                            </div>

                            <div className="alt-contact">
                                <h4>Prefer to talk?</h4>
                                <a
                                    href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need a quote for Astral pipes`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-lg whatsapp-btn w-full pulse-btn"
                                >
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuoteRequest;
