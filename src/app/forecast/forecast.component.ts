import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-forecast',
  template: `
    <div *ngIf="isLoaded" class="forecast-wrapper">
      <div class="forecast-card">
        <div class="forecast-card__title">Актуальный прогноз</div>
        <div class="forecast-card-icon">
            <img [src]="forecastIconUrl" alt="">
        </div>
        <div *ngFor="let forecastItem of currentForecast" class="forecast-card-item">
          <div class="forecast-card-item__name">{{forecastItem.name}}</div>
          <div class="forecast-card-item__value">{{forecastItem.value}}</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./forecast.component.sass']
})
export class ForecastComponent implements OnInit {
  isLoaded = false;
  currentForecast: Array<object>;
  response;
  forecastIconUrl: string;
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.http.get<any>('api/?lat=61.784960&lon=34.346651&limit=7&', {
      headers: new HttpHeaders({
        'X-Yandex-API-Key': 'd68aa74c-2e33-446c-b7b2-4f834b0e9278',
      })
    })
      .subscribe(response => {
        this.response = response;
        this.isLoaded = true;
        this.currentForecast = this.getCurrentForecast(response);
        this.forecastIconUrl = this.getForecastIcon(response);
      });
  }
  getForecastIcon(response) {
    const iconName = response.fact.icon;
    return `https://yastatic.net/weather/i/icons/blueye/color/svg/${iconName}.svg`;
  }
  getCurrentForecast(response) {
    const data = response.fact;
    return [
      {name: 'Температура воздуха: ', value: `${data.temp} °C`},
      {name: 'Ощущается как: ', value: `${data.feels_like} °C`},
      {name: 'Влажность: ', value: `${data.humidity} %`},
      {name: 'Скорость ветра: ', value: `${data.wind_speed} м/c`},
    ];
  }
}
