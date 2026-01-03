import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { telerexCatalog, formatPrice, getAllTelerexProducts, getTelerexSizes, getTelerexTypes } from '../data/telerexCatalog';
import { companyInfo } from '../data/content';
import './TelerexCatalog.css';

const TelerexCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSize, setSelectedSize] = useState('all');
    const [selectedType, setSelectedType] = useState('all');

    const allItems = useMemo(() => getAllTelerexProducts(), []);
    const sizes = useMemo(() => getTelerexSizes(), []);
    const types = useMemo(() => getTelerexTypes(), []);

    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesSearch = searchTerm === '' ||
                (item.size && item.size.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesSize = selectedSize === 'all' || item.size === selectedSize;
            const matchesType = selectedType === 'all' || item.type === selectedType;
            return matchesSearch && matchesSize && matchesType;
        });
    }, [allItems, searchTerm, selectedSize, selectedType]);

    const clearFilters = () => { setSearchTerm(''); setSelectedSize('all'); setSelectedType('all'); };

    return (
        <div className="telerex-catalog-page">
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to="/products/telerex">TeleRex</Link> / Catalog
                    </div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{telerexCatalog.title}</h1>
                            <p className="hsn-code">HSN: {telerexCatalog.hsn_code} • {telerexCatalog.certification}</p>
                            <p className="catalog-subtitle">Double walled corrugated PE pipes for cable protection</p>
                            <p className="catalog-subtitle">Complete catalog with {allItems.length} products</p>
                        </div>
                        <div className="hero-stats">
                            <div className="stat"><span className="stat-number">{sizes.length}</span><span className="stat-label">Sizes</span></div>
                            <div className="stat"><span className="stat-number">{allItems.length}</span><span className="stat-label">Products</span></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="filters-section">
                <div className="container">
                    <div className="filters-bar">
                        <div className="search-box">
                            <Search size={20} />
                            <input type="text" placeholder="Search by size, product code..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
                        </div>
                        <div className="filter-group">
                            <Filter size={18} />
                            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="filter-select">
                                <option value="all">All Sizes</option>
                                {sizes.map(s => (<option key={s} value={s}>{s}</option>))}
                            </select>
                            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="filter-select">
                                <option value="all">All Types</option>
                                {types.map(t => (<option key={t} value={t}>{t}</option>))}
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
                        <div className="no-results"><p>No products found.</p></div>
                    ) : (
                        <TelerexTable items={filteredItems} />
                    )}
                </div>
            </section>

            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need TeleRex Cable Protection Pipes?</h2>
                    <p>Contact us for special rates on bulk orders</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">Request Quote</Link>
                        <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need pricing for TeleRex Cable Protection Pipes`} target="_blank" rel="noopener noreferrer" className="btn btn-lg whatsapp-btn">WhatsApp Inquiry</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

const TelerexTable = ({ items }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.05 });
    return (
        <div ref={ref} className={`catalog-table-container reveal ${isRevealed ? 'revealed' : ''}`}>
            <div className="table-scroll">
                <table className="price-table">
                    <thead>
                        <tr><th>Type</th><th>Size</th><th>Product Code</th><th className="price-col">Price/m</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {items.map((item, i) => {
                            const msg = `Hi, I'm interested in TeleRex Pipe:\n- Type: ${item.type}\n- Size: ${item.size}\n- Code: ${item.code}\n- Price: ${formatPrice(item.price)}`;
                            return (
                                <tr key={`${item.code}-${i}`} className="price-row">
                                    <td data-label="Type"><span className="type-badge">{item.type}</span></td>
                                    <td data-label="Size"><span className="size-badge">{item.size}</span></td>
                                    <td data-label="Code"><code className="product-code">{item.code}</code></td>
                                    <td data-label="Price" className="price-col"><span className="price">{formatPrice(item.price)}</span></td>
                                    <td data-label="Action" className="action-col">
                                        <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary inquiry-btn">
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

export default TelerexCatalog;
