import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { StateService } from './state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {

    private stateService = inject(StateService);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.stateService.state.value.token? true: false;
  } 
}
