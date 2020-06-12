import {LocalStorageService} from '../services/localstorage.service';
import {Language} from './language';
import {LanguageService} from './language.service';
import {getTestBed, TestBed} from '@angular/core/testing';

describe('LanguageService', () => {
  let service: LanguageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        LocalStorageService
      ]
    });
    const injector = getTestBed();
    localStorage.clear();
    service = injector.inject(LanguageService);
  });

  describe('checkDefaultLanguage', () => {
    it('a default language which is defined in the languages should be returned', () => {
      expect(Object.values(Language).filter(l=>l===service.currentLanguage).length).toBe(1);
    });
  });


  describe('checkKeyAsString', () => {
    it('language to string should return the correct string representation', () => {
      expect(service.toViewString(Language.DE)).toEqual('DE');
    });
  });


  describe('checkStringToKey', () => {
    it('string to Language should return the correct language', () => {
      expect(service.viewToLanguage('AT')).toEqual(Language.AT);
    });
  });


  describe('checkLanguagesAsList', () => {
    it('Languages should be unique and match the number of defined languages', () => {
      expect(service.availableLanguages.length).toEqual(Object.keys(Language).length);
      for(const l of service.availableLanguages){
        expect(service.availableLanguages.filter(lang=>lang===l).length).toBe(1);
      }
    });
  });

});
