import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {
  private stateService = inject(StateService);

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.stateService.state.value.token;
    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('authorization', 'Bearer ' + token),
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
