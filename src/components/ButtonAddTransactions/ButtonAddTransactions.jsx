import React from 'react';

export const ButtonAddTransactions = ({ onClick }) => {
  return (
    <>
      <button type="button" onClick={onClick}>
        Add Transactions
      </button>
    </>
  );
};
