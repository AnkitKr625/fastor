import {useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { getRestaurant } from '../services/api-util';
import RestaurantCard from './RestaurantCard';

import '../style.css'

function RestaurantList() {

  const location = useLocation();

  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    const state = JSON.parse(location.state);
    const params = {
      token: state.token
    }
    getRestaurant(params)
    .then((res) => {
      setRestaurant(res.data);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    }) 
  },[location.state]);
  

  return (
    <div className='my-component'>
      { restaurant.map(e => {
        return (
          <RestaurantCard key={e.restaurant_id} data={e}/>
        )
      })}
    </div>
  )
}

export default RestaurantList;