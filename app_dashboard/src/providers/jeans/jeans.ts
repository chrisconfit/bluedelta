import { Injectable } from '@angular/core';
import { ButtonsProvider } from "../buttons/buttons";
import { ThreadsProvider } from "../threads/threads";
import { FabricsProvider } from "../fabrics/fabrics";
import { UserPoolsAuthorizerClient } from "../../services/blue-delta-api.service";


// TODO: write the buttons, fabrics, and threads provider methods in this provider, factor for fragility flexibility

@Injectable()
export class JeansProvider {
  buttonList = [];
  fabricList = [];
  threadList = [];
  defaultJean = {
    button: {},
    fabric: {},
    thread: {},
    measurement: {}
  };

  constructor(
    public buttonService: ButtonsProvider,
    public fabricService: FabricsProvider,
    public threadService: ThreadsProvider,
    public userPoolsAuthClient: UserPoolsAuthorizerClient
  ) {
    console.log("IN THE CONSTRUCTOR FOR JEANS PROVIDER!!");
    this.returnValidFunctionSig('button', 'list');
  }

  loadAllJeanResources() {
    this.buttonList = this.loadButtons(); 
    this.fabricList = this.loadFabrics();
    this.threadList = this.loadThreads();
  }

  loadButtons() {
    if (this.buttonService.list.length > 0) {
      return this.buttonService.list;
    } else {
      return this.buttonService.loadItemsWithAuth();
    }
  }

  loadFabrics() {
    if (this.fabricService.list.length > 0) {
      return this.fabricService.list;
    } else {
      return this.fabricService.loadItemsWithAuth();
    }
  }

  loadThreads() {
    if (this.threadService.list.length > 0) {
      return this.threadService.list;
    } else {
      return this.threadService.loadItemsWithAuth();
    }
  }



  _getDefaultJean(user) {
    return {
      button: this._getDefaultButton(user),
      fabric: this._getDefaultFabric(user),
      thread: this._getDefaultThread(user),
      measurement: this._getDefaultMeasurement(user)
    };
  }

  _getDefaultMeasurement(user) {
    return {
      userId: user.userId,
      waist: this._getDefaultWaist(user),
      leg: this._getDefaultLeg(user)
    };
  }

  _getDefaultButton(user) {
    // TODO: query existing user to return most common button or default
    return 'Brass Button'
  }

  _getDefaultFabric(user) {
    // TODO: query existing user to return most common fabric or default
    return 'Denim';
  }

  _getDefaultThread(user) {
    // TODO: query existing user to return most common fabric or default
    return 'Brown Thread';
  }

  _getDefaultWaist(user) {
    // TODO: query existing user to return most common waist, for now, return 32
    return 32;
  }

  _getDefaultLeg(user) {
    // TODO: query existing user to return most common measurement, for now, return 32
    return 32;
  }

  updateDefaultJean(newJean) {
    this.defaultJean = { ...this.defaultJean, button: newJean.button, fabric: newJean.fabric, thread: newJean.thread, measurement: newJean.measurement };
  }

  updateDefaultWaist(newVal: number) {
    let newMeasurement  = { ...this.defaultJean.measurement, waist: newVal };
    this.defaultJean    = { ...this.defaultJean, measurement: newMeasurement };
  }

  updateDefaultLeg(newVal: number) {
    let newMeasurement  = { ...this.defaultJean.measurement, leg: newVal };
    this.defaultJean    = { ...this.defaultJean, measurement: newMeasurement };
  }

  updateDefaultButton(selectedButton) {
    this.defaultJean = { ...this.defaultJean, button: selectedButton };
  }

  updateDefaultFabric(selectedFabric) {
    this.defaultJean = { ...this.defaultJean, fabric: selectedFabric };
  }

  updateDefaultThread(selectedThread) {
    this.defaultJean = { ...this.defaultJean, thread: selectedThread };
  }

  returnValidFunctionSig(resourceName, command) {
    let firstLetter = command.split('')[0];
    let capFirstLetter = firstLetter.toUpperCase();
    command = command.replace(firstLetter, capFirstLetter);
    let validFuncs = 'buttonsCreate buttonsDelete buttonsGet buttonsList buttonsUpdate '
                   + 'fabricsCreate fabricsDelete fabricsGet fabricsList fabricsUpdate '
                   + 'threadsCreate threadsDelete threadsGet threadsList threadsUpdate '
                   + 'usersCreate usersDelete usersGet usersList usersUpdate '
                   + 'orderCreate ordersDelete ordersGet ordersList ordersUpdate ordersListByUser';
    return validFuncs.split(' ').filter(v => v.includes(resourceName)).filter(v => v.includes(command)).join();
  }

  getHttpFunction(resourceName, command) {
    return this.userPoolsAuthClient.getClient()[resourceName + command];
  };

}
