//
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './authForm/RegisterForm';
import LoginForm from './authForm/LoginForm';
import HomePage from './HomePage';
//import Navigation from './authForm/Navigation';
import PrivateRoute from './authForm/PrivateRoute';
//import { useSelector } from 'react-redux';

const App = () => {
  //const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        {/* Redirecționarea implicită către login pentru orice altă cale neidentificată */}
        <Route path="*" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default App;
