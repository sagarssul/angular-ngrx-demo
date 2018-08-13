/* @angular */
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Components */
import { GridComponent } from './components/grid/grid.component';

// Imports reusable components
const COMPONENETS = [
  GridComponent
];

// Sharemodule are responsible to share components, services, pipes and directives in application
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    COMPONENETS
  ],
  declarations: [
    COMPONENETS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
  constructor() { }
}
