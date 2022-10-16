import React from 'react'
import Star from '../assets/star.svg'
import '../style.css';

function RestaurantCard({data}) {
  function getLocation() {
    let location = '';
    if(data.location?.location_locality) {
      location = `${data.location?.location_locality}, `
    }
    if(data.location?.city_name) {
      location += `${data.location?.city_name}`
    }
    return location;
  }


  return (
    <div className='restaurant-card'>
      <img src={data.images[0].url} alt='res-img' height={80} width={80} style={{borderRadius: '8px'}}/>
      <div className='restaurant-details'>
        <div className='restaurant-name'>{data.restaurant_name}</div>
        <div className='restaurant-cusines'>
          {
            data.cuisines.map((cuisine,i) => {
              return ( i<3 ?
                <span key={cuisine.cuisine_id}> {cuisine.cuisine_name} </span> : ''
              )
            })
          }
        </div>
        {getLocation() ? <div className='restaurant-location'>{getLocation()}</div>:""}
        <div className='restaurant-other-info'>
          <div className='restaurant-rating'>
            <div>
              <img src={Star} alt='rating' width={16} style={{marginRight: '4px'}}/>
              {data.rating.restaurant_avg_rating}</div>
            <div className='rating-subtxt'>{'Popularity'}</div>
          </div>
          <div className='restaurant-pricing'>
            <div>{data.currency.symbol} {data.avg_cost_for_two}</div>
            <div className='rating-subtxt'>{'Cost for two'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard