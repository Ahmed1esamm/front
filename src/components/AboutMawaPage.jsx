import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar'; 
import Form from './components/Form';
import Switch from './components/Switch';
import HousingGrid from './components/UnitsList'; 
import Profile from './components/Profile'; 
import ChatMAMA from './components/ChatMAMA'; 
import AddProperty from './components/AddProperty'; 
import './App.css';

// 1. مكون مأوى التعريفي (تم وضعه هنا ليعمل في نفس الملف)
const AboutMawaPage = ({ isDarkMode }) => {
  return (
    <div className={`mawa-standalone-section ${isDarkMode ? 'dark-mode' : ''}`}>
      <style>{`
        .mawa-standalone-section {
          padding: 80px 20px;
          direction: rtl;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: transparent;
          clear: both;
        }
        .mawa-wrapper { max-width: 1100px; margin: 0 auto; }
        .mawa-header { text-align: center; margin-bottom: 60px; }
        .mawa-badge {
          display: inline-block;
          padding: 6px 18px;
          background: rgba(255, 117, 31, 0.1);
          color: #ff751f;
          border-radius: 50px;
          font-weight: 800;
          font-size: 14px;
          margin-bottom: 20px;
          border: 1px solid rgba(255, 117, 31, 0.2);
        }
        .mawa-header h2 { font-size: 38px; color: #000b3d; margin-bottom: 25px; line-height: 1.3; }
        .dark-mode .mawa-header h2 { color: #ffffff; }
        .mawa-header h2 span { color: #ff751f; }
        .mawa-header p { font-size: 19px; color: #556b82; max-width: 800px; margin: 0 auto; line-height: 1.8; }
        .dark-mode .mawa-header p { color: #a0aec0; }
        .mawa-main-card {
          background: linear-gradient(135deg, #000b3d 0%, #001a8c 100%);
          padding: 45px; border-radius: 35px; color: white; margin-bottom: 50px;
          box-shadow: 0 25px 50px -12px rgba(0, 11, 61, 0.25);
        }
        .mawa-main-card h3 { color: #ff751f; font-size: 26px; margin-bottom: 20px; }
        .mawa-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
        .mawa-card { background: #ffffff; padding: 35px; border-radius: 30px; border: 1px solid #edf2f7; transition: 0.3s; }
        .dark-mode .mawa-card { background: #11131f; border-color: #2d3748; }
        .mawa-card:hover { transform: translateY(-10px); border-color: #ff751f; }
        .mawa-card h4 { font-size: 22px; color: #000b3d; font-weight: 700; margin-bottom: 15px; }
        .dark-mode .mawa-card h4 { color: #ffffff; }
        .mawa-list { list-style: none; padding: 0; }
        .mawa-list li { padding: 10px 25px 10px 0; position: relative; color: #4a5568; border-bottom: 1px solid #f7fafc; }
        .dark-mode .mawa-list li { color: #cbd5e0; border-bottom-color: #1a202c; }
        .mawa-list li::before { content: "←"; position: absolute; right: 0; color: #ff751f; font-weight: bold; }
      `}</style>
      <div className="mawa-wrapper">
        <div className="mawa-header">
          <span className="mawa-badge">اكتشف مأوى</span>
          <h2>نحن <span>مأوى</span>.. رفيقك في رحلتك الدراسية</h2>
          <p>أول منصة متكاملة في مصر تهدف لتوفير سكن طلابي آمن وموثوق، لنمنحك شعور الاستقرار منذ اليوم الأول.</p>
        </div>
        <div className="mawa-main-card">
          <h3>لماذا تختار مأوى؟</h3>
          <p>رحلة البحث عن سكن مرهقة، لذا قمنا بالتحقق من كل وحدة سكنية بأنفسنا. نوفر لك صوراً حقيقية، ومواقع قريبة من جامعتك، ودعماً فنياً متواصلاً.</p>
        </div>
        <div className="mawa-grid">
          <div className="mawa-card">
            <h4>🎓 مميزات الطالب</h4>
            <ul className="mawa-list">
              <li>سكن آمن ومُحقق منه تماماً</li>
              <li>مواقع استراتيجية قرب الجامعات</li>
              <li>شفافية كاملة في الأسعار والصور</li>
              <li>حجز فوري بضغطة زر واحدة</li>
            </ul>
          </div>
          <div className="mawa-card">
            <h4>🏠 مميزات المالك</h4>
            <ul className="mawa-list">
              <li>إدارة عقارك بدون سماسرة</li>
              <li>تسكين مباشر وفقاً لشروطك</li>
              <li>ضمان حقوقك القانونية والمالية</li>
              <li>تحصيل الإيجار في مواعيد ثابتة</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. المكون الرئيسي للتطبيق
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#0a0b14" : "#f8fafc";
  }, [isDarkMode]);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <section className="re-hero">
              <div className="re-hero-main" style={{ backgroundColor: isDarkMode ? '#11131f' : '#000b3d' }}>
                <div className="logo-container">
                  <svg className="logo-svg" viewBox="0 0 500 120">
                    <text x="74" y="40" fontFamily="Arial" fontWeight="900" fontSize="35" fill="#FFFFFF">ء</text>
                    <text x="20" y="80" fontFamily="Arial" fontWeight="900" fontSize="55" fill="#ff751f">مـــــــــــــــاوى</text>
                    <text x="100" y="60" fontFamily="Arial" fontWeight="900" fontSize="40" fill="#FFFFFF">MA<tspan fill="#ff751f">'</tspan>WA</text>
                  </svg>
                </div>

                <Navbar setActivePage={setActivePage} /> 

                <div className="top-actions">
                  <Switch isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                  <div className="sp-container">
                    <button className="sparkle-button" onClick={() => setIsModalOpen(true)}>
                      <span className="text">Sign In</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="re-hero-bottom" style={{ backgroundColor: isDarkMode ? '#11131f' : '#000b3d' }}></div>
            </section>

            <main>
              <HousingGrid 
                isDarkMode={isDarkMode} 
                favorites={favorites} 
                setFavorites={setFavorites} 
              />
              {/* استدعاء الجزء التعريفي الجديد هنا ليظهر تحت شبكة السكن */}
              <AboutMawaPage isDarkMode={isDarkMode} />
            </main>
          </>
        );

      case 'chatMAMA':
        return <ChatMAMA isDarkMode={isDarkMode} setActivePage={setActivePage} />;

      case 'profile':
        return <Profile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setActivePage={setActivePage} favorites={favorites} setFavorites={setFavorites} />;

      case 'add-property':
        return <AddProperty isDarkMode={isDarkMode} onBack={() => setActivePage('profile')} />;

      default:
        return (
          <div style={{ textAlign: 'center', marginTop: '100px' }} onClick={() => setActivePage('home')}>
            <h2>Page Not Found</h2>
            <p>اضغط هنا للعودة للرئيسية</p>
          </div>
        );
    }
  };

  return (
    <div className={`main-wrapper ${isDarkMode ? 'dark' : ''}`}>
      {renderPage()}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Form onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;