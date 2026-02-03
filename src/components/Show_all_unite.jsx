import React, { useState, useEffect } from 'react';
import ShowUnite from './ShowUnite'; 
import Navbar from './navbar'; 

const ShowAllUnite = ({ isDarkMode, favorites = {}, setFavorites, setActivePage }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [selectedUnitData, setSelectedUnitData] = useState(null); 
  
  const [selectedGov, setSelectedGov] = useState('سوهاج');
  const [selectedArea, setSelectedArea] = useState('سيد');
  const [selectedGender, setSelectedGender] = useState('أنثى');

  const locationsMap = {
    'سوهاج': ['سيد', 'ستى', 'الشهيد', 'الثقافة'],
    'أسيوط': ['فريال', 'المكتبات', 'يسرى راغب', 'نميس']
  };

  const [filteredUnits, setFilteredUnits] = useState([]);

  useEffect(() => {
    const defaultUnits = [
      { id: 1, title: "فيلا مودرن - حي سيد", price: "3,200", beds: 1, wifi: true, location: "سوهاج - سيد", desc: "غرفة سينجل فاخرة للمغتربين الباحثين عن الرفاهية والهدوء المطلق." },
      { id: 2, title: "وحدة شباب - يسرى راغب", price: "1,400", beds: 4, wifi: false, location: "أسيوط - يسرى راغب", desc: "سكن اقتصادي ونظيف جداً بقلب مدينة أسيوط." },
      { id: 3, title: "سكن هادئ - المكتبات", price: "1,800", beds: 3, wifi: true, location: "أسيوط - المكتبات", desc: "بيئة مثالية للمذاكرة مع تكييف وإنترنت فائق السرعة." },
      { id: 4, title: "شقة النخبة - فريال", price: "2,500", beds: 2, wifi: true, location: "أسيوط - فريال", desc: "تصميم عصري جداً، قريبة من كل المواصلات والخدمات." }
    ];

    const saved = JSON.parse(localStorage.getItem('my_properties') || '[]');
    const allData = [...defaultUnits, ...saved].filter(u => !u.isHidden);
    setFilteredUnits(allData);
  }, []);

  const handleSearch = () => {
    const saved = JSON.parse(localStorage.getItem('my_properties') || '[]');
    const defaultUnits = [
        { id: 1, title: "فيلا مودرن - حي سيد", price: "3,200", beds: 1, wifi: true, location: "سوهاج - سيد", desc: "غرفة سينجل فاخرة للمغتربين." },
        { id: 2, title: "وحدة شباب - يسرى راغب", price: "1,400", beds: 4, wifi: false, location: "أسيوط - يسرى راغب", desc: "سكن اقتصادي ونظيف جداً." },
        { id: 3, title: "سكن هادئ - المكتبات", price: "1,800", beds: 3, wifi: true, location: "أسيوط - المكتبات", desc: "بيئة هادئة ومناسبة للمذاكرة." },
        { id: 4, title: "شقة النخبة - فريال", price: "2,500", beds: 2, wifi: true, location: "أسيوط - فريال", desc: "تصميم عصري جداً." }
    ];
    const all = [...defaultUnits, ...saved].filter(u => !u.isHidden);
    const results = all.filter(unit => unit.location.includes(selectedGov) && unit.location.includes(selectedArea));
    setFilteredUnits(results);
    setActiveMenu(null);
  };

  const theme = {
    text: isDarkMode ? '#ffffff' : '#000b3d',
    bgPage: isDarkMode ? '#0a0b14' : '#f8fafc',
    cardBg: isDarkMode ? '#ffffff' : '#ffffff', // الكروت في الصورة دائماً بيضاء لتعطي تباين
    searchBg: isDarkMode ? '#ffffff' : '#000b3d',
    searchTextColor: isDarkMode ? '#000b3d' : '#ffffff',
    searchBorder: isDarkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
  };

  return (
    <div style={{ direction: 'rtl', backgroundColor: theme.bgPage, minHeight: '100vh', transition: '0.5s', fontFamily: 'Cairo, sans-serif' }}>
      <style>{`
        .navbar-container { padding: 10px 0; }
        
        /* شريط البحث القديم (الدائري) */
        .search-container {
          background: ${theme.searchBg};
          border-radius: 60px; padding: 10px; display: flex; align-items: center;
          max-width: 850px; margin: 30px auto 60px auto; position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15); z-index: 1000;
        }
        .search-item { flex: 1; text-align: center; border-left: 1px solid ${theme.searchBorder}; cursor: pointer; position: relative; padding: 5px; }
        .search-item:last-child { border-left: none; }
        .search-label { color: #ff751f; font-size: 11px; font-weight: 900; margin-bottom: 2px; display: block; }
        .search-val { color: ${theme.searchTextColor}; font-size: 14px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 5px; }
        .search-btn-main { background: #ff751f; border: none; width: 52px; height: 52px; border-radius: 50%; color: white; cursor: pointer; margin-right: 10px; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .search-btn-main:hover { transform: scale(1.1); background: #e66418; }

        .dropdown-menu {
          position: absolute; top: 120%; left: 0; right: 0; background: white; border-radius: 20px;
          box-shadow: 0 15px 45px rgba(0,0,0,0.2); z-index: 2000; padding: 10px;
        }
        .dropdown-item { padding: 10px; border-radius: 12px; color: #000b3d; font-weight: bold; transition: 0.2s; cursor: pointer; text-align: center; }
        .dropdown-item:hover { background: #ff751f; color: white; }

        /* الكروت بالشكل المطلوب */
        .card { 
          background: white; border-radius: 35px; padding: 20px; 
          box-shadow: 0 15px 35px rgba(0,0,0,0.05); transition: 0.4s; position: relative;
          display: flex; flex-direction: column; text-align: center;
        }
        .card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .img-container { height: 180px; border-radius: 25px; overflow: hidden; margin-bottom: 15px; }
        .unit-title { color: #000b3d; font-size: 19px; font-weight: 900; margin: 0 0 5px 0; }
        .unit-price { color: #ff751f; font-size: 24px; font-weight: 900; }
        .unit-desc { color: #64748b; font-size: 13px; margin: 10px 0; line-height: 1.6; height: 40px; overflow: hidden; }
        
        .info-tag-container { display: flex; gap: 8px; margin-bottom: 15px; }
        .info-tag { flex: 1; background: #f1f5f9; border-radius: 12px; height: 45px; display: flex; align-items: center; justify-content: center; color: #000b3d; font-weight: bold; }
        
        .action-btn { 
          width: 100%; padding: 16px; border-radius: 22px; border: none; 
          background: #000b3d; color: white; font-weight: 900; cursor: pointer; 
          transition: 0.3s; margin-top: auto;
        }
        .action-btn:hover { background: #ff751f; }
      `}</style>

      {/* 1. الناف بار (اللوجو والدارك مود) */}
      <div className="navbar-container">
        <Navbar setActivePage={setActivePage} isDarkMode={isDarkMode} />
      </div>

      <div style={{ padding: '0 20px 60px' }}>
        
        {/* 2. شريط البحث القديم */}
        <div className="search-container">
          <button className="search-btn-main" onClick={handleSearch}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>

          <div className="search-item" onClick={() => setActiveMenu(activeMenu === 'gender' ? null : 'gender')}>
            <span className="search-label">النوع</span>
            <div className="search-val">{selectedGender} ⌵</div>
            {activeMenu === 'gender' && (
              <div className="dropdown-menu">
                {['ذكر', 'أنثى'].map(g => <div key={g} className="dropdown-item" onClick={(e) => { e.stopPropagation(); setSelectedGender(g); setActiveMenu(null); }}>{g}</div>)}
              </div>
            )}
          </div>

          <div className="search-item" onClick={() => setActiveMenu(activeMenu === 'area' ? null : 'area')}>
            <span className="search-label">المنطقة</span>
            <div className="search-val">{selectedArea} ⌵</div>
            {activeMenu === 'area' && (
              <div className="dropdown-box dropdown-menu">
                {locationsMap[selectedGov].map(a => <div key={a} className="dropdown-item" onClick={(e) => { e.stopPropagation(); setSelectedArea(a); setActiveMenu(null); }}>{a}</div>)}
              </div>
            )}
          </div>

          <div className="search-item" onClick={() => setActiveMenu(activeMenu === 'gov' ? null : 'gov')}>
            <span className="search-label">المحافظة</span>
            <div className="search-val">{selectedGov} ⌵</div>
            {activeMenu === 'gov' && (
              <div className="dropdown-box dropdown-menu">
                {Object.keys(locationsMap).map(g => (
                  <div key={g} className="dropdown-item" onClick={(e) => { e.stopPropagation(); setSelectedGov(g); setSelectedArea(locationsMap[g][0]); setActiveMenu(null); }}>{g}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. شبكة الوحدات بالشكل المطلوب */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1250px', margin: '0 auto' }}>
          {filteredUnits.map((unit) => (
            <div key={unit.id} className="card">
              <div style={{ position: 'absolute', top: '25px', left: '25px', background: 'white', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }} onClick={() => setFavorites(p => ({...p, [unit.id]: !p[unit.id]}))}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill={favorites[unit.id] ? "#ff4d4d" : "none"} stroke={favorites[unit.id] ? "#ff4d4d" : "#000b3d"} strokeWidth="2.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>

              <div className="img-container">
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="unit" />
              </div>

              <h3 className="unit-title">{unit.title}</h3>
              <div className="unit-price">{unit.price} <span style={{ fontSize: '12px', color: '#94a3b8' }}>ج.م</span></div>
              <p className="unit-desc">{unit.desc}</p>
              
              <div className="info-tag-container">
                <div className="info-tag">👤</div>
                <div className="info-tag" style={{ color: unit.wifi ? '#22c55e' : '#ff4d4d' }}>📡</div>
                <div className="info-tag">{unit.beds} 🛏️</div>
              </div>

              <button className="action-btn" onClick={() => { setSelectedUnitData(unit); setShowModal(true); }}>
                تفاصيل السكن
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && <ShowUnite isDarkMode={isDarkMode} unit={selectedUnitData} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ShowAllUnite;