import React, { useState } from 'react';
import ShowUnite from './ShowUnite'; 

// أضفنا setActivePage للمدخلات (Props) ليتمكن الزر من تغيير الصفحة
const UnitsList = ({ isDarkMode, favorites, setFavorites, setActivePage }) => {
  const [selectedGov, setSelectedGov] = useState('سوهاج');
  const [selectedArea, setSelectedArea] = useState('سيد');
  const [selectedGender, setSelectedGender] = useState('أنثى');
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const [showModal, setShowModal] = useState(false); 
  const [selectedUnitData, setSelectedUnitData] = useState(null); 

  const locationsMap = {
    'سوهاج': ['سيد', 'ستى', 'الشهيد', 'الثقافة'],
    'أسيوط': ['فريال', 'المكتبات', 'يسرى راغب', 'نميس']
  };

  const initialUnits = [
    { id: 1, title: "فيلا مودرن - حي سيد", price: "3,200", beds: 1, wifi: true, type: 'person', desc: "غرفة سينجل فاخرة للمغتربين الباحثين عن الرفاهية والهدوء المطلق." },
    { id: 2, title: "وحدة شباب - يسرى راغب", price: "1,400", beds: 4, wifi: false, type: 'cross', desc: "سكن اقتصادي ونظيف جداً بقلب مدينة أسيوط." },
    { id: 3, title: "سكن هادئ - المكتبات", price: "1,800", beds: 3, wifi: true, type: 'person', desc: "بيئة مثالية للمذاكرة مع تكييف وإنترنت فائق السرعة." },
    { id: 4, title: "شقة النخبة - فريال", price: "2,500", beds: 2, wifi: true, type: 'moon', desc: "تصميم عصري جداً، قريبة من كل المواصلات والخدمات." }
  ];

  const theme = {
    text: isDarkMode ? '#ffffff' : '#000b3d',
    subText: isDarkMode ? '#0a0b14' : '#a0aec0',
    bgPage: isDarkMode ? '#0a0b14' : '#f8fafc',
    searchBg: isDarkMode ? '#ffffff' : '#000b3d',
    searchTextColor: isDarkMode ? '#000b3d' : '#ffffff',
    searchBorder: isDarkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
  };

  return (
    <div style={{ direction: 'rtl', padding: '60px 20px', backgroundColor: theme.bgPage, minHeight: '100vh', transition: '0.5s', fontFamily: 'Cairo, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
        
        .search-container {
          background: ${theme.searchBg};
          border-radius: 60px; padding: 10px; display: flex; align-items: center;
          max-width: 850px; margin: 0 auto 60px auto; position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          z-index: 1000;
        }

        .search-btn-main {
          background: #ff751f; border: none; width: 52px; height: 52px; 
          border-radius: 50%; color: white; cursor: pointer; 
          display: flex; align-items: center; justify-content: center; 
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(255, 117, 31, 0.4);
        }
        .search-btn-main:hover { background: #ff8b45; transform: scale(1.05); }
        .search-btn-main:active { transform: scale(0.9); }

        .search-item { 
          flex: 1; padding: 10px 15px; border-left: 1px solid ${theme.searchBorder}; 
          display: flex; flex-direction: column; align-items: center; cursor: pointer; 
          position: relative; transition: 0.2s; border-radius: 40px;
        }
        .search-item:hover { background: ${isDarkMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'}; }
        .search-item:last-child { border-left: none; }

        .label { color: #ff751f; font-size: 11px; font-weight: 900; }
        .val { color: ${theme.searchTextColor}; font-size: 14px; font-weight: bold; display: flex; align-items: center; gap: 4px; }

        .dropdown-menu {
          position: absolute; top: 115%; left: 0; right: 0; 
          background: white; border-radius: 20px; 
          box-shadow: 0 15px 45px rgba(0,0,0,0.3); 
          z-index: 2000; padding: 10px; animation: slideUp 0.3s ease forwards;
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        .dropdown-item { padding: 12px; border-radius: 15px; color: #000b3d; font-weight: bold; transition: 0.2s; text-align: center; }
        .dropdown-item:hover { background: #ff751f; color: white; }

        .card { 
          background: white; border-radius: 35px; padding: 20px; 
          box-shadow: 0 15px 35px rgba(0,0,0,0.05); transition: 0.4s; position: relative;
          display: flex; flex-direction: column; height: 490px; z-index: 1;
        }
        .card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }

        .action-btn { 
          width: 100%; padding: 16px; border-radius: 22px; border: none; 
          background: #000b3d; color: white; font-weight: 900; cursor: pointer; 
          transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .action-btn:hover { background: #ff751f; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(255, 117, 31, 0.2); }
        .action-btn:active { transform: scale(0.94); }

        .load-more-btn { 
          background: #ff751f; color: white; border: none; padding: 18px 50px; 
          border-radius: 50px; font-weight: 900; cursor: pointer; transition: 0.4s; 
          display: flex; align-items: center; gap: 10px; margin: 50px auto;
          box-shadow: 0 10px 20px rgba(255, 117, 31, 0.2);
        }
        .load-more-btn:hover { background: #e66418; padding: 18px 60px; }
        .load-more-btn:active { transform: scale(0.92); }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 900, color: theme.text }}>استكشف منزلك القادم</h1>
        <p style={{ color: theme.subText, fontSize: '18px', fontWeight: 'bold' }}>وحدات سكنية حصرية في قلب {selectedGov}</p>
      </div>

      <div className="search-container">
        <button className="search-btn-main">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>

        <div className="search-item" onClick={() => setActiveMenu(activeMenu === 'gender' ? null : 'gender')}>
          <span className="label">النوع</span>
          <div className="val">{selectedGender} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg></div>
          {activeMenu === 'gender' && (
            <div className="dropdown-menu">
              {['ذكر', 'أنثى'].map(g => <div key={g} className="dropdown-item" onClick={(e) => { e.stopPropagation(); setSelectedGender(g); setActiveMenu(null); }}>{g}</div>)}
            </div>
          )}
        </div>

        <div className="search-item" onClick={() => setActiveMenu(activeMenu === 'area' ? null : 'area')}>
          <span className="label">المنطقة</span>
          <div className="val">{selectedArea} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg></div>
          {activeMenu === 'area' && (
            <div className="dropdown-menu">
              {locationsMap[selectedGov].map(a => <div key={a} className="dropdown-item" onClick={(e) => { e.stopPropagation(); setSelectedArea(a); setActiveMenu(null); }}>{a}</div>)}
            </div>
          )}
        </div>

        <div className="search-item" onClick={() => setActiveMenu(activeMenu === 'gov' ? null : 'gov')}>
          <span className="label">المحافظة</span>
          <div className="val">{selectedGov} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg></div>
          {activeMenu === 'gov' && (
            <div className="dropdown-menu">
              {Object.keys(locationsMap).map(g => (
                <div key={g} className="dropdown-item" onClick={(e) => { e.stopPropagation(); setSelectedGov(g); setSelectedArea(locationsMap[g][0]); setActiveMenu(null); }}>{g}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1250px', margin: '0 auto' }}>
        {initialUnits.map((unit) => (
          <div key={unit.id} className="card">
            <div className="heart-badge" onClick={() => setFavorites(p => ({...p, [unit.id]: !p[unit.id]}))} style={{position:'absolute', top:'25px', left:'25px', background:'white', width:'42px', height:'42px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 5px 15px rgba(0,0,0,0.1)', cursor:'pointer', zIndex:10}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill={favorites[unit.id] ? "#ff4d4d" : "none"} stroke={favorites[unit.id] ? "#ff4d4d" : "#000b3d"} strokeWidth="2.5" style={{transition:'0.3s'}}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>

            <div style={{ height: '180px', borderRadius: '25px', overflow: 'hidden', marginBottom: '15px' }}>
              <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="unit" />
            </div>

            <div style={{textAlign: 'center', flexGrow: 1}}>
              <h3 style={{ color: '#000b3d', fontSize: '19px', fontWeight: '900', margin: '0 0 5px 0' }}>{unit.title}</h3>
              <div style={{ color: '#ff751f', fontSize: '24px', fontWeight: '900' }}>{unit.price} <span style={{ fontSize: '12px', color: '#94a3b8' }}>ج.م</span></div>
              <p style={{ color: '#64748b', fontSize: '13px', margin: '10px 0', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '42px' }}>{unit.desc}</p>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
                <div style={{flex: 1, background: '#f1f5f9', borderRadius: '12px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000b3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div style={{flex: 1, background: '#f1f5f9', borderRadius: '12px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={unit.wifi ? '#22c55e' : '#ff4d4d'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                </div>
                <div style={{flex: 1, background: '#f1f5f9', borderRadius: '12px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000b3d', fontWeight: 'bold', gap: '4px'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
                  <span style={{fontSize: '14px'}}>{unit.beds}</span>
                </div>
              </div>
            </div>

            <button 
              className="action-btn" 
              onClick={() => {
                setSelectedUnitData(unit);
                setShowModal(true);
              }}
            >
              تفاصيل السكن
            </button>
          </div>
        ))}
      </div>

      {/* التعديل هنا: عند الضغط يتم الانتقال لصفحة الكل */}
      <button 
        className="load-more-btn" 
        onClick={() => {
            setLoadingMore(true); 
            setTimeout(() => {
                setLoadingMore(false);
                if (setActivePage) setActivePage('Show_all_unite'); // اسم الصفحة المطلوب عرضها
            }, 800);
        }}
      >
        {loadingMore ? 'جاري التحميل...' : 'عرض المزيد من الوحدات'}
      </button>

      {showModal && (
        <ShowUnite 
          isDarkMode={isDarkMode} 
          unit={selectedUnitData} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default UnitsList;