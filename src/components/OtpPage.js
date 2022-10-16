import {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '../services/api-util';

import '../style.css'

const OTP_LENGTH = [1,2,3,4,5,6];

function OtpPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [isActive, setIsActive] = useState(false);
  

  function handleKeyDown(e) {
    let keyCode = e.keyCode;
    if(keyCode === 8) {
      setOtp(prev => prev.substring(0, prev.length -1));
    } else if (keyCode >= 48 && keyCode <= 57) {
      setOtp(prev => {
        if(prev.length < 6) {
          return prev + e.key;
        }
        return prev;
      });
    }
  }
  
  useEffect(() => {
    if(otp.length === 6 && parseInt(otp) === 123456) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  },[otp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  },[]);

  function otpVerification() {
    const state = JSON.parse(location.state);

    const params = {
      phone: state.phone,
      countryCode: '+91',
      otp: otp,
    }
    verifyOtp(params)
    .then((res) => {
      setIsActive(true);
      const token = res.data.data.token;
      navigate('/restaurantList', {state: `{"token": "${token}"}`})
    })
    .catch( (_err) => {
      setIsActive(false);
    });
  }
  return (
    <div className='login-page'>
      <div className='header-txt'>OTP Verification</div>
      <div className='sub-header-txt'>Enter the verification code we just sent on your Mobile Number.</div>
      <div className='otp'>
        {OTP_LENGTH.map((e,i) => {
          return (
            <div className='otp-enter' key={e}>{otp.charAt(i)}</div>
          )
        })}
      </div>
      <button className='btn' onClick={otpVerification} disabled={!isActive}>
        Verify
      </button>
    </div>
  )
}

export default OtpPage;