import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { silencioCatalog, formatPrice, getAllSilencioProducts, getSilencioSizes, getSilencioLengths } from '../data/silencioCatalog';
import { companyInfo } from '../data/content';
import './SilencioCatalog.css';

const SilencioCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSize, setSelectedSize] = useState('all');
    const [selectedLength, setSelectedLength] = useState('all');

    const allItems = useMemo(() => getAllSilencioProducts(), []);
    const sizes = useMemo(() => getSilencioSizes(), []);
    const lengths = useMemo(() => getSilencioLengths(), []);

    // Filter items based on search and filters
    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesSearch = searchTerm === '' ||
                item.size_mm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.length.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product_code.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSize = selectedSize === 'all' || item.size_mm === selectedSize;
            const matchesLength = selectedLength === 'all' || item.length === selectedLength;

            return matchesSearch && matchesSize && matchesLength;
        });
    }, [allItems, searchTerm, selectedSize, selectedLength]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedSize('all');
        setSelectedLength('all');
    };

    return (
        <div className="silencio-catalog-page">
            {/* Header */}
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to="/products/silencio">Silencio</Link> / Catalog
                    </div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{silencioCatalog.title}</h1>
                            <p className="hsn-code">HSN Code: {silencioCatalog.hsn_code}</p>
                            <p className="catalog-subtitle">{silencioCatalog.description}</p>
                            <p className="catalog-subtitle">Complete catalog with {allItems.length} low noise drainage pipes</p>
                        </div>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">{sizes.length}</span>
                                <span className="stat-label">Sizes</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">{allItems.length}</span>
                                <span className="stat-label">Products</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="filters-section">
                <div className="container">
                    <div className="filters-bar">
                        <div className="search-box">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search by size, length, product code..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="filter-group">
                            <Filter size={18} />
                            <select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Sizes</option>
                                {sizes.map(size => (
                                    <option key={size} value={size}>{size}mm</option>
                                ))}
                            </select>

                            <select
                                value={selectedLength}
                                onChange={(e) => setSelectedLength(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Lengths</option>
                                {lengths.map(length => (
                                    <option key={length} value={length}>{length}</option>
                                ))}
                            </select>

                            {(searchTerm || selectedSize !== 'all' || selectedLength !== 'all') && (
                                <button onClick={clearFilters} className="btn-clear">
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="results-info">
                        Showing <strong>{filteredItems.length}</strong> of <strong>{allItems.length}</strong> products
                    </div>
                </div>
            </section>

            {/* Catalog Table */}
            <section className="section catalog-content">
                <div className="container">
                    <SilencioTable items={filteredItems} />
                </div>
            </section>

            {/* CTA */}
            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need Silencio Drainage Pipes?</h2>
                    <p>Contact us for special rates on bulk orders and project supplies</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">
                            Request Bulk Quote
                        </Link>
                        <a
                            href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need pricing for Silencio Drainage Pipes`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-lg whatsapp-btn"
                        >
                            WhatsApp Inquiry
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

const SilencioTable = ({ items }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.05 });

    if (items.length === 0) {
        return (
            <div className="no-results">
                <p>No products found matching your filters.</p>
                <p>Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div ref={ref} className={`catalog-table-container reveal ${isRevealed ? 'revealed' : ''}`}>
            <div className="table-scroll">
                <table className="price-table">
                    <thead>
                        <tr>
                            <th>Size (mm)</th>
                            <th>Length</th>
                            <th>Product Code</th>
                            <th>Std. Pkg</th>
                            <th className="price-col">Price/Pc</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <SilencioRow key={`${item.product_code}-${index}`} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const SilencioRow = ({ item }) => {
    const whatsappMessage = `Hi, I'm interested in Astral Silencio Drainage Pipe:\n- Size: ${item.size_mm}mm\n- Length: ${item.length}\n- Product Code: ${item.product_code}\n- Price: ${formatPrice(item.price_inr_per_pc)}/piece\n\nPlease provide more details.`;

    return (
        <tr className="price-row">
            <td data-label="Size">
                <span className="size-badge">{item.size_mm}mm</span>
            </td>
            <td data-label="Length">
                <span className="length-badge">{item.length}</span>
            </td>
            <td data-label="Code">
                <code className="product-code">{item.product_code}</code>
            </td>
            <td data-label="Std. Pkg">
                <span className="pkg-qty">{item.std_pkg}</span>
            </td>
            <td data-label="Price" className="price-col">
                <span className="price">{formatPrice(item.price_inr_per_pc)}</span>
            </td>
            <td data-label="Action" className="action-col">
                <a
                    href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary inquiry-btn"
                >
                    <ShoppingCart size={14} />
                    Inquire
                </a>
            </td>
        </tr>
    );
};

export default SilencioCatalog;
