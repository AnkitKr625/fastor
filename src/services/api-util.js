import axios from 'axios';

export function requestOtp(params) {
  let data = {
    'phone': params.phone,
    'dial_code': params.countryCode,
  };
  const config = {
    method: 'post',
    url: 'https://staging.fastor.in/v1/pwa/user/register',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  return axios(config);
}

export function verifyOtp(params) {
  const data = {
    'phone': params.phone,
    'otp': params.otp,
    'dial_code': params.countryCode,
  };
  const config = {
    method: 'post',
    url: 'https://staging.fastor.in/v1/pwa/user/login',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  return axios(config);
}

export function getRestaurant(params) {
  const config = {
    method: 'get',
    url: 'https://staging.fastor.in/v1/m/restaurant?city_id=118&&',
    headers: { 
      'Authorization': `Bearer ${params.token}`
    },
  };
  
  return axios(config)
}