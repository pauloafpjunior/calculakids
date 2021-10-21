import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class Toast {

  constructor(private toastCtrl: ToastController) { }

  async showMessage(message: string, type: 'error' | 'success') {
    const previousToast = await this.toastCtrl.getTop();
    if (previousToast) {
      await this.toastCtrl.dismiss();
    }

    const toast = await this.toastCtrl.create(
      {
        message: message,
        duration: 2500,
        cssClass: `toast-${type}`,
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