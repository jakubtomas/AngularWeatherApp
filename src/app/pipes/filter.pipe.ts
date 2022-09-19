import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCities'
})
export class FilterPipe implements PipeTransform {

  transform(cities: any[], filterString: string): any {

    if (cities.length === 0 || filterString === '') {
      return cities;
    } else {

      let arrayNew: any[] = [];

      for (let i = 0; i < cities.length; i++) {
        let data = cities[i];

        if (data.name.toLowerCase().includes(filterString.toLocaleLowerCase())) {

          arrayNew.push(data)
        }
      }

      return arrayNew;
    }

  }

}
