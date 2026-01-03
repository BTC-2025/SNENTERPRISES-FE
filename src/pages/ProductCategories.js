import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { productCategories } from '../data/products';
import './ProductCategories.css';

const ProductCategories = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const totalProducts = productCategories.reduce((sum, cat) => sum + (cat.productCount || 0), 0);

    return (
        <div className="product-categories-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="hero-badge"><Package size={16} /> Astral Authorized Dealer</div>
                    <h1>Our Products</h1>
                    <p>{productCategories.length} Categories • {totalProducts}+ Products</p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="products-section">
                <div className="container">
                    <div className="products-tiles">
                        {productCategories.map((category, index) => (
                            <CategoryTile key={category.id} category={category} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="products-cta">
                <div className="container text-center">
                    <Link to="/quote" className="btn btn-primary">Request Quote</Link>
                    <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
                </div>
            </section>
        </div>
    );
};

const CategoryTile = ({ category, index }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.1 });
    const catalogLink = category.catalogLinks?.[0]?.url;

    return (
        <Link
            to={catalogLink || `/products/${category.slug}`}
            ref={ref}
            className={`cat-tile reveal ${isRevealed ? 'revealed' : ''}`}
            style={{ '--delay': `${index * 40}ms` }}
        >
            <div className="cat-tile-bg">
                {category.image && <img src={category.image} alt={category.name} />}
            </div>
            <div className="cat-tile-overlay"></div>
            <div className="cat-tile-content">
                <h3>{category.name}</h3>
                <span className="cat-tile-count">{category.productCount} Products</span>
            </div>
        </Link>
    );
};

export default ProductCategories;
