import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/components/auth/service/auth.service';
// import { SocketService } from '../socket-service/socket-service.service';
import * as moment from 'moment-timezone';
import { SharedDataService } from '../shared-service/shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard  {
  constructor(
    private authService: AuthService,
    // private socket: SocketService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Auth Guard');
    return this.authService.me()
      .pipe(
        map((data) => {
          if (data && data.user) {
            this.sharedDataService.saveUser(data.user);
            // this.socket.connectSocket();
            moment.tz.setDefault(data.user.timeZone);
            return true;
          } else {
            this.sharedDataService.saveUser(null);
            // this.socket.disconnectSocket();
            this.authService.removeToken();
            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError((error) => {
          this.sharedDataService.saveUser(null);
          // this.socket.disconnectSocket();
          this.authService.removeToken();
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }
}
