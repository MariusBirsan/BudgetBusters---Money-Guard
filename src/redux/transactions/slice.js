import { createSlice } from '@reduxjs/toolkit';

import {
  addTransaction,
  fetchAllTransactions,
  updateTransactionThunk,
  deleteTransactionThunk,
  getTransactionCategoriesThunk,
  getTransactionSummaryThunk,
} from './operations';

const initialState = {
  categories: [],
  items: [],

  isLoading: false,
  error: null,

  filter: {
    mounth: '',
    date: '',
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
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

      // * updateTransactionThunk
      .addCase(updateTransactionThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTransactionThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(updateTransactionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // * deleteTransactionThunk
      .addCase(deleteTransactionThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTransactionThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteTransactionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // * getTransactionCategoriesThunk
      .addCase(getTransactionCategoriesThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactionCategoriesThunk.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(getTransactionCategoriesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // * getTransactionSummaryThunk
      .addCase(getTransactionSummaryThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactionSummaryThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(getTransactionSummaryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
