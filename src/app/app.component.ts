import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  option: 'individual' | 'kit';

  constructor() {
    this.option = 'individual';
  }

  get isIndividual(): boolean {
    return this.option === 'individual';
  }
}
