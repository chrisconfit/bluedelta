import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserPoolsAuthorizerClient, CustomAuthorizerClient } from "../../services/blue-delta-api.service";
import { LoadingController, AlertController, ToastController } from "ionic-angular";
import { ButtonModel } from "../../models/button.model";
import { Button } from "../../services/blue-delta-sdk/index";


@Injectable()
export class ButtonsProvider {
  providerName = 'ButtonsProvider';
  modelName = 'button';
  private itemEdit: FormGroup|null;
  private loader = null;
  private itemCreate: FormGroup|null;
  initialized = false;
  itemInCreation: boolean = false;
  list: any = [];
  itemIdMarkedForDelete: string|null = null;
  itemIdMarkedForEdit: string|null = null;
  itemIdBeingFetched: string|null = null;

  
  constructor(  
    private customAuthClient: CustomAuthorizerClient, 
    private userPoolsAuthClient: UserPoolsAuthorizerClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {
    this.itemEdit = this.createNewItemForm();
    this.itemCreate = this.createNewItemForm();
  }

  loadItemsWithAuth(): void {
    this.presentLoader();
    this.userPoolsAuthClient.getClient()[this.modelName + 'sList']().subscribe(
      (data) => {
        this.dismissLoader();
        this.initialized = true;
        console.log(`${this.providerName} list success data`, data);
        this.list = data.items;
      },
      (err) => {
        this.dismissLoader();
        this.initialized = true; 
        this.displayAlert('Error encountered',
          `An error occurred when trying to load the ${this.modelName}s. Please check the console logs for more information.`)
        console.log('error from load button list', err);
        this.presentToast('Error Loading Items');
      }
    );
  };

  createItemWithAuth(item):void {
    this.exitItemCreate();
    console.log('THIS IS THE ITEM', item);
    item = new ButtonModel(item.name, item.layer, item.thumb);
    this.list = [ ...this.list, item ];
    this.userPoolsAuthClient.getClient()[this.modelName + 'sCreate'](item).subscribe(
      (data) => {        
        this.dismissLoader();
        this.initialized = true;
        console.log(`${this.providerName} create success data`, data);
        this.list = [ ...this.list ].map(v => {
          if (!v.buttonId) {
            v.buttonId = data.buttonId;
            v.createTime = data.createTime;
          }
          return v;
        });
        this.itemInCreation = false;
        this.itemCreate = this.createNewItemForm();
        this.presentToast('Button Successfully Created!');
      },
      (err) => {
        this.dismissLoader();
        this.initialized = true; 
        this.displayAlert('Error encountered',
          `An error occurred when trying to create Order. Please check the console logs for more information.`)
        console.log('error from create button', err);
        this.itemInCreation = false;
        this.presentToast('Error Creating Button');
      }
    );
  }

  deleteItemWithAuth(itemId: string) {
    console.log('ID OF BUTTON TO DELETE',itemId);
    this.itemIdMarkedForDelete = itemId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sDelete'](itemId)
      .subscribe(
        (data) => {
          console.log(`${this.providerName} delete success data`, data);
          this.list = [ ...this.list ].filter(v => v.buttonId !== this.itemIdMarkedForDelete);
          this.dismissLoader();
          this.initialized = true;
          this.itemIdMarkedForDelete = null;
          this.presentToast('Button Successfully Deleted');
        },
        (err) => {
          this.dismissLoader();
          this.initialized = true; 
          this.displayAlert('Error encountered',
            `An error occurred when trying to delete order ${itemId}. Please check the console logs for more information.`)
          console.log(`${this.providerName} delete error`, err);
          this.itemIdMarkedForDelete = null;
          this.presentToast('Error Deleting Button');
        }
    );
  }

  getItemWithAuth(itemId: string) {
    this.itemIdBeingFetched = itemId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sGet'](itemId)
      .subscribe(
          (data) => {
            console.log(`${this.providerName} get success data`, data);
            this.dismissLoader();
            this.initialized = true;
          },
          (err) => {
            this.dismissLoader();
            this.initialized = true;
            this.displayAlert('Error encountered',
              `An error occurred when trying to get order ${itemId}. Please check the console logs for more information.`)
            console.log(`${this.providerName} get error`, err);
          }
      );
  }

  editItemWithAuth(item: any, newValues: any):void {
    this.itemIdMarkedForEdit = item.buttonId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sUpdate'](this.itemIdMarkedForEdit, newValues.value)
      .subscribe(
          (data) => {
            this.dismissLoader();
            this.initialized = true;
            this.itemIdMarkedForEdit = null;
            this.list = [ ...this.list ].map(v => {
              if (v.buttonId === data.buttonId) {
                v.updateTime = data.updateTime;
                if (v.name !== data.name) v.name = data.name;
                if (v.layer !== data.layer) v.layer = data.layer;
                if (v.thumb !== data.thumb) v.thumb = data.thumb;
              }
              return v;
            });
            this.presentToast('Successfully Edited Item');
          },
          (err) => {
            this.dismissLoader();
            this.initialized = true;
            this.displayAlert('Error encountered',
              `An error occurred when trying to edit item ${this.itemIdMarkedForEdit}. Please check the console logs for more information.`)
              console.log(`${this.providerName} edit error`, err);
              this.itemIdMarkedForEdit = null;
              this.presentToast('Unable to Edit Item');
          }
      );
  }

  startItemEdit(button: Button) {
    this.itemIdMarkedForEdit = button.buttonId;
    this.itemEdit = this.createNewItemForm(button);
  }

  exitItemEditMode() {
    this.itemIdMarkedForEdit = null;
  }

  exitItemCreate() {
    this.itemInCreation = false;
  }


  createNewItemForm(item?) {
    let name = '', layer = '', thumb = '';
    if (item) {
      name  = item.name;
      layer = item.layer;
      thumb = item.thumb;
    }
    return this.formBuilder.group({
      name: [name, Validators.required],
      layer: [layer],
      thumb: [thumb]
    });
  }

  dismissLoader() {
    if (this.loader) {
      this.loader.dismiss();
    }
    this.loader = null;
  }

  presentLoader() {
    if (!this.loader) {
      this.loader = this.loadingCtrl.create();
    }
    this.loader.present();
  }


  getAlertController() {
    return this.alertCtrl;
  }

  displayAlert(title, subtitle, functionToRunWhenOkButtonIsPressed=null) {
    let okFunction = () => {};
    if (functionToRunWhenOkButtonIsPressed != null) {
      okFunction = functionToRunWhenOkButtonIsPressed;
    }
    let alert = this.getAlertController().create({
      title: title,
      subTitle: subtitle,
      buttons: [{ text: 'OK', handler: okFunction }]
    });
    alert.present();
  }

  startItemCreate() {
    this.itemInCreation = true;
  }

 

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

}