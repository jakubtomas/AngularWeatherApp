import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCelsium'
})
export class ToCelsiumPipe implements PipeTransform {

  transform(temperatureKelvin: number, argument: number = 0): string {
    return (temperatureKelvin - 273.15).toFixed(argument) + ' ';
  }

}
