import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChartComponent} from './chart/chart.component';
import {HomeComponent} from './home/home.component';
import {ForecastComponent} from './forecast/forecast.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: ChartComponent},
  {path: 'forecast', component: ForecastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
