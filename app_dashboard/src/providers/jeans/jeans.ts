import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserPoolsAuthorizerClient, CustomAuthorizerClient } from "../../services/blue-delta-api.service";
import { LoadingController, AlertController, ToastController } from "ionic-angular";
import { Jean } from "../../services/blue-delta-sdk/index";
import { JeanModel } from "../../models/jean.model";


@Injectable()
export class JeansProvider {
  providerName = 'JeansProvider';
  modelName = 'jean';
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
    this.userPoolsAuthClient.getClient().
    [this.modelName + 'sList']().subscribe(
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
        this.presentToast('Error Loading Items');
      }
    );
  };

  createItemWithAuth(jeanItem: Jean):void {
    this.exitItemCreate();
    jeanItem = new JeanModel(jeanItem.jeanId, jeanItem.measurement, jeanItem.thread, jeanItem.fabric, jeanItem.button);
    this.list = [ ...this.list, jeanItem ];
    this.userPoolsAuthClient.getClient()[this.modelName + 'sCreate'](jeanItem).subscribe(
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
        this.presentToast('Jean Successfully Created!');
      },
      (err) => {
        this.dismissLoader();
        this.initialized = true; 
        this.displayAlert('Error encountered',
          `An error occurred when trying to create Jean. Please check the console logs for more information.`)
        console.log('error from create jean', err);
        this.itemInCreation = false;
        this.presentToast('Error Creating Jean');
      }
    );
  }

  deleteItemWithAuth(itemId: string) {
    this.itemIdMarkedForDelete = itemId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sDelete'](itemId)
      .subscribe(
        (data) => {
          console.log(`${this.providerName} delete success data`, data);
          this.list = [ ...this.list ].filter(v => v.identityId !== this.itemIdMarkedForDelete);
          this.dismissLoader();
          this.initialized = true;
          this.itemIdMarkedForDelete = null;
          this.presentToast('Jean Successfully Deleted');
        },
        (err) => {
          this.dismissLoader();
          this.initialized = true; 
          this.displayAlert('Error encountered',
            `An error occurred when trying to delete jean ${itemId}. Please check the console logs for more information.`)
          console.log(`${this.providerName} delete error`, err);
          this.itemIdMarkedForDelete = null;
          this.presentToast('Error Deleting Jean');
        }
    );
  }

  getItemWithAuth(itemId: string) {
    this.itemIdBeingFetched = itemId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sGet'](itemId)
      .subscribe(
          (data) => {
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
    this.itemIdMarkedForEdit = item.jeanId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sUpdate'](this.itemIdMarkedForEdit, newValues.value)
      .subscribe(
          (data) => {
            this.dismissLoader();
            this.initialized = true;
            this.itemIdMarkedForEdit = null;
            this.list = [ ...this.list ].map(v => {
              if (v.jeanId === data.jeanId) {
                v.updateTime = data.updateTime;
                if (v.measurement !== data.measurement) v.measurement = data.measurement;
                if (v.thread !== data.thread) v.thread = data.thread;
                if (v.fabric !== data.fabric) v.fabric = data.fabric;
                if (v.button !== data.button) v.button = data.button;
              }
              return v;
            });
            this.presentToast('Successfully Edited Item');
            // this.list = [ ...this.list, data ]
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

  startItemEdit(jean: Jean) {
    this.itemIdMarkedForEdit = jean.jeanId;
    this.itemEdit = this.createNewItemForm(jean);
  }

  exitItemEditMode() {
    this.itemIdMarkedForEdit = null;
  }

  exitItemCreate() {
    this.itemInCreation = false;
  }


  createNewItemForm(item?) {
    let measurement = '', thread = '', fabric = '', button = '';
    if (item) {
      measurement  = item.measurement;
      thread = item.thread;
      fabric = item.fabric;
      button = item.button;
    }
    return this.formBuilder.group({
      measurement: [measurement, Validators.required],
      thread: [thread],
      fabric: [fabric],
      button: [button]
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
