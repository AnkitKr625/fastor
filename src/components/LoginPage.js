import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { requestOtp } from '../services/api-util';

import '../style.css'

function LoginPage() {

  const navigate = useNavigate();

  const [mobileNum, setMobileNum] = useState('');
  const [isActive, setIsActive] = useState(false);
  function handleInputChange(val) {
    if(!val || (parseInt(val) && val.length <= 10)) {
      setMobileNum(val);
    }
  }

  useEffect(() => {
    if(mobileNum.length === 10) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  },[mobileNum])

  function otpRequest() {
    navigate('/otpPage', {state: `{"phone": ${mobileNum}}`})
    const params = {
      phone: mobileNum,
      countryCode: `+91`
    }
    requestOtp(params)
    .then((_res) => {
      setIsActive(true);
    })
    .catch( (_err) => {
      setIsActive(false);
    });
  }
  return (
    <div className='login-page'>
      <div className='header-txt'>Enter Your Mobile Number</div>
      <div className='sub-header-txt'>We will send you the 4 digit verification code</div>
      <input type="number" className='input' placeholder='Enter your mobile' value={mobileNum} onChange={(e) => handleInputChange(e.target.value) }/>
      <button className='btn'  onClick={otpRequest} disabled={!isActive}>
        Send Code
      </button>
    </div>
  )
}

export default LoginPage