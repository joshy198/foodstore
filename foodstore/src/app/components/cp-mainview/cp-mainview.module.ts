import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainviewComponent} from './cp-mainview.component';
import {HttpClientModule} from '@angular/common/http';
import {LanguageService} from '../../commons/translations/language.service';
import {AppTranslations} from '../../commons/translations/app-translations';
import {HeaderModule} from '../cp-header/cp-header.module';

@NgModule({
  declarations: [MainviewComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HeaderModule,
  ],
  providers: [LanguageService, AppTranslations]
})
export class MainviewModule {
}
