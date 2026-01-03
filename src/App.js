import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ProductCategories from './pages/ProductCategories';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import CPVCCatalog from './pages/CPVCCatalog';
import AquariusCatalog from './pages/AquariusCatalog';
import SilencioCatalog from './pages/SilencioCatalog';
import DrainProCatalog from './pages/DrainProCatalog';
import DrainMasterCatalog from './pages/DrainMasterCatalog';
import UndergroundCatalog from './pages/UndergroundCatalog';
import FoamcoreCatalog from './pages/FoamcoreCatalog';
import AquasafeCatalog from './pages/AquasafeCatalog';
import DrexCatalog from './pages/DrexCatalog';
import TelerexCatalog from './pages/TelerexCatalog';
import Services from './pages/Services';
import QuoteRequest from './pages/QuoteRequest';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<ProductCategories />} />
            <Route path="/products/:categorySlug" element={<ProductListing />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cpvc-catalog" element={<CPVCCatalog />} />
            <Route path="/aquarius-catalog" element={<AquariusCatalog />} />
            <Route path="/silencio-catalog" element={<SilencioCatalog />} />
            <Route path="/drainpro-catalog" element={<DrainProCatalog />} />
            <Route path="/drainmaster-catalog" element={<DrainMasterCatalog />} />
            <Route path="/underground-catalog" element={<UndergroundCatalog />} />
            <Route path="/foamcore-catalog" element={<FoamcoreCatalog />} />
            <Route path="/aquasafe-catalog" element={<AquasafeCatalog />} />
            <Route path="/drex-catalog" element={<DrexCatalog />} />
            <Route path="/telerex-catalog" element={<TelerexCatalog />} />
            <Route path="/services" element={<Services />} />
            <Route path="/quote" element={<QuoteRequest />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

