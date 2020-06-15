import {Product} from '../app/commons/model/product';
import {Category} from '../app/commons/model/category';
import {CartItem} from '../app/commons/model/cart';
import {Injectable} from '@angular/core';

@Injectable()
export class MockDataService {
  public availableProducts: Product[] = [];
  public availableCategories: Category[] = [];
  public selectedRegion: Category;
  public activeCart: CartItem[] = [];
  public customProductList: Product[] = [];
  public favCat: Category[] = [];
  public favProd: Product[] = [];
  public customCategoryList: Category[] = [];
  public isFav = true;
  public canAddToCart = true;
  public storeCall = false;

  public constructor() {
  }

  public getCategoriesFor(c: Category): Category[] {
    if (c.key === 'myShop') {
      return this.customCategoryList;
    } else if (c.key === 'allShop') {
      return this.availableCategories;
    }
    return null;
  }

  public getProducts(area: Category, categories: Category[]) {
    if (area.key === 'myShop') {
      return this.customProductList;
    } else if (area.key === 'allShop') {
      return this.availableProducts;
    }
    return null;
  }

  public get currentCart(): CartItem[] {
    return this.activeCart;
  }

  public set currentCart(cart: CartItem[]) {
    this.activeCart = cart;
  }

  public storeCartChange() {
    this.storeCall=true;
  }

  public addToCart(p: Product): boolean {
    return this.canAddToCart;
  }


  public get favouriteProducts(): Product[] {
    return this.favProd;
  }

  public set favouriteProducts(p: Product[]) {
    this.favProd = p;
  }

  public get favouriteCategories(): Category[] {
    return this.favCat;
  }

  public set favouriteCategories(c: Category[]) {
    this.favCat = c;
  }


  public isFavourite(p: Product): boolean {
    return this.isFav;
  }

  public updateFavouriteProduct(p: Product): void {
    this.favProd.push(p);
  }

  public updateFavouriteCategory(c: Category) {
    this.favCat.push(c);
  }
}
