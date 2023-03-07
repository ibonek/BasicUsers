import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(start: number, end: number | null = null): string {
    if (!start) {
      return '';
    }

    moment.locale('es');

    if(end) {
      let duration = moment(end).diff(moment(start));
      return moment.duration(duration, 'milliseconds').humanize();
    } else {
      return moment(start).fromNow(true);
    }
  }

}
