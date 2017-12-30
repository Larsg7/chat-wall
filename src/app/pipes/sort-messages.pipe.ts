import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../models/message';

@Pipe({
  name: 'sortMessages'
})
export class SortMessagesPipe implements PipeTransform {

  transform(value: Message[], dir: 'asc' | 'desc'): any {
    value.sort(function(m1, m2) {
      const a = new Date(m1.dateCreated);
      const b = new Date(m2.dateCreated);
      return a > b ? -1 : a < b ? 1 : 0;
    });
    return value;
  }

}
