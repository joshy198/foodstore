import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailviewComponent} from './cp-detailview.component';
import {HeaderModule} from '../cp-header/cp-header.module';
import {ItemElementModule} from '../../commons/components/cp-item-element/cp-item-element.module';
import {ProductViewComponent} from './cp-product-view/cp-product-view.component';

@NgModule({
  declarations: [DetailviewComponent, ProductViewComponent],
  exports: [
    DetailviewComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ItemElementModule,
  ]
})
export class DetailviewModule {
}
