import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { WeatherService } from '../services/weather/weather.service';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;

  beforeEach(waitForAsync(() => {
    const weatherServiceSpyObj = jasmine.createSpyObj('WeatherService', ['getWeatherData']);

    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpyObj }
      ]
    }).compileComponents();

    weatherServiceSpy = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch weather data on initialization', () => {
    const weatherData = { name: 'Test City', main: { temp: 10 } };
    weatherServiceSpy.getWeatherData.and.returnValue(of(weatherData));

    component.ngOnInit();

    expect(component.weatherData).toEqual(weatherData);
  });

  it('should handle error when fetching weather data', () => {
    const errorMessage = 'City not found';
    const errorResponse = { status: 404 };
    weatherServiceSpy.getWeatherData.and.returnValue(throwError(errorResponse));

    component.ngOnInit();

    expect(component.error).toEqual(errorMessage);
  });

  it('should round numeric values', () => {
    const data = { temperature: 25.5, humidity: 75.8 };
    const roundedData = { temperature: 26, humidity: 76 };

    const roundedValues = component.roundNumericValues(data);

    expect(roundedValues).toEqual(roundedData);
  });

  it('should convert timestamp to time', () => {
    const timestamp = 1612921200; // Example timestamp for 2021-02-10T08:00:00
    const expectedTime = '08:00:00';

    const convertedTime = component.convertTimestampToTime(timestamp);

    expect(convertedTime).toEqual(expectedTime);
  });
});
