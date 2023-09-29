import { Injectable } from '@angular/core';

const defaultCallback = () => {};

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private _showing: boolean = false;
  private _message: string = '';
  private _callback: () => void = defaultCallback;

  constructor() {}

  get showing() {
    return this._showing;
  }

  get message() {
    return this._message;
  }

  open(message = '', callback = defaultCallback) {
    this._showing = true;
    this._message = message;
    this._callback = callback;
  }

  close() {
    this._showing = false;
  }

  execute() {
    this._callback();
  }
}
