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

export interface Measurement {
    measurementId?: string;

    userId?: string;

    waist?: number;

    seat-down?: number;

    seat-right?: number;

    rise?: number;

    full-rise?: number;

    thigh-upper-down?: number;

    thigh-upper-right?: number;

    thigh-middle-down?: number;

    thigh-middle-right?: number;

    thigh-lower-down?: number;

    thigh-lower-right?: number;

    outseam?: number;

    knee-up?: number;

    knee-right?: number;

    calf-up?: number;

    calf-right?: number;

    leg-opening?: number;

    desired-fit?: number;

    leg?: number;

}
