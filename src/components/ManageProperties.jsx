import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const ManageProperties = ({ isDarkMode, onBack, onAddNew }) => {
  const [activeViewId, setActiveViewId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState(7500);
  const [withdrawData, setWithdrawData] = useState({ amount: '', method: 'فودافون كاش', number: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my_properties') || '[]');
    setProperties(saved);
  }, []);

  const toggleHide = (id) => {
    const updated = properties.map(p => {
      if (p.id === id) {
        const hasBookings = p.rooms.some(r => r.beds.some(b => b.isBooked));
        if (hasBookings && !p.isHidden) {
          alert("⚠️ لا يمكن إخفاء الوحدة: هناك أسرة محجوزة بالفعل.");
          return p;
        }
        return { ...p, isHidden: !p.isHidden };
      }
      return p;
    });
    setProperties(updated);
    localStorage.setItem('my_properties', JSON.stringify(updated));
  };

  const handleWithdraw = () => {
    const requestedAmount = parseFloat(withdrawData.amount);
    if (!requestedAmount || !withdrawData.number) return alert("❌ برجاء إدخال البيانات كاملة");
    if (requestedAmount > walletBalance) return alert(`❌ رصيدك متاح منه ${walletBalance} فقط`);

    alert(`✅ تم إرسال طلب سحب ${requestedAmount} ج.م عبر ${withdrawData.method}`);
    setWalletBalance(prev => prev - requestedAmount);
    setShowWalletModal(false);
    setWithdrawData({ amount: '', method: 'فودافون كاش', number: '' });
  };

  const theme = {
    text: isDarkMode ? '#ffffff' : '#000b3d',
    bgPage: isDarkMode ? '#0a0b14' : '#f8fafc',
    cardBg: isDarkMode ? '#1a1b26' : '#ffffff',
  };

  return (
    <ManageContainer theme={theme}>
      {/* التنقل العلوي */}
      <TopNavigation isDarkMode={isDarkMode}>
        <LargeBackButton onClick={onBack}>
          <span className="icon">🔙</span> العودة للملف الشخصي
        </LargeBackButton>
        
        <WalletButton onClick={() => setShowWalletModal(true)}>
          <span className="icon">💰</span> المحفظة: {walletBalance} ج.م
        </WalletButton>
      </TopNavigation>

      {properties.length === 0 ? (
        <EmptyState theme={theme}>
          <div className="icon-wrapper">🏢</div>
          <h2>ابدأ رحلتك مع "مأوى"</h2>
          <AddMainBtn onClick={onAddNew}>➕ أضف وحدتك الأولى الآن</AddMainBtn>
        </EmptyState>
      ) : (
        <>
          <HeaderRow theme={theme}>
            <div className="title-area">
              <h1>لوحة الإدارة <span>عقاراتي</span></h1>
              <p>لديك {properties.length} وحدات مسجلة</p>
            </div>
            <AddAnotherBtn onClick={onAddNew}>➕ إضافة وحدة جديدة</AddAnotherBtn>
          </HeaderRow>

          <Grid>
            {properties.map((prop, idx) => (
              <PropCard key={prop.id} theme={theme} isHidden={prop.isHidden} delay={idx * 0.1}>
                {/* الجزء العلوي للكارت (الصورة والحالة) */}
                <div className="image-wrapper">
                  <img src={prop.image || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500"} alt="" />
                  <div className={`status-badge ${prop.isHidden ? 'hidden' : ''}`}>
                    {prop.isHidden ? '🚫 مخفية' : '✅ معروضة'}
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="title">{prop.title}</h3>
                  <div className="price">{prop.price || '0'} <span>ج.م</span></div>
                  <p className="loc">📍 {prop.location}</p>

                  <StatsRow isDarkMode={isDarkMode}>
                    <div className="stat-item">
                      <span className="val">{prop.rooms?.length || 0}</span>
                      <span className="lab">غرف</span>
                    </div>
                    <div className="stat-item">
                      <span className="val">
                        {prop.rooms?.reduce((acc, r) => acc + r.beds.filter(b => b.isBooked).length, 0) || 0}
                      </span>
                      <span className="lab">طلاب</span>
                    </div>
                  </StatsRow>

                  <ActionArea>
                    <button className="main-btn" onClick={() => setActiveViewId(activeViewId === prop.id ? null : prop.id)}>
                      {activeViewId === prop.id ? 'إغلاق الحالة' : 'تفاصيل السكن'}
                    </button>
                    <button className={`toggle-btn ${prop.isHidden ? 'show' : 'hide'}`} onClick={() => toggleHide(prop.id)}>
                      {prop.isHidden ? '👁️ إظهار' : '🚫 إخفاء'}
                    </button>
                  </ActionArea>
                </div>

                {/* عرض السراير بنفس ستايل StatusPanel الأنيق */}
                {activeViewId === prop.id && (
                  <StatusPanel isDarkMode={isDarkMode}>
                    {prop.rooms.map(room => (
                      <div key={room.id} className="room-box">
                        <p>غرفة {room.id}</p>
                        <div className="beds-flex">
                          {room.beds.map(bed => (
                            <BedItem 
                              key={bed.id} 
                              isBooked={bed.isBooked}
                              onClick={() => bed.isBooked && setSelectedStudent(bed.student)}
                            >
                              {bed.isBooked ? '👤' : '🛏️'}
                              <span>{bed.isBooked ? 'محجوز' : 'متاح'}</span>
                            </BedItem>
                          ))}
                        </div>
                      </div>
                    ))}
                  </StatusPanel>
                )}
              </PropCard>
            ))}
          </Grid>
        </>
      )}

      {/* مودال السحب */}
      {showWalletModal && (
        <Overlay onClick={() => setShowWalletModal(false)}>
          <GlassModal onClick={e => e.stopPropagation()} isDarkMode={isDarkMode}>
            <WalletHeader>
              <h3>💸 طلب سحب رصيد</h3>
              <div className="balance-tag">{walletBalance} ج.م</div>
            </WalletHeader>
            <InputGroup isDarkMode={isDarkMode}>
              <label>المبلغ</label>
              <input type="number" placeholder="0.00" value={withdrawData.amount} onChange={e => setWithdrawData({...withdrawData, amount: e.target.value})} />
            </InputGroup>
            <InputGroup isDarkMode={isDarkMode}>
              <label>وسيلة الاستلام</label>
              <select value={withdrawData.method} onChange={e => setWithdrawData({...withdrawData, method: e.target.value})}>
                <option>فودافون كاش</option>
                <option>انستا باي (InstaPay)</option>
                <option>اتصالات كاش</option>
              </select>
            </InputGroup>
            <InputGroup isDarkMode={isDarkMode}>
              <label>الرقم / العنوان</label>
              <input type="text" placeholder="01xxxxxxxxx" value={withdrawData.number} onChange={e => setWithdrawData({...withdrawData, number: e.target.value})} />
            </InputGroup>
            <ConfirmBtn onClick={handleWithdraw}>تأكيد العملية</ConfirmBtn>
            <CancelLink onClick={() => setShowWalletModal(false)}>إلغاء</CancelLink>
          </GlassModal>
        </Overlay>
      )}

      {/* مودال الطالب */}
      {selectedStudent && (
        <Overlay onClick={() => setSelectedStudent(null)}>
          <GlassModal onClick={e => e.stopPropagation()} isDarkMode={isDarkMode}>
            <div className="pfp-container"><img src={selectedStudent.image} alt="pfp" /></div>
            <h2>{selectedStudent.name}</h2>
            <p style={{color: '#888'}}>{selectedStudent.college} | {selectedStudent.level}</p>
            <CloseButton onClick={() => setSelectedStudent(null)}>إغلاق النافذة</CloseButton>
          </GlassModal>
        </Overlay>
      )}
    </ManageContainer>
  );
};

/* --- الستايلات المطورة --- */

const ManageContainer = styled.div`
  padding: 120px 5% 50px; direction: rtl; min-height: 100vh;
  background: ${props => props.theme.bgPage};
  font-family: 'Cairo', sans-serif; transition: 0.4s;
`;

const TopNavigation = styled.div`
  position: fixed; top: 0; left: 0; right: 0; 
  padding: 20px 5%; display: flex; justify-content: space-between; align-items: center;
  background: ${props => props.isDarkMode ? 'rgba(10,11,20,0.85)' : 'rgba(255,255,255,0.85)'};
  backdrop-filter: blur(15px); z-index: 1000; border-bottom: 1px solid rgba(136,136,136,0.1);
`;

const LargeBackButton = styled.button`
  display: flex; align-items: center; gap: 10px; padding: 10px 20px;
  background: #ff751f; color: white; border: none; border-radius: 15px;
  font-weight: bold; cursor: pointer;
`;

const WalletButton = styled.button`
  padding: 10px 20px; background: #2ed573; color: white; border: none;
  border-radius: 15px; font-weight: bold; cursor: pointer;
`;

const HeaderRow = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;
  h1 { color: ${props => props.theme.text}; font-size: 1.8rem; span { color: #ff751f; } }
  p { color: #888; font-weight: bold; }
`;

const AddAnotherBtn = styled.button`
  padding: 10px 20px; border-radius: 15px; border: 2px solid #ff751f;
  background: transparent; color: #ff751f; font-weight: 800; cursor: pointer;
  transition: 0.2s; &:hover { background: #ff751f; color: white; }
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px;
`;

const fadeIn = keyframes` from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } `;

const PropCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 35px; overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.05);
  animation: ${fadeIn} 0.5s ease forwards;
  opacity: 0; animation-delay: ${props => props.delay}s;
  border: 1px solid rgba(0,0,0,0.05);
  position: relative;
  opacity: ${props => props.isHidden ? 0.7 : 1};

  .image-wrapper { height: 180px; position: relative; }
  .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
  .status-badge {
    position: absolute; top: 15px; right: 15px; padding: 5px 12px;
    background: #2ed573; color: white; border-radius: 20px; font-size: 11px; font-weight: bold;
  }
  .status-badge.hidden { background: #ff4757; }

  .card-content { padding: 20px; text-align: center; }
  .title { font-size: 18px; color: #000b3d; margin-bottom: 5px; }
  .price { font-size: 22px; font-weight: 900; color: #ff751f; }
  .price span { font-size: 12px; color: #888; }
  .loc { font-size: 13px; color: #64748b; margin: 10px 0; }
`;

const StatsRow = styled.div`
  display: flex; gap: 10px; margin: 15px 0; background: #f8fafc; padding: 10px; border-radius: 15px;
  .stat-item { flex: 1; text-align: center; display: flex; flex-direction: column; }
  .val { color: #000b3d; font-weight: 900; font-size: 16px; }
  .lab { font-size: 10px; color: #888; font-weight: bold; }
`;

const ActionArea = styled.div`
  display: flex; gap: 10px; margin-top: 15px;
  .main-btn { flex: 2; padding: 12px; border-radius: 15px; border: none; background: #000b3d; color: white; font-weight: bold; cursor: pointer; }
  .toggle-btn { flex: 1; padding: 12px; border-radius: 15px; border: 1px solid #ddd; background: #f8fafc; cursor: pointer; }
`;

const StatusPanel = styled.div`
  padding: 20px; background: rgba(0,0,0,0.02); border-top: 1px solid #eee;
  .room-box p { font-size: 12px; font-weight: 900; color: #ff751f; margin-bottom: 8px; }
  .beds-flex { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
`;

const BedItem = styled.div`
  display: flex; flex-direction: column; align-items: center; padding: 8px;
  border-radius: 12px; border: 1px solid ${props => props.isBooked ? '#ff4757' : '#2ed573'};
  background: white; min-width: 55px; cursor: pointer;
  span { font-size: 9px; font-weight: bold; color: ${props => props.isBooked ? '#ff4757' : '#2ed573'}; }
`;

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 2000;
`;

const GlassModal = styled.div`
  background: ${props => props.isDarkMode ? '#1a1d2e' : '#fff'};
  width: 90%; max-width: 380px; padding: 30px; border-radius: 40px; text-align: center;
  .pfp-container img { width: 90px; height: 90px; border-radius: 50%; border: 3px solid #ff751f; margin-bottom: 15px; }
`;

const WalletHeader = styled.div`
  margin-bottom: 20px; .balance-tag { font-size: 2rem; font-weight: 900; color: #2ed573; }
`;

const InputGroup = styled.div`
  text-align: right; margin-bottom: 15px;
  label { font-size: 11px; font-weight: bold; color: #888; }
  input, select { width: 100%; padding: 12px; border-radius: 12px; border: 1px solid #ddd; outline: none; }
`;

const ConfirmBtn = styled.button`
  width: 100%; padding: 14px; background: #2ed573; color: white; border: none; border-radius: 15px; font-weight: bold; cursor: pointer;
`;

const CancelLink = styled.p` margin-top: 15px; color: #ff4757; cursor: pointer; font-size: 13px; font-weight: bold; `;

const CloseButton = styled.button` width: 100%; padding: 12px; background: #ff751f; border: none; border-radius: 15px; color: white; font-weight: bold; margin-top: 20px; cursor: pointer; `;

const EmptyState = styled.div`
  text-align: center; padding: 100px 20px;
  .icon-wrapper { font-size: 60px; margin-bottom: 20px; }
  h2 { color: ${props => props.theme.text}; }
`;

const AddMainBtn = styled.button`
  padding: 15px 30px; background: #ff751f; color: white; border: none; border-radius: 50px; font-weight: bold; margin-top: 20px; cursor: pointer;
`;

export default ManageProperties;