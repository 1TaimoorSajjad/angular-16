import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
// import { AuthService } from '../auth-service/auth.service';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/components/auth/service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
   tokenizedReq: any;
  constructor(private authService: AuthService) { }

  intercept(req: any, next: any) {
    const startTime = Date.now();
    const token = this.authService.getToken('token');

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

    return next.handle(this.tokenizedReq).pipe(
      tap(
        event => {
          status = '';
          if (event instanceof HttpResponse) {
            status = 'succeeded';
            event = event.clone({ body: + this.responselogDetails(JSON.stringify(event.body))});
          }
        },
        error => status = 'failed'
      ),
      finalize(() => {
        const elapsedTime = Date.now() - startTime;
        const message =
         ' HttpRequest >>>>>>>>\n\n\n'
         + req.method + ' ' + req.urlWithParams + ' ' + status
          + ' in ' + elapsedTime + 'ms' + '\n body: ' + JSON.stringify(req.body) +
          '\n\n\n<<<<<<<< HttpRequest';
        this.logDetails(message);
      })
    );
  }
  private logDetails(msg: string) {
    console.log(msg);
  }
  private responselogDetails(msg: string) {
    console.log(' HttpResponse >>>>>>>>\n\n\n' +
    msg,
     '\n\n\n<<<<<<<< HttpResponse');
  }
}
