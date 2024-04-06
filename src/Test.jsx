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

// todo: de continuat de aici, in jos //

export const getAllTransactionsThunk = createAsyncThunk(
  'transactions/getAll',
  async (_, thunkAPI) => {
    axiosConfig.setAxiosHeader();
    try {
      const response = await axiosConfig.get('/api/transactions');

      // Afișează datele în consolă:
      console.log('Datele din API:', response.data);
      return response.data;
    } catch (error) {
      debugger;
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
        `/api/transactions/${transactionId}`,
        transactionData
      );
      return response.data;
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
        `/api/transactions-summary?month=${month}&year=${year}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
