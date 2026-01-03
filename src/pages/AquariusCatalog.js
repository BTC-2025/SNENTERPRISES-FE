import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { aquariusCatalog, formatPrice, getAllAquariusProducts, getAquariusSchedules, getAquariusLengths } from '../data/aquariusCatalog';
import { companyInfo } from '../data/content';
import './AquariusCatalog.css';

const AquariusCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState('all');
    const [selectedLength, setSelectedLength] = useState('all');

    const allItems = useMemo(() => getAllAquariusProducts(), []);
    const schedules = useMemo(() => getAquariusSchedules(), []);
    const lengths = useMemo(() => getAquariusLengths(), []);

    // Filter items based on search and filters
    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesSearch = searchTerm === '' ||
                item.size_inch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.size_cm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product_code.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSchedule = selectedSchedule === 'all' || item.schedule === selectedSchedule;
            const matchesLength = selectedLength === 'all' || item.length === selectedLength;

            return matchesSearch && matchesSchedule && matchesLength;
        });
    }, [allItems, searchTerm, selectedSchedule, selectedLength]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedSchedule('all');
        setSelectedLength('all');
    };

    return (
        <div className="aquarius-catalog-page">
            {/* Header */}
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to="/products/aquarius">Aquarius</Link> / Catalog
                    </div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{aquariusCatalog.title}</h1>
                            <p className="hsn-code">HSN Code: {aquariusCatalog.hsn_code}</p>
                            <p className="catalog-subtitle">{aquariusCatalog.description}</p>
                            <p className="catalog-subtitle">Complete catalog with {allItems.length} products</p>
                        </div>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">{aquariusCatalog.sections.length}</span>
                                <span className="stat-label">Variants</span>
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
                                placeholder="Search by size, product code..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="filter-group">
                            <Filter size={18} />
                            <select
                                value={selectedSchedule}
                                onChange={(e) => setSelectedSchedule(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Schedules</option>
                                {schedules.map(schedule => (
                                    <option key={schedule} value={schedule}>Schedule {schedule}</option>
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

                            {(searchTerm || selectedSchedule !== 'all' || selectedLength !== 'all') && (
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
                    <AquariusTable items={filteredItems} />
                </div>
            </section>

            {/* CTA */}
            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need Bulk Aquarius Pipes?</h2>
                    <p>Contact us for special rates on bulk orders and project supplies</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">
                            Request Bulk Quote
                        </Link>
                        <a
                            href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need pricing for Aquarius Pipes`}
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

const AquariusTable = ({ items }) => {
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
                            <th>Schedule</th>
                            <th>Length</th>
                            <th>Size</th>
                            <th>Product Code</th>
                            <th>Std. Pkg</th>
                            <th className="price-col">Price/Pc</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <AquariusRow key={`${item.product_code}-${index}`} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AquariusRow = ({ item }) => {
    const whatsappMessage = `Hi, I'm interested in Astral Aquarius Pipe:\n- Schedule: ${item.schedule}\n- Length: ${item.length}\n- Size: ${item.size_inch}" (${item.size_cm}cm)\n- Product Code: ${item.product_code}\n- Price: ${formatPrice(item.price_inr_per_pc)}/piece\n\nPlease provide more details.`;

    return (
        <tr className="price-row">
            <td data-label="Schedule">
                <span className="schedule-badge">Sch {item.schedule}</span>
            </td>
            <td data-label="Length">
                <span className="length-badge">{item.length}</span>
            </td>
            <td data-label="Size">
                <strong>{item.size_inch}"</strong>
                <span className="size-cm">({item.size_cm}cm)</span>
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

export default AquariusCatalog;
