import {getTestBed, TestBed} from '@angular/core/testing';
import {ItemElementComponent} from './cp-item-element.component';
import {LanguageService} from '../../translations/language.service';
import {LocalStorageService} from '../../services/localstorage.service';
import {Product} from '../../model/product';
import {Category} from '../../model/category';
import {ProductProperty} from '../../model/product-property';

describe('ItemElementComponent', () => {
  let component: ItemElementComponent;
  let product: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ItemElementComponent
      ], providers: [
        LanguageService,
        LocalStorageService,
        ItemElementComponent
        // MockDataService as unknown as CoreDataService
      ]
    }).compileComponents();
    const injector = getTestBed();
    component = injector.inject(ItemElementComponent);
    product = new Product(
      '3',
      'Roll',
      'Fresh roll, baked at the shop.',
      0.50,
      'Piece',
      'https://i.ibb.co/cD1WBmK/lenovo-ideapad-300-S.png',
      new Category('bakery', 'bakery', 'bread'),
      '2019-04-06T21:48:19.631Z',
      500,
      [new ProductProperty('Weight', '100 g')]
    );
    component.product = product;
  });

  describe('testIsFavourite', () => {
    it('should change favourite value', () => {
      expect(component.isFavourite).toBe(false);
      component.isFavourite = true;
      expect(component.isFavourite).toBe(true);
    });
  });

  describe('testAddToCart', () => {
    it('', () => {
      spyOn(component.addToCart, 'emit');
      component.performAddToCart();
      expect(component.addToCart.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('testAddToCartNotAvailable', () => {
    it('', () => {
      spyOn(component.addToCart, 'emit');
      component.available = false;
      component.performAddToCart();
      expect(component.addToCart.emit).toHaveBeenCalledTimes(0);
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
