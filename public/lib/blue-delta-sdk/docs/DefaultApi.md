# BlueDeltaApi.DefaultApi

All URIs are relative to *https://kd6f1omjzc.execute-api.us-east-1.amazonaws.com/development*

Method | HTTP request | Description
------------- | ------------- | -------------
[**buttonsButtonIdOptions**](DefaultApi.md#buttonsButtonIdOptions) | **OPTIONS** /buttons/{buttonId} | 
[**buttonsCreate**](DefaultApi.md#buttonsCreate) | **POST** /buttons | 
[**buttonsDelete**](DefaultApi.md#buttonsDelete) | **DELETE** /buttons/{buttonId} | 
[**buttonsGet**](DefaultApi.md#buttonsGet) | **GET** /buttons/{buttonId} | 
[**buttonsList**](DefaultApi.md#buttonsList) | **GET** /buttons | 
[**buttonsOptions**](DefaultApi.md#buttonsOptions) | **OPTIONS** /buttons | 
[**buttonsUpdate**](DefaultApi.md#buttonsUpdate) | **POST** /buttons/{buttonId} | 
[**fabricsCreate**](DefaultApi.md#fabricsCreate) | **POST** /fabrics | 
[**fabricsDelete**](DefaultApi.md#fabricsDelete) | **DELETE** /fabrics/{fabricId} | 
[**fabricsFabricIdOptions**](DefaultApi.md#fabricsFabricIdOptions) | **OPTIONS** /fabrics/{fabricId} | 
[**fabricsGet**](DefaultApi.md#fabricsGet) | **GET** /fabrics/{fabricId} | 
[**fabricsList**](DefaultApi.md#fabricsList) | **GET** /fabrics | 
[**fabricsOptions**](DefaultApi.md#fabricsOptions) | **OPTIONS** /fabrics | 
[**fabricsUpdate**](DefaultApi.md#fabricsUpdate) | **POST** /fabrics/{fabricId} | 
[**orderCreate**](DefaultApi.md#orderCreate) | **POST** /orders | 
[**ordersDelete**](DefaultApi.md#ordersDelete) | **DELETE** /orders/{orderId} | 
[**ordersGet**](DefaultApi.md#ordersGet) | **GET** /orders/{orderId} | 
[**ordersList**](DefaultApi.md#ordersList) | **GET** /orders | 
[**ordersListByUser**](DefaultApi.md#ordersListByUser) | **GET** /users/{userId}/orders | 
[**ordersOptions**](DefaultApi.md#ordersOptions) | **OPTIONS** /orders | 
[**ordersOrderIdOptions**](DefaultApi.md#ordersOrderIdOptions) | **OPTIONS** /orders/{orderId} | 
[**ordersUpdate**](DefaultApi.md#ordersUpdate) | **POST** /orders/{orderId} | 
[**pingOptions**](DefaultApi.md#pingOptions) | **OPTIONS** /ping | 
[**pingPingOperation**](DefaultApi.md#pingPingOperation) | **GET** /ping | 
[**threadsCreate**](DefaultApi.md#threadsCreate) | **POST** /threads | 
[**threadsDelete**](DefaultApi.md#threadsDelete) | **DELETE** /threads/{threadId} | 
[**threadsGet**](DefaultApi.md#threadsGet) | **GET** /threads/{threadId} | 
[**threadsList**](DefaultApi.md#threadsList) | **GET** /threads | 
[**threadsOptions**](DefaultApi.md#threadsOptions) | **OPTIONS** /threads | 
[**threadsThreadIdOptions**](DefaultApi.md#threadsThreadIdOptions) | **OPTIONS** /threads/{threadId} | 
[**threadsUpdate**](DefaultApi.md#threadsUpdate) | **POST** /threads/{threadId} | 
[**usersCreate**](DefaultApi.md#usersCreate) | **POST** /users | 
[**usersDelete**](DefaultApi.md#usersDelete) | **DELETE** /users/{userId} | 
[**usersGet**](DefaultApi.md#usersGet) | **GET** /users/{userId} | 
[**usersList**](DefaultApi.md#usersList) | **GET** /users | 
[**usersOptions**](DefaultApi.md#usersOptions) | **OPTIONS** /users | 
[**usersUpdate**](DefaultApi.md#usersUpdate) | **POST** /users/{userId} | 
[**usersUserIdOptions**](DefaultApi.md#usersUserIdOptions) | **OPTIONS** /users/{userId} | 
[**usersUserIdOrdersOptions**](DefaultApi.md#usersUserIdOrdersOptions) | **OPTIONS** /users/{userId}/orders | 


<a name="buttonsButtonIdOptions"></a>
# **buttonsButtonIdOptions**
> buttonsButtonIdOptions(buttonId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var buttonId = "buttonId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.buttonsButtonIdOptions(buttonId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **buttonId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="buttonsCreate"></a>
# **buttonsCreate**
> Button buttonsCreate(button)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: blue-delta-userPool-authorizer
var blue-delta-userPool-authorizer = defaultClient.authentications['blue-delta-userPool-authorizer'];
blue-delta-userPool-authorizer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//blue-delta-userPool-authorizer.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var button = new BlueDeltaApi.Button(); // Button | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.buttonsCreate(button, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **button** | [**Button**](Button.md)|  | 

### Return type

[**Button**](Button.md)

### Authorization

[blue-delta-userPool-authorizer](../README.md#blue-delta-userPool-authorizer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="buttonsDelete"></a>
# **buttonsDelete**
> buttonsDelete(buttonId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: blue-delta-userPool-authorizer
var blue-delta-userPool-authorizer = defaultClient.authentications['blue-delta-userPool-authorizer'];
blue-delta-userPool-authorizer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//blue-delta-userPool-authorizer.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var buttonId = "buttonId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.buttonsDelete(buttonId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **buttonId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[blue-delta-userPool-authorizer](../README.md#blue-delta-userPool-authorizer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="buttonsGet"></a>
# **buttonsGet**
> Button buttonsGet(buttonId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: blue-delta-userPool-authorizer
var blue-delta-userPool-authorizer = defaultClient.authentications['blue-delta-userPool-authorizer'];
blue-delta-userPool-authorizer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//blue-delta-userPool-authorizer.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var buttonId = "buttonId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.buttonsGet(buttonId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **buttonId** | **String**|  | 

### Return type

[**Button**](Button.md)

### Authorization

[blue-delta-userPool-authorizer](../README.md#blue-delta-userPool-authorizer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="buttonsList"></a>
# **buttonsList**
> ButtonsListResponse buttonsList()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: blue-delta-userPool-authorizer
var blue-delta-userPool-authorizer = defaultClient.authentications['blue-delta-userPool-authorizer'];
blue-delta-userPool-authorizer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//blue-delta-userPool-authorizer.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.buttonsList(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ButtonsListResponse**](ButtonsListResponse.md)

### Authorization

[blue-delta-userPool-authorizer](../README.md#blue-delta-userPool-authorizer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="buttonsOptions"></a>
# **buttonsOptions**
> buttonsOptions()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.buttonsOptions(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="buttonsUpdate"></a>
# **buttonsUpdate**
> Button buttonsUpdate(buttonId, button)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: blue-delta-userPool-authorizer
var blue-delta-userPool-authorizer = defaultClient.authentications['blue-delta-userPool-authorizer'];
blue-delta-userPool-authorizer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//blue-delta-userPool-authorizer.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var buttonId = "buttonId_example"; // String | 

var button = new BlueDeltaApi.Button(); // Button | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.buttonsUpdate(buttonId, button, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **buttonId** | **String**|  | 
 **button** | [**Button**](Button.md)|  | 

### Return type

[**Button**](Button.md)

### Authorization

[blue-delta-userPool-authorizer](../README.md#blue-delta-userPool-authorizer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="fabricsCreate"></a>
# **fabricsCreate**
> Fabric fabricsCreate(fabric)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var fabric = new BlueDeltaApi.Fabric(); // Fabric | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.fabricsCreate(fabric, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fabric** | [**Fabric**](Fabric.md)|  | 

### Return type

[**Fabric**](Fabric.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="fabricsDelete"></a>
# **fabricsDelete**
> fabricsDelete(fabricId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var fabricId = "fabricId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.fabricsDelete(fabricId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fabricId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="fabricsFabricIdOptions"></a>
# **fabricsFabricIdOptions**
> fabricsFabricIdOptions(fabricId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var fabricId = "fabricId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.fabricsFabricIdOptions(fabricId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fabricId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="fabricsGet"></a>
# **fabricsGet**
> Fabric fabricsGet(fabricId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var fabricId = "fabricId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.fabricsGet(fabricId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fabricId** | **String**|  | 

### Return type

[**Fabric**](Fabric.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="fabricsList"></a>
# **fabricsList**
> FabricsListResponse fabricsList()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.fabricsList(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**FabricsListResponse**](FabricsListResponse.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="fabricsOptions"></a>
# **fabricsOptions**
> fabricsOptions()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.fabricsOptions(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="fabricsUpdate"></a>
# **fabricsUpdate**
> Fabric fabricsUpdate(fabricId, fabric)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var fabricId = "fabricId_example"; // String | 

var fabric = new BlueDeltaApi.Fabric(); // Fabric | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.fabricsUpdate(fabricId, fabric, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fabricId** | **String**|  | 
 **fabric** | [**Fabric**](Fabric.md)|  | 

### Return type

[**Fabric**](Fabric.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="orderCreate"></a>
# **orderCreate**
> Order orderCreate(order)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var order = new BlueDeltaApi.Order(); // Order | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.orderCreate(order, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **order** | [**Order**](Order.md)|  | 

### Return type

[**Order**](Order.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="ordersDelete"></a>
# **ordersDelete**
> ordersDelete(orderId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var orderId = "orderId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.ordersDelete(orderId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **orderId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="ordersGet"></a>
# **ordersGet**
> Order ordersGet(orderId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var orderId = "orderId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.ordersGet(orderId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **orderId** | **String**|  | 

### Return type

[**Order**](Order.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="ordersList"></a>
# **ordersList**
> OrdersListResponse ordersList()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.ordersList(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**OrdersListResponse**](OrdersListResponse.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="ordersListByUser"></a>
# **ordersListByUser**
> OrdersListResponse ordersListByUser(userId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: blue-delta-userPool-authorizer
var blue-delta-userPool-authorizer = defaultClient.authentications['blue-delta-userPool-authorizer'];
blue-delta-userPool-authorizer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//blue-delta-userPool-authorizer.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var userId = "userId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.ordersListByUser(userId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | 

### Return type

[**OrdersListResponse**](OrdersListResponse.md)

### Authorization

[blue-delta-userPool-authorizer](../README.md#blue-delta-userPool-authorizer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="ordersOptions"></a>
# **ordersOptions**
> ordersOptions()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.ordersOptions(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="ordersOrderIdOptions"></a>
# **ordersOrderIdOptions**
> ordersOrderIdOptions(orderId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var orderId = "orderId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.ordersOrderIdOptions(orderId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **orderId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="ordersUpdate"></a>
# **ordersUpdate**
> Order ordersUpdate(orderId, order)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var orderId = "orderId_example"; // String | 

var order = new BlueDeltaApi.Order(); // Order | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.ordersUpdate(orderId, order, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **orderId** | **String**|  | 
 **order** | [**Order**](Order.md)|  | 

### Return type

[**Order**](Order.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="pingOptions"></a>
# **pingOptions**
> pingOptions()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.pingOptions(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="pingPingOperation"></a>
# **pingPingOperation**
> pingPingOperation()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.pingPingOperation(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="threadsCreate"></a>
# **threadsCreate**
> Thread threadsCreate(thread)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var thread = new BlueDeltaApi.Thread(); // Thread | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.threadsCreate(thread, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **thread** | [**Thread**](Thread.md)|  | 

### Return type

[**Thread**](Thread.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="threadsDelete"></a>
# **threadsDelete**
> threadsDelete(threadId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var threadId = "threadId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.threadsDelete(threadId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **threadId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="threadsGet"></a>
# **threadsGet**
> Thread threadsGet(threadId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var threadId = "threadId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.threadsGet(threadId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **threadId** | **String**|  | 

### Return type

[**Thread**](Thread.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="threadsList"></a>
# **threadsList**
> ThreadsListResponse threadsList()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.threadsList(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ThreadsListResponse**](ThreadsListResponse.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="threadsOptions"></a>
# **threadsOptions**
> threadsOptions()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.threadsOptions(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="threadsThreadIdOptions"></a>
# **threadsThreadIdOptions**
> threadsThreadIdOptions(threadId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var threadId = "threadId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.threadsThreadIdOptions(threadId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **threadId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="threadsUpdate"></a>
# **threadsUpdate**
> Thread threadsUpdate(threadId, thread)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var threadId = "threadId_example"; // String | 

var thread = new BlueDeltaApi.Thread(); // Thread | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.threadsUpdate(threadId, thread, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **threadId** | **String**|  | 
 **thread** | [**Thread**](Thread.md)|  | 

### Return type

[**Thread**](Thread.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="usersCreate"></a>
# **usersCreate**
> User usersCreate(user)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var user = new BlueDeltaApi.User(); // User | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.usersCreate(user, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user** | [**User**](User.md)|  | 

### Return type

[**User**](User.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="usersDelete"></a>
# **usersDelete**
> usersDelete(userId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var userId = "userId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.usersDelete(userId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="usersGet"></a>
# **usersGet**
> User usersGet(userId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var userId = "userId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.usersGet(userId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | 

### Return type

[**User**](User.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="usersList"></a>
# **usersList**
> UsersListResponse usersList()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: blue-delta-userPool-authorizer
var blue-delta-userPool-authorizer = defaultClient.authentications['blue-delta-userPool-authorizer'];
blue-delta-userPool-authorizer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//blue-delta-userPool-authorizer.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.usersList(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UsersListResponse**](UsersListResponse.md)

### Authorization

[blue-delta-userPool-authorizer](../README.md#blue-delta-userPool-authorizer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="usersOptions"></a>
# **usersOptions**
> usersOptions()



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.usersOptions(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="usersUpdate"></a>
# **usersUpdate**
> User usersUpdate(userId, user)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');
var defaultClient = BlueDeltaApi.ApiClient.default;

// Configure API key authorization: sigv4
var sigv4 = defaultClient.authentications['sigv4'];
sigv4.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//sigv4.apiKeyPrefix = 'Token';

var apiInstance = new BlueDeltaApi.DefaultApi();

var userId = "userId_example"; // String | 

var user = new BlueDeltaApi.User(); // User | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.usersUpdate(userId, user, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | 
 **user** | [**User**](User.md)|  | 

### Return type

[**User**](User.md)

### Authorization

[sigv4](../README.md#sigv4)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="usersUserIdOptions"></a>
# **usersUserIdOptions**
> usersUserIdOptions(userId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var userId = "userId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.usersUserIdOptions(userId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="usersUserIdOrdersOptions"></a>
# **usersUserIdOrdersOptions**
> usersUserIdOrdersOptions(userId)



### Example
```javascript
var BlueDeltaApi = require('blue_delta_api');

var apiInstance = new BlueDeltaApi.DefaultApi();

var userId = "userId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.usersUserIdOrdersOptions(userId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

