// import { createSelector } from '@reduxjs/toolkit';

const selectAllTransactions = state => state.transactions.items;

const selectTransactionsSummary = state => state.transactions.summary;

const selectFilteredCategories = state => {
  const categorieSummary = state.transactions.summary?.categoriesSummary;
  return categorieSummary?.filter(item => item.name !== 'Income');
};

// const selectFilteredCategories = createSelector(
//   [selectTransactionsSummary],
//   transactionsSummary => {
//     return transactionsSummary?.categorieSummary?.filter(
//       item => item.name !== 'Income'
//     );
//   }
// );

const selectTrasactionIdForDelete = state =>
  state.transactions.trasactionIdForDelete;

const selectTransactionForUpdate = state =>
  state.transactions.transactionForUpdate;

const selectIsLoading = state => state.transactions.isLoading;

export {
  selectAllTransactions,
  selectTransactionsSummary,
  selectTrasactionIdForDelete,
  selectTransactionForUpdate,
  selectFilteredCategories,
  selectIsLoading,
};
