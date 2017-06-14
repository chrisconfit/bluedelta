goog.provide('API.Client.Order');

/**
 * @record
 */
API.Client.Order = function() {}

/**
 * @type {!string}
 * @export
 */
API.Client.Order.prototype.orderId;

/**
 * @type {!string}
 * @export
 */
API.Client.Order.prototype.userId;

/**
 * @type {!Array<!API.Client.OrderItem>}
 * @export
 */
API.Client.Order.prototype.orderItems;

/**
 * @type {!API.Client.Transaction}
 * @export
 */
API.Client.Order.prototype.transaction;

