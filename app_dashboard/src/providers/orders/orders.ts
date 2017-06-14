import { Injectable } from '@angular/core';


import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserPoolsAuthorizerClient, CustomAuthorizerClient } from "../../services/blue-delta-api.service";
import { LoadingController, AlertController } from "ionic-angular";


@Injectable()
export class OrdersProvider {
  providerName = 'OrdersProvider';
  modelName = 'order';


  private itemEdit: FormGroup;
  private loader = null;
  private itemCreate: FormGroup;
  initialized = false;

  list: any = [];
  itemIdMarkedForDelete: string;
  itemIdMarkedForEdit: string;

  
  constructor(  
    private customAuthClient: CustomAuthorizerClient, 
    private userPoolsAuthClient: UserPoolsAuthorizerClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder
  ) {
    this.itemEdit = this.createNewItemForm();
    this.itemCreate = this.createNewItemForm();
  }

  loadItemsWithAuth(): void {
    console.log('orders load items ran');
    this.userPoolsAuthClient.getClient()[this.modelName + 'sList']().subscribe(
      (data) => {
        console.log('orders load items ran');
        this.dismissLoader();
        this.initialized = true;
        console.log(`${this.providerName} list success data`, data);
        this.list = data;
      },
      (err) => {
        this.dismissLoader();
        this.initialized = true; 
        this.displayAlert('Error encountered',
          `An error occurred when trying to load the ${this.modelName}s. Please check the console logs for more information.`)
        console.log('error from load order list', err);
      }
    );
  };

  createItemWithAuth(item):void {
    this.list = [ ...this.list, item ];
    this.userPoolsAuthClient.getClient()[this.modelName + 'Create'](item).subscribe(
      (data) => {        
        this.dismissLoader();
        this.initialized = true;
        console.log(`${this.providerName} create success data`, data);
        this.list = [ ...this.list ].map(v => (!v.orderId) ? data : v);
      },
      (err) => {
        this.dismissLoader();
        this.initialized = true; 
        this.displayAlert('Error encountered',
          `An error occurred when trying to create Order. Please check the console logs for more information.`)
        console.log('error from create order', err);
      }
    );
  }

  deleteItemWithAuth(itemId: string) {
    this.itemIdMarkedForDelete = itemId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'Delete'](itemId)
      .subscribe(
        (data) => {
          console.log(`${this.providerName} delete success data`, data);
          this.list = [ ...this.list ].filter(v => v.itemId !== this.itemIdMarkedForDelete);
          this.dismissLoader();
          this.initialized = true;
        },
        (err) => {
          this.dismissLoader();
          this.initialized = true; 
          this.displayAlert('Error encountered',
            `An error occurred when trying to delete order ${itemId}. Please check the console logs for more information.`)
          console.log(`${this.providerName} delete error`, err);
        }
    );
  }

  getItemWithAuth(itemId: string) {
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
    this.itemIdMarkedForEdit = item.orderId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sUpdate'](item.orderId, newValues.value)
      .subscribe(
          (data) => {
            console.log(`${this.providerName} edit success data`, data);
            this.dismissLoader();
            this.initialized = true;
          },
          (err) => {
            this.dismissLoader();
            this.initialized = true;
            this.displayAlert('Error encountered',
              `An error occurred when trying to edit order ${item}. Please check the console logs for more information.`)
              console.log(`${this.providerName} get error`, err);
          }
      );
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
    if (this.loader != null) {
      this.loader.dismiss();
    }
    this.loader = null;
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

}