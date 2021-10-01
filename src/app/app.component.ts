import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  items: any[] = [
    {name: "Pampers", price: 45, quantity: 40},
    {name: "Pompo", price: 47, quantity: 38}
  ]

  get theBestOne() {
    return this.items.length > 0 ? this.items[0] : null;
  }
}
