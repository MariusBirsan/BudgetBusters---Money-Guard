import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosConfig from '../axiosConfig';

/* Dan: Daca vrei sa testezi operatiile tale de trazactii: importa axiosConfig, (apeleaza
   functia: setAxiosBaseURL() ca pe linia 15. iar apoi, unde ai nevoie de autorizare (cred ca peste tot
    in toate functiile), acolo trebuie sa aplezi si functia: axiosConfig.setAxiosHeader() (*ca pe 
    linia 54) )

    PS: pe partea de tranzactii nu am facut nimic, poti sa muti tu logica si sa redenumesti folder 
    contacts, in transactions. Dupa vezi sa il conectezi la store  (sa fie importul facut la noul folder)
*/

axiosConfig.setAxiosBaseURL();

const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/sign-up', { ...userData });

      toast.success('Your account has been successfully created !');

      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Register failed. We are facing some technical problems with our servers ! `;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const logIn = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('/api/auth/sign-in', { ...userData });

    toast.success('Logged in successfully !');
    return response.data;
  } catch (error) {
    const errorNotify =
      error.response.data.message ??
      `Log in failed. We are facing some technical problems with our servers ! `;

    toast.error(errorNotify);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  axiosConfig.setAxiosHeader();

  try {
    await axios.delete('/api/auth/sign-out');

    axiosConfig.clearAxiosHeader();
    toast.success(`You're logged out !`);
    return;
  } catch (error) {
    toast.error('Logged out failed. Please, try again !');
    return thunkAPI.rejectWithValue(error.message);
  }
});

export { register, logIn, logOut };
