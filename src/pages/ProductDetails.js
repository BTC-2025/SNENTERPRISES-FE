import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getProductById, products } from '../data/products';
import { companyInfo } from '../data/content';
import './ProductDetails.css';

const ProductDetails = () => {
    const { productId } = useParams();
    const product = getProductById(productId);
    const [ref1, isRevealed1] = useScrollReveal();
    const [ref2, isRevealed2] = useScrollReveal();

    if (!product) {
        return (
            <div className="product-details-page">
                <div className="container section">
                    <h1>Product Not Found</h1>
                    <Link to="/products" className="btn btn-primary">Back to Products</Link>
                </div>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="product-details-page">
            {/* Product Detail */}
            <section className="section product-detail">
                <div className="container">
                    <Link to={`/products/${product.category}`} className="back-link">
                        <ArrowLeft size={18} />
                        Back to {product.categoryName}
                    </Link>

                    <div className="product-detail-grid">
                        {/* Product Image */}
                        <div ref={ref1} className={`product-detail-image reveal ${isRevealed1 ? 'revealed' : ''}`}>
                            <div className="product-image-large">
                                <div className="product-image-large-placeholder">{product.name[0]}</div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div ref={ref1} className={`product-detail-info reveal ${isRevealed1 ? 'revealed' : ''}`}>
                            <span className="product-category-label">{product.categoryName}</span>
                            <h1>{product.name}</h1>
                            <p className="product-description">{product.description}</p>

                            {/* Features */}
                            <div className="product-features">
                                <h3>Key Features</h3>
                                <ul>
                                    {product.features.map((feature, index) => (
                                        <li key={index}>
                                            <CheckCircle size={18} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Buttons */}
                            <div className="product-cta">
                                <Link to="/quote" className="btn btn-primary btn-lg">
                                    Request a Quote
                                </Link>
                                <a
                                    href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I'm interested in ${product.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-lg whatsapp-btn"
                                >
                                    WhatsApp Us
                                </a>
                            </div>

                            {/* Trust Badges */}
                            <div className="product-trust">
                                <div className="trust-item">
                                    <CheckCircle size={20} />
                                    <span>100% Genuine Astral Product</span>
                                </div>
                                <div className="trust-item">
                                    <CheckCircle size={20} />
                                    <span>ISI Certified</span>
                                </div>
                                <div className="trust-item">
                                    <CheckCircle size={20} />
                                    <span>Best Dealer Pricing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specifications */}
            <section className="section specs-section">
                <div className="container">
                    <div ref={ref2} className={`reveal ${isRevealed2 ? 'revealed' : ''}`}>
                        <h2 className="text-center">Technical Specifications</h2>
                        <div className="specs-table">
                            {product.specifications.map((spec, index) => (
                                <div key={index} className="spec-row">
                                    <div className="spec-label">{spec.label}</div>
                                    <div className="spec-value">{spec.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="section related-section">
                    <div className="container">
                        <h2 className="text-center">Related Products</h2>
                        <div className="related-grid">
                            {relatedProducts.map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    to={`/product/${relatedProduct.id}`}
                                    className="related-card"
                                >
                                    <div className="related-image">
                                        <div className="related-image-placeholder">{relatedProduct.name[0]}</div>
                                    </div>
                                    <h4>{relatedProduct.name}</h4>
                                    <p>{relatedProduct.categoryName}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetails;
