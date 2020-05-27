import {Routes} from '@angular/router';
import {MainviewComponent} from "./components/cp-mainview/cp-mainview.component";
import {CartComponent} from "./components/cp-cart/cp-cart.component";
import {DetailviewComponent} from "./components/cp-detailview/cp-detailview.component";

export const APP_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: MainviewComponent},
  {path: 'product', component: DetailviewComponent},
  {path: 'cart', component: CartComponent}
];
