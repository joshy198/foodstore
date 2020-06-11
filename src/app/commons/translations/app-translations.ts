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

  public get orders(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'Kaufts Klumpat';
      case Language.DE:
        return 'Meine Bestellungen';
      default:
        return 'My Orders';
    }
  }

  public get noPreviousOrders(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'No nix kauft';
      case Language.DE:
        return 'Keine getätigten Bestellungen';
      default:
        return 'No previous orders';
    }
  }


  public get about(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
      case Language.DE:
        return 'Rechtliches';
      default:
        return 'Legal';
    }
  }

  public get legalText(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'LegalContentAT';
      case Language.DE:
        return 'LegalContentDE';
      default:
        return 'LegalContentEN';
    }
  }

  public get mystore(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'Lieblingszeig';
      case Language.DE:
        return 'Mein Shop';
      default:
        return 'My Shop';
    }
  }

  public get nothingToShow(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'Jo do is nix, a waunst nu so deppat schaust. Suach da wos aundas.';
      case Language.DE:
        return 'Für Ihre Auswahl gibt es aktuell keine Produkte. Bitte ändern Sie die Suchkriterien';
      default:
        return 'We don\'t have any products for yor current selection. Please change your search criterias';
    }
  }

  public get noCategory(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'Do is so la wie in deina Birn.';
      case Language.DE:
        return 'Ihre persönliche Auswahl ist aktuell leer.';
      default:
        return 'Your personal selection is currently empty.';
    }
  }

  public get fullstore(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'Ois wos hom';
      case Language.DE:
        return 'Vollsortiment';
      default:
        return 'All Products';
    }
  }

  public get login(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
      case Language.DE:
        return 'Einloggen';
      default:
        return 'Log in';
    }
  }

  public get language(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'Sproch';
      case Language.DE:
        return 'Sprache';
      default:
        return 'Language';
    }
  }

  public get overview(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'Üwasicht';
      case Language.DE:
        return 'Übersicht';
      default:
        return 'Overview';
    }
  }

  public get addToCart(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'In Einkaufswogn';
      case Language.DE:
        return 'In den Einkaufswagen';
      default:
        return 'Add to cart';
    }
  }

  public get totalPrice(): string {
    switch (this.languageService.currentLanguage) {
      case Language.AT:
        return 'Im gaunzn';
      case Language.DE:
        return 'Gesamtsumme';
      default:
        return 'Total';
    }
  }
}
