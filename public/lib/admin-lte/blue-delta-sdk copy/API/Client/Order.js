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
 * @type {!API.Client.Address}
 * @export
 */
API.Client.Order.prototype.shippingAddress;

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

/**
 * @type {!Array<!API.Client.Comment>}
 * @export
 */
API.Client.Order.prototype.timeline;

