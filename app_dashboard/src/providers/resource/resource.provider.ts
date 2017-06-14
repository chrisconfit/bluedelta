import { Injectable } from '@angular/core';
import { GlobalStateService } from "../../services/global-state.service";
import { NoAuthorizationClient, CustomAuthorizerClient, UserPoolsAuthorizerClient } from "../../services/blue-delta-api.service";
import { ButtonActions } from "../../reducers/buttons/buttons.actions";
import { select, NgRedux } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import { IButtonState } from "../../reducers/buttons/buttons.reducer";
import { IAppState } from "../../reducers/index";
import { ButtonModel } from "../../models/button.model";
import { IUsersState } from "../../reducers/users/users.reducer";
import { UsersActions } from "../../reducers/users/users.actions";
import { CognitoUtil } from "../../services/account-management.service";
import { LoadingController, AlertController } from "ionic-angular";
import { Button } from "../../services/blue-delta-sdk/index";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";




@Injectable()
export class ResourceProvider {
  private buttonEdit: FormGroup;
  private loader = null;
  private buttonCreate: FormGroup;


  @select(s => s.buttons) readonly buttons$: Observable<IButtonState>;
  @select(s => s.users) readonly users$: Observable<IUsersState>;

  
  initialized = false;

  constructor(
    public globals: GlobalStateService, 
    private noAuthClient: NoAuthorizationClient, 
    private customAuthClient: CustomAuthorizerClient, 
    private userPoolsAuthClient: UserPoolsAuthorizerClient,
    public buttonActions: ButtonActions,
    public userActions: UsersActions,
    public ngRedux: NgRedux<IAppState>,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {
      this.buttonEdit = this.createNewButtonForm();
      this.buttonCreate = this.createNewButtonForm();
  }

  loadButtonsWithAuth(): void {
    this.buttonActions.fetchListRequest();
    this.userPoolsAuthClient.getClient().buttonsList().subscribe(
      (data) => {
        this.buttonActions.fetchListSuccess(data);
        this.buttonActions.receiveButtonsList(data.items);
        this.buttonActions.fetchListRequestFinish();
        this.dismissLoader();
        this.initialized = true;
      },
      (err) => {
        this.buttonActions.fetchListError(err);
        this.buttonActions.fetchListRequestFinish();
        this.dismissLoader();
        this.initialized = true; 
        this.displayAlert('Error encountered',
          `An error occurred when trying to load the buttons. Please check the console logs for more information.`)
      }
    );
  };

  createButtonWithAuth(button):void {
    button = new ButtonModel(button.name, button.layer, button.thumb);
    this.buttonActions.stageButton(button);
    this.buttonActions.createRequest(button);
    this.userPoolsAuthClient.getClient().buttonsCreate(button).subscribe(
      (data) => {
        this.buttonActions.createSuccess(data);
        this.buttonActions.receiveCreatedButton(data);
        this.buttonActions.createRequestFinish();
        this.dismissLoader();
        this.initialized = true;
      },
      (err) => {
        this.buttonActions.createError(err);
        this.buttonActions.createRequestFinish();
        this.dismissLoader();
        this.initialized = true; 
        this.displayAlert('Error encountered',
          `An error occurred when trying to create Button. Please check the console logs for more information.`)
      }
    );
    this.exitButtonCreate();
  }

  deleteButtonWithAuth(buttonId: string) {
    this.buttonActions.markForDeletion(buttonId);
    this.buttonActions.deleteRequest(buttonId);
    this.userPoolsAuthClient.getClient().buttonsDelete(buttonId)
      .subscribe(
        (data) => {
          this.buttonActions.deleteSuccess(data);
          this.buttonActions.deleteRequestFinish();
          this.dismissLoader();
          this.initialized = true;
        },
        (err) => {
          this.buttonActions.deleteError(err);
          this.buttonActions.deleteRequestFinish();
          this.dismissLoader();
          this.initialized = true; 
          this.displayAlert('Error encountered',
            `An error occurred when trying to delete button ${buttonId}. Please check the console logs for more information.`)
        }
    );
  }

  getButtonWithAuth(buttonId: string) {
    this.buttonActions.fetchOneRequest(buttonId);
    this.userPoolsAuthClient.getClient().buttonsGet(buttonId)
      .subscribe(
          (data) => {
            this.buttonActions.fetchOneSuccess(data);
            this.buttonActions.receiveButton(data);
            this.buttonActions.fetchOneRequestFinish();
            this.dismissLoader();
            this.initialized = true;
          },
          (err) => {
            this.buttonActions.fetchOneError(err);
            this.buttonActions.fetchOneRequestFinish();
            this.dismissLoader();
            this.initialized = true;
            this.displayAlert('Error encountered',
              `An error occurred when trying to get button ${buttonId}. Please check the console logs for more information.`)
          }
      );
  }

  editButtonWithAuth(button: Button, newValues: any):void {
    console.log('BUTTON!', button);
    console.log('newVALUES!', newValues.value);
    this.buttonActions.editRequest(button.buttonId);
    this.userPoolsAuthClient.getClient().buttonsUpdate(button.buttonId, newValues.value)
      .subscribe(
          (data) => {
            console.log('DATA MOFO', data);
            this.buttonActions.editSuccess(data);
            this.buttonActions.receiveEditedButton(data);
            this.buttonActions.editRequestFinish();
            this.exitButtonEditMode();
            this.dismissLoader();
            this.initialized = true;
          },
          (err) => {
            this.buttonActions.editError(err);
            this.buttonActions.editRequestFinish();
            this.exitButtonEditMode();
            this.dismissLoader();
            this.initialized = true;
            this.displayAlert('Error encountered',
              `An error occurred when trying to edit button ${button.buttonId}. Please check the console logs for more information.`)
          }
      );
  }

  startButtonEdit(button: Button) {
    this.buttonActions.stageButton(button);
    this.buttonActions.markForEdit(button.buttonId);
    this.buttonEdit = this.createNewButtonForm(button);
  }

  startButtonCreate() {
    this.buttonActions.stageButton(new ButtonModel('', '', ''));
    this.buttonActions.showButtonCreateForm(true);
  }

  exitButtonCreate() {
    this.buttonActions.stageButton(new ButtonModel('', '', ''));
    this.buttonCreate = this.createNewButtonForm();
    this.buttonActions.showButtonCreateForm(false);
  }

  exitButtonEditMode() {
    this.buttonActions.stageButton(new ButtonModel('','',''));
    this.buttonActions.markForEdit(null);
  }

  getUserId(): string {
    return CognitoUtil.getUserId();
  }

  getUnencodedUserId(): string {
    let userId = CognitoUtil.getUserId();
    return userId == null ? '' : userId;
  }

  getUsername(): string {
    return CognitoUtil.getUsername();
  }

  getUserFirstName(): string {
    if (CognitoUtil.getUserProfile() && CognitoUtil.getUserProfile()['given_name']) {
      return (CognitoUtil.getUserProfile()['given_name'])
    }
    return '';
  }

  getUserLastName(): string {
    if (CognitoUtil.getUserProfile() && CognitoUtil.getUserProfile()['family_name']) {
      return CognitoUtil.getUserProfile()['family_name'];
    }
    return null;
  }

  getUserFullName(): string {
    if (CognitoUtil.getUserProfile() && CognitoUtil.getUserProfile()['given_name'] && CognitoUtil.getUserProfile()['family_name']) {
      return CognitoUtil.getUserProfile()['given_name'] + ' ' + CognitoUtil.getUserProfile()['family_name'];
    }
    return null;
  }

  displayLoader(message, durationInMilliseconds=3000) {
    this.loader = this.loadingCtrl.create({
      content: message,
      duration: durationInMilliseconds,
      dismissOnPageChange: true
    });
    this.loader.present();
  }

  dismissLoader() {
    if (this.loader != null) {
      this.loader.dismiss();
    }
    this.loader = null;
  }

  getAlertController() {
    return this.alertCtrl;
  }

  displayAlert(title, subtitle, functionToRunWhenOkButtonIsPressed=null) {
    let okFunction = () => {};
    if (functionToRunWhenOkButtonIsPressed != null) {
      okFunction = functionToRunWhenOkButtonIsPressed;
    }
    let alert = this.getAlertController().create({
      title: title,
      subTitle: subtitle,
      buttons: [{ text: 'OK', handler: okFunction }]
    });
    alert.present();
  }

  logForm(formBuilderGroup){
    console.log(formBuilderGroup.value)
  }
  
  createNewButtonForm(button?) {
    let name = '', layer = '', thumb = '';
    if (button) {
      name  = button.name;
      layer = button.layer;
      thumb = button.thumb;
    }
    return this.formBuilder.group({
      name: [name, Validators.required],
      layer: [layer],
      thumb: [thumb]
    });
  }


}
