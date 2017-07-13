import { Injectable } from '@angular/core';
import { ButtonsProvider } from "../buttons/buttons";
import { ThreadsProvider } from "../threads/threads";
import { FabricsProvider } from "../fabrics/fabrics";
import { UserPoolsAuthorizerClient } from "../../services/blue-delta-api.service";
import { FormBuilder, Validators } from "@angular/forms";



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
  jeanCreateForm;
  jeanInCreation: boolean = false;


  constructor(
    public buttonService: ButtonsProvider,
    public fabricService: FabricsProvider,
    public threadService: ThreadsProvider,
    public userPoolsAuthClient: UserPoolsAuthorizerClient,
    public formBuilder: FormBuilder
  ) {
    this.jeanCreateForm = this.createNewJeanForm('user');
    this.returnValidFunctionSig('button', 'list');
  }

  loadEmbeddedItems(buttonList, fabricList, threadList) {
    this.buttonList = buttonList;
    this.fabricList = fabricList;
    this.threadList = threadList;
  };

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
    console.log(newVal);
    let newMeasurement  = { ...this.defaultJean.measurement, waist: newVal };
    this.defaultJean    = { ...this.defaultJean, measurement: newMeasurement };
  }

  updateDefaultLeg(newVal: number) {
    let newMeasurement  = { ...this.defaultJean.measurement, leg: newVal };
    this.defaultJean    = { ...this.defaultJean, measurement: newMeasurement };
  }

  updateDefaultButton(selectedButtonId) {
    this.defaultJean = { ...this.defaultJean, button: [ ...this.buttonList ].filter(v => v.buttonId === selectedButtonId )[0] };
    console.log('this.defaultJean', this.defaultJean);
  }

  updateDefaultFabric(selectedFabricId) {
    this.defaultJean = { ...this.defaultJean, fabric: [ ...this.fabricList ].filter(v => v.fabricId === selectedFabricId )[0] };
    console.log('this.defaultJean', this.defaultJean);
  }

  updateDefaultThread(selectedThreadId) {
    this.defaultJean = { ...this.defaultJean, thread: [ ...this.threadList ].filter(v => v.threadId === selectedThreadId )[0] };
    console.log('this.defaultJean', this.defaultJean);
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

  getHttpFunction(validSig) {
    return this.userPoolsAuthClient.getClient()[validSig];
  };

  createNewJeanForm(user) {
    let newJean = this._getDefaultJean(user);
    return this.formBuilder.group({
      thread:       [ newJean.thread,             Validators.required ],
      fabric:       [ newJean.fabric,             Validators.required ],
      button:       [ newJean.button,             Validators.required ],
      waist:        [ newJean.measurement.waist,  Validators.required ],
      leg:          [ newJean.measurement.leg,    Validators.required ]
    });
  }

  startJeanCreate() {
    this.jeanInCreation = true;
  }

  exitJeanCreate() {
    this.jeanInCreation = false;
  }

  logShit(shitToLog) {
    console.log('shitToLog', shitToLog);
  }


}
