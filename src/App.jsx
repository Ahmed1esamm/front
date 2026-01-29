import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar'; 
import Form from './components/Form';
import Switch from './components/Switch';
import HousingGrid from './components/UnitsList'; 
import Profile from './components/Profile'; 
import ChatMAMA from './components/chatMAMA'; 
import AddProperty from './components/AddProperty'; 
import AllUnitsPage from './components/Show_all_unite'; 
import ManageProperties from './components/ManageProperties'; 

import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePage, setActivePage] = useState('home'); 
  const [favorites, setFavorites] = useState({});
  const [counts, setCounts] = useState({ students: 0, units: 0, areas: 0 });

  useEffect(() => {
    if (activePage === 'home') {
      const targets = { students: 1500, units: 450, areas: 25 }; 
      const steps = 60;
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setCounts({
          students: Math.round(targets.students * progress),
          units: Math.round(targets.units * progress),
          areas: Math.round(targets.areas * progress),
        });
        if (currentStep >= steps) clearInterval(timer);
      }, 30);
      return () => clearInterval(timer);
    }
  }, [activePage]);

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    setActivePage('profile');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <section className="re-hero">
              <div className="re-hero-main">
                <div className="logo-container">
                   <svg viewBox="0 0 600 150" className="logo-svg">
                    <text x="120" y="50" fontFamily="Arial" fontWeight="900" fontSize="35" fill="#FFFFFF">ء</text>
                    <text x="340" y="80" fontFamily="Arial" fontWeight="900" fontSize="50" fill="#FFFFFF">MA<tspan fill="#ff751f">'</tspan>WA</text>
                    <text x="400" y="110" fontFamily="Arial" fontWeight="900" fontSize="80" fill="#ff751f">مـــــــــــــــاوى</text>
                  </svg>
                </div>

                <div className="menu-wrapper">
                  <Navbar setActivePage={setActivePage} />
                </div>

                <div className="top-actions">
                  <Switch isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                  <button className="sparkle-button" onClick={() => setIsModalOpen(true)}>
                    <span>تسجيل دخول</span>
                  </button>
                </div>

                <div className="hero-content">
                  <div className="hero-text-side">
                    <h1>مأوى.. <br /><span>بيتك بعيد عن بيتك.</span></h1>
                  </div>
                </div>

                <div className="store-buttons">
                  <a href="#" className="btn-green">App Store</a>
                  <a href="#" className="btn-green">Google Play</a>
                </div>
              </div>
              
              <div className="phone-frame-container">
                <div className="phone-inner">
                   <video className="phone-video" autoPlay loop muted playsInline>
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-searching-for-a-location-on-a-smartphone-map-34531-large.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              <div className="re-hero-bottom"></div>

              <div className="hero-counters">
                <div className="counter-item">
                  <span className="counter-number">+{counts.areas}</span>
                  <span className="counter-label">حي سكني</span>
                </div>
                <div className="counter-item">
                  <span className="counter-number">+{counts.units}</span>
                  <span className="counter-label">وحدة سكنية</span>
                </div>
                <div className="counter-item">
                  <span className="counter-number">+{counts.students}</span>
                  <span className="counter-label">طالب مغترب</span>
                </div>
              </div>
            </section>
            <main>
              <HousingGrid 
                isDarkMode={isDarkMode} 
                favorites={favorites} 
                setFavorites={setFavorites} 
                setActivePage={setActivePage} 
              />
            </main>
          </>
        );

      case 'profile': 
        return <Profile isDarkMode={isDarkMode} setActivePage={setActivePage} favorites={favorites} />;
      
      case 'chatMAMA': 
        return <ChatMAMA isDarkMode={isDarkMode} setActivePage={setActivePage} />;
      
      case 'add-property': 
        return <AddProperty isDarkMode={isDarkMode} onBack={() => setActivePage('manage-properties')} />;
      
      case 'manage-properties':
        return (
          <ManageProperties 
            isDarkMode={isDarkMode} 
            onBack={() => setActivePage('profile')} 
            onAddNew={() => setActivePage('add-property')} 
          />
        );
      
      // هنا قمت بدمج الحالتين في حالة واحدة صحيحة
      case 'Show_all_unite':
        return (
          <AllUnitsPage 
            isDarkMode={isDarkMode} 
            onBack={() => setActivePage('home')} 
            favorites={favorites} 
            setFavorites={setFavorites} 
          />
        );

      default: 
        return <div className="error-page" onClick={() => setActivePage('home')}><h2>العودة للرئيسية</h2></div>;
    }
  };

  return (
    <div className={`main-wrapper ${isDarkMode ? 'dark' : ''}`}>
      {renderPage()}
      
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <Form 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={handleLoginSuccess} 
          />
        </div>
      )}
    </div>
  );
}

export default App;