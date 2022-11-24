import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AttachTokenInterceptor } from './attach-token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';

import { CheckTokenGuard } from './check-token.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StateService } from './state.service';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'goals',
        loadChildren: () => import('./goal/goal.module').then(m => m.GoalModule),
        canActivate: [CheckTokenGuard]
      }
    ]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (stateService: StateService) => {
        return () => {
          const stored_state = localStorage.getItem('STATE')
          const stored_goal = localStorage.getItem('GOAL');
          const stored_step = localStorage.getItem('STEPS') 
          if (stored_state) {
            stateService.state.next(JSON.parse(stored_state));
          }   
          if(stored_goal){
            stateService.goals = JSON.parse(stored_goal)
          }     
          if(stored_step){
            stateService.goals = JSON.parse(stored_step)
          }     
        }
      },
      deps: [StateService],
      multi: true
    }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AttachTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
