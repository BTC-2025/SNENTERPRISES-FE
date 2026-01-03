// Product data for SN Enterprises - Astral Product Lines
import { getAllCPVCProducts } from './cpvcCatalog';

export const productCategories = [
    {
        id: 'cpvc-pro',
        name: 'Astral CPVC Pro',
        slug: 'cpvc',
        tagline: 'ADVANCED HOT AND COLD WATER PLUMBING SYSTEM',
        description: 'Premium CPVC pipes and fittings for hot and cold water distribution with superior durability',
        image: '/images/cpvc-pipes.jpg',
        features: ['Hot & cold water', 'Corrosion resistant', 'Long lasting', 'Easy installation'],
        productCount: 89,
        catalogLinks: [
            { name: 'CPVC Pipes Catalog', url: '/cpvc-catalog', count: 89 }
        ]
    },
    {
        id: 'aquarius',
        name: 'Aquarius',
        slug: 'aquarius',
        tagline: 'LEAD-FREE PORTABLE WATER TRANSPORT SYSTEM',
        description: 'Lead-free plumbing pipes for safe potable water transport',
        image: '/images/aquarius-pipes.jpg',
        features: ['Lead-free', 'Pressure resistant', 'Food grade', 'Long service life'],
        productCount: 52,
        catalogLinks: [
            { name: 'Aquarius Pipes Catalog', url: '/aquarius-catalog', count: 52 }
        ]
    },
    {
        id: 'silencio',
        name: 'Silencio',
        slug: 'silencio',
        tagline: 'THE COMPLETE LOW NOISE DRAINAGE SYSTEM',
        description: 'Low noise drainage pipes with German technology and 3-layer construction',
        image: '/images/silencio-pipes.jpg',
        features: ['Sound insulation', 'Noise reduction', '3-layer construction', 'German technology'],
        productCount: 67,
        catalogLinks: [
            { name: 'Silencio Pipes Catalog', url: '/silencio-catalog', count: 67 }
        ]
    },
    {
        id: 'drainmaster',
        name: 'DrainMaster',
        slug: 'drainmaster',
        tagline: 'SUPERIOR SWR SELFIT AND RING FIT DRAINAGE SYSTEM',
        description: 'Superior SWR Selfit and Ring Fit drainage pipes - ISI certified',
        image: '/images/drainmaster-pipes.jpg',
        features: ['IS:13592 certified', 'IS:14735 certified', 'Selfit system', 'Ring Fit system'],
        productCount: 90,
        catalogLinks: [
            { name: 'DrainMaster Pipes Catalog', url: '/drainmaster-catalog', count: 90 }
        ]
    },
    {
        id: 'drainpro',
        name: 'Drain Pro',
        slug: 'drainpro',
        tagline: 'THE ADVANCED PP SWR SYSTEM',
        description: 'Advanced PP SWR pipes made with German technology - ICON approved',
        image: '/images/drainpro-pipes.jpg',
        features: ['German technology', 'ICON approved', '13DB Q\'z ips', 'Advanced SWR'],
        productCount: 58,
        catalogLinks: [
            { name: 'DrainPro Pipes Catalog', url: '/drainpro-catalog', count: 58 }
        ]
    },
    {
        id: 'drex',
        name: 'D-Rex',
        slug: 'drex',
        tagline: 'DOUBLE WALLED CORRUGATED UNDERGROUND DRAINAGE SYSTEM',
        description: 'Double walled corrugated pipes - IS:16098 (Part-2) certified',
        image: '/images/drex-pipes.jpg',
        features: ['IS:16098 certified', 'SN4/SN8 classes', 'Rodent repellent', 'Underground use'],
        productCount: 110,
        catalogLinks: [
            { name: 'D-Rex Pipes Catalog', url: '/drex-catalog', count: 110 }
        ]
    },
    {
        id: 'underground',
        name: 'Underground',
        slug: 'underground',
        tagline: 'PVC UNDERGROUND DRAINAGE & SEWERAGE SYSTEM',
        description: 'PVC Underground drainage and sewerage pipes - IS:15328 certified',
        image: '/images/underground-pipes.jpg',
        features: ['IS:15328 certified', 'Selfit & Ringfit', 'SN2/SN4/SN8 classes', 'Underground use'],
        productCount: 48,
        catalogLinks: [
            { name: 'Underground Pipes Catalog', url: '/underground-catalog', count: 48 }
        ]
    },
    {
        id: 'telerex',
        name: 'TeleRex',
        slug: 'telerex',
        tagline: 'DOUBLE WALLED CORRUGATED PE PIPES FOR CABLE PROTECTION',
        description: 'Double walled corrugated PE pipes for signalling, telecom & power cable protection - IS:16205',
        image: '/images/telerex-pipes.jpg',
        features: ['IS:16205 certified', '450N/750N ratings', 'Cable protection', 'RR/NFP options'],
        productCount: 180,
        catalogLinks: [
            { name: 'TeleRex Pipes Catalog', url: '/telerex-catalog', count: 180 }
        ]
    },
    {
        id: 'foamcore',
        name: 'FoamCore',
        slug: 'foamcore',
        tagline: 'STRONG AND LIGHTWEIGHT DRAINAGE SYSTEM',
        description: 'Strong and lightweight PVC-D drainage pipes - IS:16098 (PT-1) certified',
        image: '/images/foamcore-pipes.jpg',
        features: ['IS:16098 certified', 'PVC-D technology', 'Lightweight', 'SN2/SN4/SN8 classes'],
        productCount: 40,
        catalogLinks: [
            { name: 'FoamCore Pipes Catalog', url: '/foamcore-catalog', count: 40 }
        ]
    },
    {
        id: 'aquasafe',
        name: 'AquaSafe',
        slug: 'aquasafe',
        tagline: 'uPVC PRESSURE PIPES FOR AGRICULTURE & WATER TRANSPORT',
        description: 'uPVC pressure pipes for agriculture - IS:7834, IS:4985, IS:10124 certified',
        image: '/images/aquasafe-pipes.jpg',
        features: ['IS certified', 'Lead-free', 'Multi-pressure', 'Agriculture use'],
        productCount: 166,
        catalogLinks: [
            { name: 'Aquasafe Pipes Catalog', url: '/aquasafe-catalog', count: 166 }
        ]
    },
    {
        id: 'tanks',
        name: 'Water Storage Tanks',
        slug: 'tanks',
        tagline: 'PREMIUM WATER STORAGE',
        description: 'High-quality water storage tanks in various capacities',
        image: '/images/water-tanks.jpg',
        features: ['UV stabilized', 'Food grade', 'Multiple sizes', 'Leak proof'],
        productCount: null
    },
    {
        id: 'fittings',
        name: 'Fittings & Accessories',
        slug: 'fittings',
        tagline: 'COMPLETE FITTING SOLUTIONS',
        description: 'Comprehensive range of pipe fittings and accessories',
        image: '/images/fittings.jpg',
        features: ['Wide variety', 'Perfect fit', 'Quality tested', 'Standard sizes'],
        productCount: null
    },
];

