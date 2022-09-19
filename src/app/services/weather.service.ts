import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, Subject, zip } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Forecast } from '../interfaces/forecast';
import { WeatherData } from '../interfaces/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  // bratislava , humenne,Koromľa, kosice, Michalovce , Sobrance , Sobrance
  private locations: [number, number][] = [[48.1482, 17.1067], [48.9371, 21.9163], [48.7163, 22.2926], [48.6667, 21.3333], [48.7543, 21.9195], [48.7445, 22.1814]]

  private apiKey: string = '06e9b78708a16a8749735c0ba9b09660'

  getCityData(lat: number, lon: number): Observable<WeatherData> {
    return this.http.get<any>('https://api.openweathermap.org/data/2.5/weather?lat=' + lat.toString() + '&lon=' + lon.toString() + '&appid=' + this.apiKey)
  }

  getCitiesData(): Observable<WeatherData[]> {

    const stream = of(this.locations)

    return stream.pipe(
      switchMap((cities: [number, number][]) => {
        return forkJoin(cities.map(city => {
          return this.getCityData(city[0], city[1])
        }))
      }))
  }

  getCityForecast(lat: number, lon: number, days: number): Observable<Forecast> {
    return this.http.get<any>('https://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat.toString() + '&lon=' + lon.toString() + '&cnt=' + days.toString() + '&appid=' + this.apiKey)
  }
}
