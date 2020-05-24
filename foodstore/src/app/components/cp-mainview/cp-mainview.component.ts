import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreDataService} from '../../commons/services/core-data.service';
import {AppTranslations} from '../../commons/translations/app-translations';
import {Category} from '../../commons/model/category';
import {Product} from '../../commons/model/product';
import {Router} from '@angular/router';
import {NavigationService} from '../../commons/services/navigation.service';

@Component({
  selector: 'cp-mainview',
  templateUrl: './cp-mainview.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cp-mainview.component.scss']
})
export class MainviewComponent implements OnInit {

  public favCategories: Category[] = [];
  public favProducts: Product[] = [];
  public selectedCategories: Category[] = [];
  public requestedProducts: Product[] = [];
  public selectedRegion: Category;
  public showCategories = true;
  public regions: Category[] = [new Category('myShop', this.translation.mystore, 'store'),
    new Category('allShop', this.translation.fullstore, 'market')];


  constructor(public dataService: CoreDataService, public translation: AppTranslations,
              public router: Router, private navigationService: NavigationService) {
    navigationService.clearStates();
  }

  ngOnInit(): void {
    this.favCategories = this.dataService.favouriteCategories;
    this.favProducts = this.dataService.favouriteProducts;
    if (this.dataService.selectedRegion) {
      this.selectedRegion = this.dataService.selectedRegion;
    } else {
      console.log('REGION IS NULL');
      this.selectedRegion = this.regions[1];
    }
    this.selectedCategories = this.dataService.selectedCategories;
    // this.favProducts.push(this.dataService.availableProducts[0]);
  }


}
