import React, { useState } from 'react';
import styled from 'styled-components';

// --- المكون الفرعي: إضافة وحدة سكنية ---
const AddProperty = ({ isDarkMode, onBack, onSave }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    governorate: '', area: '', address: '', buildingNo: '', floor: '',
    description: '', roomsCount: 1, roomsDetails: [{ beds: 1, images: [] }],
    kitchenImages: [], bathroomImages: [],
    hasWifi: false, hasAC: false, 
    washerType: 'manual', gasType: 'natural', 
    pricePerBed: '', insurance: '', rentPeriod: 'full-year',
    targetGender: 'boys', religionAcceptance: 'both',
    consumptionOn: 'student'
  });

  const egyptGovs = ["القاهرة", "الجيزة", "الإسكندرية", "سوهاج", "أسيوط", "المنيا", "قنا", "الأقصر", "أسوان"];

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
            <Grid>
                <InputGroup>
                  <label>العنوان بالتفصيل</label>
                  <input type="text" placeholder="اسم الشارع / علامة مميزة" onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </InputGroup>
                <InputGroup>
                  <label>رقم العمارة</label>
                  <input type="text" placeholder="رقم العمارة" onChange={(e) => setFormData({...formData, buildingNo: e.target.value})} />
                </InputGroup>
            </Grid>
            <InputGroup>
                <label>وصف الشقة (اختياري)</label>
                <textarea 
                    placeholder="اكتب وصفاً مختصراً للشقة..." 
                    rows="3"
                    style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd', background: 'transparent', color: 'inherit' }}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
            </InputGroup>
          </Step>
        )}

        {step === 2 && (
          <Step>
            <h3>🛏️ تفاصيل الغرف</h3>
            <InputGroup>
              <label>عدد الغرف</label>
              <input type="number" min="1" value={formData.roomsCount} 
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  const details = Array.from({length: count}, () => ({ beds: 1, images: [] }));
                  setFormData({...formData, roomsCount: count, roomsDetails: details});
                }} 
              />
            </InputGroup>
            {formData.roomsDetails.map((room, idx) => (
              <RoomBox key={idx} isDarkMode={isDarkMode}>
                <h4>غرفة ({idx + 1})</h4>
                <input type="number" placeholder="عدد الأسرة" min="1" onChange={(e) => handleRoomChange(idx, e.target.value)} />
              </RoomBox>
            ))}
          </Step>
        )}

        {step === 3 && (
          <Step>
            <h3>💰 السعر والمرافق</h3>
            <Grid>
              <InputGroup>
                <label>الإيجار (ج.م)</label>
                <input type="number" onChange={(e) => setFormData({...formData, pricePerBed: e.target.value})} />
              </InputGroup>
              <InputGroup>
                <label>التأمين</label>
                <input type="number" onChange={(e) => setFormData({...formData, insurance: e.target.value})} />
              </InputGroup>
            </Grid>
            <AmenityGrid>
              <label><input type="checkbox" onChange={(e) => setFormData({...formData, hasWifi: e.target.checked})} /> واي فاي</label>
              <label><input type="checkbox" onChange={(e) => setFormData({...formData, hasAC: e.target.checked})} /> تكييف</label>
            </AmenityGrid>
          </Step>
        )}

        <Navigation>
          {step > 1 && <button className="back" onClick={prevStep}>السابق</button>}
          {step < 3 ? 
            <button className="next" onClick={nextStep}>التالي</button> : 
            <button className="submit" onClick={() => onSave(formData)}>نشر الآن</button>
          }
        </Navigation>
      </FormCard>
    </Container>
  );
};

