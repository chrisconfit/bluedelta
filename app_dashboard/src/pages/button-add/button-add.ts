import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { GlobalStateService } from '../../services/global-state.service';
import { CustomAuthorizerClient, IamAuthorizerClient } from "../../services/blue-delta-api.service";
import { Logger } from '../../services/logger.service';


declare const AWS: any;


@Component({
  templateUrl: 'button-add.html',
})

export class ButtonAddPage {
  tabsPage = TabsPage;

  public formData = {
    name: "",
    description: "",
    imageUrl: "https://s3.amazonaws.com/blue-delta-public-image-repository/building.png"
  };

  submitted: boolean = false;
  loader: any;

  onSubmit(form) {
    this.submitted = true;
    if (form && form.valid) {
      this.addButton(form);
    }
  }

  addButton(form) {
    this.submitted = true;
    if (form && this.formData.name) {
      let button = {
        name: this.formData.name,
        description: this.formData.description,
        imageUrl: this.formData.imageUrl
      };
      this.globals.displayLoader("Adding...");
      // this.client.getClient().buttonsCreate(button).subscribe(
      //   (data) => {
      //     this.globals.dismissLoader();
      //     this.globals.displayToast(`Button successfully added.`);
      //     this.navCtrl.pop();
      //   },
      //   (err) => {
      //     this.globals.dismissLoader();
      //     this.globals.displayAlert('Error encountered',
      //       `An error occurred when trying to add the button. Please check the console logs for more information.`);
      //     console.error(err);
      //   }
      // );
    }
  }

  constructor(public navCtrl: NavController, private globals: GlobalStateService, private client: IamAuthorizerClient) {
  }

  ionViewDidEnter() {
    Logger.banner("Add a Button");
  }
}
