'use strict';

angular.module('inspinia')
.controller('KeyInController', ['$scope', '$uibModalInstance', 'orderData', 'api', 'confirmation',
  function ($scope, $uibModalInstance, orderData, api, confirmation) {

    var chargeAmount = orderData.order ? orderData.order.price : null;
    $scope.isFM = !orderData.order;
    $scope.orderType = orderData.order ? "order" : "fitmatch";
    $scope.cardForm = {
      chargeAmount:chargeAmount,
      editingAmount:false,
      addCard:false,
      selectedCard:orderData.selectedCard ? orderData.selectedCard : false,
      saveCard:true,
      runCard:true,
      fire:function(){
        return false;
      }
    };

    $scope.closeForm = function(){
      $uibModalInstance.close();
    };

    //If user comes through with cards, we'll use those...
    if (orderData.user.cards) $scope.cards = orderData.user.cards;
    else {
      //Otherwise... find User's saved CC
      if (orderData.user.square_id) {
        api.call('usersGetUserCreditCards', orderData.user.id, function (cards) {
          $scope.cards = cards;
          $scope.cardsSearched = true;
        });
      } else {
        $scope.cardForm.addCard = true;
        $scope.cardsSearched = true;
      }
    }




    //Responses, Utility, etc...
    function handleCCErr(err){
      console.log("handleCCErr...");
    }

    function successfulTransaction(details){
      console.log(details);
      orderData.order.payment_status_id = details.order.payment_status_id;
      var paymentProcessedBox = {
        title: "Payment has been processed",
        text: "The customer's payment has been posted.",
        type: "success"
      }
      $uibModalInstance.close();
      confirmation(paymentProcessedBox);
    }

    function chargeCard(cardData, callback){
      $scope.cardForm.chargeCard = true;
      if(cardData.customer_card_id) orderData.credit_card_id = cardData.customer_card_id;
      api.call('ordersCharge', cardData, successfulTransaction, handleCCErr);
    }

    $scope.saveCCToUser = function(){
      $scope.cardForm.saveCard = true;
      $scope.cardForm.chargeCard = false;
      $scope.cardForm.fire();
    };

    $scope.saveCardToOrder = function(ccCode){

      //Choose primary card data and pass to main controller
      for (var i=0; i<$scope.cards.length; i++){
        if ($scope.cards[i].id === ccCode){
          orderData[$scope.orderType].primary_card = $scope.cards[i];
          break;
        }
      }
      orderData[$scope.orderType].credit_card_id = ccCode;
      $uibModalInstance.close();
      confirmation({
        title: "Card has been chosen!",
        text: "This card has been chosen as the primary source of payment for this order.",
        type: "success"
      });
    };


    $scope.cardChosen = function(ccCode) {

      if (!$scope.cardForm.chargeCard && !$scope.cardForm.saveCard){
        console.log("No action chosen");
        return false;
      }


      var chargeData = {
        "amount_money": $scope.cardForm.chargeAmount,
        "userId": orderData.user.id,
      };

      if(orderData.order) chargeData.orderID=orderData.order.id;

      //Adding new CC..
      if ($scope.cardForm.addCard) {

        //Saving a card first
        if ($scope.cardForm.saveCard) {

          api.call('usersCreateCreditCard', {userId: orderData.user.id, nonce: ccCode},
            function (result) {
              chargeData.customer_id = result.customer_id;
              chargeData.customer_card_id = result.card_id;//Charge with newly created ccid...
              chargeData.customer_card_id = 'fake-customer-card-id-ok';//Sandbox...
              //TODO: REMOVE SANDBOX....
              if ($scope.cardForm.chargeCard) chargeCard(chargeData);
            }, handleCCErr
          );
        }

        //Simple Charge
        else {
          //Charge with nonce...
          chargeData.card_nonce = ccCode;
          chargeData.card_nonce = 'fake-card-nonce-ok';//Sandbox...
          chargeCard(chargeData);
        }
      }

      //Charging Card on file
      else {
        chargeData.customer_card_id = ccCode;
        chargeData.customer_id  = orderData.user.square_id;
        chargeData.customer_card_id = 'fake-customer-card-id-ok';//Sandbox...
        api.call('ordersCharge', chargeData, successfulTransaction, handleCCErr);
      }

    };//$scope.cardChosen()...




  }]);