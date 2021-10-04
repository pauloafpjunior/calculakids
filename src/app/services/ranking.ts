import { Injectable } from "@angular/core";
import { Product } from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class Ranking {

  private _products: Product[];

  constructor() {
    this._products = [];
  }

  public addProduct(trademark: string, price: number, quantity: number): Error {
    if (!price || price <= 0) {
      return new Error('Preço inválido!')
    }

    if (!quantity || quantity <= 0) {
      return new Error('Quantidade inválida!')
    }

    if (!trademark || trademark.trim().length === 0) {
      trademark = `Opção ${this._products.length + 1}`
    }

    this._products.push({
      trademark: trademark,
      pricePerUnit: price / quantity
    })
  }

  public remove(index: number): void {
    if (index >= 0 && index < this._products.length) {
      this._products.splice(index, 1);
    }
  }

  public get sortedProducts() {
    return this._products.sort((p1, p2) => {
      if (p1.pricePerUnit > p2.pricePerUnit) {
        return 1;
      }

      if (p1.pricePerUnit < p2.pricePerUnit) {
        return -1;
      }

      return 0;
    }
    );
  }
}