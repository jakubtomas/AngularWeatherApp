import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../interfaces/weather';
import { Forecast } from '../interfaces/forecast';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(private weatherService: WeatherService,
    private route: ActivatedRoute) { }

  public city: WeatherData | undefined;
  public cityForecast: any;
  date: string = ''
  presentTime: Date = new Date()


  ngOnInit(): void {
    this.date = this.presentTime.toDateString() + ' ' + this.presentTime.toLocaleTimeString();

    this.route.queryParams.subscribe((param: Params) => {
      if (param) {
        this.getCityWeatherData(param.lat, param.lon)
        // this.getDaysForecast(param.lat, param.lon)   // api is not free
      }
    });
  }

  getCityWeatherData(lat: number, lon: number): void {
    this.weatherService.getCityData(lat, lon).subscribe((city: WeatherData) => {
      this.city = city;
    })
  }

  getDaysForecast(lat: number, lon: number): void {
    this.weatherService.getCityForecast(lat, lon, 3).subscribe((forecast: Forecast) => {
      this.cityForecast = forecast;
    })
  }
}

