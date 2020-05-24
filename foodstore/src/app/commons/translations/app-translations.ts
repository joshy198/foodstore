import {Injectable} from '@angular/core';
import {LanguageService} from './language.service';
import {Language} from './language';

@Injectable()
export class AppTranslations {


  constructor(private languageService: LanguageService) {
  }

  // category button translation
  public get available(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'san do';
      case Language.DE:
        return 'verfügbar';
      default:
        return 'available';
    }
  }

  public get cart(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'Warenkorb';
      case Language.DE:
        return 'Warenkorb';
      default:
        return 'Cart';
    }
  }

  public get search(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
      case Language.DE:
        return 'Suche';
      default:
        return 'Search';
    }
  }

  public get settings(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'Einstellungen';
      case Language.DE:
        return 'Einstellungen';
      default:
        return 'Settings';
    }
  }

  public get profile(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'Mei Profü';
      case Language.DE:
        return 'Mein Profil';
      default:
        return 'My Profile';
    }
  }

}
