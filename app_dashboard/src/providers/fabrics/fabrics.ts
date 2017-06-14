import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserPoolsAuthorizerClient, CustomAuthorizerClient } from "../../services/blue-delta-api.service";
import { LoadingController, AlertController, ToastController } from "ionic-angular";
import { Fabric } from "../../services/blue-delta-sdk/index";
import { FabricModel } from "../../models/fabric.model";


@Injectable()
export class FabricsProvider {
  providerName = 'FabricsProvider';
  modelName = 'fabric';
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
        console.log('error from load fabric list', err);
        this.presentToast('Error Loading Items');
      }
    );
  };

  createItemWithAuth(fabricItem: Fabric):void {
    console.log('fabricItem', fabricItem);
    this.exitItemCreate();
    fabricItem = new FabricModel(fabricItem.fabricId, fabricItem.name, fabricItem.weight, fabricItem.description, fabricItem.materials, fabricItem.supplier);
    console.log('fabricItem', fabricItem);
    this.list = [ ...this.list, fabricItem ];
    this.userPoolsAuthClient.getClient()[this.modelName + 'sCreate'](fabricItem).subscribe(
      (data) => {        
        this.dismissLoader();
        this.initialized = true;
        console.log(`${this.providerName} create success data`, data);
        this.list = [ ...this.list ].map(v => {
          if (!v.fabricId) {
            v.threadId = data.fabricId;
            v.createTime = data.createTime;
          }
          return v;
        });
        this.itemInCreation = false;
        this.itemCreate = this.createNewItemForm();
        this.presentToast('Fabric Successfully Created!');
      },
      (err) => {
        this.dismissLoader();
        this.initialized = true; 
        this.displayAlert('Error encountered',
          `An error occurred when trying to create Fabric. Please check the console logs for more information.`)
        console.log('error from create fabric', err);
        this.itemInCreation = false;
        this.presentToast('Error Creating Fabric');
      }
    );
  }

  deleteItemWithAuth(itemId: string) {
    this.itemIdMarkedForDelete = itemId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sDelete'](itemId)
      .subscribe(
        (data) => {
          console.log(`${this.providerName} delete success data`, data);
          this.list = [ ...this.list ].filter(v => v.threadId !== this.itemIdMarkedForDelete);
          this.dismissLoader();
          this.initialized = true;
          this.itemIdMarkedForDelete = null;
          this.presentToast('Fabric Successfully Deleted');
        },
        (err) => {
          this.dismissLoader();
          this.initialized = true; 
          this.displayAlert('Error encountered',
            `An error occurred when trying to delete fabric ${itemId}. Please check the console logs for more information.`)
          console.log(`${this.providerName} delete error`, err);
          this.itemIdMarkedForDelete = null;
          this.presentToast('Error Deleting Fabric');
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
              `An error occurred when trying to get fabric ${itemId}. Please check the console logs for more information.`)
            console.log(`${this.providerName} get error`, err);
          }
      );
  }

  editItemWithAuth(item: any, newValues: any):void {
    this.itemIdMarkedForEdit = item.threadId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sUpdate'](this.itemIdMarkedForEdit, newValues.value)
      .subscribe(
          (data) => {
            this.dismissLoader();
            this.initialized = true;
            this.itemIdMarkedForEdit = null;
            this.list = [ ...this.list ].map(v => {
              if (v.threadId === data.threadId) {
                v.updateTime = data.updateTime;
                if (v.name !== data.name) v.name = data.name;
                if (v.thumb !== data.thumb) v.thumb = data.thumb;
                if (v.layer !== data.layer) v.layer = data.layer;
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

  startItemEdit(fabric: Fabric) {
    this.itemIdMarkedForEdit = fabric.fabricId;
    this.itemEdit = this.createNewItemForm(fabric);
  }

  exitItemEditMode() {
    this.itemIdMarkedForEdit = null;
  }

  exitItemCreate() {
    this.itemInCreation = false;
  }


  createNewItemForm(item?) {
    let name = '', thumb = '', layer = '';
    if (item) {
      name  = item.name;
      thumb = item.thumb;
      layer = item.layer;
    }
    return this.formBuilder.group({
      name: [name, Validators.required],
      thumb: [thumb],
      layer: [layer]
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
