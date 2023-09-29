import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[date-range-constraint]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DateRangeContraintDirective,
      multi: true,
    },
  ],
})
export class DateRangeContraintDirective implements Validator {
  @Input('min')
  minDate!: string;

  @Input('max')
  maxDate!: string;

  parseDate(value: string): Date | null {
    const momentValue = moment(value, 'DD/MM/YYYY', true);
    if (momentValue.isValid()) {
      return momentValue.toDate();
    }
    return null;
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;

    if (control.value !== null && control.value !== undefined) {
      const date = this.parseDate(value);
      if (date == null) {
        return {
          format: 'La fecha debe ser en formato dd/mm/yyyy',
        };
      }
      date.setHours(0, 0, 0, 0);

      if (this.minDate && this.maxDate) {
        const maxDate = new Date(this.maxDate);
        const minDate = new Date(this.minDate);
        this.resetDate(minDate);
        this.resetDate(maxDate);

        if (date <= minDate && date >= maxDate) {
          return {
            min: 'La fecha debe ser mayor a ' + this.minDate,
            max: 'La fecha debe ser menor a ' + this.maxDate,
          };
        }
      }

      if (this.maxDate) {
        const maxDate = new Date(this.maxDate);
        this.resetDate(maxDate);
        if (date >= maxDate) {
          return {
            max: 'La fecha debe ser menor a ' + this.maxDate,
          };
        }
      }

      if (this.minDate) {
        const minDate = new Date(this.minDate);
        this.resetDate(minDate);

        if (date < minDate) {
          return {
            min: 'La fecha debe ser mayor a ' + this.minDate,
          };
        }
      }
    }

    return null;
  }

  resetDate(value: Date) {
    value.setHours(0, 0, 0, 0);
  }
}
