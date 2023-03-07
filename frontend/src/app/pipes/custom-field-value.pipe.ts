import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DATE_FORMAT } from '../models/app.constants';

@Pipe({
  name: 'customFieldValue'
})
export class CustomFieldValuePipe implements PipeTransform {

  transform(value: any): string {
    if(!value) {
      return '';
    }

    switch(value.type) {
        case 'date':
            return moment(value.value).format(DATE_FORMAT);
        default:
            return value.value;
    }
  }

}
