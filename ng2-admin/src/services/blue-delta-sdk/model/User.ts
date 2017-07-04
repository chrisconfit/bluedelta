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

export interface User {
    identityId: string;

    firstName?: string;

    lastName?: string;

    gender?: string;

    vendorsUsed?: string;

    email?: string;

    phoneNumber?: string;

    addresses?: Array<models.Address>;

    jeans?: Array<models.Jean>;

}