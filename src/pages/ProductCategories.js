import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { productCategories } from '../data/products';
import './ProductCategories.css';

const ProductCategories = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [ref, isRevealed] = useScrollReveal();

    return (
        <div className="product-categories-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <h1>Product Categories</h1>
                    <p>Complete range of premium Astral pipe products for all applications</p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="section">
                <div className="container">
                    <div ref={ref} className={`intro-text text-center reveal ${isRevealed ? 'revealed' : ''}`}>
                        <p>Explore our comprehensive selection of Astral pipes, tanks, and fittings. Each product category is designed for specific applications with guaranteed quality and performance.</p>
                    </div>

                    <div className="categories-large-grid">
                        {productCategories.map((category, index) => (
                            <CategoryCard key={category.id} category={category} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const CategoryCard = ({ category, index }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`category-large-card reveal reveal-stagger ${isRevealed ? 'revealed' : ''}`}
        >
            <div className="category-large-image">
                <div className="category-large-image-bg"></div>
                <div className="category-image-large-placeholder">{category.name[0]}</div>
            </div>

            <div className="category-large-info">
                <div className="category-header">
                    <h3>{category.name}</h3>
                    {category.productCount && (
                        <span className="product-count-badge">{category.productCount} Products</span>
                    )}
                </div>

                {category.tagline && (
                    <p className="category-tagline">{category.tagline}</p>
                )}

                <p className="category-desc">{category.description}</p>

                <div className="category-features">
                    {category.features.map((feature, i) => (
                        <span key={i} className="feature-tag">
                            <CheckCircle size={14} />
                            {feature}
                        </span>
                    ))}
                </div>

                {/* Catalog Links if available */}
                {category.catalogLinks && category.catalogLinks.length > 0 ? (
                    <div className="catalog-links">
                        {category.catalogLinks.map((link, i) => (
                            <Link key={i} to={link.url} className="btn btn-secondary">
                                {link.name}
                                {link.count && <span className="link-count">({link.count})</span>}
                                <ArrowRight size={18} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Link to={`/products/${category.slug}`} className="btn btn-primary">
                        View Products
                        <ArrowRight size={18} />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProductCategories;
