import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 117, 31, 0.4); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(255, 117, 31, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 117, 31, 0); }
`;

const ShowUnite = ({ isDarkMode, unit, onClose }) => {
  const [selectedBed, setSelectedBed] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0); // الصعود لأعلى الصفحة عند الفتح
  }, []);

  if (!unit) return null;

  const apartmentImages = unit.images || [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
  ];

  const rooms = [
    {
      name: "الغرفة الأولى",
      beds: Array.from({ length: Math.ceil(unit.beds / 2 || 2) }, (_, i) => ({
        id: 100 + i,
        isAvailable: i === 0, 
        student: i !== 0 ? { name: "محمود حسن", college: "هندسة", year: "الفرقة 3", smoking: false } : null
      }))
    },
    {
      name: "الغرفة الثانية",
      beds: Array.from({ length: Math.floor(unit.beds / 2 || 2) }, (_, i) => ({
        id: 200 + i,
        isAvailable: false,
        student: { name: "علي كريم", college: "حاسبات", year: "الفرقة 1", smoking: true }
      }))
    }
  ];

  return (
    <PageWrapper isDarkMode={isDarkMode}>
      <Container isDarkMode={isDarkMode} onClick={() => setSelectedBed(null)}>
        
        <HeaderActions>
          <CloseButton onClick={onClose}>✕</CloseButton>
          <ShareButton onClick={() => alert('تم نسخ الرابط')}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
          </ShareButton>
        </HeaderActions>

        <GallerySection>
          <MainImage src={apartmentImages[activeImg]} alt="Apartment" />
          
          <NavButton direction="left" onClick={(e) => { e.stopPropagation(); setActiveImg((prev) => (prev + 1) % apartmentImages.length); }}>
            <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
          </NavButton>
          <NavButton direction="right" onClick={(e) => { e.stopPropagation(); setActiveImg((prev) => (prev - 1 + apartmentImages.length) % apartmentImages.length); }}>
            <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
          </NavButton>

          <ThumbnailsTrack>
            {apartmentImages.map((img, index) => (
              <ThumbImg 
                key={index} 
                src={img} 
                isActive={activeImg === index} 
                onClick={(e) => { e.stopPropagation(); setActiveImg(index); }} 
              />
            ))}
          </ThumbnailsTrack>
          <ImgCounter>{activeImg + 1} / {apartmentImages.length}</ImgCounter>
          <div className="overlay-title">
            <h2>{unit.title}</h2>
            <Badge>سكن موثق ⭐ 4.9</Badge>
          </div>
        </GallerySection>

        <ContentSection>
          <FinanceGrid isDarkMode={isDarkMode}>
            <div className="price-item">
              <span className="label">سعر السرير</span>
              <span className="value">{unit.price} ج.م</span>
            </div>
            <div className="price-item shadow">
              <span className="label" style={{color: '#fff'}}>التأمين</span>
              <span className="value" style={{color: '#fff'}}>1,000 ج.م</span>
            </div>
            <div className="price-item">
              <span className="label">نظام الدفع</span>
              <span className="value">شهرياً</span>
            </div>
          </FinanceGrid>

          <OwnerSection isDarkMode={isDarkMode}>
             <div className="owner-info">
                <img src={`https://ui-avatars.com/api/?name=${unit.owner || 'Ahmed'}&background=ff751f&color=fff`} alt="owner" />
                <div>
                   <h5>{unit.owner || 'أحمد محمود'} (المالك)</h5>
                   <span>عضو منذ 2023 • استجابة فورية</span>
                </div>
             </div>
             <div className="rating-box">
                <span className="stars">⭐⭐⭐⭐⭐</span>
                <small>15 تقييم حقيقي</small>
             </div>
          </OwnerSection>

          <SectionTitle isDarkMode={isDarkMode}>المرافق المتاحة</SectionTitle>
          <AmenitiesGrid isDarkMode={isDarkMode}>
            <div className="amenity active">🌐 واي فاي</div>
            <div className="amenity active">❄️ تكييف</div>
            <div className="amenity active">🚿 {unit.bathrooms || 1} حمام</div>
            <div className="amenity active">🍳 مطبخ</div>
            <div className="amenity active">🧺 غسالة</div>
            <div className="amenity active">🧹 نظافة</div>
          </AmenitiesGrid>

          <SectionTitle isDarkMode={isDarkMode}>عن السكن</SectionTitle>
          <Description isDarkMode={isDarkMode}>
            {unit.desc || "سكن طالبات هادئ جداً ومميز، مجهز بكافة الأجهزة الكهربائية الحديثة، ويتميز بموقع قريب جداً من الجامعات والخدمات."}
          </Description>

          <SectionTitle isDarkMode={isDarkMode}>توزيع الغرف والزملاء</SectionTitle>
          <RoomsGrid>
            {rooms.map((room, idx) => (
              <RoomCard key={idx} isDarkMode={isDarkMode}>
                <div className="card-header">
                  <span>{room.name}</span>
                  <small>{room.beds.length} أسرّة</small>
                </div>
                <BedsFlex>
                  {room.beds.map(bed => (
                    <BedWrapper key={bed.id}>
                      <BedIcon 
                        isAvailable={bed.isAvailable} 
                        onClick={(e) => {
                          e.stopPropagation();
                          if(!bed.isAvailable) setSelectedBed(selectedBed === bed.id ? null : bed.id);
                        }}
                      >
                        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12-3h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>
                        <span className="bed-status">{bed.isAvailable ? "متاح" : "محجوز"}</span>
                      </BedIcon>

                      {selectedBed === bed.id && bed.student && (
                        <StudentTip onClick={(e) => e.stopPropagation()}>
                          <div className="tip-header">بيانات الزميل</div>
                          <div className="tip-row"><strong>الاسم:</strong> {bed.student.name}</div>
                          <div className="tip-row"><strong>الكلية:</strong> {bed.student.college}</div>
                          <div className="tip-row"><strong>السنة:</strong> {bed.student.year}</div>
                        </StudentTip>
                      )}
                    </BedWrapper>
                  ))}
                </BedsFlex>
              </RoomCard>
            ))}
          </RoomsGrid>

          <ActionButton onClick={() => alert('سيتم توجيهك لبوابة الدفع')}>إتمام عملية الحجز</ActionButton>
        </ContentSection>
      </Container>
    </PageWrapper>
  );
};

