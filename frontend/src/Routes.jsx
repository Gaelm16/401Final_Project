import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Components/LoginPage/Login';
import Register from './Components/RegisterPage/Register';

const SwitchRoute = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>  

  )
}

export default SwitchRoute;