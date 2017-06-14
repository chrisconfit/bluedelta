import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserPoolsAuthorizerClient, CustomAuthorizerClient } from "../../services/blue-delta-api.service";
import { LoadingController, AlertController, ToastController } from "ionic-angular";
import { User } from "../../services/blue-delta-sdk/index";
import { UserModel } from "../../models/user.model";


@Injectable()
export class UsersProvider {
  providerName = 'UsersProvider';
  modelName = 'user';
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
        console.log('error from load order list', err);
        this.presentToast('Error Loading Items');
      }
    );
  };

  createItemWithAuth(userItem: User):void {
    this.exitItemCreate();
    userItem = new UserModel(userItem.identityId, userItem.email, userItem.phoneNumber, userItem.addresses, userItem.jeans);
    this.list = [ ...this.list, userItem ];
    this.userPoolsAuthClient.getClient()[this.modelName + 'sCreate'](userItem).subscribe(
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
        console.log('error from create order', err);
        this.itemInCreation = false;
        this.presentToast('Error Creating Button');
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
          this.presentToast('User Successfully Deleted');
        },
        (err) => {
          this.dismissLoader();
          this.initialized = true; 
          this.displayAlert('Error encountered',
            `An error occurred when trying to delete user ${itemId}. Please check the console logs for more information.`)
          console.log(`${this.providerName} delete error`, err);
          this.itemIdMarkedForDelete = null;
          this.presentToast('Error Deleting User');
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
    console.log('item', item);
    console.log('newValues.value', newValues.value);
    this.itemIdMarkedForEdit = item.identityId;
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

  startItemEdit(user: User) {
    this.itemIdMarkedForEdit = user.identityId;
    this.itemEdit = this.createNewItemForm(user);
  }

  exitItemEditMode() {
    this.itemIdMarkedForEdit = null;
  }

  exitItemCreate() {
    this.itemInCreation = false;
  }


  createNewItemForm(item?) {
    let email = '', phoneNumber = ''
    if (item) {
      email  = item.email;
      phoneNumber = item.phoneNumber;
      
    }
    return this.formBuilder.group({
      email: [email, Validators.required],
      phoneNumber: [phoneNumber]
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
