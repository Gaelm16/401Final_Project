import { useState, useContext } from 'react';
import {Link, Navigate, Routes, Route} from 'react-router';
import Navbar from './Navbar';
import LoginForm from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPW';

const Root = () => {

    return (
      <div>
        <Navbar />
        <Routes>
            <Route exact path="/login" element={<LoginForm/> }/>
            <Route exact path="/register" element={<Register/> }/>
            <Route exact path="/forgotpassword" element={<ForgotPassword/>}/>
        </Routes>
      </div>
    );
  }

export default Root;