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

    console.log(this.trademark, this.price, this.quantity)

    const error = this.ranking.addProduct(this.trademark, this.price, this.quantity);

    if (error) {
      await this.toastCtrl.showMessage(error.message, 'error');
    } else {
      this.cleanForm();
      this.updateProducts();
      await this.toastCtrl.showMessage("Adicionado!", 'success');
    }
  }

  async onRemove(index: number) {
    this.ranking.remove(index);
  }

  get theBestOne(): Product {
    return this.products.length > 0 ? this.products[0] : null;
  }

}
