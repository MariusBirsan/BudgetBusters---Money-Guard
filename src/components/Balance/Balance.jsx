import styles from './Balance.module.css';

// todo: balance value (useSelect, *toFixed())

const Balance = () => {
  const balanceValue = 2558;

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
