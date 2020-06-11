import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemElementComponent} from './cp-item-element.component';

@NgModule({
  declarations: [ItemElementComponent],
  exports: [
    ItemElementComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ItemElementModule { }
