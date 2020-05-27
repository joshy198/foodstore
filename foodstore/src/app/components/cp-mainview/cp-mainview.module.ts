import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainviewComponent} from './cp-mainview.component';
import {HttpClientModule} from '@angular/common/http';
import {LanguageService} from '../../commons/translations/language.service';
import {AppTranslations} from '../../commons/translations/app-translations';
import {HeaderModule} from '../cp-header/cp-header.module';
import {ProductOverviewComponent} from "./cp-product-overview/cp-product-overview.component";
import {DetailviewModule} from "../cp-detailview/cp-detailview.module";
import {ItemElementModule} from "../../commons/components/cp-item-element/cp-item-element.module";
import {CategoryButtonModule} from "../../commons/components/cp-category-button/cp-category-button.module";

@NgModule({
  declarations: [MainviewComponent,ProductOverviewComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HeaderModule,
    DetailviewModule,
    ItemElementModule,
    CategoryButtonModule
  ],
  providers: [LanguageService, AppTranslations]
})
export class MainviewModule {
}
