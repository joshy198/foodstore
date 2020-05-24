import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppTranslations} from '../../../commons/translations/app-translations';
import {Section} from './sections';
import {LanguageService} from '../../../commons/translations/language.service';
import {Language} from '../../../commons/translations/language';

@Component({
  selector: 'cp-mobile-menu',
  templateUrl: './cp-mobile-menu.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cp-mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {

  public expanded = false;

  public section = Section;
  public activeSection: Section;
  public language = Language;

  constructor(public translation: AppTranslations, public languageService: LanguageService) {
  }

  public onLanguageSelected(l: string) {

  }

  ngOnInit() {
  }

}
