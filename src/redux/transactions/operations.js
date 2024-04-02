import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/apiConfig';

export const addTransactionThunk = createAsyncThunk(
  'transactions/add',
  async (transactionData, thunkAPI) => {
    try {
      const response = await api.post('/transactions', transactionData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllTransactionsThunk = createAsyncThunk(
  'transactions/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/transactions');

      // Afișează datele în consolă:
      console.log('Datele din API:', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTransactionThunk = createAsyncThunk(
  'transactions/update',
  async ({ transactionId, transactionData }, thunkAPI) => {
    try {
      const response = await api.patch(
        `/transactions/${transactionId}`,
        transactionData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTransactionThunk = createAsyncThunk(
  'transactions/delete',
  async (transactionId, thunkAPI) => {
    try {
      await api.delete(`/transactions/${transactionId}`);
      return transactionId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTransactionCategoriesThunk = createAsyncThunk(
  'transactionCategories/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/transaction-categories');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Transaction Summary Controller:
export const getTransactionSummaryThunk = createAsyncThunk(
  'transactionSummary/get',
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await api.get(
        `/transactions-summary?month=${month}&year=${year}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
