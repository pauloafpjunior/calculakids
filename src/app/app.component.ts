import { Component } from '@angular/core';
import { Share } from '@capacitor/share';
import { Toast } from './services/toast';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {



  option: 'individual' | 'kit';

  constructor(private toastCtrl: Toast) {
    this.option = 'individual';
  }

  get isIndividual(): boolean {
    return this.option === 'individual';
  }

  async share() {
    try {
      await Share.share({
        title: 'CalculaKids',
        text: 'Economize dinheiro com esse aplicativo',
        url: 'https://calculakids.com',
        dialogTitle: 'Compartilhe com seus amigos',
      });

    } catch (error) {
      this.toastCtrl.showMessage('Erro ao compartilhar!', 'error');
    }
  }
}
