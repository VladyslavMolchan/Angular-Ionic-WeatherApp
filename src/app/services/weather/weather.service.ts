// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherData {
  temp: number;
  humidity: number;
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  weather: {
    icon: string;
  }[];
  name: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherData(
    city: string,
    units: string = 'metric'
  ): Observable<WeatherData> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=${units}`;
    return this.http.get<WeatherData>(url);
  }
}
