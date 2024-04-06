import React from 'react';
import { useSelector } from 'react-redux';
import { selectBalance } from '../../redux/auth/selectors';
import styles from './Balance.module.css';

function Balance() {
  const balance = useSelector(selectBalance);

  console.log('Valoarea neformatată a balanței:', balance);

  function formatNumber(number) {
    return number.toFixed(2);
  }

  return (
    <div className={styles.balance}>
      <h3>Your balance</h3>
      <p>
        <span>₴ </span>
        {formatNumber(Number(balance))}
      </p>
    </div>
  );
}

export default Balance;
