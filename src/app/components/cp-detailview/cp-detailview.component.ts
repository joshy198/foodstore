import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {URLConstants} from '../../commons/url-constants';
import {CoreDataService} from '../../commons/services/core-data.service';
import {NavigationService} from '../../commons/services/navigation.service';
import {NavigationState} from '../../commons/model/navigation-state';

@Component({
  selector: 'cp-detailview',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cp-detailview.component.html',
  styleUrls: ['./cp-detailview.component.scss']
})
export class DetailviewComponent implements OnInit {

  public product: string;
  public headerText: string;
  public category: string;


  constructor(private route: ActivatedRoute, public dataService: CoreDataService, public navigationService: NavigationService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.product = params[URLConstants.PARAM_PRODUCT];
      const pds = this.dataService.availableProducts.filter(p => p.id === this.product);
      console.log(this.product);
      if (pds.length === 0) {
        this.fallbackBackAction();
      }
      this.headerText = pds[0].title;
    });
  }

  public fallbackBackAction() {
    this.navigationService.navigateTo(new NavigationState('/home'));
  }


}
