import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Notify from './common/Notify/Notify';

import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import SharedLayout from './SharedLayout/SharedLayout';

import RestrictedLoginPage from 'pages/LoginPage/RestrictedLoginPage';
import RestrictedRegisterPage from 'pages/RegisterPage/RestrictedRegisterPage';

import RestrictedHomePage from 'pages/HomePage/RestrictedHomePage';
import RestrictedStatisticsPage from 'pages/StatisticsPage/RestrictedStatisticsPage';
import RestrictedCurrencyPage from 'pages/CurrencyPage/RestrictedCurrencyPage';

const App = () => {
  const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
      <Routes>
        <Route path="/" element={<RestrictedLoginPage />} />
        <Route path="/register" element={<RestrictedRegisterPage />} />

        <Route path="/dashboard" element={<SharedLayout />}>
          <Route index element={<RestrictedHomePage />} />
          <Route path="statistics" element={<RestrictedStatisticsPage />} />
          {isOnMobile && (
            <Route path="currency" element={<RestrictedCurrencyPage />} />
          )}
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Notify />
    </>
  );
};

export default App;
