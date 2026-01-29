import React, { useState } from 'react';
import styled from 'styled-components';

const AddProperty = ({ isDarkMode, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: Date.now(), // تعريف فريد لكل وحدة
    governorate: '', area: '', address: '', buildingNo: '', floor: '',
    description: '',
    roomsCount: 1, 
    roomsDetails: [{ id: 1, bedsCount: 1, beds: [{ id: 101, isBooked: false }] }], // هيكلة البيانات لتناسب صفحة الإدارة
    kitchenImages: [], bathroomImages: [],
    hasWifi: false, hasAC: false, 
    washerType: 'auto', 
    gasType: 'natural', 
    pricePerBed: '', insurance: '', rentPeriod: 'full',
    targetGender: 'boys',
    consumptionOn: 'student',
    isHidden: false // حالة الإخفاء الافتراضية
  });

  const egyptGovs = ["القاهرة", "الجيزة", "الإسكندرية", "سوهاج", "أسيوط", "المنيا", "قنا", "الأقصر", "أسوان"];

  // إزالة شرط الإجبارية - التنقل حر
  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleRoomChange = (index, value) => {
    const count = parseInt(value) || 0;
    const newRooms = [...formData.roomsDetails];
    
    // تجهيز هيكلة الغرفة والأسرة بشكل يتوافق مع صفحة الإدارة
    newRooms[index] = {
      id: index + 1,
      bedsCount: count,
      beds: Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        isBooked: false,
        student: null
      }))
    };
    setFormData({ ...formData, roomsDetails: newRooms });
  };

  const handleSubmit = () => {
    // 1. تجهيز الوحدة للحفظ
    const newProperty = {
      ...formData,
      title: `${formData.area || 'وحدة سكنية'} - ${formData.targetGender === 'boys' ? 'شباب' : 'بنات'}`,
      location: `${formData.governorate}, ${formData.area}`,
      rooms: formData.roomsDetails // تحويل المسمى ليتوافق مع كود الإدارة
    };

    // 2. جلب البيانات القديمة وإضافة الجديدة
    const savedProperties = JSON.parse(localStorage.getItem('my_properties') || '[]');
    const updatedProperties = [newProperty, ...savedProperties];
    
    // 3. الحفظ في LocalStorage
    localStorage.setItem('my_properties', JSON.stringify(updatedProperties));

    alert('✅ تم نشر الوحدة بنجاح وستظهر في لوحة الإدارة!');
    
    // 4. العودة التلقائية لصفحة الإدارة
    onBack();
  };

  return (
    <Container isDarkMode={isDarkMode}>
      <Header>
        <button onClick={onBack}>✕</button>
        <h2>إضافة وحدة سكنية جديدة</h2>
      </Header>

      <ProgressBar>
        <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
      </ProgressBar>

      <FormCard isDarkMode={isDarkMode}>
        {step === 1 && (
          <Step>
            <h3>📍 الموقع والتفاصيل الأساسية</h3>
            <Grid>
              <InputGroup>
                <label>المحافظة</label>
                <select value={formData.governorate} onChange={(e) => setFormData({...formData, governorate: e.target.value})}>
                  <option value="">اختر المحافظة</option>
                  {egyptGovs.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                </select>
              </InputGroup>
              <InputGroup>
                <label>المنطقة</label>
                <input type="text" value={formData.area} placeholder="مثلاً: حي الكوثر" onChange={(e) => setFormData({...formData, area: e.target.value})} />
              </InputGroup>
            </Grid>
            
            <Grid>
                <InputGroup>
                  <label>العنوان بالتفصيل</label>
                  <input type="text" value={formData.address} placeholder="اسم الشارع / علامة مميزة" onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </InputGroup>
                <InputGroup>
                  <label>رقم العمارة</label>
                  <input type="text" value={formData.buildingNo} placeholder="رقم العمارة" onChange={(e) => setFormData({...formData, buildingNo: e.target.value})} />
                </InputGroup>
            </Grid>

            <Grid>
              <InputGroup>
                <label>الدور</label>
                <input type="number" value={formData.floor} placeholder="0" onChange={(e) => setFormData({...formData, floor: e.target.value})} />
              </InputGroup>
              <InputGroup>
                <label>نوع السكن</label>
                <select value={formData.targetGender} onChange={(e) => setFormData({...formData, targetGender: e.target.value})}>
                  <option value="boys">أولاد</option>
                  <option value="girls">بنات</option>
                </select>
              </InputGroup>
            </Grid>

            <InputGroup>
                <label>وصف الشقة</label>
                <textarea 
                    value={formData.description}
                    placeholder="اكتب وصفاً تفصيلياً..." 
                    rows="3"
                    style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd', background: 'transparent', color: 'inherit', fontFamily: 'inherit' }}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
            </InputGroup>
          </Step>
        )}

        {step === 2 && (
          <Step>
            <h3>🛏️ تفاصيل الغرف</h3>
            <InputGroup>
              <label>عدد الغرف بالشقة</label>
              <input type="number" min="1" value={formData.roomsCount} 
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  const details = Array.from({length: count}, (_, i) => ({ id: i+1, bedsCount: '', beds: [] }));
                  setFormData({...formData, roomsCount: count, roomsDetails: details});
                }} 
              />
            </InputGroup>
            
            {formData.roomsDetails.map((room, idx) => (
              <RoomBox key={idx} isDarkMode={isDarkMode}>
                <h4>الغرفة رقم ({idx + 1})</h4>
                <InputGroup>
                  <label>عدد السراير في هذه الغرفة</label>
                  <input type="number" min="1" value={room.bedsCount} placeholder="مثلاً: 2" onChange={(e) => handleRoomChange(idx, e.target.value)} />
                </InputGroup>
                <UploadPlaceholder>📸 أضف صور الغرفة (اختياري)</UploadPlaceholder>
              </RoomBox>
            ))}
          </Step>
        )}

        {step === 3 && (
          <Step>
            <h3>💰 السعر والمرافق</h3>
            <Grid>
              <InputGroup>
                <label>سعر السرير شهرياً</label>
                <input type="number" value={formData.pricePerBed} placeholder="ج.م" onChange={(e) => setFormData({...formData, pricePerBed: e.target.value})} />
              </InputGroup>
              <InputGroup>
                <label>مبلغ التأمين</label>
                <input type="number" value={formData.insurance} placeholder="ج.م" onChange={(e) => setFormData({...formData, insurance: e.target.value})} />
              </InputGroup>
            </Grid>

            <Grid>
              <InputGroup>
                <label>الاستهلاك على:</label>
                <select value={formData.consumptionOn} onChange={(e) => setFormData({...formData, consumptionOn: e.target.value})}>
                  <option value="student">الطالب (حسب الاستهلاك)</option>
                  <option value="owner">المالك (شامل الإيجار)</option>
                </select>
              </InputGroup>
              <InputGroup>
                <label>نوع الغاز</label>
                <select value={formData.gasType} onChange={(e) => setFormData({...formData, gasType: e.target.value})}>
                  <option value="natural">غاز طبيعي</option>
                  <option value="bottle">أنبوبة</option>
                </select>
              </InputGroup>
            </Grid>

            <AmenityGrid>
              <label><input type="checkbox" checked={formData.hasWifi} onChange={(e) => setFormData({...formData, hasWifi: e.target.checked})} /> واى فاى</label>
              <label><input type="checkbox" checked={formData.hasAC} onChange={(e) => setFormData({...formData, hasAC: e.target.checked})} /> مكيف هواء</label>
            </AmenityGrid>

            <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <UploadPlaceholder>📸 صورة المطبخ</UploadPlaceholder>
                <UploadPlaceholder>📸 صورة الحمام</UploadPlaceholder>
            </div>
          </Step>
        )}

        <Navigation>
          {step > 1 && <button className="back" onClick={() => setStep(step - 1)}>السابق</button>}
          {step < 3 ? (
            <button className="next" onClick={handleNext}>التالي</button>
          ) : (
            <button className="submit" onClick={handleSubmit}>نشر الوحدة السكنية</button>
          )}
        </Navigation>
      </FormCard>
    </Container>
  );
};

