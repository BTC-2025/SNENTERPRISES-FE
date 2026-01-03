import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { aquasafeCatalog, formatPrice, getAllAquasafeProducts, getAquasafePressureClasses } from '../data/aquasafeCatalog';
import { companyInfo } from '../data/content';
import './AquasafeCatalog.css';

const AquasafeCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedGroups, setExpandedGroups] = useState({});

    const allItems = useMemo(() => getAllAquasafeProducts(), []);

    // Group by type (pipes_3m, pipes_5m, pipes_6m, strainer, etc.)
    const groupedItems = useMemo(() => {
        const groups = {};
        const typeLabels = {
            'pipes_3m': '3 Meter Pipes',
            'pipes_5m': '5 Meter Pipes',
            'pipes_6m': '6 Meter Pipes',
            'strainer_6m_6kg': 'Strainer 6M (6 kg/cm²)',
            'strainer_6m_8kg': 'Strainer 6M (8 kg/cm²)',
            'strainer_6m_10kg': 'Strainer 6M (10 kg/cm²)',
            'half_strainer_6m_6kg': 'Half Strainer 6M (6 kg/cm²)',
            'half_strainer_6m_10kg': 'Half Strainer 6M (10 kg/cm²)'
        };
        allItems.forEach(item => {
            const label = typeLabels[item.type] || item.type;
            if (!groups[label]) groups[label] = [];
            groups[label].push(item);
        });
        return groups;
    }, [allItems]);

    const types = Object.keys(groupedItems);

    const filteredGroups = useMemo(() => {
        if (!searchTerm) return groupedItems;
        const filtered = {};
        Object.keys(groupedItems).forEach(type => {
            const items = groupedItems[type].filter(item =>
                item.size?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.pc?.toString().includes(searchTerm)
            );
            if (items.length > 0) filtered[type] = items;
        });
        return filtered;
    }, [groupedItems, searchTerm]);

    const toggleGroup = (type) => setExpandedGroups(prev => ({ ...prev, [type]: !prev[type] }));
    const expandAll = () => { const all = {}; types.forEach(t => all[t] = true); setExpandedGroups(all); };
    const collapseAll = () => setExpandedGroups({});

    return (
        <div className="aquasafe-catalog-page">
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/products">Products</Link> / Aquasafe Catalog</div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{aquasafeCatalog.title}</h1>
                            <p className="hsn-code">HSN: {aquasafeCatalog.hsn_code}</p>
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
                            <input type="text" placeholder="Search by size, code, pressure class..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
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
                                <ProductGroup key={type} type={type} items={filteredGroups[type]} isExpanded={expandedGroups[type] !== false} onToggle={() => toggleGroup(type)} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need Aquasafe uPVC Pipes?</h2>
                    <p>Contact us for special rates on bulk orders</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">Request Quote</Link>
                        <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need Aquasafe Pipes`} target="_blank" rel="noopener noreferrer" className="btn btn-lg whatsapp-btn">WhatsApp Inquiry</a>
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
                <div className="group-title"><h3>{type}</h3><span className="group-count">{items.length} products</span></div>
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            {isExpanded && (
                <div className="group-items">
                    {items.map((item, i) => <ProductCard key={`${item.code}-${i}`} item={item} type={type} />)}
                </div>
            )}
        </div>
    );
};

const ProductCard = ({ item, type }) => {
    const msg = `Hi, I'm interested in Aquasafe Pipe:\n- Type: ${type}\n- Size: ${item.size}\n- Pressure: ${item.pc} kg/cm²\n- Code: ${item.code}\n- Price: ${formatPrice(item.price)}`;
    return (
        <div className="product-card">
            <div className="card-size">{item.size}</div>
            <div className="card-details">
                <span className="card-pressure">{item.pc} kg/cm²</span>
                <code className="card-code">{item.code}</code>
                <span className="card-price">{formatPrice(item.price)}</span>
            </div>
            <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer" className="card-inquiry"><ShoppingCart size={14} /></a>
        </div>
    );
};

export default AquasafeCatalog;
