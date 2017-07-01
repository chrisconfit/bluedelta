import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  IUserLogin,
  UserLoginService,
  CognitoUtil,
  UserState,
  UserRegistrationService
} from "../../../services/account-management.service";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public submitted:boolean = false;
  public userData: IUserLogin;

  constructor(
    public fb:FormBuilder,
    protected userLoginService:UserLoginService
  ) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.userData.username = this.form.controls['email'].value;
    this.userData.password = this.form.controls['password'].value;
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.login()
      // your code goes here
      // console.log(values);
    }
  }

  login(): void {
    this.userLoginService.signIn(this.userData)
      .then(() => {
        // Login was successful
      })
      .catch((err: Error): void => {
        // Login was unsuccessful
      })
  }
}
