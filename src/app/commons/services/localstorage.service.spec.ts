import {Language} from '../translations/language';
import {LocalStorageService} from './localstorage.service';
import {Category} from '../model/category';
import {CartItem} from '../model/cart';
import {Product} from '../model/product';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {getTestBed, TestBed} from '@angular/core/testing';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService
      ]
    });
    const injector = getTestBed();
    localStorage.clear();
    service = injector.inject(LocalStorageService);
  });

  // verify language is working as expected
  describe('Verify Language storage works as expected', () => {
    describe('checkDefaultLanguage', () => {
      it('should return null or undefined if not set', () => {
        expect(isNotNullOrUndefined(service.storedLanguage)).toBe(false);
      });
    });

    describe('', () => {
      it('checkSetNullAsLanguage', () => {
        service.storeLanguage(null);
        expect(service.storedLanguage).toEqual(null);
      });
    });

    describe('', () => {
      it('checkSetGermanAsLanguage', () => {
        service.storeLanguage(Language.DE);
        expect(service.storedLanguage).toEqual(Language.DE);
      });
    });

  });


  // verify categories
  describe('Test Category storage', () => {

  describe('checkCategoriesEmpty', () => {
    it('favourite categories should be empty and existing', () => {
      expect(service.categoryFavourites).toEqual([]);
    });
  });

  describe('checkAddCategories', () => {
    it('Should store categories only at update', () => {
      const categories = service.categoryFavourites;
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
  });

  });

  // products
  describe('Check Product storage', () => {

  describe('checkProductsEmpty', () => {
    it('Stored products should be empty and existing', () => {
      const products = service.productFavourites;
      expect(products.length).toBe(0);
    });
  });

  describe('checkProductFilled', () => {
    it('Should store products only at update', () => {
      const products = service.productFavourites;
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
  });

  });

  // cart
  describe('Testing cart storage', () => {

  describe('checkCartEmpty', () => {
    it('Cart should be empty and existing', () => {
      expect(service.cart).toEqual([]);
    });
  });


  describe('checkCartFilled', () => {
    it('Should store cart only at update', () => {
      const cart = service.cart;
      expect(service.cart.length).toBe(0);
      cart.push(new CartItem(new Product('id1', 't1', '', 1, '', '', new Category('cat1', '', ''), '', 5), 2));
      cart.push(new CartItem(new Product('id2', 't2', '', 5, '', '', new Category('cat1', '', ''), '', 5), 4));
      expect(service.cart.length).toBe(0);
      service.cart = cart;
      expect(service.cart.length).toEqual(2);
      expect(service.cart.filter(ci => ci.item.id === 'id1' && ci.amount === 2).length).toBe(1);
      expect(service.cart.filter(ci => ci.item.id === 'id2' && ci.amount === 4).length).toBe(1);
    });
  });

  });
  /*
      describe('', () => {
  });

    describe('', () => {
      it('', () => {
    expect().toEqual();
  });
  });
  */

});
