import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cp-cart.component';
import {DetailviewModule} from '../cp-detailview/cp-detailview.module';
import {CartItemComponent} from './cp-cart-item/cp-cart-item.component';
import {HeaderModule} from '../cp-header/cp-header.module';

@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [
    CommonModule, DetailviewModule, HeaderModule
  ]
})
export class CartModule {
}
