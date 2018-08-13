import { StoreModule } from '@ngrx/store';
/* @angular */
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Application Modules */
import { SharedModule } from '../shared/shared.module';

/* Components */
import { ContactComponent } from './contact.component';
import { reducer } from './state/contact.reducer';

const routes: Routes = [{ path: '', component: ContactComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule.forRoot(),
    StoreModule.forFeature('contacts', reducer)
  ],
  declarations: [
    ContactComponent
  ],
  exports: [
    ContactComponent
  ]
})
export class ContactModule { }
