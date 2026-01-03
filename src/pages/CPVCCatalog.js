import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { cpvcProPipesCatalog, formatPrice } from '../data/cpvcCatalog';
import { companyInfo } from '../data/content';
import './CPVCCatalog.css';

const CPVCCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedLength, setSelectedLength] = useState('all');

    // Get all items from all blocks
    const allItems = useMemo(() => {
        const items = [];
        cpvcProPipesCatalog.blocks.forEach(block => {
            block.items.forEach(item => {
                items.push({
                    ...item,
                    blockName: block.name,
                    type: block.name.split('(')[0].trim(), // Extract type like "PIPE SDR-11"
                    length: block.name.includes('3 METRE') ? '3m' : block.name.includes('5 METRE') ? '5m' : 'N/A'
                });
            });
        });
        return items;
    }, []);

    // Get unique types and lengths for filters
    const types = useMemo(() => {
        const uniqueTypes = [...new Set(allItems.map(item => item.type))];
        return uniqueTypes;
    }, [allItems]);

    const lengths = ['3m', '5m'];

    // Filter items based on search and filters
    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesSearch = searchTerm === '' ||
                item.size_inch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.size_cm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.blockName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = selectedType === 'all' || item.type === selectedType;
            const matchesLength = selectedLength === 'all' || item.length === selectedLength;

            return matchesSearch && matchesType && matchesLength;
        });
    }, [allItems, searchTerm, selectedType, selectedLength]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedType('all');
        setSelectedLength('all');
    };

    return (
        <div className="cpvc-catalog-page">
            {/* Header */}
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to="/products/cpvc">CPVC Pipes</Link> / Catalog
                    </div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{cpvcProPipesCatalog.title}</h1>
                            <p className="hsn-code">HSN Code: {cpvcProPipesCatalog.hsn_code}</p>
                            <p className="catalog-subtitle">Complete price list with {allItems.length} product variants</p>
                        </div>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">{cpvcProPipesCatalog.blocks.length}</span>
                                <span className="stat-label">Product Types</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">{allItems.length}</span>
                                <span className="stat-label">Variants</span>
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
                                placeholder="Search by size, product code..."
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

                            {(searchTerm || selectedType !== 'all' || selectedLength !== 'all') && (
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
                    <CatalogTable items={filteredItems} />
                </div>
            </section>

            {/* CTA */}
            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need Bulk Pricing or Custom Orders?</h2>
                    <p>Contact us for special rates on bulk orders and custom requirements</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">
                            Request Bulk Quote
                        </Link>
                        <a
                            href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need pricing for CPVC Pro Pipes`}
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

const CatalogTable = ({ items }) => {
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
                            <th>Type</th>
                            <th>Size</th>
                            <th>Product Code</th>
                            <th>Pkg</th>
                            <th className="price-col">Price/Pc</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <CatalogRow key={`${item.product_code}-${index}`} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CatalogRow = ({ item }) => {
    const whatsappMessage = `Hi, I'm interested in CPVC Pro Pipe:\n- Type: ${item.blockName}\n- Size: ${item.size_inch}" (${item.size_cm}cm)\n- Product Code: ${item.product_code}\n- Price: ${formatPrice(item.price_inr_per_pc)}/piece\n\nPlease provide more details.`;

    return (
        <tr className="price-row">
            <td data-label="Type">
                <span className="type-badge">{item.type}</span>
                <span className="length-badge">{item.length}</span>
            </td>
            <td data-label="Size">
                <strong>{item.size_inch}"</strong>
                <span className="size-cm">({item.size_cm}cm)</span>
            </td>
            <td data-label="Code">
                <code className="product-code">{item.product_code}</code>
            </td>
            <td data-label="Pkg">
                <span className="pkg-qty">{item.std_pkg_nos}</span> pcs
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

export default CPVCCatalog;
