import React from 'react';
import styled from 'styled-components';

const Form = ({ onClose }) => {
  return (
    <StyledWrapper onClick={(e) => e.stopPropagation()}>
      <div className="container">
        <div className="heading">Sign In</div>
        <form className="form">
          <input placeholder="E-mail" id="email" name="email" type="email" className="input" required />
          <input placeholder="Password" id="password" name="password" type="password" className="input" required />
          <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
          <input defaultValue="Sign In" type="submit" className="login-button" />
        </form>
        <div className="social-account-container">
          <span className="title">Or Sign in with</span>
          <div className="social-accounts">
            <button className="social-button google" type="button">
              <svg viewBox="0 0 488 512" className="svg"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
            </button>
            <button className="social-button apple" type="button">
              <svg viewBox="0 0 384 512" className="svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
            </button>
            <button className="social-button facebook" type="button">
              <svg viewBox="0 0 320 512" className="svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    max-width: 420px;
    width: 100%;
    background: #000b3d;
    border-radius: 40px;
    padding: 45px 45px;
    border: 5px solid #ff751f;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 30px 30px -20px;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 35px;
    color: #ff751f;
  }

  .form {
    margin-top: 30px;
  }

  .form .input {
    width: 100%;
    background: #0b164a;
    border: none;
    padding: 18px 20px;
    border-radius: 20px;
    margin-top: 20px;
    color: white;
    outline: none;
  }

  .form .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }

  .form .forgot-password a {
    font-size: 12px;
    color: #ff751f;
    text-decoration: none; /* شلت الخط اللي تحت الكلمة */
    transition: 0.3s;
  }

  .form .forgot-password a:hover {
    text-decoration: underline; /* يظهر بس لما تلمس الكلمة */
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, #ff751f 0%, #ff914d 100%);
    color: #000b3d;
    padding-block: 18px;
    margin: 25px auto;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .form .login-button:hover {
    transform: translateY(-3px); /* ترفع الزرار فوق */
    box-shadow: 0 10px 20px rgba(255, 117, 31, 0.2);
  }

  .form .login-button:active {
    transform: translateY(2px); /* ينزل تحت لما تضغط */
  }

  .social-account-container {
    margin-top: 25px;
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 12px;
    color: #ff751f;
  }

  .social-account-container .social-accounts {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 15px;
  }

  .social-account-container .social-accounts .social-button {
    background: #000b3d;
    border: 2px solid #ff751f;
    padding: 5px;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: grid;
    place-content: center;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .social-account-container .social-accounts .social-button .svg {
    fill: #ff751f;
    width: 22px;
    height: 22px;
    transition: 0.2s;
  }

  .social-account-container .social-accounts .social-button:hover {
    transform: translateY(-5px); /* تعلي شوية لما تلمسها */
    background: #ff751f; /* تقلب كلها أورنج */
  }

  .social-account-container .social-accounts .social-button:hover .svg {
    fill: #000b3d; /* الأيقونة تبقى كحلي */
  }

  .social-account-container .social-accounts .social-button:active {
    transform: translateY(2px); /* تنزل تحت كأنها انضغطت */
  }
`;

export default Form;