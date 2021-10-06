import { Component } from '@angular/core';
import { Share } from '@capacitor/share';
import { Platform } from '@ionic/angular';
import { Toast } from './services/toast';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {



  option: 'individual' | 'kit';

  constructor(private toastCtrl: Toast, private platform: Platform) {
    this.option = 'individual';
  }

  get isIndividual(): boolean {
    return this.option === 'individual';
  }

  async share() {
    try {
      await Share.share({
        title: 'CalculaKids',
        text: 'Economize dinheiro com o aplicativo CalculaKids: ',
        url: 'https://calculakids.web.app/',
        dialogTitle: 'Compartilhe com seus amigos',
      });

    } catch (error) {
      this.toastCtrl.showMessage('Erro ao compartilhar!', 'error');
    }
  }

  get isShareable(): boolean {
    return this.platform.is('mobileweb');
  }
}
