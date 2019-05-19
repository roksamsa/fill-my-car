// Custom DateAdapter
import { NgModule } from '@angular/core';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material';

let month: any;

// extend NativeDateAdapter's format method to specify the date format.
export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getUTCDate() + 1;
      month = date.getUTCMonth() + 1;
      const year = date.getFullYear();
      switch (month) {
        case 1:
          month = 'januar';
          break;
        case 2:
          month = 'februar';
          break;
        case 3:
          month = 'marec';
          break;
        case 4:
          month = 'april';
          break;
        case 5:
          month = 'maj';
          break;
        case 6:
          month = 'junij';
          break;
        case 7:
          month = 'julij';
          break;
        case 8:
          month = 'avgust';
          break;
        case 9:
          month = 'september';
          break;
        case 10:
          month = 'oktober';
          break;
        case 11:
          month = 'november';
          break;
        case 12:
          month = 'december';
          break;
      }
      // Return the format as per your requirement
      return `${day}. ${month} ${year}`;
    } else {
      return date.toDateString();
    }
  }

  // If required extend other NativeDateAdapter methods.
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

@NgModule({
  declarations: [],
  imports: [],
  exports: [MatDatepickerModule, MatNativeDateModule],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'sl-SI' }
  ]
})

export class DatePickerModule {
}
