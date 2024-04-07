const selectAllTransactions = state => state.transactions.items;

const selectTransactionsSummary = state => state.transactions.summary;

const selectTrasactionIdForDelete = state =>
  state.transactions.trasactionIdForDelete;

const selectTransactionForUpdate = state =>
  state.transactions.transactionForUpdate;

export {
  selectAllTransactions,
  selectTransactionsSummary,
  selectTrasactionIdForDelete,
  selectTransactionForUpdate,
};

// De continuat de aici, in jos//
