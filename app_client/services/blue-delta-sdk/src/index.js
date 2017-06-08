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

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Button', 'model/ButtonsListResponse', 'model/Fabric', 'model/FabricsListResponse', 'model/Jean', 'model/Measurement', 'model/Order', 'model/OrderItem', 'model/OrdersListResponse', 'model/Thread', 'model/ThreadsListResponse', 'model/Transaction', 'model/User', 'model/UsersListResponse', 'api/DefaultApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/Button'), require('./model/ButtonsListResponse'), require('./model/Fabric'), require('./model/FabricsListResponse'), require('./model/Jean'), require('./model/Measurement'), require('./model/Order'), require('./model/OrderItem'), require('./model/OrdersListResponse'), require('./model/Thread'), require('./model/ThreadsListResponse'), require('./model/Transaction'), require('./model/User'), require('./model/UsersListResponse'), require('./api/DefaultApi'));
  }
}(function(ApiClient, Button, ButtonsListResponse, Fabric, FabricsListResponse, Jean, Measurement, Order, OrderItem, OrdersListResponse, Thread, ThreadsListResponse, Transaction, User, UsersListResponse, DefaultApi) {
  'use strict';

  /**
   * ERROR_UNKNOWN.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var BlueDeltaApi = require('index'); // See note below*.
   * var xxxSvc = new BlueDeltaApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new BlueDeltaApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new BlueDeltaApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new BlueDeltaApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 1.0.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The Button model constructor.
     * @property {module:model/Button}
     */
    Button: Button,
    /**
     * The ButtonsListResponse model constructor.
     * @property {module:model/ButtonsListResponse}
     */
    ButtonsListResponse: ButtonsListResponse,
    /**
     * The Fabric model constructor.
     * @property {module:model/Fabric}
     */
    Fabric: Fabric,
    /**
     * The FabricsListResponse model constructor.
     * @property {module:model/FabricsListResponse}
     */
    FabricsListResponse: FabricsListResponse,
    /**
     * The Jean model constructor.
     * @property {module:model/Jean}
     */
    Jean: Jean,
    /**
     * The Measurement model constructor.
     * @property {module:model/Measurement}
     */
    Measurement: Measurement,
    /**
     * The Order model constructor.
     * @property {module:model/Order}
     */
    Order: Order,
    /**
     * The OrderItem model constructor.
     * @property {module:model/OrderItem}
     */
    OrderItem: OrderItem,
    /**
     * The OrdersListResponse model constructor.
     * @property {module:model/OrdersListResponse}
     */
    OrdersListResponse: OrdersListResponse,
    /**
     * The Thread model constructor.
     * @property {module:model/Thread}
     */
    Thread: Thread,
    /**
     * The ThreadsListResponse model constructor.
     * @property {module:model/ThreadsListResponse}
     */
    ThreadsListResponse: ThreadsListResponse,
    /**
     * The Transaction model constructor.
     * @property {module:model/Transaction}
     */
    Transaction: Transaction,
    /**
     * The User model constructor.
     * @property {module:model/User}
     */
    User: User,
    /**
     * The UsersListResponse model constructor.
     * @property {module:model/UsersListResponse}
     */
    UsersListResponse: UsersListResponse,
    /**
     * The DefaultApi service constructor.
     * @property {module:api/DefaultApi}
     */
    DefaultApi: DefaultApi
  };

  return exports;
}));
