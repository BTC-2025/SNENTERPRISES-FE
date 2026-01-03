import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { drexCatalog, formatPrice, getAllDrexProducts, getDrexSizes, getDrexTypes } from '../data/drexCatalog';
import { companyInfo } from '../data/content';
import './DrexCatalog.css';

const DrexCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedGroups, setExpandedGroups] = useState({});

    const allItems = useMemo(() => getAllDrexProducts(), []);
    const types = useMemo(() => getDrexTypes(), []);

    // Group items by type
    const groupedItems = useMemo(() => {
        const groups = {};
        allItems.forEach(item => {
            if (!groups[item.type]) groups[item.type] = [];
            groups[item.type].push(item);
        });
        return groups;
    }, [allItems]);

    // Filter groups based on search
    const filteredGroups = useMemo(() => {
        if (!searchTerm) return groupedItems;
        const filtered = {};
        Object.keys(groupedItems).forEach(type => {
            const items = groupedItems[type].filter(item =>
                item.size?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                type.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (items.length > 0) filtered[type] = items;
        });
        return filtered;
    }, [groupedItems, searchTerm]);

    const toggleGroup = (type) => {
        setExpandedGroups(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const expandAll = () => {
        const all = {};
        types.forEach(t => all[t] = true);
        setExpandedGroups(all);
    };

    const collapseAll = () => setExpandedGroups({});

    return (
        <div className="drex-catalog-page">
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / D-Rex Catalog
                    </div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{drexCatalog.title}</h1>
                            <p className="hsn-code">HSN: {drexCatalog.hsn_pipes} • {drexCatalog.certification}</p>
                            <p className="catalog-subtitle">{allItems.length} products in {types.length} categories</p>
                        </div>
                        <div className="hero-stats">
                            <div className="stat"><span className="stat-number">{types.length}</span><span className="stat-label">Categories</span></div>
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
                            <input type="text" placeholder="Search by type, size, or code..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
                        </div>
                        <div className="expand-controls">
                            <button onClick={expandAll} className="btn-expand">Expand All</button>
                            <button onClick={collapseAll} className="btn-expand">Collapse All</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section catalog-content">
                <div className="container">
                    {Object.keys(filteredGroups).length === 0 ? (
                        <div className="no-results"><p>No products found.</p></div>
                    ) : (
                        <div className="product-groups">
                            {Object.keys(filteredGroups).map(type => (
                                <ProductGroup
                                    key={type}
                                    type={type}
                                    items={filteredGroups[type]}
                                    isExpanded={expandedGroups[type] !== false}
                                    onToggle={() => toggleGroup(type)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need D-Rex Corrugated Pipes?</h2>
                    <p>Contact us for special rates on bulk orders</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">Request Quote</Link>
                        <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need pricing for D-Rex Corrugated Pipes`} target="_blank" rel="noopener noreferrer" className="btn btn-lg whatsapp-btn">WhatsApp Inquiry</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProductGroup = ({ type, items, isExpanded, onToggle }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.1 });

    return (
        <div ref={ref} className={`product-group reveal ${isRevealed ? 'revealed' : ''}`}>
            <div className="group-header" onClick={onToggle}>
                <div className="group-title">
                    <h3>{type}</h3>
                    <span className="group-count">{items.length} products</span>
                </div>
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            {isExpanded && (
                <div className="group-items">
                    {items.map((item, i) => (
                        <ProductCard key={`${item.code}-${i}`} item={item} type={type} />
                    ))}
                </div>
            )}
        </div>
    );
};

const ProductCard = ({ item, type }) => {
    const msg = `Hi, I'm interested in D-Rex Pipe:\n- Type: ${type}\n- Size: ${item.size}\n- Code: ${item.code}\n- Price: ${formatPrice(item.price)}`;

    return (
        <div className="product-card">
            <div className="card-size">{item.size}</div>
            <div className="card-details">
                <code className="card-code">{item.code}</code>
                <span className="card-price">{formatPrice(item.price)}</span>
            </div>
            <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent(msg)}`}
                target="_blank" rel="noopener noreferrer" className="card-inquiry">
                <ShoppingCart size={14} />
            </a>
        </div>
    );
};

export default DrexCatalog;
