import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { getProductsByCategory, getCategoryBySlug } from '../data/products';
import './ProductListing.css';

const ProductListing = () => {
    const { categorySlug } = useParams();
    const category = getCategoryBySlug(categorySlug);
    const products = getProductsByCategory(categorySlug);
    const parallaxRef = useParallax({ speed: 0.4 });

    if (!category) {
        return (
            <div className="product-listing-page">
                <div className="container section">
                    <h1>Category Not Found</h1>
                    <Link to="/products" className="btn btn-primary">Back to Categories</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="product-listing-page">
            {/* Category Header */}
            <section className="category-header">
                <div className="category-header-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / {category.name}
                    </div>
                    <h1>{category.name}</h1>
                    <p>{category.description}</p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="section">
                <div className="container">
                    {/* Catalog Link for CPVC */}
                    {categorySlug === 'cpvc' && (
                        <div className="catalog-link-banner">
                            <div className="catalog-link-content">
                                <h3>📋 View Complete CPVC Catalog</h3>
                                <p>Browse detailed specifications, pricing, and product codes for all CPVC Pro Pipes</p>
                                <Link to="/cpvc-catalog" className="btn btn-primary btn-lg">
                                    Open Full CPVC Catalog
                                </Link>
                            </div>
                        </div>
                    )}

                    {products.length > 0 ? (
                        <div className="products-grid">
                            {products.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-products">
                            <p>No products available in this category yet.</p>
                            <Link to="/products" className="btn btn-primary">Browse Other Categories</Link>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="section-sm listing-cta">
                <div className="container text-center">
                    <h2>Need Assistance?</h2>
                    <p>Our team can help you choose the right product for your needs</p>
                    <Link to="/quote" className="btn btn-primary btn-lg">
                        Request a Quote
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

const ProductCard = ({ product, index }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.15 });

    return (
        <div
            ref={ref}
            className={`product-card reveal reveal-stagger ${isRevealed ? 'revealed' : ''}`}
        >
            <div className="product-image">
                <div className="product-image-placeholder">{product.name[0]}</div>
            </div>
            <div className="product-info">
                <span className="product-category">{product.categoryName}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <Link to={`/product/${product.id}`} className="btn btn-secondary w-full">
                    View Details
                    <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
};

export default ProductListing;
