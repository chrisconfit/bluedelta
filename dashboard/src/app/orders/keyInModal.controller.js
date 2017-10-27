'use strict';

angular.module('inspinia')
.controller('KeyInController', ['$scope', '$uibModalInstance', 'chargeAmount', 'orderUser', 'api',
  function ($scope, $uibModalInstance, chargeAmount, orderUser, api) {

    $scope.cardForm = {
      chargeAmount:chargeAmount,
      editingAmount:false,
      addCard:false,
      chargeExisting:false,
      saveCard:true,
      fire:function(){
        return false;
      }
    };

    if(orderUser.square_id){
      api.call('usersGetUserCreditCards', orderUser.id, function(cards){
        $scope.cards=cards;
        $scope.cardsSearched = true;
      });
    }else{
      $scope.cardForm.addCard = true;
      $scope.cardsSearched = true;
    }

    function handleCCErr(err){
      console.log("handleCCErr...");
      console.log(err);
    }

    function chargeCard(cardData, callback){
      api.call('ordersCharge', cardData, function (result) {
        console.log(result);
      }, handleCCErr);
    }

    $scope.cardChosen = function(ccCode, handleCCErr) {

      //TODO:make real charge
      var chargeData = {
        "amount_money": 1,
        "userId": orderUser.id,
        "orderId": 370
      };


      //Adding new CC..
      if ($scope.cardForm.adding) {

        //Saving a card first
        if ($scope.cardForm.saveCard) {
          api.call('usersCreateCreditCard', {userId: orderUser.id, nonce: ccCode},
              function (result) {
                chargeData.customer_card_id = result.customer_card_id;//Charge with newly created ccid...
                chargeCard(chargeData);
              }, handleCCErr
          );
        }

        //Simple Charge
        else {
          //Charge with nonce...
          chargeData.nonce = ccCode;
          chargeCard(chargeData);
        }
      }


      //Charging Card on file
      else {
        chargeData.customer_card_id = ccCode;
        api.call('ordersCharge', chargeData, function (result) {
          console.log(result);
        }, handleCCErr);
      }
    };




  }]);