// Navigation.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isRegisterPage = location.pathname === '/register';

  return (
    <nav>
      <ul>
        {!isRegisterPage && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
        {isRegisterPage && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
