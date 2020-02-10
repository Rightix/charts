import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl} from '@angular/forms';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {
  //
  response;
  isLoaded = false;
  tempChartData = [];
  feelsChartData = [];
  //
  optionsToView = [
    {name: 'Температура воздуха', value: 'temp'},
    {name: 'Температура воздуха по ощущениям', value: 'feelTemp'}
  ];
  dataControl1 = new FormControl();
  dataControl2 = new FormControl();
  hoursOnDay;
  localDates;
  chartTypes: Array<string> = ['line', 'column', 'bar'];
  // Selected day in charts
  selectedDayIndexInTempChart = 0;
  selectedDayIndexInFeelsChart = 0;
  // Update chart flags
  updateChartTemp = false;
  updateChartFeels = false;
  Highcharts: typeof Highcharts = Highcharts;
  // Charts instance
  chart1;
  chart2;
  public chartOptionsTemp = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Температура воздуха'
    },
    subtitle: {
      text: 'Source: yandex.weather.ru'
    },
    plotOptions: {
      series: {
        events: {
          click: (e) => {
            this.updateColor(e.point.series);
          },
        }
      }
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Температура °C'
      }
    },
    tooltip: {
      valueSuffix: ' °C'
    },
    series: []

  };
  public chartOptionsFeels = {
    chart: {
      type: 'line',
      color: '#1ea6e0'
    },
    title: {
      text: 'Температура воздуха по ощущениям'
    },
    subtitle: {
      text: 'Source: yandex.weather.ru'
    },
    plotOptions: {
      series: {
        events: {
          click: (e) => {
            this.updateColor(e.point.series);
          },
        }
      }
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Температура °C'
      }
    },
    tooltip: {
      valueSuffix: ' °C'
    },
    series: []
  };

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get<any>('api/?lat=61.784960&lon=34.346651&limit=7&', {
      headers: new HttpHeaders({
        'X-Yandex-API-Key': 'd68aa74c-2e33-446c-b7b2-4f834b0e9278',
      })
    })
      .subscribe(response => {
        this.response = response;
        this.isLoaded = true;
        this.localDates = this.initDates();
        this.initTempChartForecast(0);
        this.initFeelsChartForecast(0);
      });

  }
  updateColor(series) {
    const [...colors] = this.chart1.options.colors;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    series.update({color: randomColor}, true);
  }
  initTempChartForecast(dayIndex, changeDate?) {
    // Init default values
    if (changeDate) {
      // if date change
      this.setChartData(this.dataControl1.value, 'chart1');
    } else {
      this.tempChartData = this.getForecastsOnDay(dayIndex);
      this.selectedDayIndexInTempChart = dayIndex;
      this.chartOptionsTemp.series[0] = this.tempChartData[0];
      // this.chartOptionsTemp.series[0].color = '#ed561b';
      this.dataControl1.setValue([this.optionsToView[0].value]);
      this.hoursOnDay = this.getHoursOnDay(dayIndex);
      this.chartOptionsTemp.xAxis.categories = this.hoursOnDay;
      this.toUpdateChartTemp();
    }
  }
  initFeelsChartForecast(dayIndex, changeDate?) {
    if (changeDate) {
      // if date change
      this.setChartData(this.dataControl2.value, 'chart2');
    } else {
      this.feelsChartData = this.getForecastsOnDay(dayIndex);
      this.selectedDayIndexInFeelsChart = dayIndex;
      this.chartOptionsFeels.series[0] = this.feelsChartData[1];
      // this.chartOptionsFeels.series[0].color = '#1ea6e0';
      this.dataControl2.setValue([this.optionsToView[1].value]);
      this.hoursOnDay = this.getHoursOnDay(dayIndex);
      this.chartOptionsFeels.xAxis.categories = this.hoursOnDay;
      this.toUpdateChartFeels();
    }
  }

  toUpdateChartTemp() {
    this.updateChartTemp = true;
  }
  toUpdateChartFeels() {
    this.updateChartFeels = true;
  }
  initDates() {
    const datesArr = this.response.forecasts.map((item, index) => {
      const date = new Date(item.date_ts * 1000);
      return {
        dateString: date.toLocaleDateString(),
        dateIndex: index,
      };
    });
    return datesArr.splice(0, 4);
  }
  getForecastsOnDay(dayIndex) {
    const forecastOnDay = this.response.forecasts[dayIndex].hours;
    const tempOnDay = forecastOnDay.map((item) => item.temp);
    const feelsTempOnDay = forecastOnDay.map((item) => item.feels_like);
    return [
      {
        name: 'Температура воздуха',
        data: tempOnDay
      },
      {
        name: 'Температура воздуха по ощущениям',
        data: feelsTempOnDay
      }
    ];
  }
  getHoursOnDay(dayIndex) {
    return this.response.forecasts[dayIndex].hours.map((item) => {
      return `${item.hour}:00`;
    });
  }
  getSelectedData(optionsStr: Array<string>, chartData) {
    return optionsStr.map((item) => {
      switch (item) {
        case 'temp':
          return chartData[0];
        case 'feelTemp':
          return chartData[1];
      }
    });
  }
  setChartData(optionsStr, chartName) {
    this.tempChartData = this.getForecastsOnDay(this.selectedDayIndexInTempChart);
    this.feelsChartData = this.getForecastsOnDay(this.selectedDayIndexInFeelsChart);
    let chart;
    let series: Array<object>;
    switch (chartName) {
      case 'chart1':
        chart = this.chart1;
        series = this.getSelectedData(optionsStr, this.tempChartData);
        break;
      case 'chart2':
        chart = this.chart2;
        series = this.getSelectedData(optionsStr, this.feelsChartData);
        break;
    }
    chart.update({series}, true, true);
  }
  getInstanceChart(chart: Highcharts.Chart, name) {
    switch (name) {
      case 'chart1':
        this.chart1 = chart;
        break;
      case 'chart2':
        this.chart2 = chart;
        break;
    }
  }
}
