import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../auth-service/auth.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as moment from 'moment-timezone';
// import { SocketService } from '../socket-service/socket-service.service';
import { SharedDataService } from '../shared-service/shared-data.service';
import { AuthService } from 'src/app/components/auth/service/auth.service';

@Injectable()
export class UnAuthorizationGuard  {
  constructor(
    private authService: AuthService,
    // private socket: SocketService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) {
  }

  // @ts-ignore
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(next);
  }

  checkUserLogin(route: ActivatedRouteSnapshot) {
    if (!localStorage.getItem('token')) {
      this.sharedDataService.saveUser(null);
      // this.socket.disconnectSocket();
      localStorage.removeItem('token');
      // this.router.navigate(['/login']);
      return of(true);
    }

    return this.authService.me()
      .pipe(
        map((data: any) => {
          if (data.user) {
            this.router.navigate(['/']);
            return false;
          } else {
            this.sharedDataService.saveUser(null);
            // this.socket.disconnectSocket();
            localStorage.removeItem('token');
            // this.router.navigate(['/login']);
            return true;
          }
        }),
        catchError((error) => {
          console.log("error", error)
          this.sharedDataService.saveUser(null);
          // this.socket.disconnectSocket();
          localStorage.removeItem('token');
          // this.router.navigate(['/login']);
          return of(true);
        })
      );

  }
}

