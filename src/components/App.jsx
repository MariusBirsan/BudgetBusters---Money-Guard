//
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './authForm/RegisterForm';
import LoginForm from './authForm/LoginForm';
// import HomePage from './HomePage';
//import Navigation from './authForm/Navigation';
import PrivateRoute from './authForm/PrivateRoute';
import Currency from './Currency/Currency';
//import { useSelector } from 'react-redux';
import SharedLayout from './SharedLayout/SharedLayout';
import { useMediaQuery } from 'react-responsive';
import HomePage from 'pages/HomePage/HomePage';
import StatisticsPage from 'pages/StatisticsPage/StatisticsPage';

// Todo: lazy imports, loading screen, redirect auth pages

const App = () => {
  //const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route path="/dashboard" element={<SharedLayout />}>
        <Route
          path="home"
          element={<PrivateRoute>{<HomePage />}</PrivateRoute>}
        />
        <Route
          path="statistics"
          element={<PrivateRoute>{<StatisticsPage />}</PrivateRoute>}
        />

        {/* mobile only */}
        {isOnMobile && (
          <Route
            path="currency"
            element={<PrivateRoute>{<Currency />}</PrivateRoute>}
          />
        )}
      </Route>

      {/*todo: mai bine pagina not found, aici  */}
      {/* Redirecționarea implicită către login pentru orice altă cale neidentificată */}
      {/* <Route path="*" element={<LoginForm />} /> */}
    </Routes>
  );
};

export default App;
