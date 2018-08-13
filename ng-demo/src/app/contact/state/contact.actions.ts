import { Action } from '@ngrx/store';
import { Contact } from './../../shared/models/contact';

export enum ContactActionTypes {
  SaveContact = '[Contact] Save Contact Details',
  UpdateContact = '[Contact] Update Contact Details',
  DeleteContact = '[Contact] Delete Contact Details'
}

export class SaveContact implements Action {
  readonly type = ContactActionTypes.SaveContact;
  constructor(public payload: Contact) { }
}

export class UpdateContact implements Action {
  readonly type = ContactActionTypes.UpdateContact;
  constructor(public payload: Contact) { }
}

export class DeleteContact implements Action {
  readonly type = ContactActionTypes.DeleteContact;
  constructor(public payload: number) { }
}

export type ContactActions = SaveContact
  | UpdateContact
  | DeleteContact;
