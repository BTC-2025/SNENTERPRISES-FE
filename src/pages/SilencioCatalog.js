import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { silencioCatalog, formatPrice } from '../data/silencioCatalog';
import { companyInfo } from '../data/content';
import './SilencioCatalog.css';

const SilencioCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedGroups, setExpandedGroups] = useState({});

    const sections = silencioCatalog.sections;
    const totalProducts = sections.reduce((sum, s) => sum + s.items.length, 0);

    const filteredSections = useMemo(() => {
        if (!searchTerm) return sections;
        return sections.map(section => ({
            ...section,
            items: section.items.filter(item =>
                item.size_mm?.includes(searchTerm) ||
                item.product_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                section.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })).filter(section => section.items.length > 0);
    }, [sections, searchTerm]);

    const toggleGroup = (name) => setExpandedGroups(prev => ({ ...prev, [name]: !prev[name] }));
    const expandAll = () => { const all = {}; sections.forEach(s => all[s.name] = true); setExpandedGroups(all); };
    const collapseAll = () => setExpandedGroups({});

    return (
        <div className="silencio-catalog-page">
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/products">Products</Link> / Silencio Catalog</div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{silencioCatalog.title}</h1>
                            <p className="hsn-code">HSN: {silencioCatalog.hsn_code}</p>
                            <p className="catalog-subtitle">{totalProducts} products in {sections.length} categories</p>
                        </div>
                        <div className="hero-stats">
                            <div className="stat"><span className="stat-number">{sections.length}</span><span className="stat-label">Categories</span></div>
                            <div className="stat"><span className="stat-number">{totalProducts}</span><span className="stat-label">Products</span></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="filters-section">
                <div className="container">
                    <div className="filters-bar">
                        <div className="search-box">
                            <Search size={20} />
                            <input type="text" placeholder="Search by size, code, type..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
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
                    {filteredSections.length === 0 ? (
                        <div className="no-results"><p>No products found.</p></div>
                    ) : (
                        <div className="product-groups">
                            {filteredSections.map(section => (
                                <ProductGroup key={section.name} section={section} isExpanded={expandedGroups[section.name] !== false} onToggle={() => toggleGroup(section.name)} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need Silencio Low Noise Drainage Pipes?</h2>
                    <p>Contact us for special rates on bulk orders</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">Request Quote</Link>
                        <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need Silencio Pipes`} target="_blank" rel="noopener noreferrer" className="btn btn-lg whatsapp-btn">WhatsApp Inquiry</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProductGroup = ({ section, isExpanded, onToggle }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.1 });
    return (
        <div ref={ref} className={`product-group reveal ${isRevealed ? 'revealed' : ''}`}>
            <div className="group-header" onClick={onToggle}>
                <div className="group-title"><h3>{section.name}</h3><span className="group-count">{section.items.length} products</span></div>
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            {isExpanded && (
                <div className="group-items">
                    {section.items.map((item, i) => <ProductCard key={`${item.product_code}-${i}`} item={item} sectionName={section.name} />)}
                </div>
            )}
        </div>
    );
};

const ProductCard = ({ item, sectionName }) => {
    const msg = `Hi, I'm interested in Silencio Pipe:\n- Type: ${sectionName}\n- Size: ${item.size_mm}mm\n- Length: ${item.length}\n- Code: ${item.product_code}\n- Price: ${formatPrice(item.price_inr_per_pc)}`;
    return (
        <div className="product-card">
            <div className="card-size">{item.size_mm}mm</div>
            <div className="card-details">
                <span className="card-length">{item.length}</span>
                <code className="card-code">{item.product_code}</code>
                <span className="card-price">{formatPrice(item.price_inr_per_pc)}</span>
            </div>
            <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer" className="card-inquiry"><ShoppingCart size={14} /></a>
        </div>
    );
};

export default SilencioCatalog;
