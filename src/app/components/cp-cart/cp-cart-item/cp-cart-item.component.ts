import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CartItem} from '../../../commons/model/cart';
import {LanguageService} from '../../../commons/translations/language.service';

@Component({
  selector: 'cp-cart-item',
  templateUrl: './cp-cart-item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cp-cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() public cartItem: CartItem;
  @Output() public propertyChanged = new EventEmitter<any>();
  @Output() public removeFromCart = new EventEmitter<any>();

  public add() {
    if (this.cartItem.amount < this.cartItem.item.quantity) {
      this.cartItem.amount++;
      this.propertyChanged.emit();
    }
  }

  public remove() {
    if (this.cartItem.amount > 1) {
      this.cartItem.amount--;
      this.propertyChanged.emit();
    }
  }

  constructor(public languageService: LanguageService) {
  }

  ngOnInit() {
  }

}
