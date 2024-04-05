import { createSelector } from '@reduxjs/toolkit';

const selectAllTransactions = state => state.transactions.items;

export { selectAllTransactions };

// De continuat de aici, in jos//

// Selector pentru a obține toate categoriile din starea Redux:
export const selectCategories = state => state.transactions.categories;

// Selector pentru a filtra categoriile și a elimina categoria INCOME:
export const selectFilteredCategories = createSelector(
  [selectCategories],
  categories => {
    return categories.filter(category => category.type !== 'INCOME');
  }
);

// Selector pentru a sorta tranzacțiile după data tranzacției:
// export const selectSortedTransactions = createSelector(
//   [selectTransactions],
//   transactions => {
//     return transactions
//       .slice()
//       .sort(
//         (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
//       );
//   }
// );

// Selector pentru a obține suma totală a tranzacțiilor de tip venit:
// export const selectTotalIncome = createSelector(
//   [selectTransactions],
//   transactions => {
//     return transactions.reduce((total, transaction) => {
//       return transaction.type === 'INCOME' ? total + transaction.amount : total;
//     }, 0);
//   }
// );

// Selector pentru a obține suma totală a tranzacțiilor de tip cheltuială:
// export const selectTotalExpenses = createSelector(
//   [selectTransactions],
//   transactions => {
//     return transactions.reduce((total, transaction) => {
//       return transaction.type === 'EXPENSE'
//         ? total + transaction.amount
//         : total;
//     }, 0);
//   }
// );
