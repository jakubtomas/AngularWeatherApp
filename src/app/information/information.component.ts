import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(private weatherService: WeatherService,
    private route: ActivatedRoute) { }

  public city: any;
  public cityForecast: any;

  ngOnInit(): void {
    /*QUEra pramter */
    this.route.queryParams.subscribe((param: Params) => {

      if (param) {
        this.getCityWeatherData(param.lat, param.lon)
        // this.getDaysForecast(param.lat, param.lon)   // api is not free
      }
    }, error => {
      console.log('you got error ');
      console.log(error);
    });
  }

  getCityWeatherData(lat: number, lon: number) {
    this.weatherService.getCityData(lat, lon).subscribe((value) => {
      this.city = value;
      console.log(this.city);

    })
  }

  getDaysForecast(lat: number, lon: number) {
    this.weatherService.getCityForecast(lat, lon, 3).subscribe((forecast) => {
      this.cityForecast = forecast;
    })
  }


  // of(1, 2, 3).pipe(
  //   tap((value) => {
  //     console.log(value);

  //   })
  // ).subscribe()

  // this.weatherService.data.subscribe((value) => {
  //   console.log('omg data vlaue asd;flkjasdf;lk');
  //   console.log(value);

  // })
}

  // poslem parameter a vyfiltrujem na zaklade toho


  // getWeatherData() {
  //   this.weatherService.data.subscribe((value) => {

  //     console.log('dostal som data');
  //     console.log(value);
  //   })
  // }

