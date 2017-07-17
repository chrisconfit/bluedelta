import { Component } from '@angular/core';
import { WelcomePage } from "../welcome/welcome";




@Component({
  selector: 'page-bottom-tabs',
  templateUrl: 'bottom-tabs.html'
})
export class BottomTabsPage {

  tab1Root = WelcomePage
  


  constructor() {}

}
