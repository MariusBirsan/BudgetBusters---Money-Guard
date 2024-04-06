import { createSlice } from '@reduxjs/toolkit';

import {
  addTransaction,
  deteleTransaction,
  fetchAllTransactions,
  fetchTransactionsSummary,
} from './operations';

const initialState = {
  categories: [],
  items: [],

  isLoading: false,
  error: null,

  summary: [],

  trasactionIdForDelete: '',
  transactionIdForUpdate: '',
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTrasactionIdForDelete: (state, action) => {
      state.trasactionIdForDelete = action.payload;
    },
  },
  extraReducers: builder => {
    builder

      // * Add transaction
      .addCase(addTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })

      // * Delete transaction
      .addCase(deteleTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(deteleTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deteleTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const index = state.items.findIndex(el => el.id === action.payload);
        state.items.splice(index, 1);
      })

      // * Get all transactions
      .addCase(fetchAllTransactions.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })

      // * Get transactions summary
      .addCase(fetchTransactionsSummary.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTransactionsSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTransactionsSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.summary = action.payload;
      });

    // todo: de continuat de aici in jos
  },
});

export const { setTrasactionIdForDelete } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
