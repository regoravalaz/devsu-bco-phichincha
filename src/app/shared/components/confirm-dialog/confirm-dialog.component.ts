import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmDialogService } from './confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  constructor(private stateHandler: ConfirmDialogService) {}

  get showing() {
    return this.stateHandler.showing;
  }

  get message() {
    return this.stateHandler.message;
  }

  close() {
    this.stateHandler.close();
  }

  confirm() {
    this.stateHandler.execute();
    this.stateHandler.close();
  }
}
