import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LanguageComponent} from './cp-language.component';

@NgModule({
  declarations: [LanguageComponent],
  exports: [
    LanguageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LanguageModule { }
