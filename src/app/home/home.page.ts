import { Component, OnInit } from '@angular/core';
import {
  WeatherService,
  WeatherData,
} from '../services/weather/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  weatherData: WeatherData | null = null;
  error: string = '';
  loading: boolean = true;
  city: string = 'Суми';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeatherData();
  }

  getWeatherData() {
    this.loading = true;
    this.error = '';

    this.weatherService.getWeatherData(this.city, 'metric').subscribe(
      (data: WeatherData) => {
        setTimeout(() => {
          this.loading = false;
          this.weatherData = this.roundNumericValues(data);
          console.log('Дані про погоду:', this.weatherData);
        }, 1000);
      },
      (error) => {
        setTimeout(() => {
          if (error.status === 404) {
            this.error =
              'Місто не знайдено. Перевірте правильність назви міста.';
          } else {
            this.error =
              'Помилка отримання даних про погоду. Спробуйте ще раз пізніше.';
          }
          this.loading = false;
        }, 1000);

        console.error('Помилка отримання даних про погоду:', error);
      }
    );
  }

  searchWeather(cityInput: any) {
    this.city = cityInput.value;
    this.getWeatherData();
    cityInput.value = '';
  }

  reloadWeather() {
    this.getWeatherData();
  }

  private roundNumericValues(data: WeatherData): WeatherData {
    const roundedData = { ...data };

    for (const prop in roundedData) {
      if (typeof roundedData[prop] === 'number') {
        roundedData[prop] = Math.round(roundedData[prop] as number);
      } else if (typeof roundedData[prop] === 'object') {
        roundedData[prop] = this.roundNumericValues(
          roundedData[prop] as WeatherData
        );
      }
    }

    return roundedData;
  }

  convertTimestampToTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }
}
