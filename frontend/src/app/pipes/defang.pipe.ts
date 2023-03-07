import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defang'
})
export class DefangPipe implements PipeTransform {

  transform(value: string): unknown {
    return value
      .replace(/\[\.\]/g, ".")
      .replace(/hxxp/gi, "http")
      .replace(/\./g, "[.]")
      .replace(/http/gi, "hxxp");
  }

}
