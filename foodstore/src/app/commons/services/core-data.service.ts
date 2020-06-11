import {LocalStorageService} from './localstorage.service';
import {RemoteApiService} from './remote-api.service';
import {Product} from '../model/product';
import {Category} from '../model/category';
import {Injectable} from '@angular/core';
import {CartItem} from '../model/cart';
import {ProductProperty} from '../model/product-property';

@Injectable()
export class CoreDataService {

  public availableProducts: Product[] = [];
  public availableCategories: Category[] = [];
  private activeCart: CartItem[];
  public selectedRegion: Category;
  public selectedCategories: Category[] = [];

  // private performedPurchases: Product[];

  public constructor(private persistencyService: LocalStorageService,
                     private remoteService: RemoteApiService) {
    this.activeCart = this.persistencyService.cart;
    // this.fillWithDummyData();
    remoteService.requestCategories().subscribe(res => {
      this.availableCategories = res;
      remoteService.requestProducts().subscribe(rb => {
        this.availableProducts = rb;
        console.log(this.availableProducts);
      });
    });
    /*this.remoteService.requestPurchases().subscribe(res => {
      this.performedPurchases = res;
    });*/
  }

  public getCategoriesFor(c: Category): Category[] {
    if (c.key === 'myShop') {
      const cat = this.favouriteCategories.slice(0);
      for (const p of this.favouriteProducts) {
        if (cat.filter(ca => ca.key === p.category.key).length === 0) {
          cat.push(p.category);
        }
      }
      return this.orderCategories(cat);
    } else if (c.key === 'allShop') {
      return this.orderCategories(this.availableCategories);
    }
    return [];
  }

  public getProducts(area: Category, categories: Category[]) {
    if (area.key === 'myShop') {
      const fps = this.availableProducts.filter(p => this.favouriteCategories.filter(c => c.key === p.category.key).length > 0 ||
        this.favouriteProducts.filter(fp => fp.id === p.id).length > 0);
      if (categories.length !== 0) {
        return fps.filter(p => categories.filter(c => c.key === p.category.key).length > 0);
      }

      return this.orderProducts(fps);
    } else if (area.key === 'allShop') {
      if (categories.length === 0) {
        return this.orderProducts(this.availableProducts);
      } else {
        return this.orderProducts(this.availableProducts.filter(p => categories.filter(c => c.key === p.category.key).length > 0));
      }
    }
    return []; // default return nothing!
  }

  private orderProducts(products: Product[]): Product[] {
    return products.sort((p1: Product, p2: Product) => {
      const p1Fav = this.favouriteProducts.filter(p => p.id === p1.id).length > 0;
      const p2Fav = this.favouriteProducts.filter(p => p.id === p2.id).length
      if ((p1Fav && p2Fav) || (!p1Fav && !p2Fav)) {
        if (p1.category.content === p2.category.content) {
          return p1.title <= p2.title ? -1 : 1;
        }
        return p1.category.content <= p2.category.content ? -1 : 1;
      }
      return p1Fav ? -1 : 1;
    });
  }

  private orderCategories(categories: Category[]): Category[] {
    return categories.sort((c1: Category, c2: Category) => {
      return c1.content <= c2.content ? -1 : 1;
    });
  }


  public get currentCart(): CartItem[] {
    return this.activeCart;
  }

  public set currentCart(cart: CartItem[]) {
    this.activeCart = cart;
    this.persistencyService.cart = cart;
  }

  public storeCartChange() {
    this.persistencyService.cart = this.activeCart;
  }

  public addToCart(p: Product): boolean {
    let ret = false;
    const c = this.activeCart.filter(item => item.item.id === p.id);
    if (c.length > 0) {
      this.activeCart = this.activeCart.filter(item => item.item.id !== c[0].item.id);
      if (c[0].amount < c[0].item.quantity) {
        c[0].amount++;
        ret = true;
      }
      this.activeCart.push(c[0]);
    } else {
      this.activeCart.push(new CartItem(p));
      ret = true;
    }
    this.persistencyService.cart = this.activeCart;
    return ret;
  }


