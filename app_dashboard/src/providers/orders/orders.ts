import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserPoolsAuthorizerClient, CustomAuthorizerClient } from "../../services/blue-delta-api.service";
import { LoadingController, AlertController, ToastController } from "ionic-angular";
import { Order, OrderItem } from "../../services/blue-delta-sdk/index";
import { _getDefaultOrderItem, _getDefaultTransaction } from "./helpers";



@Injectable()
export class OrdersProvider {
  threadList;
  fabricList;
  buttonList;
  orderList: Order[];
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
  defaultOrder = {
    orderId: null,
    userId: null,
    orderItems: [],
    transaction: {
      transactionId: null,
      status: null
    }
  };
  orderInCreation: boolean = false;
  orderIdMarkedForEdit: string|null = null;
  orderEdit;

  


  
  constructor(  
    private customAuthClient: CustomAuthorizerClient, 
    private userPoolsAuthClient: UserPoolsAuthorizerClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {
    this.itemEdit = this.createNewOrderForm('');
    this.orderCreateForm = this.createNewOrderForm('');
  }

  loadItemsWithAuth(): void {
    this.presentLoader();
    this.userPoolsAuthClient.getClient()[this.modelName + 'sList']().subscribe(
      (data) => {
        this.dismissLoader();
        this.list = data.items;
      },
      (err) => {
        this.dismissLoader();
        this.presentToast('Error Loading Items');
      }
    );
  };

  createItemWithAuth(orderItem: Order):void {
    this.exitOrderCreate();
    this.list = [ ...this.list, orderItem ];
    this.userPoolsAuthClient.getClient()[this.modelName + 'Create'](orderItem).subscribe(
      (data) => {        
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
          this.list = [ ...this.list ].filter(v => v.orderId !== this.itemIdMarkedForDelete);
          this.dismissLoader();
          this.itemIdMarkedForDelete = null;
          this.presentToast('Order Successfully Deleted');
        },
        (err) => {
          this.dismissLoader();
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
          },
          (err) => {
            this.dismissLoader();
            this.presentToast('Error Getting Order');
          }
      );
  }

  editItemWithAuth(item: any, newValues: any):void {
    this.itemIdMarkedForEdit = item.orderId;
    this.userPoolsAuthClient.getClient()[this.modelName + 'sUpdate'](this.itemIdMarkedForEdit, newValues.value)
      .subscribe(
          (data) => {
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
              this.itemIdMarkedForEdit = null;
              this.presentToast('Unable to Edit Item');
          }
      );
  }

  addItemToStagedOrder(orderItem) {
    this.defaultOrder = { 
      ...this.defaultOrder, 
      orderItems: [ ...this.defaultOrder.orderItems, orderItem ] 
    }
  }

  removeItemFromStagedOrder(itemToRemove) {
    this.defaultOrder = { 
      ...this.defaultOrder, 
      orderItems: [ ...this.defaultOrder.orderItems ].filter(v => v !== itemToRemove)
    }
  }



  startItemEdit(order: Order) {
    this.orderIdMarkedForEdit = order.orderId;
    this.orderEdit = this.createNewOrderForm(order);
  }

  exitItemEditMode() {
    this.orderIdMarkedForEdit = null;
  }

  startOrderCreate() {
    this.orderInCreation = true;
  }

  exitOrderCreate() {
    this.orderInCreation = false;
  }

  _getDefaultOrder(user) {
    return {
      userId: user.userId,
      orderItems: [ _getDefaultOrderItem(user) ],
      transaction: _getDefaultTransaction(user)
    }
  }

  loadJeanResources() {
    this.buttonList = this.fetchButtons();
    this.threadList = this.fetchThreads();
    this.fabricList = this.fetchFabrics();
  }


  fetchButtons() {
    this.userPoolsAuthClient.getClient().buttonsList().subscribe(
      (data) => {
        return data.items;
      },
      (err) => {
        this.presentToast('Error Loading Buttons');
      }
    );
  }

  fetchFabrics(): void {
    this.userPoolsAuthClient.getClient().fabricsList().subscribe(
      (data) => {
        return data.items;
      },
      (err) => {
        this.presentToast('Error Loading Fabrics');
      }
    );
  }

  fetchThreads() {
    this.userPoolsAuthClient.getClient().threadsList().subscribe(
      (data) => {
        return data.items;
      },
      (err) => {
        this.presentToast('Error Loading Threads');
      }
    );
  }

  loadOrders() {
    this.userPoolsAuthClient.getClient().ordersList().subscribe(
      (data) => {
        this.orderList = data.items;
      },
      (err) => {
        this.presentToast('Error Loading Orders');
      }
    );
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
