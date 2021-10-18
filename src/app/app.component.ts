import { Component } from '@angular/core';
import { Share } from '@capacitor/share';
import { Platform } from '@ionic/angular';

import { Product } from './model/product';
import { Ranking } from './services/ranking';
import { Toast } from './services/toast';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private toastCtrl: Toast,
    private ranking: Ranking,
    private platform: Platform
  ) {}

  trademark: string = null;
  priceStr: string = null;
  quantity: number = null;
  packages: number = 1;

  products: Product[] = [];

  customPopoverOptions: any = {
    message: 'Quantidade de pacotes',
  };

  ngOnInit() {
    this.updateProducts();
  }

  cleanForm() {
    this.trademark = null;
    this.priceStr = null;
    this.quantity = null;
    this.packages = 1;
  }

  updateProducts() {
    this.products = this.ranking.sortedProducts;
  }

  async onAdd() {
    try {
      const price = Number(this.priceStr.replace('.', '').replace(',', '.'));
      this.ranking.addProduct(
        this.trademark,
        price,
        this.quantity * this.packages
      );

      this.cleanForm();
      this.updateProducts();
      await this.toastCtrl.showMessage('Adicionado!', 'success');
    } catch {
      await this.toastCtrl.showMessage(
        'Favor informar preço e quantidade!',
        'error'
      );
    }
  }

  async onRemove(index: number) {
    this.ranking.remove(index);
  }

  get theBestOne(): Product {
    return this.products.length > 0 ? this.products[0] : null;
  }

  async share() {
    try {
      await Share.share({
        title: 'CalculaKids',
        text: 'Economize com o aplicativo CalculaKids: ',
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

  get today() {
    return new Date();
  }
}
