import {TestBed, getTestBed} from '@angular/core/testing';
import {CartItem} from '../../../commons/model/cart';
import {CartItemComponent} from './cp-cart-item.component';
import {LanguageService} from '../../../commons/translations/language.service';
import {Product} from '../../../commons/model/product';
import {ProductProperty} from '../../../commons/model/product-property';
import {Category} from '../../../commons/model/category';
import {LocalStorageService} from '../../../commons/services/localstorage.service';

describe('CartItem', () => {
  let service: LanguageService;
  let component: CartItemComponent;
  let product: Product;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        CartItemComponent
      ], providers: [
        LanguageService,
        LocalStorageService,
        CartItemComponent
        // MockDataService as unknown as CoreDataService
      ]
    }).compileComponents();
    const injector = getTestBed();
    service = injector.inject(LanguageService);
    component = injector.inject(CartItemComponent);
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
  });

  describe('testAdd', () => {
    it('Should emit propertychanged', () => {
      const ci = new CartItem(product, 1);
      component.cartItem = ci;
      spyOn(component.propertyChanged, 'emit');
      expect(component.cartItem).toEqual(ci);
      component.add();
      expect(component.propertyChanged.emit).toHaveBeenCalled();
      expect(component.cartItem.amount).toBe(2);
    });
  });

  describe('testRemove', () => {
    it('Should return a valid os style', () => {
      const ci = new CartItem(product, 3);
      component.cartItem = ci;
      spyOn(component.propertyChanged, 'emit');
      expect(component.cartItem).toEqual(ci);
      component.remove();
      expect(component.propertyChanged.emit).toHaveBeenCalled();
      expect(component.cartItem.amount).toBe(2);
    });
  });

  describe('testAddImpossible', () => {
    it('Should emit propertychanged', () => {
      const ci = new CartItem(product, 500);
      component.cartItem = ci;
      spyOn(component.propertyChanged, 'emit');
      expect(component.cartItem).toEqual(ci);
      component.add();
      expect(component.propertyChanged.emit).toHaveBeenCalledTimes(0);
      expect(component.cartItem.amount).toBe(500);
    });
  });

  describe('testRemoveImpossible', () => {
    it('Should emit propertychanged', () => {
      const ci = new CartItem(product, 1);
      component.cartItem = ci;
      spyOn(component.propertyChanged, 'emit');
      expect(component.cartItem).toEqual(ci);
      component.remove();
      expect(component.propertyChanged.emit).toHaveBeenCalledTimes(0);
      expect(component.cartItem.amount).toBe(1);
    });
  });

});
