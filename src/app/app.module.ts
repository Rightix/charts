import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChartComponent} from './chart/chart.component';
import {HeaderComponent} from './header/header.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {HomeComponent} from './home/home.component';
import {ForecastComponent} from './forecast/forecast.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    HeaderComponent,
    HomeComponent,
    ForecastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
