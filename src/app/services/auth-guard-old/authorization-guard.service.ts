import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../auth-service/auth.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as moment from 'moment-timezone';
// import { SocketService } from '../socket-service/socket-service.service';
import { SharedDataService } from '../shared-service/shared-data.service';
// import { UserRoles } from 'src/app/components/shared/layout/menu-service/menu.service';
import { AuthService } from 'src/app/components/auth/service/auth.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
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
  // all roles
  // ['mcallcenter', 'rcallcenter', 'mdispatcher', 'accountant', 'dispatcher', 'company', 'credential']
  checkUserLogin(route: ActivatedRouteSnapshot) {

    return this.authService.me()
      .pipe(
        map((data: any) => {
          if (data.user) {
            // this.getCachedNemtCodes(); // if cached codes are not found then fetch from server.
            // this.socket.connectSocket();
            moment.tz.setDefault(data.user.timeZone);

            if (route.data && route.data.role) {
              let roles = data.user.roles;
              if (typeof data.user.roles === "object") {
                roles = data.user.roles[0];
              }
              this.sharedDataService.saveUser(data.user);

              // if (roles === UserRoles.FULLACCESS && data.user.sRoles && route.data.role.includes(data.user.sRoles)) {
              //   return true;
              // }else if (roles === UserRoles.FULLACCESS && route.data.role.includes(roles) && !data.user.sRoles) {
              //   return true;
              // }else if (roles === UserRoles.ADMIN  && route.data.role.includes(roles)) {
              //   return true;
              // } else if (roles === UserRoles.ADMIN ) {
              //   this.router.navigate(['/credentialing/companies']);
              //   return false;
              // } else if (data.user.sRoles && [UserRoles.CALL_CENTER_REP,UserRoles.ACCOUNTANT].includes(data.user.sRoles)) {
              //   this.router.navigate(['/trips']);
              //   return false;
              // }else if (data.user.sRoles && [UserRoles.CALL_CENTER_REP,UserRoles.CREDENTIAL].includes(data.user.sRoles)) {
              //   this.router.navigate(['/credentialing/drivers']);
              //   return false;
              // } else {
              //   this.router.navigate(['/']);
              //   return false;
              // }

              return true;

            } else {
              this.sharedDataService.saveUser(null);
              // this.socket.disconnectSocket();
              localStorage.removeItem('token');
              this.router.navigate(['/login']);
              return false;
            }

          } else {
            this.sharedDataService.saveUser(null);
            // this.socket.disconnectSocket();
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError((error) => {
          console.log("error", error)
          this.sharedDataService.saveUser(null);
          // this.socket.disconnectSocket();
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          return of(false);
        })
      );

  }
}

