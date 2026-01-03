import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import './Blog.css';

const Blog = () => {
    const parallaxRef = useParallax({ speed: 0.4 });

    const blogPosts = [
        {
            id: 1,
            title: 'Choosing the Right CPVC Pipes for Your Home',
            excerpt: 'A comprehensive guide to selecting the best CPVC pipes for hot and cold water applications in residential projects.',
            category: 'Guide',
            readTime: '5 min read',
        },
        {
            id: 2,
            title: 'Benefits of UPVC Pipes in Agriculture',
            excerpt: 'Learn why UPVC pipes are the preferred choice for irrigation systems and agricultural water supply.',
            category: 'Agriculture',
            readTime: '4 min read',
        },
        {
            id: 3,
            title: 'SWR Pipes: Complete Installation Guide',
            excerpt: 'Step-by-step instructions for installing soil, waste, and rainwater drainage systems using SWR pipes.',
            category: 'Installation',
            readTime: '7 min read',
        },
        {
            id: 4,
            title: 'Water Tank Selection: Size and Capacity Guide',
            excerpt: 'How to choose the right water tank capacity for your home or building based on water consumption.',
            category: 'Guide',
            readTime: '6 min read',
        },
        {
            id: 5,
            title: 'Pipe Fittings: Types and Applications',
            excerpt: 'Understanding different types of pipe fittings and their specific uses in plumbing systems.',
            category: 'Technical',
            readTime: '5 min read',
        },
        {
            id: 6,
            title: 'Maintenance Tips for Plumbing Systems',
            excerpt: 'Essential maintenance practices to ensure longevity and efficiency of your plumbing infrastructure.',
            category: 'Maintenance',
            readTime: '4 min read',
        },
    ];

    return (
        <div className="blog-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-parallax" ref={parallaxRef}></div>
                <div className="container">
                    <h1>Guides & Tips</h1>
                    <p>Expert insights on pipes, plumbing, and water systems</p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="section">
                <div className="container">
                    <div className="blog-grid">
                        {blogPosts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const BlogCard = ({ post, index }) => {
    const [ref, isRevealed] = useScrollReveal({ threshold: 0.15 });

    return (
        <div
            ref={ref}
            className={`blog-card reveal reveal-stagger ${isRevealed ? 'revealed' : ''}`}
        >
            <div className="blog-image">
                <div className="blog-image-placeholder">{post.id}</div>
                <span className="blog-category">{post.category}</span>
            </div>
            <div className="blog-content">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-meta">
                    <span className="read-time">{post.readTime}</span>
                    <span className="blog-link">
                        Read More <ArrowRight size={16} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Blog;
