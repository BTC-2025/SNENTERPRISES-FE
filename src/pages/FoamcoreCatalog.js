import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { foamcoreCatalog, formatPrice, getAllFoamcoreProducts, getFoamcoreSizes, getFoamcoreFittingTypes, getFoamcoreStiffnessClasses } from '../data/foamcoreCatalog';
import { companyInfo } from '../data/content';
import './FoamcoreCatalog.css';

const FoamcoreCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSize, setSelectedSize] = useState('all');
    const [selectedFitting, setSelectedFitting] = useState('all');
    const [selectedStiffness, setSelectedStiffness] = useState('all');

    const allItems = useMemo(() => getAllFoamcoreProducts(), []);
    const sizes = useMemo(() => getFoamcoreSizes(), []);
    const fittingTypes = useMemo(() => getFoamcoreFittingTypes(), []);
    const stiffnessClasses = useMemo(() => getFoamcoreStiffnessClasses(), []);

    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesSearch = searchTerm === '' ||
                item.size_mm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.length_socket.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product_code.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSize = selectedSize === 'all' || item.size_mm === selectedSize;
            const matchesFitting = selectedFitting === 'all' || item.fittingType === selectedFitting;
            const matchesStiffness = selectedStiffness === 'all' || item.stiffnessClass === selectedStiffness;

            return matchesSearch && matchesSize && matchesFitting && matchesStiffness;
        });
    }, [allItems, searchTerm, selectedSize, selectedFitting, selectedStiffness]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedSize('all');
        setSelectedFitting('all');
        setSelectedStiffness('all');
    };

    return (
        <div className="foamcore-catalog-page">
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to="/products/foamcore">Foamcore</Link> / Catalog
                    </div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{foamcoreCatalog.title}</h1>
                            <p className="hsn-code">HSN Code: {foamcoreCatalog.hsn_code} • {foamcoreCatalog.certification}</p>
                            <p className="catalog-subtitle">{foamcoreCatalog.description}</p>
                            <p className="catalog-subtitle">Complete catalog with {allItems.length} foamcore drainage pipes</p>
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

                            <select value={selectedFitting} onChange={(e) => setSelectedFitting(e.target.value)} className="filter-select">
                                <option value="all">All Fitting Types</option>
                                {fittingTypes.map(type => (<option key={type} value={type}>{type}</option>))}
                            </select>

                            <select value={selectedStiffness} onChange={(e) => setSelectedStiffness(e.target.value)} className="filter-select">
                                <option value="all">All Stiffness Classes</option>
                                {stiffnessClasses.map(sn => (<option key={sn} value={sn}>{sn}</option>))}
                            </select>

                            {(searchTerm || selectedSize !== 'all' || selectedFitting !== 'all' || selectedStiffness !== 'all') && (
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
                        <FoamcoreTable items={filteredItems} />
                    )}
                </div>
            </section>

            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need Foamcore Drainage Pipes?</h2>
                    <p>Contact us for special rates on bulk orders</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">Request Quote</Link>
                        <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need pricing for Foamcore Drainage Pipes`} target="_blank" rel="noopener noreferrer" className="btn btn-lg whatsapp-btn">WhatsApp Inquiry</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FoamcoreTable = ({ items }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.05 });

    return (
        <div ref={ref} className={`catalog-table-container reveal ${isRevealed ? 'revealed' : ''}`}>
            <div className="table-scroll">
                <table className="price-table">
                    <thead>
                        <tr>
                            <th>Fitting Type</th>
                            <th>Stiffness</th>
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
                            const whatsappMessage = `Hi, I'm interested in Astral Foamcore Pipe:\n- Type: ${item.fittingType} (${item.stiffnessClass})\n- Size: ${item.size_mm}mm\n- Length/Socket: ${item.length_socket}\n- Product Code: ${item.product_code}\n- Price: ${formatPrice(item.price_inr_per_pc)}/piece`;

                            return (
                                <tr key={`${item.product_code}-${index}`} className="price-row">
                                    <td data-label="Type"><span className="type-badge">{item.fittingType}</span></td>
                                    <td data-label="Stiffness"><span className="stiffness-badge">{item.stiffnessClass}</span></td>
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

export default FoamcoreCatalog;
