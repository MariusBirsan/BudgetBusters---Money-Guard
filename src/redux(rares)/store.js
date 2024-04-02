import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
// import { contactsReducer } from './contacts/slice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'auth',
  storage,
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    // contacts: contactsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
