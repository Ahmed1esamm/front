import React from 'react';
import styled from 'styled-components';

const Radio = ({ setActivePage }) => {
  return (
    <StyledWrapper>
      <nav className="menu">
        <button className="link" onClick={() => setActivePage('home')}>
          <span className="link-icon">
            <svg viewBox="0 0 256 256"><path d="M213.38,109.62,133.38,36.88a8,8,0,0,0-10.76,0L42.62,109.62A8,8,0,0,0,40,115.54V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V115.54A8,8,0,0,0,213.38,109.62Z" strokeWidth={16} /></svg>
          </span>
          <span className="link-title">Home</span>
        </button>

        <button className="link" onClick={() => setActivePage('home')}>
          <span className="link-icon">
            <svg viewBox="0 0 256 256"><polyline points="76.2 132.2 152.2 40.2 216 40 215.8 103.8 123.8 179.8" strokeWidth={16} /><path d="M82.14,197.46,52.2,227.4a8,8,0,0,1-11.31,0L28.6,215.11a8,8,0,0,1,0-11.31l29.94-29.94a8,8,0,0,0-10-11.31L37.66,141.66a8,8,0,0,1,0-11.31l12.69-12.69a8,8,0,0,1,11.31,0l76.69,76.69a8,8,0,0,1,0,11.31l-12.69,12.69a8,8,0,0,1-11.31,0L93.46,197.46A8,8,0,0,0,82.14,197.46Z" strokeWidth={16} /></svg>
          </span>
          <span className="link-title">Games</span>
        </button>

        {/* تم تصحيح الربط هنا ليرسل 'chatMAMA' بدقة */}
        <button className="link" onClick={() => setActivePage('chatMAMA')}>
          <span className="link-icon">
            <svg viewBox="0 0 256 256"><path d="M45.43,177A96,96,0,1,1,79,210.57L45.85,220a8,8,0,0,1-9.89-9.89l9.47-33.16Z" strokeWidth={16} /></svg>
          </span>
          <span className="link-title">Chat</span>
        </button>

        <button className="link" onClick={() => setActivePage('profile')}>
          <span className="link-icon">
            <svg viewBox="0 0 256 256"><circle cx={128} cy={96} r={64} strokeWidth={16} /><path d="M31,216a112,112,0,0,1,194,0" strokeWidth={16} /></svg>
          </span>
          <span className="link-title">Profile</span>
        </button>
      </nav>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  z-index: 1000;

  .menu {
    padding: 0.6rem; 
    background-color: #ff751f; 
    display: flex; 
    /* التعديل الجوهري هنا */
    flex-direction: row-reverse; /* لعكس ترتيب الأيقونات بصرياً */
    justify-content: center; 
    align-items: center;
    border-radius: 18px; 
    box-shadow: 0 10px 25px rgba(255, 117, 31, 0.3); 
    gap: 12px; 
    border: 1px solid rgba(255, 255, 255, 0.2); 
    transform: translateY(15px);
  }

  .link {
    display: inline-flex; 
    align-items: center; 
    justify-content: flex-start;
    width: 50px; 
    height: 50px; 
    border-radius: 12px; 
    position: relative;
    z-index: 1;
    overflow: hidden;
    text-decoration: none; 
    color: #ffffff; 
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: transparent; 
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .link:hover {
    width: 140px; 
    background: rgba(255, 255, 255, 0.2); 
  }

  .link:active {
    transform: translateY(4px); 
    background: rgba(0, 0, 0, 0.1); 
    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.2); 
  }

  .link-icon {
    width: 50px; 
    height: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .link-icon svg {
    width: 26px;
    height: 26px;
    stroke: #ffffff; 
    fill: none;
  }

  .link-title {
    white-space: nowrap;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
    font-weight: bold;
    color: #ffffff;
    padding-right: 15px;
  }

  .link:hover .link-title {
    opacity: 1;
    transform: translateX(0);
  }
`;

export default Radio;