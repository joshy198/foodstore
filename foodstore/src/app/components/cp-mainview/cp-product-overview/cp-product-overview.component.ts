import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Product} from '../../../commons/model/product';
import {CoreDataService} from '../../../commons/services/core-data.service';

@Component({
  selector: 'cp-product-overview',
  templateUrl: './cp-product-overview.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cp-product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  @Input() public products: Product[];
  @Output() public selectedProduct = new EventEmitter<Product>();

  constructor(public dataService: CoreDataService) {
  }

  public isAvailable(product: Product) {
    const fv = this.dataService.currentCart.filter(p => p.item.id === product.id);
    return fv.length === 0 || fv[0].amount < fv[0].item.quantity;
  }

  ngOnInit() {
  }

}
