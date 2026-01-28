import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 117, 31, 0.4); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(255, 117, 31, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 117, 31, 0); }
`;

const ShowUnite = ({ isDarkMode, unit, onClose }) => {
  const [selectedBed, setSelectedBed] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  const apartmentImages = unit.images || [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
  ];

  const nextImg = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev + 1) % apartmentImages.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev - 1 + apartmentImages.length) % apartmentImages.length);
  };

  if (!unit) return null;

  const rooms = [
    {
      name: "الغرفة الأولى",
      beds: Array.from({ length: Math.ceil(unit.beds / 2) }, (_, i) => ({
        id: 100 + i,
        isAvailable: i === 0, 
        student: i !== 0 ? { name: "محمود حسن", college: "هندسة", year: "الفرقة 3", smoking: false } : null
      }))
    },
    {
      name: "الغرفة الثانية",
      beds: Array.from({ length: Math.floor(unit.beds / 2) }, (_, i) => ({
        id: 200 + i,
        isAvailable: false,
        student: { name: "علي كريم", college: "حاسبات", year: "الفرقة 1", smoking: true }
      }))
    }
  ];

  return (
    <PageWrapper isDarkMode={isDarkMode} onClick={onClose}>
      <Container isDarkMode={isDarkMode} onClick={(e) => { e.stopPropagation(); setSelectedBed(null); }}>
        
        <HeaderActions>
          <CloseButton onClick={onClose}>✕</CloseButton>
          <ShareButton>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
          </ShareButton>
        </HeaderActions>

        <GallerySection>
          <MainImage src={apartmentImages[activeImg]} alt="Apartment" />
          
          <NavButton direction="left" onClick={nextImg}>
            <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
          </NavButton>
          <NavButton direction="right" onClick={prevImg}>
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

          {/* قسم المالك والتقييم */}
          <OwnerSection isDarkMode={isDarkMode}>
             <div className="owner-info">
                <img src="https://ui-avatars.com/api/?name=Ahmed+Owner&background=ff751f&color=fff" alt="owner" />
                <div>
                   <h5>أحمد محمود (المالك)</h5>
                   <span>عضو منذ 2023 • استجابة فورية</span>
                </div>
             </div>
             <div className="rating-box">
                <span className="stars">⭐⭐⭐⭐⭐</span>
                <small>15 تقييم حقيقي</small>
             </div>
          </OwnerSection>

          <SectionTitle>المرافق المتاحة</SectionTitle>
          <AmenitiesGrid isDarkMode={isDarkMode}>
            <div className={`amenity active`}>🌐 واي فاي فايبر</div>
            <div className={`amenity active`}>❄️ تكييف مركزي</div>
            <div className="amenity active">🚿 {unit.bathrooms || 1} حمام مودرن</div>
            <div className="amenity active">🍳 مطبخ متكامل</div>
            <div className="amenity active">🧺 غسالة ملابس آلي</div>
            <div className="amenity active">🧹 عاملة نظافة</div>
          </AmenitiesGrid>

          <SectionTitle>عن السكن</SectionTitle>
          <Description isDarkMode={isDarkMode}>
            {unit.desc || "سكن طالبات هادئ جداً ومميز، مجهز بكافة الأجهزة الكهربائية الحديثة، ويتميز بموقع قريب جداً من الجامعات والخدمات."}
          </Description>

          <SectionTitle>توزيع الغرف والزملاء</SectionTitle>
          <RoomsGrid>
            {rooms.map((room, idx) => (
              room.beds.length > 0 && (
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
                            !bed.isAvailable && setSelectedBed(selectedBed === bed.id ? null : bed.id);
                          }}
                        >
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12-3h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
                          </svg>
                          <span className="bed-status">{bed.isAvailable ? "متاح" : "محجوز"}</span>
                        </BedIcon>

                        {selectedBed === bed.id && bed.student && (
                          <StudentTip onClick={(e) => e.stopPropagation()}>
                            <div className="tip-header">بيانات الزميلة</div>
                            <div className="tip-row"><strong>الاسم:</strong> {bed.student.name}</div>
                            <div className="tip-row"><strong>الكلية:</strong> {bed.student.college}</div>
                            <div className="tip-row"><strong>السنة:</strong> {bed.student.year}</div>
                            <div className="tip-row"><strong>مدخن:</strong> {bed.student.smoking ? "نعم" : "لا"}</div>
                          </StudentTip>
                        )}
                      </BedWrapper>
                    ))}
                  </BedsFlex>
                </RoomCard>
              )
            ))}
          </RoomsGrid>

          <ActionButton>إتمام عملية الحجز</ActionButton>
        </ContentSection>
      </Container>
    </PageWrapper>
  );
};

/* --- التنسيقات --- */

const PageWrapper = styled.div`
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: ${props => props.isDarkMode ? '#0a0b14' : '#f4f7f6'};
  z-index: 5000; overflow-y: auto; direction: rtl; font-family: 'Cairo', sans-serif;
`;

const Container = styled.div`
  max-width: 850px; margin: 0 auto; min-height: 100vh;
  background: ${props => props.isDarkMode ? '#1a1c2e' : '#ffffff'};
  position: relative; box-shadow: 0 0 40px rgba(0,0,0,0.1);
