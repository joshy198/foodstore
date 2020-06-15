import {MockDataService} from './test-data-core.service';
import {getTestBed, TestBed} from '@angular/core/testing';
import {Category} from '../app/commons/model/category';
import {Product} from '../app/commons/model/product';
import {CartItem} from '../app/commons/model/cart';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

describe('TestDataCoreService', () => {
  let service: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockDataService
      ]
    });
    const injector = getTestBed();
    localStorage.clear();
    service = injector.inject(MockDataService);
  });


  describe('testGetCategoriesFor', () => {
    it('should return the correct category', () => {
      service.availableCategories = [new Category('AVAILABLE', 'AVAILABLE', 'AVAILABLE')];
      service.customCategoryList = [new Category('CUSTOM', 'CUSTOM', 'CUSTOM')];
      expect(service.getCategoriesFor(new Category('myShop', '', '')).length).toBe(1);
      expect(service.getCategoriesFor(new Category('myShop', '', ''))[0].key).toBe('CUSTOM');
      expect(service.getCategoriesFor(new Category('allShop', '', '')).length).toBe(1);
      expect(service.getCategoriesFor(new Category('allShop', '', ''))[0].key).toBe('AVAILABLE');
    });
  });

  describe('testGetProducts', () => {
    it('', () => {
      service.availableProducts = [new Product('AVAILABLE',
        '',
        '',
        0, '',
        '',
        new Category('', '', ''),
        '', 1)];
      service.customProductList = [new Product('CUSTOM',
        '',
        '',
        0, '',
        '',
        new Category('', '', ''),
        '', 1)];
      expect(service.getProducts(new Category('myShop', '', ''), null).length).toBe(1);
      expect(service.getProducts(new Category('myShop', '', ''), null)[0].id).toEqual('CUSTOM');
      expect(service.getProducts(new Category('allShop', '', ''), null).length).toBe(1);
      expect(service.getProducts(new Category('allShop', '', ''), null)[0].id).toEqual('AVAILABLE');
    });
  });
  describe('testCurrentCart', () => {
    it('expect cart items to store given', () => {
      expect(service.currentCart).toEqual([]);
      service.activeCart.push(new CartItem(null, 5));
      expect(service.currentCart.length).toBe(1);
      expect(service.currentCart[0].amount).toBe(5);
    });
  });
  describe('testAddToCart', () => {
    it('expect to return set value', () => {
      service.canAddToCart = false;
      expect(service.addToCart(null)).toBe(false);
      service.canAddToCart = true;
      expect(service.addToCart(null)).toBe(true);
    });
  });

  describe('testGetFavouriteProducts', () => {
    it('should return the content of favourite products', () => {
      expect(service.favouriteProducts).toEqual([]);
      service.favProd = [new Product('FAV_PROD',
        '',
        '',
        0, '',
        '',
        new Category('', '', ''),
        '', 1)];
      expect(service.favouriteProducts.length).toBe(1);
      expect(service.favouriteProducts[0].id).toEqual('FAV_PROD');
    });
  });
  describe('testSetFavouriteProducts', () => {
    it('', () => {
      expect(service.favouriteProducts).toEqual([]);
      service.favouriteProducts = [new Product('FAV_PROD',
        '',
        '',
        0, '',
        '',
        new Category('', '', ''),
        '', 1)];
      expect(service.favouriteProducts.length).toBe(1);
      expect(service.favouriteProducts[0].id).toBe('FAV_PROD');
    });
  });

  describe('testGetFavouriteCategories', () => {
    it('should return the set categories', () => {
      expect(service.favouriteCategories).toEqual([]);
      const cats = [new Category('c1', '', ''), new Category('c2', '', '')];
      service.favCat = cats;
      expect(service.favouriteCategories).toEqual(cats);
    });
  });
  describe('testSetFavouriteCategories', () => {
    it('should return the set categories', () => {
      expect(service.favouriteCategories).toEqual([]);
      const cats = [new Category('c1', '', ''), new Category('c2', '', '')];
      service.favouriteCategories = cats;
      expect(service.favCat).toEqual(cats);
    });
  });
  describe('testIsFavourite', () => {
    it('should return the set value on anything given', () => {
      service.isFav = true;
      expect(service.isFavourite(null)).toBe(true);
      service.isFav = false;
      expect(service.isFavourite(null)).toBe(false);
    });
  });
  describe('testUpdateFavouriteProduct', () => {
    it('should put the product in the favourite products', () => {
      expect(service.favouriteProducts).toEqual([]);
      const p = new Product('FAV_PROD',
        '',
        '',
        0, '',
        '',
        new Category('', '', ''),
        '', 1);
      service.updateFavouriteProduct(p);
      expect(service.favouriteProducts.length).toBe(1);
      expect(service.favouriteProducts[0]).toEqual(p);
    });
  });
  describe('testUpdateFavouriteCategory', () => {
    it('should put the category in the favourite categories', () => {
      expect(service.favouriteCategories).toEqual([]);
      const c = new Category('FAV_CAT', '', '');
      service.updateFavouriteCategory(c);
      expect(service.favouriteCategories.length).toBe(1);
      expect(service.favouriteCategories[0]).toEqual(c);
    });
  });
  describe('testStoreCartChange', () => {
    it('store value should change', () => {
      expect(service.storeCall).toBe(false);
      service.storeCartChange();
      expect(service.storeCall).toBe(true);
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

