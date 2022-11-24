import { Component, inject } from '@angular/core';
import { StateService } from './state.service';
import { IState } from '../app/goal.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',

  template: `
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
      style="background-color:brown; height: 80px"
    >
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" [routerLink]="['']" style=" color: black;">
            Home
          </a>
          <a
            *ngIf="state.token"
            class="navbar-item"
            [routerLink]="['goals', 'lists']"
            style=" color: black;"
          >
            Goals
          </a>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped ">
            <p *ngIf="!state.token; else logoutButton">
              <button class="button  m-2 is-info is-outlined "  (click)="login()" style="border: 2px solid black; color: white">Login</button>
              <button class="button  m-2 is-info is-outlined"  (click)="signup()" style="border: 2px solid black; color: white">Signup</button>
            </p>

            <ng-template #logoutButton>
              <button class="button is-info is-outlined" (click)="logout()" style="border: 2px solid black; color: white">
                Logout
              </button>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>

    <div
      class="container is-fluid "
      style="background-color:white;  padding: 30px "
    >
      <router-outlet></router-outlet>
    </div>
    <footer class="footer hero is-dark" style="background-color:black ;">
      <div class="content has-text-centered">
        <p><strong>Goal Tracker App</strong></p>
      </div>
    </footer>
  `,
  styles: [],
})
export class AppComponent {
  state!: IState;

  private router = inject(Router);
  private stateService = inject(StateService);

  constructor() {
    this.stateService.state.subscribe((state: IState) => {
      this.state = state;
    });
  }

  login() {
    this.router.navigate(['', 'login']);
  }

  signup() {
    this.router.navigate(['', 'signup']);
  }
  logout() {
    this.stateService.state.next({
      _id: '',
      email: '',
      fullname: '',
      token: '',
    });
    localStorage.clear();
    this.router.navigate(['']);
  }
}
