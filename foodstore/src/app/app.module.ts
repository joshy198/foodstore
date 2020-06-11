import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {APP_ROUTES} from './app.routes';
import {RouterModule} from '@angular/router';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {CoreDataService} from './commons/services/core-data.service';
import {LocalStorageService} from './commons/services/localstorage.service';
import {NavigationService} from './commons/services/navigation.service';
import {MainviewModule} from './components/cp-mainview/cp-mainview.module';
import {RemoteApiService} from './commons/services/remote-api.service';
import {CartModule} from './components/cp-cart/cp-cart.module';
import DEFAULT_URL from '../settings';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainviewModule,
    CartModule,
    DeviceDetectorModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES, {useHash: false, enableTracing: false})
  ],
  providers: [

    NavigationService,
    CoreDataService,
    { provide: 'DEFAULT_URL', useValue: DEFAULT_URL },
    RemoteApiService,
    LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
