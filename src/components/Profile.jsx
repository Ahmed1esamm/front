import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Navbar from './Navbar'; 
import Switch from './Switch'; 

const Profile = ({ isDarkMode, setIsDarkMode, setActivePage, favorites = {}, setFavorites }) => {
  const [userType, setUserType] = useState('student');
  const [activeTab, setActiveTab] = useState('edit');
  const [image, setImage] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [rating, setRating] = useState(4); 
  
  // حالة حجوزات السكن (مثال لبيانات محجوزة)
  const [myBookings, setMyBookings] = useState([
    { id: 101, title: "فيلا مودرن - حي سيد", date: "2024-05-15", status: "مؤكد", price: "3,200" },
    { id: 102, title: "وحدة شباب - يسرى راغب", date: "2024-06-01", status: "قيد الانتظار", price: "1,400" }
  ]);

  const [mealSelections, setMealSelections] = useState({}); 
  const [currentMonthDays, setCurrentMonthDays] = useState([]);
  const [monthName, setMonthName] = useState("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    setMonthName(now.toLocaleString('ar-EG', { month: 'long', year: 'numeric' }));

    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }
    setCurrentMonthDays(daysArray);
  }, []);

  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'مرحباً بك! كيف يمكننا مساعدتك اليوم؟' }
  ]);

  const allUnits = [
    { id: 1, title: "فيلا مودرن - حي سيد", price: "3,200", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" },
    { id: 2, title: "وحدة شباب - يسرى راغب", price: "1,400", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" },
    { id: 3, title: "سكن هادئ - المكتبات", price: "1,800", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" },
    { id: 4, title: "شقة النخبة - فريال", price: "2,500", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" }
  ];

  const favoriteUnits = allUnits.filter(unit => favorites[unit.id]);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(URL.createObjectURL(file));
  };

  const handleMealSelect = (dateStr, field, value) => {
    setMealSelections(prev => {
      const newSelections = { ...prev };
      const current = newSelections[dateStr] || { protein: "none", veggie: "بطاطس" };
      if (field === "protein" && value === "none") {
        delete newSelections[dateStr];
      } else {
        newSelections[dateStr] = { ...current, [field]: value };
      }
      return newSelections;
    });
  };

  const isDateDisabled = (date) => {
    const now = new Date();
    const limitDate = new Date();
    limitDate.setHours(0, 0, 0, 0);
    limitDate.setDate(now.getDate() + 2); 
    return date < limitDate;
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatLog([...chatLog, { sender: 'user', text: message }]);
      setMessage('');
      setTimeout(() => {
        setChatLog(prev => [...prev, { sender: 'bot', text: 'شكراً لتواصلك معنا، سيقوم أحد ممثلينا بالرد عليك قريباً.' }]);
      }, 1000);
    }
  };

  return (
    <ProfileContainer isDarkMode={isDarkMode}>
      <FullWidthHeader isDarkMode={isDarkMode}>
        <div className="header-inner">
          <div className="side-section right-align">
            <Switch isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
          <div className="nav-center-area">
            <div className="nav-wrapper-ltr">
              <Navbar setActivePage={setActivePage} isDarkMode={isDarkMode} />
            </div>
          </div>
          <div className="logo-section left-align" onClick={() => setActivePage('home')}>
              <svg viewBox="0 0 500 150" style={{ width: '150px', overflow: 'visible' }}>
                <text x="170" y="25" fontFamily="Arial" fontWeight="900" fontSize="80" fill="#FFFFFF">ء</text>
                <text x="800" y="160" fontFamily="Arial" fontWeight="900" fontSize="180" fill="#ff751f">مـــــــــــــــاوى</text>
                <text x="710" y="100" fontFamily="Arial" fontWeight="900" fontSize="130" fill="#FFFFFF">MA<tspan fill="#ff751f">'</tspan>WA</text>
              </svg>
          </div>
        </div>
      </FullWidthHeader>

      <ContentWrapper isDarkMode={isDarkMode}>
        <div className="profile-layout">
          <aside className="sidebar-glass">
            <div className="user-profile-card">
              <div className="avatar-wrapper">
                <img src={image || "https://via.placeholder.com/150"} alt="User" />
                <label htmlFor="upload" className="edit-badge"><span className="plus">+</span></label>
                <input type="file" id="upload" onChange={(e) => handleImageUpload(e, setImage)} hidden />
              </div>
              <h3 className="user-name">أحمد محمد</h3>
              <StarRating>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= rating ? 'star filled' : 'star'} onClick={() => setRating(star)}>★</span>
                ))}
                <span className="rating-num">({rating}.0)</span>
              </StarRating>
              <span className="status-badge">{userType === 'student' ? 'حساب طالب' : 'حساب مالك'}</span>
            </div>

            <nav className="glass-menu">
              <button className={activeTab === 'edit' ? 'active' : ''} onClick={() => setActiveTab('edit')}>تعديل الملف الشخصي</button>
              
              {/* زر حجوزاتي الجديد */}
              <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>حجوزاتي</button>
              
              <button className={activeTab === 'favorites' ? 'active' : ''} onClick={() => setActiveTab('favorites')}>المفضلة ({favoriteUnits.length})</button>
              
              {userType === 'student' && (
                <button className={activeTab === 'meal-booking' ? 'active' : ''} onClick={() => setActiveTab('meal-booking')}>حجز الوجبات</button>
              )}
              {userType === 'owner' && (
                <button className="special-btn" onClick={() => setActivePage('add-property')}>عرض وحدتك السكنية</button>
              )}
              <button className={activeTab === 'support' ? 'active' : ''} onClick={() => setActiveTab('support')}>الدعم الفني</button>
            </nav>
          </aside>

          <main className="form-card-main">
            <div className="glass-header">
              <h2>
                {activeTab === 'edit' ? 'إعدادات الحساب' : 
                 activeTab === 'bookings' ? 'رحلاتي وحجوزاتي' :
                 activeTab === 'favorites' ? 'قائمة المفضلة' : 
                 activeTab === 'meal-booking' ? 'جدول الوجبات الشهري' : 'الدعم الفني'}
              </h2>
              <div className="custom-tabs">
                <button className={userType === 'student' ? 'active' : ''} onClick={() => setUserType('student')}>طالب</button>
                <button className={userType === 'owner' ? 'active' : ''} onClick={() => setUserType('owner')}>مالك</button>
              </div>
            </div>

            {activeTab === 'edit' ? (
              <div className="form-container">
                <div className="form-section-title">البيانات الشخصية</div>
                <div className="modern-grid">
                  <div className="field"><label>الاسم الأول</label><input type="text" /></div>
                  <div className="field"><label>الاسم الثاني</label><input type="text" /></div>
                  <div className="field"><label>الاسم الثالث</label><input type="text" /></div>
                  <div className="field"><label>رقم الهاتف</label><input type="tel" /></div>
                  <div className="field"><label>رقم الواتساب</label><input type="tel" /></div>
                  <div className="field"><label>البريد الإلكتروني</label><input type="email" /></div>
                  <div className="field"><label>الرقم القومي</label><input type="text" /></div>
                  <div className="field"><label>تاريخ الميلاد</label><input type="date" /></div>
                  <div className="field"><label>الجنسية</label><input type="text" /></div>
                  <div className="field"><label>النوع</label><select><option>ذكر</option><option>أنثى</option></select></div>
                  <div className="field"><label>البلد</label><input type="text" /></div>
                  <div className="field"><label>المحافظة</label><input type="text" /></div>
                  <div className="field"><label>المدينة / المركز</label><input type="text" /></div>
                  
                  <div className="field full">
                    <label>صورة البطاقة أو جواز السفر</label>
                    <div className="id-upload-container">
                        <input type="file" id="id-upload" onChange={(e) => handleImageUpload(e, setIdCard)} hidden />
                        <label htmlFor="id-upload" className="id-placeholder">
                            {idCard ? <img src={idCard} alt="ID" /> : "اضغط هنا لرفع صورة المستند +"}
                        </label>
                    </div>
                  </div>
                </div>

                {userType === 'student' && (
                  <>
                    <div className="form-section-title" style={{marginTop: '30px'}}>بيانات الطالب والسكن</div>
                    <div className="modern-grid">
                      <div className="field"><label>الجامعة</label><input type="text" /></div>
                      <div className="field"><label>الكلية</label><input type="text" /></div>
                      <div className="field"><label>البرنامج (التخصص)</label><input type="text" /></div>
                      <div className="field"><label>الفرقة الدراسية</label><input type="text" /></div>
                      <div className="field"><label>هل الكلية عملية؟</label><select><option>لا</option><option>نعم</option></select></div>
                      <div className="field"><label>هل أنت مدخن؟</label><select><option>لا</option><option>نعم</option></select></div>
                      <div className="field"><label>تعاني من مرض مزمن؟</label><select><option>لا</option><option>نعم</option></select></div>
                      <div className="field"><label>تفاصيل المرض (إن وجد)</label><input type="text" /></div>
                      <div className="field full"><label>هل تقبل العيش مع طلاب من غير كليتك؟</label><select><option>نعم، أقبل</option><option>لا، أفضل من نفس كليتي</option></select></div>
                    </div>
                  </>
                )}
                <button className="gradient-save-btn">حفظ كافة التغييرات</button>
              </div>
            ) : activeTab === 'bookings' ? (
                /* قسم الحجوزات الجديد */
                <BookingsList isDarkMode={isDarkMode}>
                  {myBookings.map(book => (
                    <div key={book.id} className="booking-item">
                      <div className="booking-info">
                        <h4>{book.title}</h4>
                        <p>تاريخ الحجز: {book.date}</p>
                        <span className="price">{book.price} ج.م / شهر</span>
                      </div>
                      <div className="booking-status">
                        <span className={`status-pill ${book.status === 'مؤكد' ? 'confirmed' : 'pending'}`}>
                          {book.status}
                        </span>
                        <button className="details-btn">التفاصيل</button>
                      </div>
                    </div>
                  ))}
                </BookingsList>
            ) : activeTab === 'favorites' ? (
                <FavoritesGrid isDarkMode={isDarkMode}>
                  {favoriteUnits.length > 0 ? (
                    favoriteUnits.map(unit => (
                      <div key={unit.id} className="fav-card">
                        <img src={unit.img} alt={unit.title} />
                        <div className="fav-details">
                          <h4>{unit.title}</h4>
                          <p>{unit.price} ج.م</p>
                          <div className="btn-group">
                             <button className="view-btn" onClick={() => setActivePage('home')}>عرض</button>
                             <button className="remove-btn" onClick={() => setFavorites(p => ({...p, [unit.id]: false}))}>إزالة</button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <EmptyStateWrapper>
                        <div className="big-heart">❤️</div>
                        <h3>المفضلة خالية</h3>
                        <p>ابحث عن وحدتك المثالية وأضفها هنا</p>
                        <button className="go-home" onClick={() => setActivePage('home')}>استكشف الآن</button>
                    </EmptyStateWrapper>
                  )}
                </FavoritesGrid>
            ) : activeTab === 'meal-booking' ? (
              <MealBookingContainer isDarkMode={isDarkMode}>
                <div className="calendar-header">
                  <div className="month-badge">{monthName}</div>
                  <div className="meal-info-box">
                    <span>الوجبة الأساسية: 🍚 أرز + 🥗 سلطة + 🥖 خبز</span>
                  </div>
                </div>
                
                <div className="calendar-grid">
                  {currentMonthDays.map((date, index) => {
                    const dateStr = date.toDateString();
                    const disabled = isDateDisabled(date);
                    const selection = mealSelections[dateStr];
                    
                    return (
                      <div 
                        key={index} 
                        className={`date-cell ${disabled ? 'disabled' : ''} ${selection ? 'selected' : ''}`}
                      >
                        <span className="day-num">{date.getDate()}</span>
                        <span className="day-name">{date.toLocaleString('ar-EG', { weekday: 'short' })}</span>
                        
                        {!disabled && (
                          <div className="meal-controls">
                            <select 
                              className="meal-select"
                              value={selection?.protein || "none"}
                              onChange={(e) => handleMealSelect(dateStr, "protein", e.target.value)}
                            >
                              <option value="none">بدون وجبة</option>
                              <option value="لحم">لحم</option>
                              <option value="فراخ">فراخ</option>
                              <option value="سمك">سمك</option>
                            </select>

                            {selection?.protein && selection.protein !== "none" && (
                              <select 
                                className="veggie-select"
                                value={selection?.veggie || "بطاطس"}
                                onChange={(e) => handleMealSelect(dateStr, "veggie", e.target.value)}
                              >
                                <option value="بطاطس">بطاطس</option>
                                <option value="مكس خضار">مكس خضار</option>
                              </select>
                            )}
                          </div>
                        )}

                        {selection && selection.protein !== "none" && (
                          <div className="check-mark">
                            ✅ {selection.protein} + {selection.veggie}
                          </div>
                        )}
                        {disabled && <div className="lock-icon">🔒 مغلق</div>}
                      </div>
                    );
                  })}
                </div>
                
                <button 
                  className="gradient-save-btn" 
                  onClick={() => alert(`تم تأكيد حجز ${Object.keys(mealSelections).length} وجبة لشهر ${monthName}`)}
                >
                  تأكيد الجدول الشهري ({Object.keys(mealSelections).length} يوم)
                </button>
              </MealBookingContainer>
            ) : (
                <ChatContainer isDarkMode={isDarkMode}>
                  <div className="chat-window">
                    {chatLog.map((msg, i) => (
                      <div key={i} className={`bubble ${msg.sender}`}>{msg.text}</div>
                    ))}
                  </div>
                  <div className="chat-input-area">
                    <input 
                      type="text" 
                      placeholder="اكتب رسالتك هنا..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage}>إرسال</button>
                  </div>
                </ChatContainer>
            )}
          </main>
        </div>
      </ContentWrapper>
    </ProfileContainer>
  );
};

