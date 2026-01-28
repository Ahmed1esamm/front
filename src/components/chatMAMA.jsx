import React from 'react';
import styled, { keyframes } from 'styled-components';

// 1. أنيميشن الفاصلة: تبدأ النزول عند 60% وتختفي عند 75%
const moveAndFade = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  30% { transform: translate(5px, -30px) rotate(0deg); opacity: 1; }
  60% { transform: translate(25px, -30px) rotate(0deg); opacity: 1; } /* قمة القفزة */
  75% { transform: translate(25px, 10px) rotate(180deg); opacity: 0; } /* لحظة الاصطدام والاختفاء */
  100% { transform: translate(25px, 10px) rotate(180deg); opacity: 0; }
`;

// 2. انضمام الحروف وتقريب الـ A الأخيرة
const logoCollapse = keyframes`
  0%, 60% { letter-spacing: 12px; }
  85%, 100% { letter-spacing: 2px; }
`;

// 3. تحويل W إلى M: يبدأ القلب فوراً عند وصول الفاصلة (60%)
const wToM = keyframes`
  0%, 60% { color: inherit; transform: scaleY(1) translateX(0); }
  75% { color: #ff751f; transform: scaleY(-1) translateY(-5px) translateX(-16px); } /* بداية التحول مع نزول الفاصلة */
  100% { color: #ff751f; transform: scaleY(-1) translateY(-5px) translateX(-16px); }
`;

// أنيميشن خاص لتقريب حرف A الأخير
const moveLastA = keyframes`
  0%, 60% { margin-left: 0px; }
  85%, 100% { margin-left: -15px; } /* تقريب الحرف الأخير يدوياً */
`;

const shineOnce = keyframes`
  0% { left: -150%; }
  100% { left: 150%; }
`;

const ChatMAMA = ({ isDarkMode }) => {
  return (
    <ChatContainer isDarkMode={isDarkMode}>
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
        <PlaceholderText>كيف يمكن لـ MAMA مساعدتك اليوم؟</PlaceholderText>
      </ChatBox>
      
      <InputArea isDarkMode={isDarkMode}>
        <input type="text" placeholder="اسألي MAMA عن أي شيء..." />
        <button>➤</button>
      </InputArea>
    </ChatContainer>
  );
};

/* --- التنسيقات --- */

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${props => props.isDarkMode ? '#0a0b14' : '#f4f7f6'};
  font-family: 'Arial Black', sans-serif;
`;

const LogoSection = styled.div`
  margin-bottom: 50px;
  position: relative;
  padding: 10px 20px;
`;

const LogoText = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  display: flex;
  align-items: baseline;
  color: ${props => props.isDarkMode ? '#fff' : '#2d2d2d'};
  position: relative;
  overflow: hidden; 
  animation: ${logoCollapse} 3s ease-in-out forwards;
`;

const ShineOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right, 
    transparent, 
    rgba(255, 255, 255, 0.9), 
    transparent
  );
  transform: skewX(-20deg);
  left: -150%;
  animation: ${shineOnce} 1.2s ease-in-out forwards;
  animation-delay: 3.2s; 
`;

const Apostrophe = styled.span`
  color: #ff751f;
  display: inline-block;
  z-index: 2;
  font-size: 4rem;
  animation: ${moveAndFade} 3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`;

const LetterW = styled.span`
  display: inline-block;
  animation: ${wToM} 3s ease-in-out forwards; /* جعلته 3 ثواني ليطابق الفاصلة تماماً */
`;

const LetterA = styled.span`
  display: inline-block;
  animation: ${moveLastA} 3s ease-in-out forwards; /* أنيميشن التقريب */
`;

const ChatBox = styled.div`
  width: 90%;
  max-width: 650px;
  height: 400px;
  background: ${props => props.isDarkMode ? '#1a1c2e' : '#fff'};
  border-radius: 30px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  border: 1px solid ${props => props.isDarkMode ? '#2d2d2d' : '#eee'};
`;

const PlaceholderText = styled.p`
  color: #a0a0a0;
  font-size: 1.2rem;
`;

const InputArea = styled.div`
  width: 90%;
  max-width: 650px;
  display: flex;
  gap: 12px;
  input {
    flex: 1;
    padding: 18px 25px;
    border-radius: 20px;
    border: 1px solid ${props => props.isDarkMode ? '#333' : '#ddd'};
    background: ${props => props.isDarkMode ? '#1a1c2e' : '#fff'};
    color: ${props => props.isDarkMode ? '#fff' : '#333'};
    outline: none;
    font-size: 1rem;
  }
  button {
    width: 60px;
    height: 60px;
    border-radius: 20px;
    border: none;
    background: #ff751f;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover { transform: scale(1.05); }
  }
`;

export default ChatMAMA;