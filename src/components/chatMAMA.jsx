import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// --- الأنيميشن الخاص باللوجو ---
const moveAndFade = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  30% { transform: translate(5px, -30px) rotate(0deg); opacity: 1; }
  60% { transform: translate(25px, -30px) rotate(0deg); opacity: 1; }
  75% { transform: translate(25px, 10px) rotate(180deg); opacity: 0; }
  100% { transform: translate(25px, 10px) rotate(180deg); opacity: 0; }
`;

const logoCollapse = keyframes`
  0%, 60% { letter-spacing: 12px; }
  85%, 100% { letter-spacing: 2px; }
`;

// 3. تحويل W إلى M: تم تعديل الـ translateY لرفع الحرف للأعلى
const wToM = keyframes`
  0%, 60% { 
    color: inherit; 
    transform: scaleY(1) translateX(0) translateY(0); 
  }
  75% { 
    color: #ff751f; 
    transform: scaleY(-1) translateY(-3px) translateX(-16px); /* رفعنا الحرف هنا من -5 إلى -18 */
  } 
  100% { 
    color: #ff751f; 
    transform: scaleY(-1) translateY(-3px) translateX(-16px); 
  }
`;

const moveLastA = keyframes`
  0%, 60% { margin-left: 0px; }
  85%, 100% { margin-left: -15px; }
`;

const shineOnce = keyframes`
  0% { left: -150%; }
  100% { left: 150%; }
`;

const ChatMAMA = ({ isDarkMode, setActivePage }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "أهلاً بك! أنا MAMA، كيف يمكنني مساعدتك في العثور على سكن مريح اليوم؟", 
        sender: 'mama' 
      }]);
    }, 1000);
  };

  return (
    <ChatContainer isDarkMode={isDarkMode}>
      {/* زر الرجوع البسيط */}
      <BackButton onClick={() => setActivePage('home')} isDarkMode={isDarkMode}>
        رجوع
      </BackButton>

      <LogoSection>
        <LogoText isDarkMode={isDarkMode}>
          CHAT MA
          <Apostrophe>'</Apostrophe>
          <LetterW>W</LetterW>
          <LetterA>A</LetterA>
          <ShineOverlay />
        </LogoText>
      </LogoSection>

      <ChatBox isDarkMode={isDarkMode}>
        {messages.length === 0 ? (
          <PlaceholderText>كيف يمكن لـ MAMA مساعدتك اليوم؟</PlaceholderText>
        ) : (
          <MessagesList>
            {messages.map((msg, index) => (
              <MessageBubble key={index} sender={msg.sender} isDarkMode={isDarkMode}>
                {msg.text}
              </MessageBubble>
            ))}
          </MessagesList>
        )}
      </ChatBox>
      
      <InputArea isDarkMode={isDarkMode}>
        <input 
          type="text" 
          placeholder="اسألي MAMA عن أي شيء..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>➤</button>
      </InputArea>
    </ChatContainer>
  );
};

/* --- التنسيقات المعدلة --- */

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${props => props.isDarkMode ? '#0a0b14' : '#f4f7f6'};
  font-family: 'Arial Black', sans-serif;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 30px;
  right: 40px;
  background: transparent;
  color: #ff751f;
  border: 2px solid #ff751f;
  padding: 8px 25px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 900;
  font-size: 16px;
  font-family: 'Segoe UI', sans-serif;
  transition: 0.3s ease;
  z-index: 100;

  &:hover {
    background: #ff751f;
    color: white;
    transform: scale(1.05);
  }
`;

const LogoSection = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
`;

const LogoText = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  display: flex;
  align-items: baseline;
  color: ${props => props.isDarkMode ? '#fff' : '#2d2d2d'};
  animation: ${logoCollapse} 3s ease-in-out forwards;
`;

const ShineOverlay = styled.div`
  position: absolute;
  top: 0; width: 100%; height: 100%;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: skewX(-20deg);
  left: -150%;
  animation: ${shineOnce} 1.2s ease-in-out forwards;
  animation-delay: 3.2s; 
`;

const Apostrophe = styled.span`
  color: #ff751f;
  animation: ${moveAndFade} 3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`;

const LetterW = styled.span`
  display: inline-block;
  animation: ${wToM} 3s ease-in-out forwards;
`;

const LetterA = styled.span`
  display: inline-block;
  animation: ${moveLastA} 3s ease-in-out forwards;
`;

const ChatBox = styled.div`
  width: 95%;              /* تكبير العرض */
  max-width: 900px;        /* أقصى عرض للدردشة */
  height: 65vh;            /* زيادة الطول بناءً على حجم الشاشة */
  background: ${props => props.isDarkMode ? '#1a1c2e' : '#fff'};
  border-radius: 35px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  margin-bottom: 25px;
  border: 1px solid ${props => props.isDarkMode ? '#2d2d2d' : '#eee'};
  overflow-y: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  direction: rtl;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background: #ff751f; border-radius: 10px; }
`;

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const MessageBubble = styled.div`
  max-width: 75%;
  padding: 15px 22px;
  border-radius: 25px;
  font-family: 'Segoe UI', sans-serif;
  font-size: 1.05rem;
  line-height: 1.6;
  align-self: ${props => props.sender === 'user' ? 'flex-start' : 'flex-end'};
  background: ${props => 
    props.sender === 'user' 
      ? '#ff751f' 
      : (props.isDarkMode ? '#2d2d2d' : '#f0f0f0')
  };
  color: ${props => props.sender === 'user' ? '#fff' : (props.isDarkMode ? '#fff' : '#333')};
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

const PlaceholderText = styled.p`
  color: #a0a0a0;
  font-size: 1.3rem;
  margin: auto;
  font-weight: 500;
`;

const InputArea = styled.div`
  width: 95%;
  max-width: 900px;
  display: flex;
  gap: 15px;
  input {
    flex: 1;
    padding: 20px 30px;
    border-radius: 25px;
    border: 1px solid ${props => props.isDarkMode ? '#333' : '#ddd'};
    background: ${props => props.isDarkMode ? '#1a1c2e' : '#fff'};
    color: ${props => props.isDarkMode ? '#fff' : '#333'};
    outline: none;
    font-size: 1.1rem;
    direction: rtl;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  }
  button {
    width: 70px;
    height: 70px;
    border-radius: 25px;
    border: none;
    background: #ff751f;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover { transform: scale(1.1) rotate(-10deg); background: #e6671a; }
  }
`;

export default ChatMAMA;