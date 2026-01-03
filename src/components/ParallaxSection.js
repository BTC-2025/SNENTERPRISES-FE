import React from 'react';
import { useParallax } from '../hooks/useParallax';
import './ParallaxSection.css';

/**
 * Reusable Parallax Section Component with floating shapes
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display
 * @param {string} props.variant - 'primary' | 'secondary' | 'light'
 * @param {boolean} props.shapes - Show floating shapes
 */
const ParallaxSection = ({ children, variant = 'primary', shapes = true }) => {
    const parallaxBg = useParallax({ speed: 0.3 });
    const parallaxShape1 = useParallax({ speed: 0.5 });
    const parallaxShape2 = useParallax({ speed: 0.4 });

    return (
        <div className={`parallax-section parallax-section-${variant}`}>
            {/* Background Layer */}
            <div ref={parallaxBg} className="parallax-section-bg"></div>

            {/* Floating Shapes */}
            {shapes && (
                <>
                    <div ref={parallaxShape1} className="parallax-shape parallax-shape-1"></div>
                    <div ref={parallaxShape2} className="parallax-shape parallax-shape-2"></div>
                </>
            )}

            {/* Content */}
            <div className="parallax-section-content">
                {children}
            </div>
        </div>
    );
};

export default ParallaxSection;
