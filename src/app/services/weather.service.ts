import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of, Subject, zip } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }


  public subject = new BehaviorSubject([]);
  public city = new Subject()
  public data = new Subject();
  // public pole = new Subject<[]>()

  private weatherData: any[] = [];

  // bratislava , humenne,Koromľa, kosice, Michalovce , Sobrance , Sobrance
  private locations: [number, number][] = [[48.1482, 17.1067], [48.9371, 21.9163], [48.7163, 22.2926], [48.6667, 21.3333], [48.7543, 21.9195], [48.7445, 22.1814]]

  private apiKey = '06e9b78708a16a8749735c0ba9b09660'
  private serverUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid='


  getWeatherCities() {

    //this.getWeatherOneCity('https://api.openweathermap.org/data/2.5/weather?lat=' + this.locations[0][0].toString() + '&lon=' + this.locations[0][1].toString() + '&appid=')
    this.locations.map((location: any) => {
      this.getWeatherOneCity('https://api.openweathermap.org/data/2.5/weather?lat=' + location[0].toString() + '&lon=' + location[1].toString() + '&appid=')
    })


  }

  getWeatherOneCity(url: string) {

    this.http.get<any>(url + this.apiKey).subscribe(data => {
      // console.log('data');
      // console.log(data);

      this.weatherData.push(data);
      this.data.next(Object.assign([], this.weatherData));
      // this.subject.next()
      // this.subject.complete()

    })
  }


  getCityData(lat: number, lon: number): Observable<any> {
    return this.http.get<any>('https://api.openweathermap.org/data/2.5/weather?lat=' + lat.toString() + '&lon=' + lon.toString() + '&appid=' + this.apiKey)
  }

  // getCityData2(address: any): Observable<any> {
  //   return this.http.get<any>(address + this.apiKey)
  // }


  getData(): Observable<any> {

    const stream = of(this.locations)

    return stream.pipe(
      switchMap((cities: [number, number][]) => {
        return forkJoin(cities.map(city => {
          return this.getCityData(city[0], city[1])
        }))

      }))
  }

  getCityForecast(lat: number, lon: number, days: number): Observable<any> {
    return this.http.get<any>('https://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat.toString() + '&lon=' + lon.toString() + '&cnt=' + days.toString() + '&appid=' + this.apiKey)


  }


  // getData() {

  //   const stream = of(this.locations)

  //   return stream.pipe(
  //     switchMap((value: [number, number][]) => {

  //       return forkJoin(value.map(value => {
  //         //return this.http.get<any>(serverUrl + this.apiKey);
  //         return this.getOne('https://api.openweathermap.org/data/2.5/weather?lat=' + value[0].toString() + '&lon=' + value[1].toString() + '&appid=')
  //       }))

  //     })
  //   ).subscribe((data) => {
  //     console.log('-------- ');
  //     console.log('resultttt ');
  //     console.log(data);

  //   }, error => {
  //     console.log('you got error ');
  //     console.log(error);
  //   });
  // }



  // getData() {
  //   const stream = of(this.locations)
  //   const nums: number[] = [1, 2, 3, 3]
  //   let newValue: any;
  //   //const nums2: [number,number][] = [[1],[2]]


  //   const cities: any = stream.pipe(
  //     tap((value) => {
  //       console.log('tap function');
  //       console.log(value);
  //       console.log('-------------');
  //     }), switchMap((value: [number, number][]) => {
  //       return newValue = value.map((one) => {
  //         console.log(one);
  //         return this.http.get<any>(this.serverUrl + this.apiKey)
  //       })
  //       //   return this.http.get<any>(this.serverUrl + this.apiKey)
  //     })
  //   ).subscribe((data) => {
  //     console.log('resultttt ');
  //     console.log(data);

  //   }, error => {
  //     console.log('you got error ');
  //     console.log(error);
  //   });

  // }




  // getWeatherOneCity() {
  //   console.log('call function');

  //   this.http.get<any>(this.serverUrl + this.apiKey).subscribe(data => {
  //     console.log('data');
  //     console.log(data);

  //   })
  // }
}
// take example subscribe , done
// example datat
// example api
// how to fetch more cities values from api


// 1 create subject and every value call request


// try of (dta) ,merge map switchMap
