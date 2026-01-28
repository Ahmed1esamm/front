import React, { useState } from 'react';
import styled from 'styled-components';

const AddProperty = ({ isDarkMode, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    governorate: '', area: '', address: '', buildingNo: '', floor: '',
    roomsCount: 1, roomsDetails: [{ beds: 1, images: [] }],
    hasWifi: false, hasAC: false, gasType: 'natural', 
    pricePerBed: '', insurance: '', rentPeriod: 'full-year',
    targetGender: 'both', religionAcceptance: 'both',
    consumptionOn: 'student'
  });

  const egyptGovs = ["القاهرة", "الجيزة", "الإسكندرية", "سوهاج", "أسيوط", "المنيا", "قنا", "الأقصر", "أسوان"]; // ويمكنك إكمال القائمة

  const handleRoomChange = (index, value) => {
    const newRooms = [...formData.roomsDetails];
    newRooms[index].beds = value;
    setFormData({ ...formData, roomsDetails: newRooms });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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
                <select onChange={(e) => setFormData({...formData, governorate: e.target.value})}>
                  <option>اختر المحافظة</option>
                  {egyptGovs.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                </select>
              </InputGroup>
              <InputGroup>
                <label>المنطقة</label>
                <input type="text" placeholder="مثلاً: حي الكوثر" onChange={(e) => setFormData({...formData, area: e.target.value})} />
              </InputGroup>
            </Grid>
            <InputGroup>
              <label>العنوان بالتفصيل ورقم العمارة</label>
              <input type="text" placeholder="شارع... عمارة رقم..." onChange={(e) => setFormData({...formData, address: e.target.value})} />
            </InputGroup>
            <Grid>
              <InputGroup>
                <label>الدور</label>
                <input type="number" placeholder="0" onChange={(e) => setFormData({...formData, floor: e.target.value})} />
              </InputGroup>
              <InputGroup>
                <label>نوع السكن</label>
                <select onChange={(e) => setFormData({...formData, targetGender: e.target.value})}>
                  <option value="boys">أولاد</option>
                  <option value="girls">بنات</option>
                </select>
              </InputGroup>
            </Grid>
          </Step>
        )}

        {step === 2 && (
          <Step>
            <h3>🛏️ تفاصيل الغرف والأسرة</h3>
            <InputGroup>
              <label>عدد الغرف بالشقة</label>
              <input type="number" min="1" value={formData.roomsCount} 
                onChange={(e) => {
                  const count = parseInt(e.target.value);
                  const details = Array.from({length: count}, () => ({ beds: 1, images: [] }));
                  setFormData({...formData, roomsCount: count, roomsDetails: details});
                }} 
              />
            </InputGroup>
            
            {formData.roomsDetails.map((room, idx) => (
              <RoomBox key={idx} isDarkMode={isDarkMode}>
                <h4>الغرفة رقم ({idx + 1})</h4>
                <InputGroup>
                  <label>عدد السراير في هذه الغرفة</label>
                  <input type="number" min="1" onChange={(e) => handleRoomChange(idx, e.target.value)} />
                </InputGroup>
                <UploadPlaceholder>📸 اضغط لرفع صور الغرفة {idx + 1}</UploadPlaceholder>
              </RoomBox>
            ))}
          </Step>
        )}

        {step === 3 && (
          <Step>
            <h3>💰 السعر والشروط</h3>
            <Grid>
              <InputGroup>
                <label>سعر السرير شهرياً</label>
                <input type="number" placeholder="ج.م" onChange={(e) => setFormData({...formData, pricePerBed: e.target.value})} />
              </InputGroup>
              <InputGroup>
                <label>مبلغ التأمين</label>
                <input type="number" placeholder="ج.م" onChange={(e) => setFormData({...formData, insurance: e.target.value})} />
              </InputGroup>
            </Grid>
            <Grid>
              <InputGroup>
                <label>موجة لمن؟</label>
                <select onChange={(e) => setFormData({...formData, religionAcceptance: e.target.value})}>
                  <option value="both">مسلمين ومسيحيين (الكل)</option>
                  <option value="muslims">مسلمين فقط</option>
                  <option value="christians">مسيحيين فقط</option>
                </select>
              </InputGroup>
              <InputGroup>
                <label>مدة التأجير</label>
                <select onChange={(e) => setFormData({...formData, rentPeriod: e.target.value})}>
                  <option value="full">طوال السنة</option>
                  <option value="term1">ترم أول</option>
                  <option value="term2">ترم ثاني</option>
                </select>
              </InputGroup>
            </Grid>
            <AmenityGrid>
              <label><input type="checkbox" onChange={(e) => setFormData({...formData, hasWifi: e.target.checked})} /> واى فاى</label>
              <label><input type="checkbox" onChange={(e) => setFormData({...formData, hasAC: e.target.checked})} /> مكيف هواء</label>
            </AmenityGrid>
          </Step>
        )}

        <Navigation>
          {step > 1 && <button className="back" onClick={prevStep}>السابق</button>}
          {step < 3 ? <button className="next" onClick={nextStep}>التالي</button> : <button className="submit" onClick={() => alert('تم حفظ الوحدة بنجاح!')}>نشر الوحدة السكنية</button>}
        </Navigation>
      </FormCard>
    </Container>
  );
};

/* Styled Components */
const Container = styled.div` padding: 20px; direction: rtl; font-family: 'Cairo'; max-width: 700px; margin: auto; color: ${props => props.isDarkMode ? '#fff' : '#000b3d'}; `;
const Header = styled.div` display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; button { background: none; border: none; font-size: 1.5rem; color: inherit; cursor: pointer; } `;
const ProgressBar = styled.div` width: 100%; height: 6px; background: #eee; border-radius: 10px; margin-bottom: 30px; .progress { height: 100%; background: #ff751f; border-radius: 10px; transition: 0.3s; } `;
const FormCard = styled.div` background: ${props => props.isDarkMode ? '#1a1c2e' : '#fff'}; padding: 30px; border-radius: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); `;
const Step = styled.div` h3 { margin-bottom: 25px; color: #ff751f; } `;
const Grid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 20px; `;
const InputGroup = styled.div` margin-bottom: 20px; display: flex; flex-direction: column; label { font-size: 0.9rem; margin-bottom: 8px; font-weight: bold; } input, select { padding: 12px; border-radius: 12px; border: 1px solid #ddd; background: transparent; color: inherit; } `;
const RoomBox = styled.div` background: ${props => props.isDarkMode ? '#25283d' : '#f8f9fa'}; padding: 15px; border-radius: 15px; margin-bottom: 15px; border-right: 4px solid #ff751f; `;
const UploadPlaceholder = styled.div` border: 2px dashed #ff751f; padding: 20px; text-align: center; border-radius: 15px; margin-top: 10px; cursor: pointer; color: #ff751f; font-size: 0.8rem; `;
const AmenityGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; label { display: flex; align-items: center; gap: 10px; cursor: pointer; } `;
const Navigation = styled.div` display: flex; justify-content: space-between; margin-top: 40px; button { padding: 12px 30px; border-radius: 15px; border: none; font-weight: bold; cursor: pointer; } .next, .submit { background: #ff751f; color: white; flex: 1; margin-right: 10px; } .back { background: #ddd; } `;

export default AddProperty;