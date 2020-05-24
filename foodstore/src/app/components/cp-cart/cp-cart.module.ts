import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cp-cart.component';
import {CartItemComponent} from './cp-cart-item/cp-cart-item.component';
import {HeaderModule} from '../cp-header/cp-header.module';

@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [
    CommonModule, HeaderModule
  ]
})
export class CartModule {
}
