const selectAllTransactions = state => state.transactions.items;

const selectTransactionsSummary = state => state.transactions.summary;

const selectTrasactionIdForDelete = state =>
  state.transactions.trasactionIdForDelete;

export {
  selectAllTransactions,
  selectTransactionsSummary,
  selectTrasactionIdForDelete,
};

// De continuat de aici, in jos//
