import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../redux(rares)/axiosConfig';

axiosConfig.setAxiosBaseURL();

export const addTransactionThunk = createAsyncThunk(
  'transactions/add',
  async (transactionData, thunkAPI) => {
    axiosConfig.setAxiosHeader();
    try {
      const response = await axiosConfig.post('/transactions', transactionData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllTransactionsThunk = createAsyncThunk(
  'transactions/getAll',
  async (_, thunkAPI) => {
    axiosConfig.setAxiosHeader();
    try {
      const response = await axiosConfig.get('/transactions');

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
    axiosConfig.setAxiosHeader();
    try {
      const response = await axiosConfig.patch(
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
    axiosConfig.setAxiosHeader();
    try {
      await axiosConfig.delete(`/transactions/${transactionId}`);
      return transactionId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTransactionCategoriesThunk = createAsyncThunk(
  'transactionCategories/getAll',
  async (_, thunkAPI) => {
    axiosConfig.setAxiosHeader();
    try {
      const response = await axiosConfig.get('/transaction-categories');
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
    axiosConfig.setAxiosHeader();
    try {
      const response = await axiosConfig.get(
        `/transactions-summary?month=${month}&year=${year}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
