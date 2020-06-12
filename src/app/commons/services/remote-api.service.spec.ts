import DEFAULT_URL from "../../../settings";
import {getTestBed, TestBed} from "@angular/core/testing";
import {RemoteApiService} from "./remote-api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {LanguageService} from "../translations/language.service";
import {LocalStorageService} from "./localstorage.service";
import {Language} from "../translations/language";

describe('RemoteApiService', () => {
  let service: RemoteApiService;
  let languageService: LanguageService;
  let httpMock: HttpTestingController;
  const testURL = 'http://host:1234';

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
    expect(service['languageService']).toBe(languageService);

  });
  afterEach(() => {
    httpMock.verify();
  });

  describe('getCategories', () => {

    it('should return an Observable<Category[]>', () => {
      const dummyCategory = [
        {"key": "meat", "content": "Meat Products", "icon": "sausage"},
        {"key": "cheese", "content": "Cheese Products", "icon": "cheeses"},
        {"key": "vegetables", "content": "Vegetables", "icon": "vegetables"}];

      service.requestCategories().subscribe(categories => {
        expect(categories.length).toBe(3);
        expect(categories.filter(c => c.key === 'meat').length).toBe(1);
      });
      const req = httpMock.expectOne(testURL + '/category?lang=' + languageService.currentLanguage);
      expect(req.request.method).toBe("GET");
      req.flush(dummyCategory);
    });
  });

  describe('checkLanguageRequest', () => {

    it('should change language in request-URL', () => {
      const dummyCategory = [];
      languageService.currentLanguage = Language.EN;
      service.requestCategories().subscribe();
      const ENreq = httpMock.expectOne(testURL + '/category?lang=' + Language.EN);
      expect(ENreq.request.method).toBe("GET");
      ENreq.flush(dummyCategory);

      languageService.currentLanguage = Language.DE;
      service.requestCategories().subscribe(); //important -> subscribe, otherwhise never executed!
      const DEreq = httpMock.expectOne(testURL + '/category?lang=' + Language.DE);
      expect(DEreq.request.method).toBe("GET");
      DEreq.flush(dummyCategory);

    });
  });


});
