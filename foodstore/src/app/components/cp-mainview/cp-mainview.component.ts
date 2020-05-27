import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreDataService} from '../../commons/services/core-data.service';
import {AppTranslations} from '../../commons/translations/app-translations';
import {Category} from '../../commons/model/category';
import {Product} from '../../commons/model/product';
import {FavouriteStyle} from '../../commons/components/cp-category-button/favourite-style';
import {Router} from '@angular/router';
import {NavigationService} from '../../commons/services/navigation.service';
import {NavigationState} from '../../commons/model/navigation-state';

@Component({
  selector: 'cp-mainview',
  templateUrl: './cp-mainview.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cp-mainview.component.scss']
})
export class MainviewComponent implements OnInit,OnDestroy {

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

  ngOnDestroy(): void {
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
    this.requestProducts();
    // this.favProducts.push(this.dataService.availableProducts[0]);
  }


  public getNumberOfProducts(c: Category): number {
    return this.dataService.availableProducts.filter(p => p.category.key === c.key).length;
  }

  public navigateToProduct(selection: Product) {
    this.navigationService.navigateTo(new NavigationState('/product', {
      queryParams: {
        product: selection.id
      }
    }));
  }

  public updateFavourite(c: Category) {
    if (this.favCategories.filter(cat => c.key === cat.key).length > 0) {
      this.favCategories = this.favCategories.filter(cat => cat.key !== c.key);
    } else {
      this.favCategories.push(c);
    }
    this.dataService.favouriteCategories = this.favCategories;
  }

  public selectCategory(c: Category) {
    if (this.selectedCategories.filter(cat => cat.key === c.key).length > 0) {
      this.selectedCategories = this.selectedCategories.filter(cat => cat.key !== c.key);
    } else {
      this.selectedCategories.push(c);
    }
    this.requestProducts();
  }

  public isCategorySelected(c: Category): boolean {
    return this.selectedCategories.filter(cat => cat.key === c.key).length > 0;
  }

  public selectRegion(c: Category) {
    if (c.key === this.selectedRegion.key) {
      this.showCategories = !this.showCategories;
    } else {
      this.selectedRegion = c;
      this.selectedCategories = [];
      this.requestProducts();
    }
  }

  public requestProducts() {
    console.log('REQUEST PRODUCTS');
    this.dataService.selectedCategories = this.selectedCategories;
    this.dataService.selectedRegion = this.selectedRegion;
    this.requestedProducts = this.dataService.getProducts(this.selectedRegion, this.selectedCategories);
  }


  public getFavouriteStyle(c: Category): FavouriteStyle {
    if (this.favCategories.filter(cat => cat.key === c.key).length > 0) {
      if (this.favProducts.filter(p => p.category.key === c.key).length > 0) {
        return FavouriteStyle.PARTIAL_FULL;
      }
      return FavouriteStyle.FULL;
    } else if (this.favProducts.filter(p => p.category.key === c.key).length > 0) {
      return FavouriteStyle.PARTIAL;
    }
    return FavouriteStyle.NONE;
  }

}
