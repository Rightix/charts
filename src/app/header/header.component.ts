import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <a mat-button routerLink="">Home</a>
      <a mat-button routerLink="dashboard">Dashboard</a>
      <a mat-button routerLink="forecast">Forecast</a>
    </header>
  `,
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }
  ngOnInit() {
  }
}
