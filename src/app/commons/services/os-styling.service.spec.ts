import {HttpClientTestingModule} from '@angular/common/http/testing';
import {getTestBed, TestBed} from '@angular/core/testing';
import {OsStylingService} from './os-styling.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {OsStyle} from '../enums/os-style';
import {ScreenType} from '../enums/screen-type';

describe('OS Styling Service', () => {
  let service: OsStylingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DeviceDetectorService,
        OsStylingService
      ]
    });
    const injector = getTestBed();
    service = injector.inject(OsStylingService);
  });

  describe('CheckOsStyle', () => {
    it('Should return a valid os style', () => {
      expect(Object.keys(OsStyle).filter(s => s === service.osStyle.toString()).length).toBe(1);
    });
  });

  describe('CheckScreenType', () => {
    it('', () => {
      expect(Object.keys(ScreenType).filter(s => s === service.screenType.toString()).length).toBe(1);
    });
  });
});
