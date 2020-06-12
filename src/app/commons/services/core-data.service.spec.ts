import {getTestBed, TestBed} from '@angular/core/testing';
import {RemoteApiService} from './remote-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LanguageService} from '../translations/language.service';
import {LocalStorageService} from './localstorage.service';
import {Language} from '../translations/language';
import {CoreDataService} from './core-data.service';
import {Category} from '../model/category';

describe('CoreDataService', () => {
  let service: CoreDataService;
  let languageService: LanguageService;
  let httpMock: HttpTestingController;
  const testURL = 'http://host:1234'; // to verify injecting url works as expected
  const dummyProducts = [
    {
      id: 'id2',
      title: 'Beef Steak',
      descr: 'Nice Steak. Made from local cows. Hand crafted.',
      price: 49.99,
      unit: '1kg',
      imageUrl: 'https://bit.ly/2WVnj2E',
      categoryKey: 'meat',
      updatedAt: '2020-06-23T22:00:00.000Z',
      quantity: 500,
      properties:
        [{value: 'Cow', name: 'Animal of origin'},
          {value: 'Austria', name: 'Country of origin'}]
    },
    {
      id: 'id3',
      title: 'Pork Steak',
      descr: 'Nice Steak. Made from local pigs. Hand crafted.',
      price: 29.99,
      unit: '1kg',
      imageUrl: 'https://bit.ly/2ytutSm',
      categoryKey: 'meat',
      updatedAt: '2020-06-23T22:00:00.000Z',
      quantity: 500,
      properties:
        [{value: 'Pig', name: 'Animal of origin'},
          {value: 'Austria', name: 'Country of origin'}]
    },
    {
      id: 'id4',
      title: 'Chicken Breast',
      descr: 'Nice Breast. Made from local chickens. Hand crafted.',
      price: 14.99,
      unit: '1kg',
      imageUrl: 'https://bit.ly/2zjoYX0',
      categoryKey: 'meat',
      updatedAt: '2020-06-23T22:00:00.000Z',
      quantity: 500,
      properties:
        [{value: 'Chicken', name: 'Animal of origin'},
          {value: 'Austria', name: 'Country of origin'}]
    },
    {
      id: 'id5',
      title: 'Gouda',
      descr: 'Classic cheese. Made from local produce. Hand crafted.',
      price: 19.99,
      unit: '1kg',
      imageUrl: 'https://bit.ly/3bSWyQM',
      categoryKey: 'cheese',
      updatedAt: '2020-06-23T22:00:00.000Z',
      quantity: 300,
      properties: [{value: 'Austria', name: 'Country of origin'}]
    },
    {
      id: 'id8',
      title: 'Potatoes',
      descr: 'Bio product. Low-starch type. Locally harvested and packaged by hand.',
      price: 6.99,
      unit: '1kg',
      imageUrl: 'https://bit.ly/2WWJwNV',
      categoryKey: 'vegetables',
      updatedAt: '2020-06-23T22:00:00.000Z',
      quantity: 1000,
      properties: [{value: 'Austria', name: 'Country of origin'}]
    }, {
      id: 'id9',
      title: 'Carrots',
      descr: 'Bio product. Locally harvested and packaged by hand.',
      price: 6.99,
      unit: '1kg',
      imageUrl: 'https://bit.ly/2TzSrCQ',
      categoryKey: 'vegetables',
      updatedAt: '2020-06-23T22:00:00.000Z',
      quantity: 500,
      properties: [{value: 'Austria', name: 'Country of origin'}]
    }];
  const dummyCategory = [
    {key: 'meat', content: 'Meat Products', icon: 'sausage'},
    {key: 'cheese', content: 'Cheese Products', icon: 'cheeses'},
    {key: 'vegetables', content: 'Vegetables', icon: 'vegetables'}];

  const myShop = new Category('myShop', 'myShop', 'store');
  const allShop = new Category('allShop', 'allShop', 'market');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: 'DEFAULT_URL', useValue: testURL},
        RemoteApiService,
        LanguageService,
        LocalStorageService,
        CoreDataService
      ]
    });
    const injector = getTestBed();
    localStorage.clear();
    languageService = injector.inject(LanguageService);
    languageService.currentLanguage = Language.EN; // configure to be EN as language to avoid uncertainties during test
    httpMock = injector.inject(HttpTestingController);
    service = injector.inject(CoreDataService);
    const catReq = httpMock.expectOne(testURL + '/category?lang=' + languageService.currentLanguage);
    expect(catReq.request.method).toBe('GET');
    catReq.flush(dummyCategory);
    const prodReq = httpMock.expectOne(testURL + '/products?lang=' + languageService.currentLanguage);
    expect(prodReq.request.method).toBe('GET');
    prodReq.flush(dummyProducts);
  });
  afterEach(() => {
    httpMock.verify();
  });

  describe('getCategories', () => {
    it('should return <Category[]> with 3 different categories', () => {
      expect(service.availableCategories.length).toBe(3);
      expect(service.availableCategories.filter(c => c.key === 'meat').length).toBe(1);
      expect(service.availableCategories.filter(c => c.key === 'cheese').length).toBe(1);
      expect(service.availableCategories.filter(c => c.key === 'vegetables').length).toBe(1);
    });
  });

  describe('getProducts', () => {
    it('should return <Product[]> with 6 different products', () => {
      expect(service.availableProducts.length).toBe(6);
      expect(service.availableProducts.filter(c => c.id === 'id2').length).toBe(1);
      expect(service.availableProducts.filter(c => c.id === 'id3').length).toBe(1);
      expect(service.availableProducts.filter(c => c.id === 'id4').length).toBe(1);
      expect(service.availableProducts.filter(c => c.id === 'id5').length).toBe(1);
      expect(service.availableProducts.filter(c => c.id === 'id8').length).toBe(1);
      expect(service.availableProducts.filter(c => c.id === 'id9').length).toBe(1);
    });
  });

  describe('checkFavourites', () => {
    it('favourite products should be empty', () => {
      expect(service.favouriteProducts.length).toBe(0);
    });
    it('favourite categories should be empty', () => {
      expect(service.favouriteCategories.length).toBe(0);
    });
  });

  describe('checkWithFavourites', () => {
    it('should add favourite product', () => {
      expect(service.favouriteProducts.length).toBe(0);
      expect(service.availableProducts.filter(c => c.id === 'id5').length).toBe(1);
      service.updateFavouriteProduct(service.availableProducts.filter(c => c.id === 'id5')[0]);
      expect(service.favouriteProducts.length).toBe(1);
      expect(service.favouriteProducts[0]).toEqual(service.availableProducts.filter(c => c.id === 'id5')[0]);
      expect(service.isFavourite(service.availableProducts.filter(c => c.id === 'id5')[0])).toBe(true);
      expect(service.isFavourite(service.availableProducts.filter(c => c.id !== 'id5')[0])).toBe(false);
    });

    it('should add favourite category', () => {
      expect(service.favouriteCategories.length).toBe(0);
      expect(service.availableCategories.filter(c => c.key === 'vegetables').length).toBe(1);
      service.updateFavouriteCategory(service.availableCategories.filter(c => c.key === 'vegetables')[0]);
      expect(service.favouriteCategories.length).toBe(1);
      expect(service.favouriteCategories[0]).toEqual(service.availableCategories.filter(c => c.key === 'vegetables')[0]);
    });

    it('should return categories vegetables and cheese', () => {
      service.updateFavouriteProduct(service.availableProducts.filter(c => c.id === 'id5')[0]);
      service.updateFavouriteCategory(service.availableCategories.filter(c => c.key === 'vegetables')[0]);
      expect(service.getCategoriesFor(myShop).length).toBe(2);
      expect(service.getCategoriesFor(myShop).filter(c => c.key === 'vegetables').length).toBe(1);
      expect(service.getCategoriesFor(myShop).filter(c => c.key === 'cheese').length).toBe(1);
    });

    it('should return all categories', () => {
      expect(service.getCategoriesFor(allShop).length).toEqual(service.availableCategories.length);
    });

  });
});