/* --- الستايلات (نفس ستايلاتك السابقة) --- */
const Container = styled.div` padding: 20px; direction: rtl; font-family: 'Cairo', sans-serif; max-width: 700px; margin: auto; color: ${props => props.isDarkMode ? '#fff' : '#000b3d'}; `;
const Header = styled.div` display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; button { background: none; border: none; font-size: 1.5rem; color: inherit; cursor: pointer; } `;
const ProgressBar = styled.div` width: 100%; height: 6px; background: #eee; border-radius: 10px; margin-bottom: 30px; .progress { height: 100%; background: #ff751f; border-radius: 10px; transition: 0.3s; } `;
const FormCard = styled.div` background: ${props => props.isDarkMode ? '#1a1c2e' : '#fff'}; padding: 30px; border-radius: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); `;
const Step = styled.div` h3 { margin-bottom: 25px; color: #ff751f; } `;
const Grid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 20px; @media (max-width: 500px) { grid-template-columns: 1fr; } `;
const InputGroup = styled.div` margin-bottom: 20px; display: flex; flex-direction: column; label { font-size: 0.9rem; margin-bottom: 8px; font-weight: bold; } input, select { padding: 12px; border-radius: 12px; border: 1px solid #ddd; background: transparent; color: inherit; outline: none; &:focus { border-color: #ff751f; } } `;
const RoomBox = styled.div` background: ${props => props.isDarkMode ? '#25283d' : '#f8f9fa'}; padding: 15px; border-radius: 15px; margin-bottom: 15px; border-right: 4px solid #ff751f; `;
const UploadPlaceholder = styled.div` border: 2px dashed #ff751f; padding: 15px; text-align: center; border-radius: 15px; cursor: pointer; color: #ff751f; font-size: 0.75rem; `;
const AmenityGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; label { display: flex; align-items: center; gap: 10px; cursor: pointer; } `;
const Navigation = styled.div` display: flex; justify-content: space-between; margin-top: 40px; button { padding: 12px 30px; border-radius: 15px; border: none; font-weight: bold; cursor: pointer; transition: 0.2s; } .next, .submit { background: #ff751f; color: white; flex: 1; margin-right: 10px; &:hover { opacity: 0.9; } } .back { background: #ddd; color: #333; } `;

export default AddProperty;