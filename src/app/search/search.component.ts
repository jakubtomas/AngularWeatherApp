import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coord, WeatherData } from '../interfaces/weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private weatherService: WeatherService,
    private router: Router) { }

  filterText: string = '';

  ngOnInit(): void {
    this.getCities()
  }

  public data: WeatherData[] = [];

  getCities(): void {
    this.weatherService.getCitiesData().subscribe((data) => {
      this.data = data

    });
  }

  showDetails(coord: Coord): void {

    this.router.navigate(['/details'],
      { queryParams: { lat: coord.lat, lon: coord.lon } });
  }


}
