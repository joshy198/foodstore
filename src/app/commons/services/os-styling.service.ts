import {OsStyle} from '../enums/os-style';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Injectable} from '@angular/core';
import {ScreenType} from '../enums/screen-type';

@Injectable()
export class OsStylingService {

  private osType: string;

  constructor(private deviceService: DeviceDetectorService) {
    this.osType = this.deviceService.os;
    console.log(this.deviceService.os);
  }

  public get osStyle(): OsStyle {
    switch (this.osType) {
      case 'Android':
        return OsStyle.ANDROID;
      case 'iOS':
      case'Mac':
        return OsStyle.APPLE;
      default:
        return OsStyle.GENERIC;
    }
  }

  public get screenType(): ScreenType {
    const screenSize = window.innerWidth;
    if (screenSize < 540) {
      return ScreenType.MOBILE;
    } else if (screenSize < 1025) {
      return ScreenType.TABLET;
    }
    return ScreenType.DESKTOP;
  }

}
