import { createSelector } from '@reduxjs/toolkit';

const selectIsLoading = state => state.contacts.isLoading;
const selectError = state => state.contacts.error;
const selectFilter = state => state.contacts.filter;
const selectContacts = state => state.contacts.items;

const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(item =>
      item.name.toUpperCase().includes(filter.toUpperCase())
    );
  }
);

export {
  selectIsLoading,
  selectError,
  selectContacts,
  selectFilter,
  selectFilteredContacts,
};
