import {Injectable} from '@angular/core';
import {Product} from '../model/product';
import {Category} from '../model/category';
import {CartItem} from '../model/cart';
import {Language} from '../translations/language';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

const CART_KEY = 'customer-cart';
const FAV_PRODUCT_KEY = 'customer-fav-product';
const FAV_CATEGORY_KEY = 'customer-fav-category';
const FAV_LANGUAGE_KEY = 'customer-prev-language';

@Injectable()
export class LocalStorageService {
  private favouritedProducts: Product[] = [];
  private favouritedCategories: Category[] = [];
  private currentCart: CartItem[] = [];
  private userLanguage: Language;

  constructor() {
    if (window.localStorage) {
      if (window.localStorage.length > 0) {
        this.currentCart = JSON.parse(localStorage.getItem(CART_KEY));
        if (this.currentCart === null) {
          this.currentCart = [];
        }
        this.favouritedProducts = JSON.parse(localStorage.getItem(FAV_PRODUCT_KEY));
        if (this.favouritedProducts === null) {
          this.favouritedProducts = [];
        }
        this.favouritedCategories = JSON.parse(localStorage.getItem(FAV_CATEGORY_KEY));
        if (this.favouritedCategories === null) {
          this.favouritedCategories = [];
        }
        this.userLanguage = Language[localStorage.getItem(FAV_LANGUAGE_KEY)];
      }
    }
  }

  public get storedLanguage(): Language {
    if (isNotNullOrUndefined(this.userLanguage)) {
      return this.userLanguage;
    }
    return Language.EN;
  }

  public storeLanguage(language: Language): boolean {
    this.userLanguage = language;
    if (window.localStorage) {
      localStorage.setItem(FAV_LANGUAGE_KEY, language);
      return true;
    }
    return false;
  }

  public get cart(): CartItem[] {
    const ci:CartItem[]=[];
    for(const c of this.currentCart)
    {
      ci.push(c);
    }
    return ci;
  }

  public set cart(c: CartItem[]) {
    this.currentCart = c;
    this.storeCart(this.currentCart);
  }

  public get productFavourites(): Product[] {
    const pr:Product[]=[];
    for(const p of this.favouritedProducts) {
      pr.push(p);
    }
    return pr;
  }

  public get categoryFavourites(): Category[] {
    const ca:Category[]=[];
    for(const c of this.favouritedCategories) {
      ca.push(c);
    }
    return ca;
  }

  public updateFavouriteProducts(products: Product[]) {
    this.favouritedProducts = products;
    this.storeFavouritedProducts(this.favouritedProducts);
  }

  public updateFavouriteCategories(categories: Category[]) {
    this.favouritedCategories = categories;
    this.storeFavouritedCategories(this.favouritedCategories);
  }


  private storeCart(cart: CartItem[]): boolean {
    if (window.localStorage) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      return true;
    }
    return false;

  }

  private storeFavouritedProducts(favourites: Product[]): boolean {
    if (window.localStorage) {
      localStorage.setItem(FAV_PRODUCT_KEY, JSON.stringify(favourites));
      return true;
    }
    return false;
  }

  private storeFavouritedCategories(favourites: Category[]): boolean {
    if (window.localStorage) {
      localStorage.setItem(FAV_CATEGORY_KEY, JSON.stringify(favourites));
      return true;
    }
    return false;
  }

}
