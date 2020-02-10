import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-wrapper">
      <h1>Главная страница</h1>
    </div>
  `,
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor() {
  }
  ngOnInit() {
  }
}