// --- المكون الرئيسي: إدارة الوحدات ---
const ManageProperties = ({ isDarkMode }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [activeViewId, setActiveViewId] = useState(null);

  const handleSave = (newData) => {
    const propertyWithId = {
      ...newData,
      id: Date.now(),
      roomsStatus: newData.roomsDetails.map(room => ({
        beds: Array.from({ length: parseInt(room.beds) || 1 }, (_, i) => ({
          id: i,
          isBooked: Math.random() > 0.6,
          studentName: "أحمد محمد علي"
        }))
      }))
    };
    setProperties([...properties, propertyWithId]);
    setShowAddForm(false);
  };

  if (showAddForm) {
    return <AddProperty isDarkMode={isDarkMode} onBack={() => setShowAddForm(false)} onSave={handleSave} />;
  }

  return (
    <Container isDarkMode={isDarkMode}>
      {properties.length === 0 ? (
        <EmptyState>
          <div className="icon">🏠</div>
          <h2>لا توجد وحدات حالياً</h2>
          <button className="add-btn" onClick={() => setShowAddForm(true)}>إضافة وحدة سكنية</button>
        </EmptyState>
      ) : (
        <>
          <Header>
            <h2>وحداتي السكنية ({properties.length})</h2>
            <button className="add-small" onClick={() => setShowAddForm(true)}>+ إضافة</button>
          </Header>
          <GridList>
            {properties.map(prop => (
              <PropertyCard key={prop.id} isDarkMode={isDarkMode}>
                <h3>{prop.area} - عمارة {prop.buildingNo}</h3>
                <p>{prop.address}</p>
                <button className="main-btn" onClick={() => setActiveViewId(activeViewId === prop.id ? null : prop.id)}>
                   {activeViewId === prop.id ? 'إخفاء التفاصيل' : 'عرض الحالة'}
                </button>
                {activeViewId === prop.id && (
                  <StatusPanel>
                    {prop.roomsStatus.map((room, rIdx) => (
                      <div key={rIdx}>
                        <h4>غرفة {rIdx + 1}</h4>
                        <div style={{display: 'flex', gap: '5px'}}>
                          {room.beds.map(bed => (
                            <BedIcon key={bed.id} booked={bed.isBooked}>
                              {bed.isBooked ? '🛏️ محجوز' : '🛏️ متاح'}
                            </BedIcon>
                          ))}
                        </div>
                      </div>
                    ))}
                  </StatusPanel>
                )}
              </PropertyCard>
            ))}
          </GridList>
        </>
      )}
    </Container>
  );
};

/* --- الستايلات (Styled Components) --- */
const Container = styled.div` padding: 20px; direction: rtl; font-family: sans-serif; max-width: 600px; margin: auto; color: ${props => props.isDarkMode ? '#fff' : '#333'}; `;
const Header = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; .add-small { background: #ff751f; color: #white; border: none; padding: 5px 15px; border-radius: 8px; cursor: pointer; } `;
const FormCard = styled.div` background: ${props => props.isDarkMode ? '#222' : '#fff'}; padding: 20px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); `;
const Grid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 10px; `;
const InputGroup = styled.div` margin-bottom: 15px; display: flex; flex-direction: column; label { font-size: 0.8rem; margin-bottom: 5px; } input, select, textarea { padding: 10px; border: 1px solid #ddd; border-radius: 8px; background: transparent; color: inherit; } `;
const Navigation = styled.div` display: flex; gap: 10px; margin-top: 20px; button { flex: 1; padding: 10px; border-radius: 8px; border: none; cursor: pointer; } .next, .submit { background: #ff751f; color: white; } `;
const ProgressBar = styled.div` width: 100%; height: 5px; background: #eee; margin-bottom: 20px; .progress { height: 100%; background: #ff751f; transition: 0.3s; } `;
const EmptyState = styled.div` text-align: center; padding: 50px 0; .add-btn { background: #ff751f; color: white; border: none; padding: 10px 20px; border-radius: 10px; margin-top: 15px; cursor: pointer; } `;
const PropertyCard = styled.div` background: ${props => props.isDarkMode ? '#333' : '#f9f9f9'}; padding: 15px; border-radius: 12px; margin-bottom: 15px; .main-btn { width: 100%; margin-top: 10px; background: #eee; border: none; padding: 8px; cursor: pointer; } `;
const StatusPanel = styled.div` margin-top: 15px; border-top: 1px solid #ddd; padding-top: 10px; `;
const BedIcon = styled.div` padding: 5px; background: ${props => props.booked ? '#ff4d4d' : '#2ecc71'}; color: white; border-radius: 5px; font-size: 0.7rem; `;
const RoomBox = styled.div` background: rgba(255,117,31,0.1); padding: 10px; border-radius: 8px; margin-bottom: 10px; `;
const AmenityGrid = styled.div` display: flex; gap: 20px; margin: 10px 0; `;

export default ManageProperties;