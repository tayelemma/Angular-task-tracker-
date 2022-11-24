import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container">
      <h1 class="m-2" style="font-size: 22px; font-weight: bolder">Signup</h1>
      <form [formGroup]="signUpForm" (ngSubmit)="submit()" class="">
        <input placeholder="email" formControlName="email" class="input m-2" />
        <div *ngIf="email.invalid && (email.touched || email.dirty)">
          <small *ngIf="email.errors?.['required']" style="color: red" class="m-2">Email required</small>
          <small *ngIf="email.errors?.['email']" style="color: red" class="m-2">Invalid Email</small>
        </div>
        <input
          placeholder="fullname"
          formControlName="fullname"
          class="input m-2"
        />
        <div *ngIf="fullname.invalid && (fullname.touched || fullname.dirty)">
          <small *ngIf="fullname.errors?.['required']" style="color: red" class="m-2">Fullname required</small>
        </div>
        
        <input
          placeholder="********"
          formControlName="password"
          type="password"
          class="input m-2"
        />
        <div *ngIf="password.invalid && (password.touched || password.dirty)">
          <small *ngIf="password.errors?.['required']" style="color: red" class="m-2">Password required</small>
        </div>
        
        <button
          type="submit"
          class="button is-primary m-2"
          [disabled]="signUpForm.invalid"
          style="border: 2px solid black; color: white"
        >
          Signup
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        border: 1px solid balck;
        padding: 40px;
        width: 33%;
        border-radius: 8px;
        margin-top: 40px;
        background-color: white;
        margin-bottom: 50px;
      }
    `,
  ],
})
export class SignupComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
 

  constructor() {}
  ngOnInit(): void {}

  signUpForm = this.formBuilder.nonNullable.group({
    fullname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  get email(){
    return this.signUpForm.get('email') as FormControl;
  }
  get password(){
    return this.signUpForm.get('password') as FormControl;
  }
  get fullname(){
    return this.signUpForm.get('fullname') as FormControl;
  }

  submit() {
    this.userService
      .signup(this.signUpForm.value as { fullname: string; email: string;  password: string})
      .subscribe((response) => {
        this.signUpForm.reset();
        this.router.navigate(['', 'login']);
      });
  }

}
