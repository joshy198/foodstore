import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './cp-header.component';
import {OsStylingService} from '../../commons/services/os-styling.service';
import {AppTranslations} from '../../commons/translations/app-translations';
import {LanguageModule} from '../../commons/components/cp-language-picker/cp-language.module';
import { MobileMenuComponent } from './cp-mobile-menu/cp-mobile-menu.component';

@NgModule({
  declarations: [HeaderComponent, MobileMenuComponent],
  providers: [OsStylingService, AppTranslations],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LanguageModule
  ]
})
export class HeaderModule {
}
