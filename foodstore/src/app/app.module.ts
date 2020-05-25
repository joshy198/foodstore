import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {APP_ROUTES} from "./app.routes";
import {RouterModule} from "@angular/router";
import {DeviceDetectorModule} from "ngx-device-detector";
import {CoreDataService} from "./commons/services/core-data.service";
import {LocalStorageService} from "./commons/services/localstorage.service";
import {NavigationService} from "./commons/services/navigation.service";
import {MainviewModule} from "./components/cp-mainview/cp-mainview.module";
import {RemoteApiService} from "./commons/services/remote-api.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainviewModule,
    DeviceDetectorModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES, {useHash: false, enableTracing: false})
  ],
  providers: [
    NavigationService,
    CoreDataService,
    RemoteApiService,
    LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
