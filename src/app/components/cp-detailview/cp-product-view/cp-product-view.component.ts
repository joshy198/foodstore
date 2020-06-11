import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Product} from '../../../commons/model/product';
import {CoreDataService} from '../../../commons/services/core-data.service';

@Component({
  selector: 'cp-product-view',
  templateUrl: './cp-product-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cp-product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  @Input() public productId: string;
  public product: Product;

  constructor(public dataService: CoreDataService) {
  }

  ngOnInit() {
    this.product = this.dataService.availableProducts.filter(p => p.id === this.productId)[0];
  }

}
