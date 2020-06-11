import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {OsStylingService} from '../../commons/services/os-styling.service';
import {OsStyle} from '../../commons/enums/os-style';
import {ScreenType} from '../../commons/enums/screen-type';
import {NavigationService} from '../../commons/services/navigation.service';
import {CoreDataService} from '../../commons/services/core-data.service';
import {NavigationState} from '../../commons/model/navigation-state';

@Component({
  selector: 'cp-header',
  templateUrl: './cp-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cp-header.component.scss']
})
export class HeaderComponent implements OnInit {
  public osStyle = OsStyle;
  public screenType = ScreenType;
  public type: ScreenType;
  private resizeId: number;
  @Input() provideBackAction = false;
  @Input() headerText: string;

  @Output() fallbackReturnClick = new EventEmitter<any>();
  @Output() cartClick = new EventEmitter<any>();

  constructor(public stylingService: OsStylingService, public navigationService: NavigationService, public dataService: CoreDataService) {
    this.type = stylingService.screenType;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.type = this.stylingService.screenType;
  }

  public manageBackClick() {
    if (this.navigationService.canNavigateBack()) {
      this.navigationService.navigateBack();
    } else {
      this.fallbackReturnClick.emit();
    }
  }

  public navigateToCart() {
    this.navigationService.navigateTo(new NavigationState('/cart'));
  }

  public calculateCartItems(): number {
    let amount = 0;
    for (const item of this.dataService.currentCart) {
      amount += item.amount;
    }
    return amount;
  }

  ngOnInit() {
  }

}
