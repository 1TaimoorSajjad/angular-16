import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedDataService } from './services/shared-service/shared-data.service';
import { AuthService } from './components/auth/service/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { DateTimeAdapter } from '@danielmoncada/angular-datetime-picker';
import * as moment from 'moment-timezone';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    this.routerListener();
  }

  routerListener() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.authService.getToken()) {
          this.isLoggedIn = true;
          if (
            event.url === "/login" ||
            event.url === "/forgot-password" ||
            event.url.startsWith("/reset-password")
          ) {
            this.router.navigateByUrl("/");
          }
        } else {
          this.isLoggedIn = false;
          if (event.url.startsWith("/reset-password")) {
            // this.isResetPassword = true;
            // this.forgotPasswordFlag = false;
          } else if (event.url === "/forgot-password") {
            // this.forgotPasswordFlag = true;
            // this.isResetPassword = false;
          } else if (event.url === "/login") {
            // this.forgotPasswordFlag = false;
            // this.isResetPassword = false;
          } else {
            // this.forgotPasswordFlag = false;
            // this.isResetPassword = false;
            this.router.navigateByUrl("/login");
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
  }

}
