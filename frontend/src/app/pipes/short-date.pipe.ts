import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DATE_FORMAT } from '../models/app.constants';

@Pipe({
  name: 'shortDate'
})
export class ShortDatePipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value === 'string') {
      return moment(value, ['YYYYMMDDTHHmmZZ', 'DD-MM-YYYY HH:mm']).format(DATE_FORMAT);
    } else if (typeof value === 'number') {
      return moment(value).format(DATE_FORMAT);
    } else {
      if (value !== undefined) console.log("[!] shortDate desconocido: " + value);
      return '';
    }
  }

}
