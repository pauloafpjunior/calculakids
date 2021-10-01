import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private toastCtrl: ToastController) { }

  error = true;

  items: any[] = [
    { name: "Pampers", price: 45, quantity: 40 },
    { name: "Pompo", price: 47, quantity: 38 }
  ]

  get theBestOne() {
    return this.items.length > 0 ? this.items[0] : null;
  }

  async onAdd() {
    const previousToast = await this.toastCtrl.getTop();
    if (previousToast) {
      await this.toastCtrl.dismiss();
    }

    const toast = await this.toastCtrl.create(
      {
        message: 'Adicionado!',
        duration: 2000,
        buttons: [
          {
            text: 'Fechar'
          }
        ]
      }
    );
    toast.present();
  }
}