// Merge CPVC catalog products with sample products
const cpvcCatalogProducts = getAllCPVCProducts();

export const products = [
    // CPVC Pro - Overview with catalog links
    {
        id: 'cpvc-overview',
        name: 'Astral CPVC Pro - Complete Range',
        category: 'cpvc',
        categoryName: 'Astral CPVC Pro',
        tagline: 'ADVANCED HOT AND COLD WATER PLUMBING SYSTEM',
        description: 'Browse our complete catalog of Astral CPVC Pro Pipes and Fittings with detailed specifications and pricing for all sizes and types.',
        image: '/images/cpvc-pro.jpg',
        isCatalogLink: true,
        catalogLinks: [
            { name: 'CPVC Pipes (89 products)', url: '/cpvc-catalog' },
            { name: 'CPVC Fittings (78 products)', url: '/fittings-catalog' }
        ],
        features: [
            'SDR-11 & SDR-13.5 pipes available',
            'Schedule 40 & 80 options',
            'Complete fittings range',
            'Multiple lengths: 3m & 5m',
            'Sizes from 1/2" to 12"',
            'Complete pricing catalog',
        ],
        specifications: [
            { label: 'Types Available', value: 'SDR-11, SDR-13.5, Schedule 40, Schedule 80, CTS SDR 09' },
            { label: 'Fittings Types', value: 'Couplers, Elbows, Tees, End Caps, Brass Fittings' },
            { label: 'Lengths', value: '3 metre & 5 metre' },
            { label: 'HSN Code (Pipes)', value: '39172390' },
            { label: 'HSN Code (Fittings)', value: '39174000' },
            { label: 'Temperature Rating', value: 'Up to 93°C' },
            { label: 'Certifications', value: 'ISI Certified, IS 15778' },
        ],
    },
    // Include all CPVC catalog products
    ...cpvcCatalogProducts,

    // Aquarius Products
    {
        id: 'aquarius-001',
        name: 'Astral Aquarius Plumbing Pipe',
        category: 'aquarius',
        categoryName: 'Aquarius',
        description: 'Premium plumbing pipes with advanced durability and pressure resistance',
        image: '/images/aquarius-pipe.jpg',
        features: [
            'High tensile strength',
            'Pressure resistant',
            'Chemical resistant',
            'Long service life',
        ],
        specifications: [
            { label: 'Size Range', value: '20mm to 160mm' },
            { label: 'Pressure Rating', value: 'PN 6 to PN 16' },
            { label: 'Standard', value: 'IS 4985' },
            { label: 'Application', value: 'Residential & commercial plumbing' },
        ],
    },

    // Water Tanks
    {
        id: 'tank-001',
        name: 'Astral Overhead Water Tank',
        category: 'tanks',
        categoryName: 'Water Storage Tanks',
        description: 'Premium quality overhead water storage tanks',
        image: '/images/tank-overhead.jpg',
        features: [
            'UV stabilized',
            'Food-grade material',
            'Algae resistant',
            '5-layer construction',
        ],
        specifications: [
            { label: 'Capacity Range', value: '500L to 10,000L' },
            { label: 'Material', value: 'Virgin LLDPE' },
            { label: 'Color', value: 'Black/White/Yellow' },
            { label: 'Warranty', value: '5 years' },
        ],
    },
    {
        id: 'tank-002',
        name: 'Astral Underground Water Tank',
        category: 'tanks',
        categoryName: 'Water Storage Tanks',
        description: 'Durable underground water storage solutions',
        image: '/images/tank-underground.jpg',
        features: [
            'High strength design',
            'Leak proof',
            'BIS certified',
            'Long service life',
        ],
        specifications: [
            { label: 'Capacity Range', value: '1000L to 20,000L' },
            { label: 'Material', value: 'Virgin LLDPE' },
            { label: 'Installation', value: 'Underground' },
            { label: 'Warranty', value: '7 years' },
        ],
    },
];

export const getProductsByCategory = (categorySlug) => {
    return products.filter((product) => product.category === categorySlug);
};

export const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
};

export const getCategoryBySlug = (slug) => {
    return productCategories.find((cat) => cat.slug === slug);
};