`;

const OwnerSection = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px; margin: 25px 0; border-radius: 20px;
  background: ${props => props.isDarkMode ? '#25283d' : '#f9f9f9'};
  border: 1px solid ${props => props.isDarkMode ? '#333' : '#eee'};
  .owner-info {
    display: flex; align-items: center; gap: 15px;
    img { width: 50px; height: 50px; border-radius: 50%; border: 2px solid #ff751f; }
    h5 { margin: 0; font-size: 1rem; color: ${props => props.isDarkMode ? '#fff' : '#222'}; }
    span { font-size: 0.8rem; color: #888; }
  }
  .rating-box { text-align: left; .stars { display: block; letter-spacing: 2px; } small { color: #888; font-size: 0.75rem; } }
`;

const HeaderActions = styled.div`
  position: absolute; top: 25px; width: 100%; padding: 0 30px;
  display: flex; justify-content: space-between; z-index: 100;
`;

const CloseButton = styled.button`
  background: white; border: none; width: 45px; height: 45px;
  border-radius: 50%; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: 0.3s;
  &:hover { background: #ff751f; color: white; }
`;

const ShareButton = styled(CloseButton)``;

const GallerySection = styled.div`
  position: relative; width: 100%; height: 480px; background: #000;
  .overlay-title {
    position: absolute; bottom: 0; width: 100%; background: linear-gradient(transparent, rgba(0,0,0,0.9));
    padding: 35px; color: white; h2 { font-size: 2rem; margin: 0; font-weight: 800; }
  }
`;

const NavButton = styled.button`
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15); border: none; width: 55px; height: 55px;
  border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(10px); transition: 0.3s; z-index: 10;
  ${props => props.direction === 'left' ? 'left: 25px;' : 'right: 25px;'}
  svg { width: 35px; fill: white; }
  &:hover { background: #ff751f; transform: translateY(-50%) scale(1.1); }
`;

const MainImage = styled.img` width: 100%; height: 100%; object-fit: cover; `;

const Badge = styled.span`
  background: #ff751f; color: white; padding: 6px 14px; border-radius: 10px; font-size: 0.85rem; margin-top: 12px; display: inline-block;
`;

const ImgCounter = styled.div`
  position: absolute; top: 25px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.5);
  color: white; padding: 6px 18px; border-radius: 25px; font-size: 0.85rem; backdrop-filter: blur(5px);
`;

const ThumbnailsTrack = styled.div`
  position: absolute; bottom: 110px; left: 35px; display: flex; gap: 12px; z-index: 10;
`;

const ThumbImg = styled.img`
  width: 60px; height: 60px; object-fit: cover; border-radius: 15px;
  cursor: pointer; border: 3px solid ${props => props.isActive ? '#ff751f' : 'rgba(255,255,255,0.4)'};
  transition: 0.3s;
`;

const ContentSection = styled.div` padding: 0 45px 60px; `;

const FinanceGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  margin-top: -40px; position: relative; z-index: 5;
  .price-item {
    background: ${props => props.isDarkMode ? '#25283d' : '#fff'}; 
    padding: 25px 15px; border-radius: 25px; text-align: center;
    box-shadow: 0 15px 35px rgba(0,0,0,0.12);
    &.shadow { background: #ff751f; }
    .label { font-size: 0.8rem; display: block; margin-bottom: 5px; opacity: 0.8; }
    .value { font-size: 1.2rem; font-weight: 900; }
  }
`;

const AmenitiesGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;
  .amenity {
    padding: 18px 10px; border-radius: 18px; font-size: 0.9rem; text-align: center; font-weight: 700;
    background: ${props => props.isDarkMode ? '#25283d' : '#f0f2f5'};
    &.active { color: #007bff; border-bottom: 3px solid #007bff; }
  }
`;

const SectionTitle = styled.h4`
  margin: 45px 0 25px; color: ${props => props.isDarkMode ? '#fff' : '#111'}; 
  font-size: 1.3rem; font-weight: 800; border-right: 6px solid #ff751f; padding-right: 18px;
`;

const Description = styled.p`
  font-size: 1rem; line-height: 1.9; color: ${props => props.isDarkMode ? '#bbb' : '#444'};
`;

const RoomsGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 25px; `;

const RoomCard = styled.div`
  padding: 25px; border-radius: 25px; border: 1px solid ${props => props.isDarkMode ? '#333' : '#eee'};
  background: ${props => props.isDarkMode ? 'rgba(255,255,255,0.02)' : '#fcfcfc'};
  .card-header { 
    display: flex; justify-content: space-between; margin-bottom: 25px;
    span { font-weight: 800; color: #ff751f; font-size: 1.1rem; }
  }
`;

const BedsFlex = styled.div` display: flex; gap: 35px; justify-content: center; `;
const BedWrapper = styled.div` position: relative; `;

const BedIcon = styled.div`
  cursor: pointer; display: flex; flex-direction: column; align-items: center;
  color: ${props => props.isAvailable ? '#2ecc71' : '#e74c3c'};
  svg { width: 50px; height: 50px; }
  .bed-status { font-size: 0.75rem; font-weight: bold; margin-top: 8px; }
`;

const StudentTip = styled.div`
  position: absolute; bottom: 125%; left: 50%; transform: translateX(-50%);
  background: #ff751f; color: white; padding: 18px; border-radius: 18px;
  width: 200px; z-index: 100; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  .tip-header { color: #000b3d; font-size: 0.9rem; font-weight: bold; border-bottom: 1px solid #333; margin-bottom: 10px; }
  .tip-row { font-size: 0.85rem; margin-bottom: 6px; }
`;

const ActionButton = styled.button`
  display: block; width: 100%; margin-top: 50px; padding: 25px;
  background: #ff751f; color: white; border: none; border-radius: 25px; 
  font-weight: 900; font-size: 1.3rem; cursor: pointer;
  animation: ${pulse} 2s infinite;
  &:hover { transform: translateY(-3px); }
`;

export default ShowUnite;