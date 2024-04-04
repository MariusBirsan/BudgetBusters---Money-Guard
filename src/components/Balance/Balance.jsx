import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/auth/selectors';
import styles from './Balance.module.css';

const Balance = () => {
  const user = useSelector(selectUserData);

  // Verifică dacă user există și are proprietatea balance:
  const balanceValue = user && user.balance ? user.balance : 0;

  return (
    <div className={styles.balance}>
      <h3>Your balance</h3>

      <p>
        ₴ <span>{balanceValue.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default Balance;
