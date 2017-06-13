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
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.BlueDeltaApi);
  }
}(this, function(expect, BlueDeltaApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new BlueDeltaApi.Address();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('Address', function() {
    it('should create an instance of Address', function() {
      // uncomment below and update the code to test Address
      //var instane = new BlueDeltaApi.Address();
      //expect(instance).to.be.a(BlueDeltaApi.Address);
    });

    it('should have the property addressLine1 (base name: "address_line_1")', function() {
      // uncomment below and update the code to test the property addressLine1
      //var instane = new BlueDeltaApi.Address();
      //expect(instance).to.be();
    });

    it('should have the property addressLine2 (base name: "address_line_2")', function() {
      // uncomment below and update the code to test the property addressLine2
      //var instane = new BlueDeltaApi.Address();
      //expect(instance).to.be();
    });

    it('should have the property city (base name: "city")', function() {
      // uncomment below and update the code to test the property city
      //var instane = new BlueDeltaApi.Address();
      //expect(instance).to.be();
    });

    it('should have the property state (base name: "state")', function() {
      // uncomment below and update the code to test the property state
      //var instane = new BlueDeltaApi.Address();
      //expect(instance).to.be();
    });

    it('should have the property zip (base name: "zip")', function() {
      // uncomment below and update the code to test the property zip
      //var instane = new BlueDeltaApi.Address();
      //expect(instance).to.be();
    });

  });

}));