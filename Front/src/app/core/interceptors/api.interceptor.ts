import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';

console.log('environment.apiUrl', environment.apiUrl);

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const apiReq = req.clone({ url: `${environment.apiUrl}${req.url}` });
    return next.handle(apiReq);
  }
}
