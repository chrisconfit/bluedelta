import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ButtonsProvider } from "../../providers/buttons/buttons";
import { ResourceProvider } from "../../providers/resource/resource.provider";

@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html'
})
export class CustomersPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public buttonService: ButtonsProvider,
    public resourceService: ResourceProvider) {
    
    this.selectedItem = navParams.get('item');

    
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(CustomersPage, {
      item: item
    });
  }
}
