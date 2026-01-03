import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import './Gallery.css';

const Gallery = () => {
    const parallaxRef = useParallax({ speed: 0.4 });

    // Gallery images (will use placeholders)
    const galleryItems = [
        { id: 1, title: 'CPVC Pipes Inventory', category: 'Products' },
        { id: 2, title: 'Warehouse Facility', category: 'Facility' },
        { id: 3, title: 'UPVC Pipes Display', category: 'Products' },
        { id: 4, title: 'Water Tanks Collection', category: 'Products' },
        { id: 5, title: 'Delivery Vehicles', category: 'Services' },
        { id: 6, title: 'SWR Pipes Section', category: 'Products' },
        { id: 7, title: 'Fittings & Accessories', category: 'Products' },
        { id: 8, title: 'Showroom', category: 'Facility' },
    ];

    return (
        <div className="gallery-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <h1>Gallery</h1>
                    <p>Explore our products, warehouse, and facilities</p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="section">
                <div className="container">
                    <div className="gallery-grid">
                        {galleryItems.map((item, index) => (
                            <GalleryCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const GalleryCard = ({ item, index }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`gallery-card reveal reveal-stagger ${isRevealed ? 'revealed' : ''}`}
        >
            <div className="gallery-image">
                <div className="gallery-image-placeholder">{item.id}</div>
                <div className="gallery-overlay">
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
