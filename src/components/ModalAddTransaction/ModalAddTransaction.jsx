import React from 'react';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';

const ModalAddTransaction = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
        <h2>Adaugă tranzacție</h2>
        <AddTransactionForm />{' '}
      </div>
    </div>
  );
};

export default ModalAddTransaction;
