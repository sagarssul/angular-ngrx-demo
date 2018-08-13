/* @angular */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as ContactActions from './state/contact.actions';
import * as fromContacts from './state/contact.reducer';

/* Services */
import { ValidationService } from '../core/validations.service';

/* Models */
import { Contact } from './../shared/models/contact';
import { Grid } from './../shared/models/grid';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  public contactForm: FormGroup;
  public gridDetails: Grid;
  private subscription: Subscription;

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.gridDetails = { title: '', rows: [], columns: [] };
  }

  ngOnInit() {
    this.initForm();
    this.createGrid();
    this.subscribeContactList();
  }

  // Initialize reactive form validations.
  initForm(): void {
    this.contactForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      phoneNumber: ['', Validators.compose([Validators.required, ValidationService.phoneValidator])],
      status: ['', Validators.compose([Validators.required])]
    });
  }

  // Clear form
  clearForm(): void {
    this.contactForm.reset({
      status: ''
    });
  }

  // Add new contact
  saveContact(): void {
    const contact: Contact = this.contactForm.getRawValue(); // Get form values
    contact.id = new Date().getTime(); // Generate unique contact id
    this.store.dispatch(new ContactActions.SaveContact(contact)); // Dispatch store action to save details
    this.clearForm();
  }

  // Update selected contact
  updateContact(): void {
    const contact: Contact = this.contactForm.getRawValue(); // Get form values
    this.store.dispatch(new ContactActions.UpdateContact(contact)); // Dispatch store action to update details
    this.clearForm();
  }

  // Delete inactive contact records
  deleteContact(contact: Contact): void {
    if (contact.status === 'Inactive') {
      if (confirm(`Really delete the contact: ${contact.firstName + ' ' + contact.lastName}?`)) {
        this.store.dispatch(new ContactActions.DeleteContact(contact.id));
      }
    } else {
      alert('Sorry you can not delete active contact.');
    }
  }

  // Set active records for update
  setContact(contact: Contact): void {
    this.contactForm.setValue(contact);
  }

  // Get contact list from store
  private subscribeContactList(): void {
    this.subscription = this.store.pipe(select(fromContacts.getContacts)).subscribe((response) => {
      this.gridDetails.rows = response;
    });
  }

  // Create contact grid columns
  private createGrid(): void {
    this.gridDetails.title = 'Contact List';
    this.gridDetails.columns = [{
      label: 'First Name',
      key: 'firstName'
    },
    {
      label: 'Last Name',
      key: 'lastName'
    },
    {
      label: 'Email',
      key: 'email'
    },
    {
      label: 'Phone Number',
      key: 'phoneNumber'
    },
    {
      label: 'Status',
      key: 'status'
    }];
  }

  // Cleanup subscriptions
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
