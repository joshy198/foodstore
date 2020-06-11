import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreDataService} from '../../commons/services/core-data.service';
import {AppTranslations} from '../../commons/translations/app-translations';
import {NavigationState} from '../../commons/model/navigation-state';
import {URLConstants} from '../../commons/url-constants';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../commons/services/navigation.service';
import {CartItem} from '../../commons/model/cart';
import {LanguageService} from '../../commons/translations/language.service';

@Component({
  selector: 'cp-cart',
  templateUrl: './cp-cart.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cp-cart.component.scss']
})
export class CartComponent implements OnInit {

  public productId: string;

  constructor(private route: ActivatedRoute, public dataService: CoreDataService,
              public navigationService: NavigationService, public translations: AppTranslations, public languageService: LanguageService) {
  }

  public fallbackBackAction() {
    if (this.productId) {
      //  queryParams: {
      this.navigationService.navigateTo(new NavigationState('/cart'));
    } else {
      this.navigationService.navigateTo(new NavigationState('/home'));
    }
  }

  public removeFromCart(item: CartItem) {
    this.dataService.currentCart = this.dataService.currentCart.filter(c => c.item.id !== item.item.id);
  }

  public get fullPrice(): number {
    let price = 0;
    for (const item of this.dataService.currentCart) {
      price += item.amount * item.item.price;
    }
    return price;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productId = params[URLConstants.PARAM_PRODUCT];
    });
  }

}
