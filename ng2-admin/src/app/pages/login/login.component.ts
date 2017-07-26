import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IUserLogin,
  UserLoginService,
  CognitoUtil,
  UserState,
  UserRegistrationService
} from "../../../services/account-management.service";
import { UsersProvider } from "providers/users/users";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form: FormGroup;
  public submitted: boolean = false;
  public userData: IUserLogin = {
    username: "user1",
    password: "Test123!"
  };
  parentRouter: Router;

  constructor(
            public fb: FormBuilder,
            public _router: Router,
            public userService: UsersProvider) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.userData.username = this.form.controls['email'].value;
    this.userData.password = this.form.controls['password'].value;
    this.parentRouter = _router;
  }

  onSignIn(form) {
    // this.signInButtonClicked = true;
    // this.forgotPasswordButtonClicked = false;

    if (form && form.valid) {
      this.login();
      // this.resourceService.initialized = true;
    }

  }

  login(): void {
    UserLoginService.signIn(this.userData)
      .then(() => {
        // Login was successful
        this.parentRouter.navigateByUrl('/dashboard');
      })
      .catch((err: Error): void => {
        // Login was unsuccessful
        console.log('bad login');
      });
  }

  ngOnInit() {

  }
}
