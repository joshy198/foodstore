import {TestBed, async} from '@angular/core/testing';
import {RemoteApiService} from './remote-api.service';
import {LanguageService} from '../translations/language.service';
import {HttpClient} from '@angular/common/http';

TestBed.configureTestingModule({
  imports: [],
  providers: [
    LanguageService,
    HttpClient,
    {},
    RemoteApiService

  ],
});

describe('RemoteApiService', () => {
  beforeEach(async(() => {

  })
  )
});

