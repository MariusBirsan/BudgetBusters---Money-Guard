import { createSlice } from '@reduxjs/toolkit';

const TRANSACTION_ADD = 'transactions/add';
const TRANSACTION_GET_ALL = 'transactions/getAll';
const TRANSACTION_UPDATE = 'transactions/update';
const TRANSACTION_DELETE = 'transactions/delete';
const TRANSACTION_CATEGORIES_GET_ALL = 'transactionCategories/getAll';
const TRANSACTION_SUMMARY_GET = 'transactionSummary/get';

const initialState = {
  categories: [],
  transactions: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // PENDING:
      .addCase(TRANSACTION_ADD.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(TRANSACTION_GET_ALL.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(TRANSACTION_UPDATE.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(TRANSACTION_DELETE.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(TRANSACTION_CATEGORIES_GET_ALL.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(TRANSACTION_SUMMARY_GET.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      // FULFILLED:
      .addCase(TRANSACTION_ADD.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        state.loading = false;
      })
      .addCase(TRANSACTION_GET_ALL.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(TRANSACTION_UPDATE.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          t => t.id === action.payload.id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(TRANSACTION_DELETE.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          t => t.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(TRANSACTION_CATEGORIES_GET_ALL.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(TRANSACTION_SUMMARY_GET.fulfilled, (state, action) => {
        // Gestionăm completarea "thunk"-ului pentru sumarul tranzacțiilor.
        // Modificăm starea corespunzător:
        state.loading = false;
      })

      // REJECTED:
      .addCase(TRANSACTION_ADD.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(TRANSACTION_GET_ALL.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(TRANSACTION_UPDATE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(TRANSACTION_DELETE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(TRANSACTION_CATEGORIES_GET_ALL.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(TRANSACTION_SUMMARY_GET.rejected, (state, action) => {
        // Gestionam respingerea "thunk"-ului pentru sumarul tranzacțiilor.
        //Modificam starea in consecinta:
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
