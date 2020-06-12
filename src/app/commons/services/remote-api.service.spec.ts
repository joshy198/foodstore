import {getTestBed, TestBed} from '@angular/core/testing';
import {RemoteApiService} from './remote-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LanguageService} from '../translations/language.service';
import {LocalStorageService} from './localstorage.service';
import {Language} from '../translations/language';

describe('RemoteApiService', () => {
  let service: RemoteApiService;
  let languageService: LanguageService;
  let httpMock: HttpTestingController;
  const testURL = 'http://host:1234'; // to verify injecting url works as expected

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: 'DEFAULT_URL', useValue: testURL},
        RemoteApiService,
        LanguageService,
        LocalStorageService
      ]
    });
    const injector = getTestBed();
    localStorage.clear();
    languageService = injector.inject(LanguageService);
    languageService.currentLanguage = Language.EN; // configure to be EN as language to avoid uncertainties during test
    service = injector.inject(RemoteApiService);
    httpMock = injector.inject(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  describe('getCategories', () => {

    it('should return an Observable<Category[]>', () => {
      const dummyCategory = [
        {key: 'meat', content: 'Meat Products', icon: 'sausage'},
        {key: 'cheese', content: 'Cheese Products', icon: 'cheeses'},
        {key: 'vegetables', content: 'Vegetables', icon: 'vegetables'}];

      service.requestCategories().subscribe(categories => {
        expect(categories.length).toBe(3);
        expect(categories.filter(c => c.key === 'meat').length).toBe(1);
      });
      const req = httpMock.expectOne(testURL + '/category?lang=' + languageService.currentLanguage);
      expect(req.request.method).toBe('GET');
      req.flush(dummyCategory);
    });
  });

  describe('getCategoriesInLanguage', () => {

    it('should change language in request-URL', () => {
      const dummyCategory = [];
      service.requestCategories().subscribe(); // important -> subscribe, otherwhise never executed!
      const ENreq = httpMock.expectOne(testURL + '/category?lang=' + Language.EN);
      expect(ENreq.request.method).toBe('GET');
      ENreq.flush(dummyCategory);

      languageService.currentLanguage = Language.DE;
      service.requestCategories().subscribe();
      const DEreq = httpMock.expectOne(testURL + '/category?lang=' + Language.DE);
      expect(DEreq.request.method).toBe('GET');
      DEreq.flush(dummyCategory);

    });
  });


  describe('getProducts', () => {

    it('should return an Observable<Category[]>', () => {
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
        }];

      service.requestProducts().subscribe(categories => {
        expect(categories.length).toBe(3);
        expect(categories.filter(c => c.id === 'id2').length).toBe(1);
        expect(categories.filter(c => c.id === 'id3').length).toBe(1);
        expect(categories.filter(c => c.id === 'id4').length).toBe(1);
      });
      const req = httpMock.expectOne(testURL + '/products?lang=' + languageService.currentLanguage);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProducts);
    });
  })

  describe('getProductsInLanguage', () => {

    it('should change language in request-URL', () => {
      const dummyProducts = [];
      service.requestProducts().subscribe(); // important -> subscribe, otherwhise never executed!
      const ENreq = httpMock.expectOne(testURL + '/products?lang=' + Language.EN);
      expect(ENreq.request.method).toBe('GET');
      ENreq.flush(dummyProducts);

      languageService.currentLanguage = Language.DE;
      service.requestProducts().subscribe();
      const DEreq = httpMock.expectOne(testURL + '/products?lang=' + Language.DE);
      expect(DEreq.request.method).toBe('GET');
      DEreq.flush(dummyProducts);
    });
  })


});
