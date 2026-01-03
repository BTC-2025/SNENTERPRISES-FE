import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { drainmasterCatalog, formatPrice, getAllDrainMasterProducts, getDrainMasterSizes, getDrainMasterTypes } from '../data/drainmasterCatalog';
import { companyInfo } from '../data/content';
import './DrainMasterCatalog.css';

const DrainMasterCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSize, setSelectedSize] = useState('all');
    const [selectedType, setSelectedType] = useState('all');

    const allItems = useMemo(() => getAllDrainMasterProducts(), []);
    const sizes = useMemo(() => getDrainMasterSizes(), []);
    const types = useMemo(() => getDrainMasterTypes(), []);

    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesSearch = searchTerm === '' ||
                item.size_mm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.length_socket.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product_code.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSize = selectedSize === 'all' || item.size_mm === selectedSize;
            const matchesType = selectedType === 'all' || item.type === selectedType;

            return matchesSearch && matchesSize && matchesType;
        });
    }, [allItems, searchTerm, selectedSize, selectedType]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedSize('all');
        setSelectedType('all');
    };

    return (
        <div className="drainmaster-catalog-page">
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to="/products/drainmaster">DrainMaster</Link> / Catalog
                    </div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{drainmasterCatalog.title}</h1>
                            <p className="hsn-code">HSN Code: {drainmasterCatalog.hsn_code}</p>
                            <p className="catalog-subtitle">{drainmasterCatalog.description}</p>
                            <p className="catalog-subtitle">Complete catalog with {allItems.length} Selfit and Ring Fit pipes</p>
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

            <section className="filters-section">
                <div className="container">
                    <div className="filters-bar">
                        <div className="search-box">
                            <Search size={20} />
                            <input type="text" placeholder="Search by size, socket, product code..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
                        </div>

                        <div className="filter-group">
                            <Filter size={18} />
                            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="filter-select">
                                <option value="all">All Sizes</option>
                                {sizes.map(size => (<option key={size} value={size}>{size}mm</option>))}
                            </select>

                            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="filter-select">
                                <option value="all">All Types</option>
                                {types.map(type => (<option key={type} value={type}>Type {type}</option>))}
                            </select>

                            {(searchTerm || selectedSize !== 'all' || selectedType !== 'all') && (
                                <button onClick={clearFilters} className="btn-clear">Clear Filters</button>
                            )}
                        </div>
                    </div>

                    <div className="results-info">Showing <strong>{filteredItems.length}</strong> of <strong>{allItems.length}</strong> products</div>
                </div>
            </section>

            <section className="section catalog-content">
                <div className="container">
                    {filteredItems.length === 0 ? (
                        <div className="no-results"><p>No products found matching your filters.</p></div>
                    ) : (
                        <DrainMasterTable items={filteredItems} />
                    )}
                </div>
            </section>

            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need DrainMaster SWR Pipes?</h2>
                    <p>Contact us for special rates on bulk orders</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">Request Quote</Link>
                        <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need pricing for DrainMaster SWR Pipes`} target="_blank" rel="noopener noreferrer" className="btn btn-lg whatsapp-btn">WhatsApp Inquiry</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

const DrainMasterTable = ({ items }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.05 });

    return (
        <div ref={ref} className={`catalog-table-container reveal ${isRevealed ? 'revealed' : ''}`}>
            <div className="table-scroll">
                <table className="price-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Size (mm)</th>
                            <th>Length & Socket</th>
                            <th>Product Code</th>
                            <th>Std. Pkg</th>
                            <th className="price-col">Price/Pc</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => {
                            const whatsappMessage = `Hi, I'm interested in Astral DrainMaster Pipe:\n- Type: ${item.type} (${item.fittingType})\n- Size: ${item.size_mm}mm\n- Length/Socket: ${item.length_socket}\n- Product Code: ${item.product_code}\n- Price: ${formatPrice(item.price_inr_per_pc)}/piece`;

                            return (
                                <tr key={`${item.product_code}-${index}`} className="price-row">
                                    <td data-label="Type"><span className="type-badge">Type {item.type}</span></td>
                                    <td data-label="Size"><span className="size-badge">{item.size_mm}mm</span></td>
                                    <td data-label="Length/Socket"><span className="socket-badge">{item.length_socket}</span></td>
                                    <td data-label="Code"><code className="product-code">{item.product_code}</code></td>
                                    <td data-label="Std. Pkg"><span className="pkg-qty">{item.std_pkg}</span></td>
                                    <td data-label="Price" className="price-col"><span className="price">{formatPrice(item.price_inr_per_pc)}</span></td>
                                    <td data-label="Action" className="action-col">
                                        <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary inquiry-btn">
                                            <ShoppingCart size={14} />Inquire
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DrainMasterCatalog;