// التنسيقات (Styled Components) - نفس التي أرسلتها مع إصلاحات طفيفة
const PageWrapper = styled.div`
  min-height: 100vh; background: ${props => props.isDarkMode ? '#0a0b14' : '#f4f7f6'};
  direction: rtl; font-family: 'Cairo', sans-serif; padding-bottom: 50px;
`;
const Container = styled.div`
  max-width: 850px; margin: 0 auto; background: ${props => props.isDarkMode ? '#1a1c2e' : '#ffffff'};
  position: relative; box-shadow: 0 0 40px rgba(0,0,0,0.1); border-radius: 0 0 30px 30px; overflow: hidden;
`;
const HeaderActions = styled.div` position: absolute; top: 25px; width: 100%; padding: 0 30px; display: flex; justify-content: space-between; z-index: 100; `;
const CloseButton = styled.button` background: white; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 15px rgba(0,0,0,0.1); `;
const ShareButton = styled(CloseButton)``;
const GallerySection = styled.div` position: relative; width: 100%; height: 480px; background: #000; .overlay-title { position: absolute; bottom: 0; width: 100%; background: linear-gradient(transparent, rgba(0,0,0,0.9)); padding: 35px; color: white; h2 { font-size: 2rem; margin: 0; } } `;
const MainImage = styled.img` width: 100%; height: 100%; object-fit: cover; `;
const NavButton = styled.button` position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.2); border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; z-index: 10; svg { width: 30px; fill: white; } ${props => props.direction === 'left' ? 'left: 20px;' : 'right: 20px;'} `;
const ThumbnailsTrack = styled.div` position: absolute; bottom: 110px; right: 35px; display: flex; gap: 10px; `;
const ThumbImg = styled.img` width: 60px; height: 60px; border-radius: 10px; object-fit: cover; border: 2px solid ${props => props.isActive ? '#ff751f' : 'transparent'}; cursor: pointer; `;
const ImgCounter = styled.div` position: absolute; top: 25px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.5); color: white; padding: 5px 15px; border-radius: 20px; `;
const Badge = styled.span` background: #ff751f; color: white; padding: 5px 12px; border-radius: 8px; font-size: 0.8rem; margin-top: 10px; display: inline-block; `;
const ContentSection = styled.div` padding: 0 40px 40px; `;
const FinanceGrid = styled.div` display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: -30px; position: relative; .price-item { background: ${props => props.isDarkMode ? '#25283d' : '#fff'}; padding: 20px; border-radius: 20px; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.1); &.shadow { background: #ff751f; color: white; } .label { font-size: 0.75rem; display: block; opacity: 0.8; } .value { font-size: 1.1rem; font-weight: 800; } } `;
const OwnerSection = styled.div` display: flex; justify-content: space-between; margin: 30px 0; padding: 15px; background: ${props => props.isDarkMode ? '#25283d' : '#f9f9f9'}; border-radius: 15px; .owner-info { display: flex; align-items: center; gap: 12px; img { width: 45px; height: 45px; border-radius: 50%; } h5 { margin: 0; color: ${props => props.isDarkMode ? '#fff' : '#000'}; } span { font-size: 0.7rem; color: #888; } } `;
const SectionTitle = styled.h4` margin: 35px 0 20px; color: ${props => props.isDarkMode ? '#fff' : '#111'}; border-right: 4px solid #ff751f; padding-right: 15px; `;
const AmenitiesGrid = styled.div` display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; .amenity { padding: 12px; background: ${props => props.isDarkMode ? '#25283d' : '#eee'}; border-radius: 10px; font-size: 0.85rem; text-align: center; } `;
const Description = styled.p` line-height: 1.8; color: ${props => props.isDarkMode ? '#ccc' : '#555'}; `;
const RoomsGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 20px; `;
const RoomCard = styled.div` padding: 20px; background: ${props => props.isDarkMode ? '#25283d' : '#fff'}; border: 1px solid #ddd; border-radius: 20px; .card-header { display: flex; justify-content: space-between; margin-bottom: 20px; span { color: #ff751f; font-weight: 700; } } `;
const BedsFlex = styled.div` display: flex; gap: 20px; justify-content: center; `;
const BedWrapper = styled.div` position: relative; `;
const BedIcon = styled.div` cursor: pointer; text-align: center; color: ${props => props.isAvailable ? '#2ecc71' : '#e74c3c'}; svg { width: 40px; } .bed-status { display: block; font-size: 0.7rem; } `;
const StudentTip = styled.div` position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%); background: #ff751f; color: white; padding: 15px; border-radius: 15px; width: 160px; z-index: 10; box-shadow: 0 10px 30px rgba(0,0,0,0.3); .tip-header { font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.3); margin-bottom: 8px; } .tip-row { font-size: 0.8rem; } `;
const ActionButton = styled.button` width: 100%; padding: 20px; margin-top: 40px; background: #ff751f; color: white; border: none; border-radius: 15px; font-weight: 800; font-size: 1.2rem; cursor: pointer; animation: ${pulse} 2s infinite; `;

export default ShowUnite;