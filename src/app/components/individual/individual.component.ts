import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { Ranking } from 'src/app/model/ranking';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss'],
})
export class IndividualComponent implements OnInit {

  constructor(private toastCtrl: ToastController, private ranking: Ranking) { }

  trademark: string = null;
  price: number = null;
  quantity: number = null;

  products: Product[] = [];

  ngOnInit() {
    this.updateProducts();
  }

  cleanForm() {
    this.trademark = null;
    this.price = null;
    this.quantity = null;
  }

  updateProducts() {
    this.products = this.ranking.sortedProducts;
  }


  async onAdd() {
    const error = this.ranking.addProduct(this.trademark, this.price, this.quantity);

    if (error) {
      await this.showMessage(error.message, 'error');
    } else {
      this.cleanForm();
      this.updateProducts();
      await this.showMessage("Adicionado!", 'success');
    }
  }

  async onRemove(index: number) {
    this.ranking.remove(index);
  }

  get theBestOne(): Product {
    return this.products.length > 0 ? this.products[0] : null;
  }

  async showMessage(message: string, type: 'error' | 'success') {
    const previousToast = await this.toastCtrl.getTop();
    if (previousToast) {
      await this.toastCtrl.dismiss();
    }

    const toast = await this.toastCtrl.create(
      {
        message: message,
        duration: 2000,
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
