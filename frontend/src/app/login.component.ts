import { Component, inject, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { StateService } from './state.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { IUser } from './goal.interface';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <h1 class="m-2" style="font-size: 22px; font-weight: bolder">
        User Login
      </h1>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <input
          placeholder="Username"
          formControlName="email"
          class="input m-2 is-medium "
        />
        <div *ngIf="email.invalid && (email.touched || email.dirty)">
          <small *ngIf="email.errors?.['required']" style="color: red" class="m-2">Email required</small>
          <small *ngIf="email.errors?.['email']" style="color: red" class="m-2">Invalid Email</small>
        </div>

        <input
          placeholder="Password"
          formControlName="password"
          type="password"
          class="input m-2"
        />
        <div *ngIf="password.invalid && (password.touched || password.dirty)">
          <small *ngIf="password.errors?.['required']" style="color: red" class="m-2">Password required</small>
          <small *ngIf="password.errors?.['password']" style="color: red" class="m-2">Invalid password</small>
        </div>
        <button
          type="submit"
          style="border: 2px solid black; color: black"
          class="button is-info m-2  is-outlined"
          [disabled]="form.invalid"
        >
          Login
        </button>
        <br />
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        border: 1px solid balck;
        padding: 50px;
        width: 33%;
        border-radius: 8px;
        background-color: white;
        margin-bottom: 50px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  private stateServie = inject(StateService);
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  form = this.formBuilder.nonNullable.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  constructor() {}

  ngOnInit(): void {}

  get email() {
    return this.form.get('email') as FormControl;
  }
  get password(){
    return this.form.get('password') as FormControl;
  }

  submit() {
    this.userService
      .login(this.form.value as { email: string; password: string })
      .subscribe((response) => {
        if (response.success) {
          const decoded = jwt_decode(response.data) as IUser;
          const state = {
            _id: decoded._id,
            email: decoded.email,
            fullname: decoded.fullname,
            token: response.data,
          };
          this.stateServie.state.next(state);
          localStorage.setItem('STATE', JSON.stringify(state));
          this.router.navigate(['', 'goals', 'lists']);
        }
      });
  }
}
