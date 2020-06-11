import {Inject, Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Category} from '../model/category';
import {Product} from '../model/product';
import {Observable} from 'rxjs';
import {ProductProperty} from '../model/product-property';
import {LanguageService} from '../translations/language.service';
import DEFAULT_URL from '../../../settings';

@Injectable()
export class RemoteApiService {
  public categories: Category[] = [];

  public constructor(private http: HttpClient, private languageService: LanguageService,  @Inject('DEFAULT_URL') public apiUrl) {
  }

  public requestCategories(): Observable<Category[]> {

    return this.http.get(this.apiUrl + '/category?lang=' + this.languageService.currentLanguage).pipe(
      map((data: any) => {
        for (const cat of data) {
          this.mapAsCategory(cat);
        }
        return this.categories;
      }));
  }

  public requestProducts(): Observable<Product[]> {
    return this.http.get(this.apiUrl + '/products?lang=' + this.languageService.currentLanguage).pipe(
      map((data: any) => {
        const products: Product[] = [];
        console.log(data);
        for (const product of data) {
          products.push(this.mapToProduct(product));
        }
        return products;
      }));
  }

  private mapAsCategory(rc: any): Category {
    const cg = this.categories.filter(k => k.key === rc.key);
    const c = new Category(rc.key, rc.content, rc.icon);
    switch (cg.length) {
      case 0:
        this.categories.push(c);
        return c;
        break;
      default:
        this.categories = this.categories.filter(k => k.key !== rc.key);
        this.categories.push(c);
        return c;

    }
  }

  private getCategoryFor(catKey: string): Category {
    const cg = this.categories.filter(c => c.key === catKey);
    if (cg.length === 0) {
      this.categories.push(new Category(catKey, catKey, catKey));
    }
    return cg[0];
  }

  public requestPartialProductUpdate(date): Observable<Product[]> {
    return this.http.get(this.apiUrl + '/products?updatedAfter=' + date + '&lang=' +
      this.languageService.currentLanguage).pipe(map((data: any) => {
      const products: Product[] = [];
      for (const product of data.products) {
        products.push(this.mapToProduct(product));
      }
      return products;
    }));
  }

  private mapToProduct(product: any): Product {
    return new Product(
      product.id,
      product.title,
      product.descr,
      product.price,
      product.unit,
      product.imageUrl,
      this.getCategoryFor(product.categoryKey),
      product.updatedAt,
      product.quantity,
      product.properties.map(((property: any) => new ProductProperty(
        property.name,
        property.value
      )))
    );

  }


}