/* --- التنسيقات الإضافية --- */

const BookingsList = styled.div`
  display: flex; flex-direction: column; gap: 15px;
  .booking-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px; border-radius: 15px;
    background: ${props => props.isDarkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9'};
    border: 1px solid rgba(255,117,31,0.2);
    
    .booking-info {
      h4 { margin: 0 0 5px 0; color: #ff751f; }
      p { margin: 0; font-size: 0.85rem; opacity: 0.8; }
      .price { display: block; margin-top: 5px; font-weight: bold; }
    }

    .booking-status {
      display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
      .status-pill {
        padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: bold;
        &.confirmed { background: #2ecc71; color: white; }
        &.pending { background: #f1c40f; color: black; }
      }
      .details-btn {
        background: transparent; border: 1px solid #ff751f; color: #ff751f;
        padding: 5px 15px; border-radius: 8px; cursor: pointer; font-size: 0.8rem;
        &:hover { background: #ff751f; color: white; }
      }
    }
  }
`;

// ... بقية الـ Styled Components الموجودة في كودك الأصلي بدون تغيير ...
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const MealBookingContainer = styled.div`
  .calendar-header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;
    .month-badge { background: #ff751f; color: white; padding: 10px 20px; border-radius: 10px; font-weight: bold; }
    .meal-info-box { background: rgba(255,117,31,0.1); padding: 10px 15px; border-radius: 10px; border: 1px solid #ff751f; font-size: 0.9rem; font-weight: bold; }
  }

  .calendar-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;
  }

  .date-cell {
    min-height: 140px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
    background: ${props => props.isDarkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9'};
    border-radius: 16px; transition: all 0.2s; position: relative; border: 2px solid transparent; padding: 12px;
    
    .day-num { font-size: 1.2rem; font-weight: bold; }
    .day-name { font-size: 0.75rem; opacity: 0.7; margin-bottom: 8px; }
    
    .meal-controls {
      width: 100%; display: flex; flex-direction: column; gap: 4px;
      .meal-select, .veggie-select {
        width: 100%; padding: 4px; border-radius: 6px; border: 1px solid #ccc; 
        background: white; color: black; font-size: 0.75rem; cursor: pointer;
      }
      .veggie-select { border-color: #ff751f; border-style: dashed; }
    }

    .check-mark { margin-top: 8px; font-size: 0.65rem; color: #ff751f; font-weight: bold; text-align: center; }
    
    &.selected {
      background: rgba(255, 117, 31, 0.08); border-color: #ff751f;
      .day-num { color: #ff751f; }
    }
    
    &.disabled {
      cursor: not-allowed; opacity: 0.5; background: ${props => props.isDarkMode ? '#000' : '#eee'};
      .meal-controls { display: none; }
      .lock-icon { font-size: 0.8rem; color: #888; margin-top: 10px; }
    }
  }
`;

const EmptyStateWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 60px 0; text-align: center;
  .big-heart { font-size: 80px; margin-bottom: 20px; animation: ${pulse} 2s infinite ease-in-out; }
  h3 { font-size: 1.5rem; margin-bottom: 10px; }
  p { color: #888; margin-bottom: 25px; }
  .go-home { 
    background: #ff751f; color: white; border: none; padding: 12px 30px; border-radius: 12px; 
    cursor: pointer; font-weight: bold; transition: all 0.2s;
    &:active { transform: scale(0.95); }
  }
`;

const FavoritesGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; width: 100%;
  .fav-card {
    background: ${props => props.isDarkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9'};
    border-radius: 18px; overflow: hidden; border: 1px solid rgba(255,117,31,0.2);
    img { width: 100%; height: 130px; object-fit: cover; }
    .fav-details {
      padding: 15px;
      h4 { font-size: 0.9rem; margin: 0; }
      p { color: #ff751f; font-weight: bold; margin: 8px 0; }
      .btn-group { 
        display: flex; gap: 10px; 
        button { 
          flex: 1; border: none; padding: 8px; border-radius: 8px; cursor: pointer; 
          font-weight: bold; font-size: 0.8rem; transition: all 0.2s;
          &:active { transform: scale(0.92); }
          &.view-btn { background: #ff751f; color: white; }
          &.remove-btn { background: #ff4d4d; color: white; }
        }
      }
    }
  }
`;

const ChatContainer = styled.div`
  display: flex; flex-direction: column; height: 450px;
  .chat-window {
    flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px;
    background: ${props => props.isDarkMode ? '#0a0b14' : '#f0f2f5'}; border-radius: 15px;
    .bubble {
      max-width: 80%; padding: 10px 15px; border-radius: 15px; font-size: 0.9rem;
      &.bot { align-self: flex-start; background: #ff751f; color: white; border-bottom-right-radius: 2px; }
      &.user { align-self: flex-end; background: ${props => props.isDarkMode ? '#2d3436' : '#fff'}; border-bottom-left-radius: 2px; }
    }
  }
  .chat-input-area {
    display: flex; gap: 10px; margin-top: 15px;
    input { flex: 1; padding: 12px; border-radius: 10px; border: 1.5px solid #ff751f; background: transparent; color: inherit; }
    button { 
      background: #ff751f; color: white; border: none; padding: 0 25px; border-radius: 10px; 
      cursor: pointer; font-weight: bold; transition: all 0.2s;
      &:active { transform: scale(0.9); }
    }
  }
`;

const StarRating = styled.div`
  margin-bottom: 15px; display: flex; justify-content: center; align-items: center; gap: 5px;
  .star { 
    font-size: 1.4rem; color: #ccc; cursor: pointer; transition: all 0.2s;
    &:active { transform: scale(1.2); }
    &.filled { color: #ffca08; } 
  }
  .rating-num { margin-right: 8px; font-size: 0.9rem; opacity: 0.7; }
`;

const ProfileContainer = styled.div`
  direction: rtl; min-height: 100vh;
  background: ${props => props.isDarkMode ? '#0a0b14' : '#f0f2f5'};
  color: ${props => props.isDarkMode ? '#ffffff' : '#000b3d'};
`;

const FullWidthHeader = styled.header`
  background: ${props => props.isDarkMode ? '#1a1c2e' : '#000b3d'}; 
  height: 85px; display: flex; align-items: center; position: sticky; top: 0; z-index: 1000;
  overflow: hidden;

  .header-inner { 
    width: 100%; max-width: 1400px; margin: 0 auto; display: flex; 
    justify-content: space-between; align-items: center; height: 100%; padding: 0 30px; 
  }

  .nav-center-area { 
    flex: 2; display: flex; justify-content: center; align-items: center; height: 100%; margin-right: 60px; 
  }

  .nav-wrapper-ltr { 
    direction: ltr; margin-top: -30px; display: flex; align-items: center; height: auto;
  }
  
  .logo-section {
    transition: all 0.2s;
    &:active { transform: scale(0.95); opacity: 0.8; }
  }
`;

const ContentWrapper = styled.div`
  max-width: 1350px; margin: 50px auto; padding: 0 25px;
  .profile-layout { display: grid; grid-template-columns: 340px 1fr; gap: 45px; }
  .sidebar-glass {
    .user-profile-card { background: ${props => props.isDarkMode ? 'rgba(255,255,255,0.05)' : '#ffffff'}; padding: 40px 20px; border-radius: 24px; text-align: center; margin-bottom: 30px; }
    .avatar-wrapper { 
      width: 120px; height: 120px; margin: 0 auto 20px; position: relative; 
      img { width: 100%; height: 100%; border-radius: 50%; border: 3px solid #ff751f; object-fit: cover; } 
      .edit-badge { 
        position: absolute; bottom: 0; left: 0; background: #ff751f; width: 32px; height: 32px; 
        border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white;
        transition: all 0.2s; &:active { transform: scale(0.8); }
      } 
    }
    .glass-menu { 
      display: flex; flex-direction: column; gap: 10px; 
      button { 
        padding: 15px 20px; border: none; border-radius: 15px; text-align: right; font-weight: 600; cursor: pointer; 
        transition: all 0.2s; background: ${props => props.isDarkMode ? '#1a1c2e' : '#ffffff'}; color: inherit;
        &:active { transform: scale(0.96); }
        &.active { background: #ff751f; color: white; } 
        &.special-btn { border: 1.5px dashed #ff751f; color: #ff751f; background: transparent; } 
      } 
    }
  }
  .form-card-main {
    background: ${props => props.isDarkMode ? '#1a1c2e' : '#ffffff'}; border-radius: 24px; padding: 40px;
    .glass-header { 
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px; 
      .custom-tabs { 
        display: flex; background: ${props => props.isDarkMode ? '#0a0b14' : '#f0f2f5'}; padding: 5px; border-radius: 12px; 
        button { 
          padding: 8px 20px; border: none; border-radius: 10px; cursor: pointer; background: transparent; color: #888;
          transition: all 0.2s; &:active { transform: translateY(2px); }
          &.active { background: #ff751f; color: white; } 
        } 
      } 
    }
    .form-section-title { font-size: 1rem; font-weight: 800; color: #ff751f; margin-bottom: 25px; border-right: 4px solid #ff751f; padding-right: 15px; }
    .modern-grid { 
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; 
      .field { 
        display: flex; flex-direction: column; gap: 8px; &.full { grid-column: 1 / -1; } 
        label { font-size: 0.85rem; font-weight: 600; } 
        input, select { padding: 12px; border-radius: 12px; border: 1.5px solid ${props => props.isDarkMode ? '#2d3436' : '#d1d9e0'}; background: ${props => props.isDarkMode ? '#0a0b14' : '#f9f9f9'}; color: inherit; } 
      } 
    }
    .id-upload-container { 
      width: 100%; margin-top: 10px; 
      .id-placeholder { 
        display: flex; justify-content: center; align-items: center; height: 150px; border: 2px dashed #ff751f; border-radius: 15px; 
        cursor: pointer; color: #ff751f; transition: all 0.2s; &:active { background: rgba(255,117,31,0.05); }
        img { width: 100%; height: 100%; object-fit: contain; } 
      } 
    }
    .gradient-save-btn { 
      width: 100%; margin-top: 40px; padding: 16px; border: none; border-radius: 15px; background: #ff751f; color: white; font-weight: bold; cursor: pointer;
      transition: all 0.2s; &:active { transform: scale(0.98); filter: brightness(0.9); }
    }
  }
`;

export default Profile;