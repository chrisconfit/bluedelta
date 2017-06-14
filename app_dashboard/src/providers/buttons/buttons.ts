import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserPoolsAuthorizerClient, CustomAuthorizerClient } from "../../services/blue-delta-api.service";
import { LoadingController, AlertController } from "ionic-angular";
import { ButtonModel } from "../../models/button.model";
import { Button } from "../../services/blue-delta-sdk/index";


@Injectable()
export class ButtonsProvider {
  providerName = 'ButtonsProvider';
  modelName = 'button';
  private itemEdit: FormGroup;
  private loader = null;
  private itemCreate: FormGroup;
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
    public formBuilder: FormBuilder
  ) {
    this.itemEdit = this.createNewItemForm();
    this.itemCreate = this.createNewItemForm();
  }

  loadItemsWithAuth(): void {
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
        console.log('error from load order list', err);
      }
    );
  };

  createItemWithAuth(item):void {
    console.log('THIS IS THE ITEM', item);
    alert('in the func');
    item = new ButtonModel(item.name, item.layer, item.thumb);
    this.list = [ ...this.list, item ];
    this.userPoolsAuthClient.getClient()[this.modelName + 'sCreate'](item).subscribe(
      (data) => {        
        alert('in the success');
        console.log('DATA', data);
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
    console.log('ID OF BUTTON TO DELETE',itemId);
    this.itemIdMarkedForDelete = itemId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sDelete'](itemId)
      .subscribe(
        (data) => {
          console.log(`${this.providerName} delete success data`, data);
          this.list = [ ...this.list ].filter(v => v.itemId !== this.itemIdMarkedForDelete);
          this.dismissLoader();
          this.initialized = true;
          this.itemIdMarkedForDelete = null;
        },
        (err) => {
          this.dismissLoader();
          this.initialized = true; 
          this.displayAlert('Error encountered',
            `An error occurred when trying to delete order ${itemId}. Please check the console logs for more information.`)
          console.log(`${this.providerName} delete error`, err);
          this.itemIdMarkedForDelete = null;
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
    console.log('ITEM', item);
    console.log('newValues', newValues.value);
    this.itemIdMarkedForEdit = item.buttonId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sUpdate'](this.itemIdMarkedForEdit, newValues.value)
      .subscribe(
          (data) => {
            console.log(`${this.providerName} edit success data`, data);
            this.dismissLoader();
            this.initialized = true;
            this.itemIdMarkedForEdit = null;
          },
          (err) => {
            this.dismissLoader();
            this.initialized = true;
            this.displayAlert('Error encountered',
              `An error occurred when trying to edit item ${this.itemIdMarkedForEdit}. Please check the console logs for more information.`)
              console.log(`${this.providerName} edit error`, err);
              this.itemIdMarkedForEdit = null;
          }
      );
  }

  startItemEdit(button: Button) {
    this.itemIdMarkedForEdit = button.buttonId;
    this.itemEdit = this.createNewItemForm(button);
    console.log('starting item edit');
    console.log(button);
  }

  exitItemEditMode() {
    this.itemIdMarkedForEdit = null;
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

  startItemCreate() {
    this.itemInCreation = true;
  }

  exitButtonCreate() {
    
  }

}
