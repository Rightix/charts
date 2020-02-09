import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
/*  localDates: Array<any> = [];
  forecastOnDay: Array<any> = [];
  tempOnCurrentDay: Array<any> = [];
  hoursOnDay: Array<string> = [];
  currentForecast: object = {};*/
  response: any;
  // public chartOptions = {};
  loaded = false;
  private data: any;

  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.http.get<any>('api/?lat=61.784960&lon=34.346651&limit=7&', {
      headers: new HttpHeaders({
        'X-Yandex-API-Key': 'd68aa74c-2e33-446c-b7b2-4f834b0e9278',
      })
    })
      .subscribe(response => {
        console.log(response);
        this.response = response;
        this.loaded = true;
      });
    // this.chartOptions.xAxis.categories = this.dates;

  }

/*  getStringDates() {
    return this.dates.map((item) => {
      return item.dateString;
    });
  }*/

}
