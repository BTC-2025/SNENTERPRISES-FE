import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { fittingsCatalog, formatPrice, getAllFittings, getFittingTypes } from '../data/fittingsCatalog';
import { companyInfo } from '../data/content';
import './FittingsCatalog.css';

const FittingsCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');

    const allItems = useMemo(() => getAllFittings(), []);
    const types = useMemo(() => getFittingTypes(), []);

    // Filter items based on search and filters
    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesSearch = searchTerm === '' ||
                item.size_inch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.size_cm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.sectionName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = selectedType === 'all' || item.sectionName === selectedType;

            return matchesSearch && matchesType;
        });
    }, [allItems, searchTerm, selectedType]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedType('all');
    };

    return (
        <div className="fittings-catalog-page">
            {/* Header */}
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to="/products/fittings">Fittings</Link> / Catalog
                    </div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{fittingsCatalog.title}</h1>
                            <p className="hsn-code">HSN Code: {fittingsCatalog.hsn_code}</p>
                            <p className="catalog-subtitle">Complete fittings catalog with {allItems.length} products</p>
                        </div>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">{fittingsCatalog.sections.length}</span>
                                <span className="stat-label">Categories</span>
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
                                placeholder="Search by size, product code, fitting type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="filter-group">
                            <Filter size={18} />
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Types</option>
                                {types.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>

                            {(searchTerm || selectedType !== 'all') && (
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
                    <FittingsTable items={filteredItems} />
                </div>
            </section>

            {/* CTA */}
            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need Bulk Fittings or Custom Orders?</h2>
                    <p>Contact us for special rates on bulk orders and assorted fitting packs</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">
                            Request Bulk Quote
                        </Link>
                        <a
                            href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need pricing for CPVC Fittings`}
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

const FittingsTable = ({ items }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.05 });

    if (items.length === 0) {
        return (
            <div className="no-results">
                <p>No fittings found matching your filters.</p>
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
                            <th>Type</th>
                            <th>Size</th>
                            <th>Product Code</th>
                            <th>Pkg Std</th>
                            <th>Pkg Mast</th>
                            <th className="price-col">Price/Pc</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <FittingRow key={`${item.product_code}-${index}`} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const FittingRow = ({ item }) => {
    const whatsappMessage = `Hi, I'm interested in CPVC Fitting:\n- Type: ${item.sectionName}\n- Size: ${item.size_inch}" (${item.size_cm}cm)\n- Product Code: ${item.product_code}\n- Price: ${formatPrice(item.price_inr_per_pc)}/piece\n\nPlease provide more details.`;

    return (
        <tr className="price-row">
            <td data-label="Type">
                <span className="type-badge">{item.sectionName}</span>
            </td>
            <td data-label="Size">
                <strong>{item.size_inch}"</strong>
                <span className="size-cm">({item.size_cm}cm)</span>
            </td>
            <td data-label="Code">
                <code className="product-code">{item.product_code}</code>
            </td>
            <td data-label="Pkg Std">
                <span className="pkg-qty">{item.pkg_std}</span>
            </td>
            <td data-label="Pkg Mast">
                <span className="pkg-qty">{item.pkg_mast}</span>
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

export default FittingsCatalog;
