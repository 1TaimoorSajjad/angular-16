import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { AuthService } from 'src/app/components/auth/service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  tokenizedReq: any;

  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Interceptor');
    const startTime = Date.now();
    const token = this.authService.getToken();

    if (req.body instanceof FormData) {
      this.tokenizedReq = req.clone({ 
        setHeaders: { 
          Authorization: `JWT ${token}` 
        }
      });
    } else {
      this.tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(this.tokenizedReq);
  }
}
