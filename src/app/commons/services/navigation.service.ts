import {NavigationState} from '../model/navigation-state';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class NavigationService {

  private currentState: NavigationState[] = [];

  public constructor(public router: Router) {

  }

  public navigateTo(state: NavigationState, overridal = false) {
    if (overridal) {
      this.currentState[this.currentState.length - 1] = state;
    } else {
      this.currentState.push(state);
    }
    this.performNavigation(state);
  }


  private performNavigation(state: NavigationState) {
    if (state.properties) {
      this.router.navigate([state.place], state.properties);
    } else {
      this.router.navigate([state.place]);
    }
  }

  public replaceLast(state: NavigationState) {
    if (this.currentState.length > 0) {
      this.currentState[this.currentState.length - 1] = state;
    }
  }

  public clearStates() {
    this.currentState = [];
    this.currentState.push(new NavigationState('/home'));
  }

  public canNavigateBack(): boolean {
    return this.currentState.length > 1;
  }

  public navigateBack() {
    if (this.canNavigateBack()) {
      this.currentState.pop();
      const lastState = this.currentState[this.currentState.length - 1];
      this.performNavigation(lastState);
    }
  }

}
