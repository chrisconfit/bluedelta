import { Injectable } from '@angular/core';




@Injectable()
export class OrdersProvider {


  constructor(  
    
  ) {
    
  }

  
}

export interface Transaction {
    transactionId?: string;
    status?: string;
}

export interface Order {
    orderId?: string;
    userId: string;
    orderItems?: Array<models.OrderItem>;
    transaction?: models.Transaction;
}

export interface OrderItem {
    jean: models.Jean;
    status?: string;
    tracking?: string;
}

export interface Jean {
    measurement?: models.Measurement;
    thread?: models.Thread;
    fabric?: models.Fabric;
    button?: models.Button;
}

export interface Measurement {
    measurementId: string;
    userId?: string;
    waist?: number;
    leg?: number;
}

export interface Fabric {
    fabricId?: string;
    name?: string;
    weight?: number;
    description?: string;
    materials?: string;
    supplier?: string;
}

export interface Thread {
    threadId?: string;
    name?: string;
    thumb?: string;
    layer?: string;
}

export interface Button {
    buttonId?: string;
    name?: string;
    thumb?: string;
    layer?: string;
}

export interface User {
    identityId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    referral?: string;
    vendorsUsed?: string;
    phoneNumber?: string;
    addresses?: Array<models.Address>;
    jeans?: Array<models.Jean>;
}

export interface Address {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    primary?: boolean;
}