import {Product} from './product';

export class CartItem {
  public constructor(public item: Product, public amount: number = 1) {
  }
}
