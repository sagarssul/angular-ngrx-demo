/* @angular */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Declare application routes
const routes: Routes = [
  {
    path: 'contact', // Lazy loading
    loadChildren: './contact/contact.module#ContactModule'
  },
  {
    path: '',
    redirectTo: '/contact',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: './not-found/not-found.module#NotFoundModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
