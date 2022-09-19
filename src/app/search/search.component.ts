import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private weatherService: WeatherService,
    private router: Router) { }

  ngOnInit(): void {
    // this.weatherService.getWeatherCities()
    //this.getCitiesData()
    this.getCities()
  }

  public data: any = []


  onKeyUp(event: any) {
    console.log(event);

    console.log('--------');

    const value = 'Kosice'
    console.log(value.search(event));

    //const result = this.data.filter((oneValue: any) => oneValue.name.includes(event))
    let arrayNew: object[] = []

    for (let i = 0; i < this.data.length; i++) {
      let data = this.data[i];
      console.log(data.name);

      if (data.name.includes(event)) {
        arrayNew.push(data)
      }
    }

    console.log(arrayNew);
    //console.log(result);

  }

  getCities(): void {
    console.log('call function get cities ');


    this.weatherService.getData().subscribe((data) => {
      console.log('resultttt ');
      console.log(data);

      this.data = data

    }, error => {
      console.log('you got error ');
      console.log(error);
    });
  }



  // getCitiesData(): void {
  //   console.log('volam functions');

  //   this.weatherService.data.subscribe((value) => {
  //     this.data = value;

  //     console.log('dostal som data');
  //     console.log(value);

  //   })
  // }


  showDetails(city: any) {
    this.router.navigate(['/details'],
      { queryParams: { lat: city.coord.lat, lon: city.coord.lon } });
  }


}
