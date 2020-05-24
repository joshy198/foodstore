import {Language} from './language';
import {Injectable} from '@angular/core';
import {LocalStorageService} from '../services/localstorage.service';

@Injectable()
export class LanguageService {

  private language = Language.EN;

  public get currentLanguage(): Language {
    return this.language;
  }

  public set currentLanguage(language: Language) {
    this.language = language;
    console.log('Storing language');
    this.persistentStorage.storeLanguage(this.language);
  }

  constructor(private persistentStorage: LocalStorageService) {
    this.language = persistentStorage.storedLanguage;
    if (!this.language) {
      switch (navigator.language) {
        case 'de-DE':
          this.language = Language.DE;
          break;
        default:
          this.language = Language.EN;
      }
    } else {
    }
  }

  public toViewString(language: Language): string {
    switch (language) {
      case Language.AT:
        return 'AT';
      case Language.DE:
        return 'DE';
      case Language.EN:
        return 'EN';
    }
  }

  public viewToLanguage(view: string) {
    switch (view) {
      case 'AT':
        return Language.AT;
      case 'DE':
        return Language.DE;
      case 'EN':
        return Language.EN;

    }
  }


  public get availableLanguages(): string[] {
    return Object.keys(Language);
  }
}
