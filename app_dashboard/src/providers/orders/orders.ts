import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserPoolsAuthorizerClient, CustomAuthorizerClient } from "../../services/blue-delta-api.service";
import { LoadingController, AlertController, ToastController } from "ionic-angular";
import { Order, OrderItem, Transaction } from "../../services/blue-delta-sdk/index";
import { _getDefaultMeasurement, _getDefaultThread, _getDefaultFabric, _getDefaultButton } from "./helpers";



@Injectable()
export class OrdersProvider {
  providerName = 'OrdersProvider';
  modelName = 'order';
  private itemEdit: FormGroup|null;
  private loader = null;
  private itemCreate: FormGroup|null;
  initialized = false;
  itemInCreation: boolean = false;
  list: any = [];
  itemIdMarkedForDelete: string|null = null;
  itemIdMarkedForEdit: string|null = null;
  itemIdBeingFetched: string|null = null;
  orderCreateForm;
  orderInCreation = {
    orderId: null,
    userId: null,
    orderItems: [],
    transaction: {
      transactionId: null,
      status: null
    }
  };


  
  constructor(  
    private customAuthClient: CustomAuthorizerClient, 
    private userPoolsAuthClient: UserPoolsAuthorizerClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {
    this.itemEdit = this.createNewOrderForm('');
    this.itemCreate = this.createNewOrderForm('');
  }

  loadItemsWithAuth(): void {
    this.presentLoader();
    this.userPoolsAuthClient.getClient()[this.modelName + 'sList']().subscribe(
      (data) => {
        this.dismissLoader();
        this.initialized = true;
        this.list = data.items;
      },
      (err) => {
        this.dismissLoader();
        this.initialized = true; 
        this.displayAlert('Error encountered',
          `An error occurred when trying to load the ${this.modelName}s. Please check the console logs for more information.`)
        this.presentToast('Error Loading Items');
      }
    );
  };

  createItemWithAuth(orderItem: Order):void {
    this.exitItemCreate();
    // orderItem = new OrderModel(orderItem.orderId, orderItem.name, orderItem.weight, orderItem.description, orderItem.materials, orderItem.supplier);
    // console.log('orderItem', orderItem);
    this.list = [ ...this.list, orderItem ];
    this.userPoolsAuthClient.getClient()[this.modelName + 'Create'](orderItem).subscribe(
      (data) => {        
        this.dismissLoader();
        this.initialized = true;
        console.log(`${this.providerName} create success data`, data);
        this.list = [ ...this.list ].map(v => {
          if (!v.orderId) {
            v.orderId = data.orderId;
            v.createTime = data.createTime;
          }
          return v;
        });
        this.itemInCreation = false;
        this.itemCreate = this.createNewOrderForm('');
        this.presentToast('Order Successfully Created!');
      },
      (err) => {
        this.dismissLoader();
        this.initialized = true; 
        this.displayAlert('Error encountered',
          `An error occurred when trying to create Order. Please check the console logs for more information.`);
        this.itemInCreation = false;
        this.presentToast('Error Creating Order');
      }
    );
  }

  deleteItemWithAuth(itemId: string) {
    this.itemIdMarkedForDelete = itemId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sDelete'](itemId)
      .subscribe(
        (data) => {
          console.log(`${this.providerName} delete success data`, data);
          this.list = [ ...this.list ].filter(v => v.orderId !== this.itemIdMarkedForDelete);
          this.dismissLoader();
          this.initialized = true;
          this.itemIdMarkedForDelete = null;
          this.presentToast('Order Successfully Deleted');
        },
        (err) => {
          this.dismissLoader();
          this.initialized = true; 
          this.displayAlert('Error encountered',
            `An error occurred when trying to delete order ${itemId}. Please check the console logs for more information.`)
          console.log(`${this.providerName} delete error`, err);
          this.itemIdMarkedForDelete = null;
          this.presentToast('Error Deleting Order');
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
          }
      );
  }

  editItemWithAuth(item: any, newValues: any):void {
    this.itemIdMarkedForEdit = item.orderId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sUpdate'](this.itemIdMarkedForEdit, newValues.value)
      .subscribe(
          (data) => {
            this.dismissLoader();
            this.initialized = true;
            this.itemIdMarkedForEdit = null;
            this.list = [ ...this.list ].map(v => {
              if (v.orderId === data.orderId) {
                v.updateTime = data.updateTime;
                if (v.userId !== data.userId) v.userId = data.userId;
                if (v.orderItems !== data.orderItems) v.orderItems = data.orderItems;
                if (v.transaction !== data.transaction) v.transaction = data.transaction;
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
              this.itemIdMarkedForEdit = null;
              this.presentToast('Unable to Edit Item');
          }
      );
  }

  addItemToStagedOrder(orderItem) {
    this.orderInCreation = { 
      ...this.orderInCreation, 
      orderItems: [ ...this.orderInCreation.orderItems, orderItem ] 
    }
  }

  removeItemFromStagedOrder(itemToRemove) {
    this.orderInCreation = { 
      ...this.orderInCreation, 
      orderItems: [ ...this.orderInCreation.orderItems ].filter(v => v !== itemToRemove)
    }
  }

  _getDefaultTransaction(user) {
    return {
      transactionId: null,
      status: null
    };
  }

  startItemEdit(order: Order) {
    this.orderIdMarkedForEdit = order.orderId;
    this.orderEdit = this.createNewOrderForm(order);
  }

  exitItemEditMode() {
    this.orderIdMarkedForEdit = null;
  }

  startItemCreate() {
    this.orderInCreation = true;
  }

  exitItemCreate() {
    this.orderInCreation = false;
  }

  _getDefaultOrderItem(user) {
    return {
      jean: this._getDefaultJean(user),
      status: null,
      tracking: null
    };
  }


  _getDefaultOrder(user) {
    return {
      userId: user.userId,
      orderItems: [ this._getDefaultOrderItem(user) ],
      transaction: this._getDefaultTransaction(user)
    }
  }




  _getDefaultJean(user) {
    return {
      button: _getDefaultButton(user),
      fabric: _getDefaultFabric(user),
      thread: _getDefaultThread(user),
      measurement: _getDefaultMeasurement(user)
    };
  }

  createNewOrderForm(user) {
    let newOrder = this._getDefaultOrder(user);
    return this.formBuilder.group({
      orderItems:   [ newOrder.orderItems, Validators.required ],
      transaction:  [ newOrder.transaction, Validators.required ]
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




  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
}