  public get favouriteProducts(): Product[] {
    return this.persistencyService.productFavourites;
  }
  public set favouriteProducts(p: Product[]) {
    this.persistencyService.updateFavouriteProducts(p);
  }

  public get favouriteCategories(): Category[] {
    return this.persistencyService.categoryFavourites;
  }

  public set favouriteCategories(c: Category[]) {
    console.log('fav cat update');
    this.persistencyService.updateFavouriteCategories(c);
  }


  public isFavourite(p: Product): boolean {
    const isF = this.favouriteProducts.filter(pr => pr.id === p.id).length > 0;
    return isF;
  }

  public updateFavouriteProduct(p: Product): void {
    console.log('updating...');
    const vp = this.favouriteProducts;
    if (this.favouriteProducts.filter(pr => pr.id === p.id).length === 0) {
      vp.push(p);
      this.favouriteProducts = vp;
    } else {
      this.favouriteProducts = vp.filter(pr => pr.id !== p.id);
    }
  }

  public updateFavouriteCategory(c: Category) {
    const vf = this.favouriteCategories;
    if (vf.filter(cat => c.key === cat.key).length > 0) {
      this.favouriteCategories = vf.filter(cat => cat.key !== c.key);
    } else {
      vf.push(c);
      this.favouriteCategories = vf;
    }
  }
  private fillWithDummyData(): void {
    this.availableCategories = [];
    this.availableCategories.push(new Category('vegetables', 'Vegetables', 'vegetables'));
    this.availableCategories.push(new Category('bread', 'Bakery products', 'bread'));
    this.availableCategories.push(new Category('fruit', 'Fruits', 'fruits'));
    this.availableCategories.push(new Category('beverages', 'Beverages', 'water'));
    this.availableCategories.push(new Category('teancoffe', 'Coffee & Tea', 'coffee'));

    this.availableProducts = [];
    this.availableProducts.push(new Product(
      '1',
      'Cucumber',
      'Cucumber, stustainably grown.',
      0.99,
      'Piece',
      'https://i.ibb.co/cD1WBmK/lenovo-ideapad-300-S.png',
      this.availableCategories[0],
      '2019-04-06T21:48:19.631Z',
      Number.MAX_SAFE_INTEGER,
      [new ProductProperty('Color', 'green'),
        new ProductProperty('Length', '30cm'),
        new ProductProperty('Weight', '300g')]
    ));
    this.availableProducts.push(new Product(
      '2',
      'Crust bread',
      'Spicy bread with thick and crunchy crust.',
      1.25,
      '250 grams',
      'https://i.ibb.co/cD1WBmK/lenovo-ideapad-300-S.png',
      this.availableCategories[1],
      '2019-04-06T21:48:19.631Z',
      60,
      [new ProductProperty('Bakery', 'Bäckerei X'),
        new ProductProperty('Whole loaf', '1kg')]
    ));
    this.availableProducts.push(new Product(
      '3',
      'Roll',
      'Fresh roll, baked at the shop.',
      0.50,
      'Piece',
      'https://i.ibb.co/cD1WBmK/lenovo-ideapad-300-S.png',
      this.availableCategories[1],
      '2019-04-06T21:48:19.631Z',
      500,
      [new ProductProperty('Weight', '100 g')]
    ));

    this.availableProducts.push(new Product(
      '4',
      'Cherry',
      'Cerries from Italy.',
      0.06,
      '10 grams',
      'https://i.ibb.co/cD1WBmK/lenovo-ideapad-300-S.png',
      this.availableCategories[2],
      '2019-04-06T21:48:19.631Z',
      Number.MAX_SAFE_INTEGER,
      [new ProductProperty('Color', 'red'),
        new ProductProperty('Origin', 'Italy'),
        new ProductProperty('Quality', 'A'),
        new ProductProperty('biological', 'no')]
    ));

  }
}
