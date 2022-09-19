import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(dateNumber: number): string {

    const date = new Date(dateNumber)


    return date.getHours() + ' ' + date.getMinutes();
  }

}
