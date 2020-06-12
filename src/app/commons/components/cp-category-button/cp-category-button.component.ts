import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Category} from '../../model/category';
import {AppTranslations} from '../../translations/app-translations';
import {FavouriteStyle} from './favourite-style';

@Component({
  selector: 'cp-category-button',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cp-category-button.component.html',
  styleUrls: ['./cp-category-button.component.scss']
})
export class CategoryButtonComponent {

  @Input() public c: Category;
  @Input() public productAmount: number;
  @Input() public favourite = FavouriteStyle.NONE;
  @Output() public favouriteClicked = new EventEmitter<any>();

  public favouriteStyle = FavouriteStyle;

  constructor(public translation: AppTranslations) {
  }

  public get isFavourite(): boolean {
    return this.favourite !== FavouriteStyle.NONE;
  }

}
