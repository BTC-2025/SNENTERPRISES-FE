import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { aquasafeCatalog, formatPrice, getAllAquasafeProducts, getAquasafeSizes, getAquasafePressureClasses } from '../data/aquasafeCatalog';
import { companyInfo } from '../data/content';
import './AquasafeCatalog.css';

const AquasafeCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSize, setSelectedSize] = useState('all');
    const [selectedPressure, setSelectedPressure] = useState('all');

    const allItems = useMemo(() => getAllAquasafeProducts(), []);
    const sizes = useMemo(() => getAquasafeSizes(), []);
    const pressureClasses = useMemo(() => getAquasafePressureClasses(), []);

    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesSearch = searchTerm === '' ||
                (item.size && item.size.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesSize = selectedSize === 'all' || item.size === selectedSize;
            const matchesPressure = selectedPressure === 'all' || item.pc === selectedPressure;

            return matchesSearch && matchesSize && matchesPressure;
        });
    }, [allItems, searchTerm, selectedSize, selectedPressure]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedSize('all');
        setSelectedPressure('all');
    };

    return (
        <div className="aquasafe-catalog-page">
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to="/products/aquasafe">Aquasafe</Link> / Catalog
                    </div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{aquasafeCatalog.title}</h1>
                            <p className="hsn-code">HSN Code: {aquasafeCatalog.hsn_code}</p>
                            <p className="catalog-subtitle">uPVC pressure pipes for agriculture & water transport</p>
                            <p className="catalog-subtitle">Complete catalog with {allItems.length} products</p>
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
                            <input type="text" placeholder="Search by size, product code..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
                        </div>

                        <div className="filter-group">
                            <Filter size={18} />
                            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="filter-select">
                                <option value="all">All Sizes</option>
                                {sizes.map(size => (<option key={size} value={size}>{size}</option>))}
                            </select>

                            <select value={selectedPressure} onChange={(e) => setSelectedPressure(e.target.value)} className="filter-select">
                                <option value="all">All Pressure Classes</option>
                                {pressureClasses.map(pc => (<option key={pc} value={pc}>{pc} kg/cm²</option>))}
                            </select>

                            {(searchTerm || selectedSize !== 'all' || selectedPressure !== 'all') && (
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
                        <AquasafeTable items={filteredItems} />
                    )}
                </div>
            </section>

            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need Aquasafe Pipes?</h2>
                    <p>Contact us for special rates on bulk orders</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">Request Quote</Link>
                        <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need pricing for Aquasafe uPVC Pipes`} target="_blank" rel="noopener noreferrer" className="btn btn-lg whatsapp-btn">WhatsApp Inquiry</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

const AquasafeTable = ({ items }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.05 });

    return (
        <div ref={ref} className={`catalog-table-container reveal ${isRevealed ? 'revealed' : ''}`}>
            <div className="table-scroll">
                <table className="price-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Pressure Class</th>
                            <th>Product Code</th>
                            <th className="price-col">Price/Pc</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => {
                            const whatsappMessage = `Hi, I'm interested in Astral Aquasafe Pipe:\n- Size: ${item.size}\n- Pressure: ${item.pc} kg/cm²\n- Product Code: ${item.code}\n- Price: ${formatPrice(item.price)}/piece`;

                            return (
                                <tr key={`${item.code}-${index}`} className="price-row">
                                    <td data-label="Type"><span className="type-badge">{item.type}</span></td>
                                    <td data-label="Size"><span className="size-badge">{item.size}</span></td>
                                    <td data-label="Pressure"><span className="stiffness-badge">{item.pc} kg/cm²</span></td>
                                    <td data-label="Code"><code className="product-code">{item.code}</code></td>
                                    <td data-label="Price" className="price-col"><span className="price">{formatPrice(item.price)}</span></td>
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

export default AquasafeCatalog;
