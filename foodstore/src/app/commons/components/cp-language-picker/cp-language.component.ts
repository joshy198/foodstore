import {Component, ViewEncapsulation} from '@angular/core';
import {Language} from '../../translations/language';
import {LanguageService} from '../../translations/language.service';

@Component({
  selector: 'cp-language',
  templateUrl: './cp-language.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cp-language.component.scss']
})
export class LanguageComponent {
  public language = Language;
  public languages = Object.keys(Language);
  public expand = false;

  constructor(public languageService: LanguageService) {
  }

  public onLanguageSelected(l: string) {
    console.log(Language[l]);
    this.languageService.currentLanguage = Language[l];
    this.expand = false;
  }

}
