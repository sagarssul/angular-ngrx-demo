import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { ContactActionTypes, ContactActions } from './contact.actions';
import { Contact } from '../../shared/models/contact';

// Extends the app state to include the contact feature.
// This is required because contacts are lazy loaded.
// So the reference to ContactState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  contacts: ContactState;
}

// State for this feature (Contact)
export interface ContactState {
  contacts: Contact[];
}

const initialState = {
  contacts: []
};

// Selector functions
const getContactFeatureState = createFeatureSelector<ContactState>('contacts');

export const getContacts = createSelector(getContactFeatureState, state => state.contacts);

export function reducer(state = initialState, action: ContactActions): ContactState {

  switch (action.type) {
    case ContactActionTypes.SaveContact:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    case ContactActionTypes.UpdateContact:
      return {
        ...state,
        contacts: state.contacts.map(item => action.payload.id === item.id ? action.payload : item)
      };

    case ContactActionTypes.DeleteContact:
      return {
        ...state,
        contacts: state.contacts.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
}
