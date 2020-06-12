import {LanguageService} from './language.service';
import {getTestBed, TestBed} from '@angular/core/testing';
import {LocalStorageService} from '../services/localstorage.service';
import {AppTranslations} from './app-translations';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {Language} from './language';

;

describe('Translations', () => {
  let service: AppTranslations;
  let languageService: LanguageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        LocalStorageService,
        AppTranslations
      ]
    });
    const injector = getTestBed();
    localStorage.clear();
    languageService = injector.inject(LanguageService);
    service = injector.inject(AppTranslations);
  });

  describe('checkForReturnedContentOnNoLanguageSelected', () => {
    it('content of translation should never be null or undefined', () => {
      expect(isNotNullOrUndefined(service.available)).toBe(true);
      expect(isNotNullOrUndefined(service.cart)).toBe(true);
      expect(isNotNullOrUndefined(service.search)).toBe(true);
      expect(isNotNullOrUndefined(service.settings)).toBe(true);
      expect(isNotNullOrUndefined(service.profile)).toBe(true);
      expect(isNotNullOrUndefined(service.orders)).toBe(true);
      expect(isNotNullOrUndefined(service.noPreviousOrders)).toBe(true);
      expect(isNotNullOrUndefined(service.about)).toBe(true);
      expect(isNotNullOrUndefined(service.legalText)).toBe(true);
      expect(isNotNullOrUndefined(service.mystore)).toBe(true);
      expect(isNotNullOrUndefined(service.nothingToShow)).toBe(true);
      expect(isNotNullOrUndefined(service.noCategory)).toBe(true);
      expect(isNotNullOrUndefined(service.fullstore)).toBe(true);
      expect(isNotNullOrUndefined(service.login)).toBe(true);
      expect(isNotNullOrUndefined(service.language)).toBe(true);
      expect(isNotNullOrUndefined(service.overview)).toBe(true);
      expect(isNotNullOrUndefined(service.addToCart)).toBe(true);
      expect(isNotNullOrUndefined(service.totalPrice)).toBe(true);
    });
  });

  describe('checkForReturnedContentOnEachLang', () => {
    it('content of translation should never be null or undefined', () => {
      for (const l of Object.keys(Language)) {
        languageService.currentLanguage = Language[l];
        expect(isNotNullOrUndefined(service.available)).toBe(true);
        expect(isNotNullOrUndefined(service.cart)).toBe(true);
        expect(isNotNullOrUndefined(service.search)).toBe(true);
        expect(isNotNullOrUndefined(service.settings)).toBe(true);
        expect(isNotNullOrUndefined(service.profile)).toBe(true);
        expect(isNotNullOrUndefined(service.orders)).toBe(true);
        expect(isNotNullOrUndefined(service.noPreviousOrders)).toBe(true);
        expect(isNotNullOrUndefined(service.about)).toBe(true);
        expect(isNotNullOrUndefined(service.legalText)).toBe(true);
        expect(isNotNullOrUndefined(service.mystore)).toBe(true);
        expect(isNotNullOrUndefined(service.nothingToShow)).toBe(true);
        expect(isNotNullOrUndefined(service.noCategory)).toBe(true);
        expect(isNotNullOrUndefined(service.fullstore)).toBe(true);
        expect(isNotNullOrUndefined(service.login)).toBe(true);
        expect(isNotNullOrUndefined(service.language)).toBe(true);
        expect(isNotNullOrUndefined(service.overview)).toBe(true);
        expect(isNotNullOrUndefined(service.addToCart)).toBe(true);
        expect(isNotNullOrUndefined(service.totalPrice)).toBe(true);
      }
    });
  });


});
