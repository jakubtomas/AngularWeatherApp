import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAmPm'
})
export class ConvertDatePipe implements PipeTransform {

  transform(numberDate: number): string {

    return new Date(numberDate * 1000).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

}
