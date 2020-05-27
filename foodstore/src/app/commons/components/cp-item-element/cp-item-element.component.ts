import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Product} from '../../model/product';
import {LanguageService} from '../../translations/language.service';

@Component({
  selector: 'cp-item-element',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cp-item-element.component.html',
  styleUrls: ['./cp-item-element.component.scss']
})
export class ItemElementComponent implements OnInit {

  @Input() public product: Product;
  @Input() public available = true;
  @Output() public addToCart = new EventEmitter<Product>();
  private timeout = 0;
  public isAdded = false;

  constructor(public languageService: LanguageService) {
  }

  public performAddToCart(): void {
    if (this.available) {
      this.addToCart.emit(this.product);
      this.isAdded = true;
      if (this.timeout > 0) {
        this.timeout = 500;
      } else {
        this.timeout = 500;
        this.refreshTimeout();
      }
    }
  }

  private refreshTimeout() {
    setTimeout(() => {
      this.timeout -= 50;
      if (this.timeout > 0) {
        console.log('Fresh!');
        this.refreshTimeout();
      } else {
        this.isAdded = false;
      }
    }, 50);
  }

  ngOnInit() {
  }

}
