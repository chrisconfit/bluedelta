/**
 * BlueDelta-API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface Order {
    orderId?: string;

    userId: string;

    shippingAddress?: models.Address;

    orderItems: Array<models.OrderItem>;

    transaction?: models.Transaction;

    timeline?: Array<models.Comment>;

}
