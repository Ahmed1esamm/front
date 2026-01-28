import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar'; 
import Form from './components/Form';
import Switch from './components/Switch';
import HousingGrid from './components/UnitsList'; 
import Profile from './components/Profile'; 
import ChatMAMA from './components/chatMAMA';
import AddProperty from './components/AddProperty'; 
import './App.css';

const AboutMawaPage = ({ isDarkMode }) => {
  return (
    <div className={`mawa-section ${isDarkMode ? 'dark-mode' : ''}`}>
      <style>{`
        .mawa-section { padding: 80px 20px; direction: rtl; font-family: 'Segoe UI', sans-serif; }
        .mawa-wrapper { max-width: 1100px; margin: 0 auto; }
        .mawa-intro { text-align: center; margin-bottom: 60px; }
        .mawa-intro h2 { font-size: 42px; color: #ff751f; font-weight: 900; }
        .mawa-intro p { font-size: 22px; color: ${isDarkMode ? '#e2e8f0' : '#2d3748'}; line-height: 1.8; }
        .trust-card { background: linear-gradient(135deg, #000b3d 0%, #001a8c 100%); padding: 50px; border-radius: 40px; color: white; margin-bottom: 60px; border-right: 8px solid #ff751f; }
        .trust-card h3 { font-size: 32px; color: #ff751f; }
        .benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; }
        .benefit-item { background: ${isDarkMode ? '#11131f' : '#ffffff'}; padding: 40px; border-radius: 35px; border: 1px solid ${isDarkMode ? '#2d3748' : '#edf2f7'}; transition: 0.4s; }
        .mawa-list { list-style: none; padding: 0; }
        .mawa-list li { padding: 12px 35px 12px 0; position: relative; color: ${isDarkMode ? '#cbd5e0' : '#4a5568'}; }
        .mawa-list li::before { content: "✔"; position: absolute; right: 0; color: #ff751f; font-weight: bold; }
      `}</style>
      <div className="mawa-wrapper">
        <div className="mawa-intro">
          <h2>إحنا مين؟</h2>
          <p>مأوى هي بوابتك الرقمية الأمينة.. بنرسم طريق جديد للسكن الطلابي في مصر.</p>
        </div>
        <div className="trust-card">
          <h3>ليه تسكن مع مأوى؟</h3>
          <p>في مأوى إحنا اللي بنروح ونعاين ونراجع كل ركن في الشقة بنفسنا.</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-item">
            <h4>🎓 كطالب:</h4>
            <ul className="mawa-list">
              <li>سكن آمن ومُراجع بعيداً عن مفاجآت الصور المزيّفة.</li>
            </ul>
          </div>
          <div className="benefit-item">
            <h4>🏠 كمالك:</h4>
            <ul className="mawa-list">
              <li>وداعاً لصداع السماسرة.. تعاملك مع فريق احترافي واحد.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

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
              <style>{`
                /* إعدادات التحكم */
                :root {
                  --hero-bg: ${isDarkMode ? '#11131f' : '#000b3d'};
                  --phone-y: -60px;   /* الهاتف مرفوع للأعلى */
                  --text-y: 60px;     /* النص والزراير نازلة للأسفل */
                }

                .re-hero {
                  width: 100%;
                  height: 650px;
                  position: relative;
                  overflow: hidden;
                  background: transparent;
                }

                /* الفريم الكحلي الرئيسي */
                .re-hero-main {
                  width: 100%;
                  height: 92%;
                  background: var(--hero-bg);
                  border-radius: 0 0 20px 20px;
                  position: relative;
                  z-index: 2;
                  display: flex;
                  flex-direction: column;
                  direction: rtl;
                }

                /* الخلفية المائلة (اللمسة الاحترافية) */
                .re-hero-bottom {
                  position: absolute;
                  width: 150%;
                  height: 450%;
                  bottom: 0;
                  background: var(--hero-bg);
                  transform: skew(319deg) translateX(-50%);
                  left: 50%;
                  z-index: 1;
                }

                /* توزيع المحتوى الداخلي */
                .logo-area { position: absolute; top: 20px; right: 40px; z-index: 10; }
                .nav-area { position: absolute; top: 30px; left: 50%; transform: translateX(-50%); z-index: 10; }
                .actions-area { position: absolute; top: 35px; left: 40px; z-index: 10; display: flex; align-items: center; gap: 20px; }

                .hero-content {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 80px;
                  margin-top: 130px;
                  flex: 1;
                }

                .hero-text-side {
                  flex: 1.2;
                  transform: translateY(var(--text-y));
                  text-align: right;
                }

                .hero-text-side h1 {
                  font-size: 55px;
                  color: white;
                  font-weight: 900;
                  line-height: 1.2;
                  margin-bottom: 30px;
                }

                .hero-text-side h1 span { color: #ff751f; }

                .store-buttons { display: flex; gap: 15px; }
                .btn-green {
                  background: #22c55e;
                  color: white;
                  padding: 14px 28px;
                  border-radius: 15px;
                  text-decoration: none;
                  font-weight: bold;
                  transition: 0.3s ease;
                }
                .btn-green:hover { transform: scale(1.05); background: #1eb050; }

                .phone-container {
                  flex: 1;
                  display: flex;
                  justify-content: flex-end;
                  transform: translateY(var(--phone-y)) translateX(-600px); /* سيتحرك 20 بكسل إضافية لليسار */
                }

                .phone-frame {
                  width: 200px;
                  height: 370px;
                  background: #000;
                  border: 8px solid #333;
                  border-radius: 40px;
                  overflow: hidden;
                  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
                }
                .phone-frame video { width: 100%; height: 100%; object-fit: cover; }
              `}</style>

              <div className="re-hero-main">
                {/* اللوجو */}
                <div className="logo-area">
                  <svg viewBox="0 0 600 150" style={{height: '100px', width: 'auto'}}>
                    <text x="357" y="33" fontFamily="Arial" fontWeight="900" fontSize="35" fill="#FFFFFF">ء</text>
                    <text x="600" y="80" fontFamily="Arial" fontWeight="900" fontSize="70" fill="#ff751f">مـــــــــــــــاوى</text>
                    <text x="560" y="55" fontFamily="Arial" fontWeight="900" fontSize="50" fill="#FFFFFF">MA<tspan fill="#ff751f">'</tspan>WA</text>
                  </svg>
                </div>

                {/* الناف بار */}
                <div className="nav-area">
                  <Navbar setActivePage={setActivePage} />
                </div>

                {/* أزرار الأكشن (Dark Mode & Login) */}
                <div className="actions-area">
                  <Switch isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                  <button className="sparkle-button" onClick={() => setIsModalOpen(true)}>
                    <span className="text">تسجيل دخول</span>
                  </button>
                </div>

                {/* المحتوى الرئيسي */}
                <div className="hero-content">
                  <div className="hero-text-side">
                    <h1>مأوى.. <br /><span>بيتك بعيد عن بيتك.</span></h1>
                    <div className="store-buttons">
                      <a href="#" className="btn-green">Google Play</a>
                      <a href="#" className="btn-green">App Store</a>
                    </div>
                  </div>

                  <div className="phone-container">
                    <div className="phone-frame">
                      <video autoPlay muted loop playsInline>
                        <source src="your-video-file.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </div>

              {/* تأثير الزاوية المائلة في الخلفية */}
              <div className="re-hero-bottom"></div>
            </section>

            <main>
              <HousingGrid isDarkMode={isDarkMode} favorites={favorites} setFavorites={setFavorites} />
              <AboutMawaPage isDarkMode={isDarkMode} />
            </main>
          </>
        );

      case 'chatMAMA': return <ChatMAMA isDarkMode={isDarkMode} setActivePage={setActivePage} />;
      case 'profile': return <Profile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setActivePage={setActivePage} favorites={favorites} setFavorites={setFavorites} />;
      case 'add-property': return <AddProperty isDarkMode={isDarkMode} onBack={() => setActivePage('profile')} />;
      default: return <div style={{textAlign:'center', marginTop:'100px'}} onClick={()=>setActivePage('home')}><h2>الصفحة غير موجودة</h2><p>العودة للرئيسية</p></div>;
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