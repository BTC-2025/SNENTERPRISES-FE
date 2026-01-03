import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { cpvcProPipesCatalog, formatPrice } from '../data/cpvcCatalog';
import { companyInfo } from '../data/content';
import './CPVCCatalog.css';

const CPVCCatalog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedGroups, setExpandedGroups] = useState({});

    const blocks = cpvcProPipesCatalog.blocks;
    const totalProducts = blocks.reduce((sum, b) => sum + b.items.length, 0);

    const filteredBlocks = useMemo(() => {
        if (!searchTerm) return blocks;
        return blocks.map(block => ({
            ...block,
            items: block.items.filter(item =>
                item.size_inch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                block.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })).filter(block => block.items.length > 0);
    }, [blocks, searchTerm]);

    const toggleGroup = (name) => setExpandedGroups(prev => ({ ...prev, [name]: !prev[name] }));
    const expandAll = () => { const all = {}; blocks.forEach(b => all[b.name] = true); setExpandedGroups(all); };
    const collapseAll = () => setExpandedGroups({});

    return (
        <div className="cpvc-catalog-page">
            <section className="catalog-hero">
                <div className="catalog-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/products">Products</Link> / CPVC Pro Catalog</div>
                    <div className="hero-content-flex">
                        <div>
                            <h1>{cpvcProPipesCatalog.title}</h1>
                            <p className="hsn-code">HSN: {cpvcProPipesCatalog.hsn_code}</p>
                            <p className="catalog-subtitle">{totalProducts} products in {blocks.length} categories</p>
                        </div>
                        <div className="hero-stats">
                            <div className="stat"><span className="stat-number">{blocks.length}</span><span className="stat-label">Categories</span></div>
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
                    {filteredBlocks.length === 0 ? (
                        <div className="no-results"><p>No products found.</p></div>
                    ) : (
                        <div className="product-groups">
                            {filteredBlocks.map(block => (
                                <ProductGroup key={block.name} block={block} isExpanded={expandedGroups[block.name] !== false} onToggle={() => toggleGroup(block.name)} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="section-sm catalog-cta">
                <div className="container text-center">
                    <h2>Need CPVC Pro Pipes?</h2>
                    <p>Contact us for special rates on bulk orders</p>
                    <div className="cta-buttons">
                        <Link to="/quote" className="btn btn-primary btn-lg">Request Quote</Link>
                        <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hi, I need CPVC Pro Pipes`} target="_blank" rel="noopener noreferrer" className="btn btn-lg whatsapp-btn">WhatsApp Inquiry</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProductGroup = ({ block, isExpanded, onToggle }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.1 });
    return (
        <div ref={ref} className={`product-group reveal ${isRevealed ? 'revealed' : ''}`}>
            <div className="group-header" onClick={onToggle}>
                <div className="group-title"><h3>{block.name}</h3><span className="group-count">{block.items.length} products</span></div>
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            {isExpanded && (
                <div className="group-items">
                    {block.items.map((item, i) => <ProductCard key={`${item.product_code}-${i}`} item={item} blockName={block.name} />)}
                </div>
            )}
        </div>
    );
};

const ProductCard = ({ item, blockName }) => {
    const msg = `Hi, I'm interested in CPVC Pro Pipe:\n- Type: ${blockName}\n- Size: ${item.size_inch}" (${item.size_cm}cm)\n- Code: ${item.product_code}\n- Price: ${formatPrice(item.price_inr_per_pc)}`;
    return (
        <div className="product-card">
            <div className="card-size">{item.size_inch}"</div>
            <div className="card-details">
                <span className="card-cm">{item.size_cm}cm</span>
                <code className="card-code">{item.product_code}</code>
                <span className="card-price">{formatPrice(item.price_inr_per_pc)}</span>
            </div>
            <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer" className="card-inquiry"><ShoppingCart size={14} /></a>
        </div>
    );
};

export default CPVCCatalog;
