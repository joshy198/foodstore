import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryButtonComponent} from './cp-category-button.component';

@NgModule({
  declarations: [CategoryButtonComponent],
  exports: [
    CategoryButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoryButtonModule { }
