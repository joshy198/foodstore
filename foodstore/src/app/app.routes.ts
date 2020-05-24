import {Routes} from '@angular/router';
import {MainviewComponent} from "./components/cp-mainview/cp-mainview.component";
import {CartComponent} from "./components/cp-cart/cp-cart.component";

export const APP_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: MainviewComponent},
  {path: 'cart', component: CartComponent}
];
