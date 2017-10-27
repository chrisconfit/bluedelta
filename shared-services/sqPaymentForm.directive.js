
(function() {

    angular
        .module('sqPaymentForm', [])
        .directive('sqPaymentForm', sqPaymentForm);

    sqPaymentForm.$inject = [];

    function sqPaymentForm() {

        return {
            restrict: 'EA',
            template: '<div class="clearfix"><label>Card Number</label>\n' +
            '    <div id="sq-card-number"></div>\n' +
            '    <small style="display:block; margin-bottom:10px;" ng-show="errors.cardNumber" class="text-danger">{{errors.cardNumber}}</small>\n' +
            '    <label>CVV</label>\n' +
            '    <div id="sq-cvv"></div>\n' +
            '    <small style="display:block; margin-bottom:10px;" ng-show="errors.cvv" class="text-danger">{{errors.cvv}}</small>\n' +
            '    <label>Expiration Date</label>\n' +
            '    <div id="sq-expiration-date"></div>\n' +
            '    <small style="display:block; margin-bottom:10px;" ng-show="errors.expirationDate" class="text-danger">{{errors.expirationDate}}</small>\n' +
            '    <label>Postal Code</label>\n' +
            '    <div id="sq-postal-code"></div>\n' +
            '    <small style="display:block; margin-bottom:10px;" ng-show="errors.postalCode" class="text-danger">{{errors.postalCode}}</small>\n' +
            '    <small style="display:block; margin-bottom:10px;" ng-show="errors.request" class="text-danger">{{errors.request}}</small>\n' +
            '      <button ng-if="!externalControl" class="btn btn-flat btn-primary pull-right" ' +
            '       type="submit" ng-click="requestCardNonce()">Submit</button>\n' +
            '    </div>',
            replace:true,
            scope : {
                'nonceReceivedCallback' : '=',
                'externalControl' : '=?',
            },
            link:function($scope){

              var sandboxId ="sandbox-sq0idp-Ix0BKq70y9xTbYuMuBPZkQ";
              //var applicationId = 'sq0idp-Ix0BKq70y9xTbYuMuBPZkQ'; // <-- Add your application's ID here
              var applicationId = sandboxId; //Comment out to go live
              var locationId = '9PZNFDJTA6SQ4';    // <-- For Apple Pay, set your location ID here




              $scope.requestCardNonce = function() {
                  $scope.errors ={};
                  $scope.paymentForm.requestCardNonce();
                }

                if ($scope.externalControl) {
                  $scope.externalControl = $scope.requestCardNonce;
                }


                // Credit card payments are always supported, but the Web Apple Pay
                // button should only display if Apple Pay is supported for this
                // domain. Apple Pay support is determined by the SqPaymentForm library
                // when the page loads. You do not need to modify this function.
                $scope.methodsSupported = function (methods) {
                    if (methods.applePay === true) {
                        // Show apple pay button
                        var element = document.getElementById('sq-apple-pay');
                        element.style.display = 'inline-block';
                    }
                };
              // createPaymentRequest is triggered when the Apple Pay button is
                // clicked. The payment request object is used by digital wallets
                // (like Apple Pay) to create their equivalent of a credit card nonce.
                // NOTE: The payment request below is provided as guidance. You should
                // add code to create the object programmatically.
                $scope.createPaymentRequest = function () {
                  return {
                    requestShippingAddress: true,
                    currencyCode: "USD",
                    countryCode: "US",
                    total: {
                      label: "{{ MERCHANT NAME }}",
                      amount: "{{TOTAL AMOUNT}}",
                      pending: false,
                    },
                    lineItems: [
                      {
                        label: "Subtotal",
                        amount: "{{SUBTOTAL AMOUNT}}",
                        pending: false,
                      },
                      {
                        label: "Shipping",
                        amount: "{{SHIPPING AMOUNT}}",
                        pending: true,
                      },
                      {
                        label: "Tax",
                        amount: "{{TAX AMOUNT}}",
                        pending: false,
                      }
                    ]
                  };
                };


              // Used for credit card payments. Called when the SqPaymentForm
                // completes a request to generate a card nonce, even if the request
                // failed because of an error.
                $scope.cardNonceResponseReceived = function(errors, nonce, cardData) {
                  if (errors) {
                    errors.forEach(function(error) {
                      $scope.errors[error.field] = error.message;
                    });
                    $scope.$apply();
                    return;
                  }

                  //If no errors.. proceed with callback chain
                  $scope.nonceReceivedCallback(nonce, function(err){
                    $scope.errors.request=err.message;
                  });

                };

                // Fill in this callback to alert buyers when their browser is not supported.
                $scope.unsupportedBrowserDetected = function() {
                  console.log("unsupported browser");
                };

                // Fill in these cases to respond to various events that can occur while a
                // buyer is using the payment form.
                $scope.inputEventReceived = function(inputEvent) {
                    switch (inputEvent.eventType) {
                        case 'focusClassAdded':
                            // Handle as desired
                            break;
                        case 'focusClassRemoved':
                            // Handle as desired
                            break;
                        case 'errorClassAdded':
                            // Handle as desired
                            break;
                        case 'errorClassRemoved':
                            // Handle as desired
                            break;
                        case 'cardBrandChanged':
                            // Handle as desired
                            break;
                        case 'postalCodeChanged':
                            // Handle as desired
                            break;
                    }
                };

                $scope.paymentFormLoaded = function() {
                    // Fill in this callback to perform actions after the payment form is
                    // done loading (such as setting the postal code field programmatically).
                    // paymentForm.setPostalCode('94103');
                }

                // Create and initialize a payment form object
                $scope.paymentForm = new SqPaymentForm({
                    applicationId: applicationId,
                    locationId: locationId,
                    inputClass: "sq-input",
                    inputStyles: [
                      {
                        backgroundColor: '#FFFFFF',
                        padding: '6px 12px',
                        fontSize:'14px',
                        lineHeight:'18px'
                      }
                    ],
                    // Used for credit card payments
                    cardNumber: {
                        elementId: 'sq-card-number',
                        placeholder: '•••• •••• •••• ••••'
                    },
                    cvv: {
                        elementId: 'sq-cvv',
                        placeholder: 'CVV'
                    },
                    expirationDate: {
                        elementId: 'sq-expiration-date',
                        placeholder: 'MM/YY'
                    },
                    postalCode: {
                        elementId: 'sq-postal-code'
                    },
                    // Used for Web Apple Pay payments
                    applePay: {
                        elementId: 'sq-apple-pay'
                    },
                    // Payment form callback functions
                    callbacks: {
                        methodsSupported: $scope.methodsSupported,
                        cardNonceResponseReceived: $scope.cardNonceResponseReceived,
                        unsupportedBrowserDetected: $scope.unsupportedBrowserDetected,
                        inputEventReceived: $scope.inputEventReceived,
                        paymentFormLoaded: $scope.paymentFormLoaded,
                        createPaymentRequest: $scope.createPaymentRequest
                    }
                });

                $scope.$evalAsync(function() {
                    $scope.paymentForm.build();
                } );

            }
        }

    }

})();