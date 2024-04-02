import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// const savedData = JSON.parse(localStorage.getItem('persist:auth'));
// const token = savedData?.token.slice(1, -1);

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
axios.defaults.headers.common.Authorization = `Bearer "asfafasgasdg12421354325325325"`;

const ERROR_NOTIFY = `We're sorry ! We have some problems with the server`;

const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');

      return response.data;
    } catch (error) {
      toast.error(ERROR_NOTIFY);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { ...contact });

      toast.success(`"${contact.name}" added to your list`);
      return response.data;
    } catch (error) {
      toast.error(ERROR_NOTIFY);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);

      toast.success(`Contact deleted with success`);
      return response.data;
    } catch (error) {
      toast.error(ERROR_NOTIFY);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { fetchContacts, addContact, deleteContact };
