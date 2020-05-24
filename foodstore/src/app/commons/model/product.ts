import {Category} from './category';
import {ProductProperty} from './product-property';

export class Product {

  public constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
    public unit: string,
    public imageUrl: string,
    public category: Category,
    public updatedAt: string,
    public quantity: number,
    public properties: ProductProperty[] = []) {
  }
}
