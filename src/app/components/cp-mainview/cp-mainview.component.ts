import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreDataService} from '../../commons/services/core-data.service';
import {AppTranslations} from '../../commons/translations/app-translations';
import {Category} from '../../commons/model/category';
import {Product} from '../../commons/model/product';
import {Router} from '@angular/router';
import {NavigationService} from '../../commons/services/navigation.service';
import {NavigationState} from '../../commons/model/navigation-state';
import {FavouriteStyle} from '../../commons/components/cp-category-button/favourite-style';

@Component({
  selector: 'cp-mainview',
  templateUrl: './cp-mainview.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cp-mainview.component.scss']
})
export class MainviewComponent implements OnInit, OnDestroy {
  public selectedCategories: Category[] = [];
  public requestedProducts: Product[] = [];
  public favProducts: Product[] = [];
  public favCategories: Category[] = [];
  public selectedRegion: Category;
  public showCategories = true;
  public timer: number;
  public regions: Category[] = [new Category('myShop', this.translation.mystore, 'store'),
    new Category('allShop', this.translation.fullstore, 'market')];


  constructor(public dataService: CoreDataService, public translation: AppTranslations,
              public router: Router, private navigationService: NavigationService) {
    navigationService.clearStates();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  ngOnInit(): void {
    if (this.dataService.selectedRegion) {
      this.selectedRegion = this.dataService.selectedRegion;
    } else {
      this.selectedRegion = this.regions[1];
    }
    this.selectedCategories = this.dataService.selectedCategories;


    // loads products from backend to UI, starts updating fast, as the initial retrieving might take a while
    this.timer = setInterval(() => {
      if (this.dataService.getProducts(this.selectedRegion, this.selectedCategories).length !== this.requestedProducts.length) {
        this.reloadFromService();
      }
      // at least some products have been fetched
      if (this.dataService.availableProducts.length > 0) {
        clearInterval(this.timer);
        /*setInterval(() => {
          this.reloadFromService();
        }, 10000);*/
      }
    }, 500);
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


  public selectCategory(c: Category) {
    if (this.selectedCategories.filter(cat => cat.key === c.key).length > 0) {
      this.selectedCategories = this.selectedCategories.filter(cat => cat.key !== c.key);
    } else {
      this.selectedCategories.push(c);
    }
    this.reloadFromService();
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
      this.reloadFromService();
    }
  }

  public reloadFromService() {
    this.favCategories = this.dataService.favouriteCategories;
    this.favProducts = this.dataService.favouriteProducts;
    this.dataService.selectedCategories = this.selectedCategories;
    this.dataService.selectedRegion = this.selectedRegion;
    this.requestedProducts = this.dataService.getProducts(this.selectedRegion, this.selectedCategories);
  }

  public updateCategroyFavourites(category: Category) {
    this.dataService.updateFavouriteCategory(category)
    this.reloadFromService();
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
