import {Language} from '../translations/language';
import {LocalStorageService} from "./localstorage.service";
import {Category} from "../model/category";
import {CartItem} from "../model/cart";
import {Product} from "../model/product";

describe('LocalStorageService', () => {

  beforeEach(() => {
    let service = new LocalStorageService();
    service.updateFavouriteCategories([]);
    service.updateFavouriteProducts([]);
    service.cart = [];
    service.storeLanguage(null);
  });

  // verify language is working as expected

  it('checkDefaultLanguage', () => {
    let service = new LocalStorageService();
    expect(service.storedLanguage).toEqual(Language.EN);
  });

  it('checkSetNullAsLanguage', () => {
    let service = new LocalStorageService();
    service.storeLanguage(null);
    expect(service.storedLanguage).toEqual(Language.EN);
  });

  it('checkSetGermanAsLanguage', () => {
    let service = new LocalStorageService();
    service.storeLanguage(Language.DE);
    expect(service.storedLanguage).toEqual(Language.DE);
  });

  // verify categories

  it('checkCategoriesEmpty', () => {
    let service = new LocalStorageService();
    expect(service.categoryFavourites).toEqual([]);
  });

  it('checkAddCategories', () => {
    let service = new LocalStorageService();
    let categories=service.categoryFavourites;
    expect(service.categoryFavourites.length).toBe(0);
    categories.push(new Category('1', '', ''));
    categories.push(new Category('2', '', ''));
    categories.push(new Category('3', '', ''));
    expect(service.categoryFavourites.length).toBe(0);
    service.updateFavouriteCategories(categories);
    expect(service.categoryFavourites.length).toEqual(categories.length);
    expect(service.categoryFavourites.filter(c => c.key === '1').length).toBe(1);
    expect(service.categoryFavourites.filter(c => c.key === '2').length).toBe(1);
    expect(service.categoryFavourites.filter(c => c.key === '3').length).toBe(1);
  });

  // products

  it('checkProductsEmpty', () => {
    let service = new LocalStorageService();
    let products = service.productFavourites;
    expect(products.length).toBe(0);
  });

  it('checkProductFilled', () => {
    let service = new LocalStorageService();
    let products=service.productFavourites;
    expect(service.productFavourites.length).toBe(0);
    products.push(new Product('id1', 't1', '', 1, '', '', new Category('cat1', '', ''), '', 5));
    products.push(new Product('id2', 't2', '', 5, '', '', new Category('cat2', '', ''), '', 1));
    products.push(new Product('id3', 't8', '', 10, '', '', new Category('cat1', '', ''), '', 200));
    expect(service.productFavourites.length).toBe(0);
    service.updateFavouriteProducts(products);
    expect(service.productFavourites.length).toEqual(products.length);
    expect(service.productFavourites.filter(p => p.id === 'id1').length).toBe(1);
    expect(service.productFavourites.filter(p => p.id === 'id2').length).toBe(1);
    expect(service.productFavourites.filter(p => p.id === 'id3').length).toBe(1);
    expect(service.productFavourites.filter(p => p.category.key === 'cat1').length).toBe(2);
  });

  // cart

  it('checkCartEmpty', () => {
    let service = new LocalStorageService();
    expect(service.cart).toEqual([]);
  });

  it('checkCartFilled', () => {
    let service = new LocalStorageService();
    let cart=service.cart;
    expect(service.cart.length).toBe(0);
    cart.push(new CartItem(new Product('id1', 't1', '', 1, '', '', new Category('cat1', '', ''), '', 5), 2));
    cart.push(new CartItem(new Product('id2', 't2', '', 5, '', '', new Category('cat1', '', ''), '', 5), 4));
    expect(service.cart.length).toBe(0);
    service.cart = cart;
    expect(service.cart.length).toEqual(2);
    expect(service.cart.filter(ci => ci.item.id === 'id1' && ci.amount === 2).length).toBe(1);
    expect(service.cart.filter(ci => ci.item.id === 'id2' && ci.amount === 4).length).toBe(1);
  });

  /*
  it('', () => {
    let service = new LocalStorageService();
    expect().toEqual();
  });
  */

});
