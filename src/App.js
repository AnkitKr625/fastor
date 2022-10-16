import { Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import LoginPage from './components/LoginPage';
import OtpPage from './components/OtpPage';

import './App.css';

function App() {
  return (
    <div className="wrapper">
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/otpPage' element={<OtpPage/>}/>
          <Route path='/restaurantList' element={<RestaurantList/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
