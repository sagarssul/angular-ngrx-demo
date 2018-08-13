import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent {
  @Input() gridDetails: any;
  @Output() updateDetails: EventEmitter<any> = new EventEmitter();
  @Output() deleteDetails: EventEmitter<number> = new EventEmitter();

  constructor() { }

  updateRecord(details: any): void {
    this.updateDetails.emit(details);
  }

  deleteRecord(details: any): void {
    this.deleteDetails.emit(details);
  }

}
