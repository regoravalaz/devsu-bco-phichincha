import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent {
  _showing: boolean = true;

  @Input('show')
  get showing() {
    return this._showing;
  }

  set showing(value: any) {
    this._showing = Boolean(value);
  }
}
