import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../axiosConfig';
import { toast } from 'react-toastify';

axiosConfig.setAxiosBaseURL();
axiosConfig.setAxiosHeader();

// *Add transaction //
const addTransaction = createAsyncThunk(
  'transactions/addTransaction',

  async (transactionData, thunkAPI) => {
    axiosConfig.setAxiosHeader();

    try {
      const response = await axios.post('/api/transactions', transactionData);

      toast.success('Transaction added successfully !');
      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Operation failed and transaction not saved. We are facing some technical problems with our servers ! `;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// *Get all transaction //

const fetchAllTransactions = createAsyncThunk(
  'transactions/fetchAllTransaction',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/transactions');
      toast.info(`You have ${response.data.length} transactions in your list`);

      // todo: mesaj cu nu ai nicio tranzactie in lista
      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Operation failed and transaction not saved. We are facing some technical problems with our servers ! `;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// todo: de continuat de aici, in jos //

const updateTransactionThunk = createAsyncThunk(
  'transactions/update',

  async ({ transactionId, transactionData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/transactions/${transactionId}`,
        transactionData
      );

      toast.success('Transaction added successfully!');
      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Operation failed, the transaction was not updated. We are facing some technical problems on our servers!`;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteTransactionThunk = createAsyncThunk(
  'transactions/delete',

  async (transactionId, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/transactions/${transactionId}`);

      toast.success('Transaction deleted successfully!');
      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Operation failed, the transaction was not deleted. We are facing some technical problems on our servers!`;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getTransactionCategoriesThunk = createAsyncThunk(
  'transactionCategories/getAll',

  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/transaction-categories');

      toast.success('Successfully received transaction categories!');
      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Operation failed, transaction categories could not be sent. We are facing some technical problems on our servers!`;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Transaction Summary Controller:
const getTransactionSummaryThunk = createAsyncThunk(
  'transactionSummary/get',

  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/transactions-summary?month=${month}&year=${year}`
      );

      toast.success('The transaction summary was successfully obtained!');
      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Operation failed, the transaction summary was not send. We are facing some technical problems on our servers!`;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export {
  addTransaction,
  fetchAllTransactions,
  updateTransactionThunk,
  deleteTransactionThunk,
  getTransactionCategoriesThunk,
  getTransactionSummaryThunk,
};
