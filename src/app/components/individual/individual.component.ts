import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, ToastController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { Ranking } from 'src/app/services/ranking';
import { Toast } from 'src/app/services/toast';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss'],
})
export class IndividualComponent implements OnInit {

  constructor(private toastCtrl: Toast, private ranking: Ranking) { }

  trademark: string = null;
  priceStr: string = null;
  quantity: number = null;

  products: Product[] = [];

  ngOnInit() {
    this.updateProducts();
  }

  cleanForm() {
    this.trademark = null;
    this.priceStr = null;
    this.quantity = null;
  }

  updateProducts() {
    this.products = this.ranking.sortedProducts;
  }


  async onAdd() {
    try {
      const price = Number(this.priceStr.replace('.', '').replace(',', '.'));
      this.ranking.addProduct(this.trademark, price, this.quantity);
      this.cleanForm();
      this.updateProducts();
      await this.toastCtrl.showMessage("Adicionado!", 'success');
    } catch {
      await this.toastCtrl.showMessage('Informe o preço e a quantidade!', 'error');

    }
  }

  async onRemove(index: number) {
    this.ranking.remove(index);
  }

  get theBestOne(): Product {
    return this.products.length > 0 ? this.products[0] : null;
  }

}
