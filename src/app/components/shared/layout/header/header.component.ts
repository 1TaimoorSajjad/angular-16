import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth-service/auth.service';
import { SharedDataService } from 'src/app/services/shared-service/shared-data.service';
// import { SocketService } from 'src/app/services/socket-service/socket-service.service';
import * as moment from 'moment-timezone';
import { animate, style, transition, trigger } from "@angular/animations";
import { MenuService } from '../menu-service/menu.service';
import { Events } from "src/app/utils/event-utils";
// import { DispatchCenterService } from 'src/app/components/dispatch-center/dispatch-center-service/dispatch-center-service';
// import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/components/auth/service/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger("openCloseProfile", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.95)" }), //apply default styles before animation starts
        animate(
          "500ms ease-in-out",
          style({ opacity: 1, transform: "scale(1)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, }), //apply default styles before animation starts
        animate(
          "300ms ease-in-out",
          style({ opacity: 0, transform: "scale(.95)" })
        )
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('audioOption', { static: true }) audioPlayerRef!: ElementRef;
  subMenus: any;
  showUserOptions = false;
  showNotifications = false;
  currentPath = '';
  isHome = false;
  timeZone: any;
  showQuickMenu = false;
  user: any;
  intervalTimeID: any;
  currentTime = moment().toISOString();
  menus: any;
  isSound = true;
  userRole: any;

  constructor(
    private sharedDataService: SharedDataService,
    private authService: AuthService,
    private menuService: MenuService,
    // private socket: SocketService,
    private router: Router,
    // private socketService: SocketService,
    // private dispatchCenterService: DispatchCenterService,
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getUser();
    this.router.events
    // .pipe(takeUntil(componentDestroyed(this)))
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url) {
          let path = event.url;
          this.currentPath = path.substring(1);
          console.log('TEST101: Header: ', this.currentPath);
          this.getSubMenus();
        }
      }
    });
    this.getSubMenus();

    this.intervalTimeID = setInterval(() => {
      this.currentTime = moment().toISOString();
    }, 1000);

    // this.socketService.addListener(Events.SEND_EXPIRE_DISPATCH)
    // // .pipe(takeUntil(componentDestroyed(this)))
    //   .subscribe(data => {
    //     if (data.sucess) {
    //       this.onAudioPlay();
    //       this.getNotificationsList();
    //     }
    //   });

    // Setting the sound state if there is any value present in localstorage
    if (localStorage.getItem("sound")) {
      const sound = localStorage.getItem("sound");
      this.isSound = sound ? JSON.parse(sound) :  false;
    }
      // this.toastr.success("dhaskkdhsadjkhad askjasdajskdas akdasbdasbd", 'Alert');
  }

  getNotificationsList() {
    // this.dispatchCenterService
    //   .getNotifications()
    //   // .pipe(takeUntil(componentDestroyed(this)))
    //   .subscribe((data: any) => {
    //     if (data) {
    //       if (this.menus && (this.menus.dashboard || this.menus.operations || this.menus.trips || this.menus.manifest)) {
    //         const notifications = data[0];
    //         this.toastr.success(notifications.text, 'Alert');
    //       }
    //     }
    //   });
  }

  onAudioPlay() {
    if (this.isSound) {
      this.audioPlayerRef.nativeElement.play();
    }
  }

  getUser() {
    this.sharedDataService
      .getUser()
      // .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(user => {
        if (user) {
          this.user = user;
          this.timeZone = user.timeZone;
          if (this.user && this.user.roles) {
            if ((typeof this.user.roles) === 'string') {
              if(this.user.sRoles) {
                this.userRole = this.menuService.getUserRoleTitle(this.user.sRoles);
                this.menus = this.menuService.getMenu(this.user.sRoles);
              } else {
                this.userRole = this.menuService.getUserRoleTitle(this.user.roles);
                this.menus = this.menuService.getMenu(this.user.roles);
              }
            } else if ((typeof this.user.roles) === 'object') {
              this.userRole = this.menuService.getUserRoleTitle(this.user.roles[0]);
              this.menus = this.menuService.getMenu(this.user.roles[0]);
            }
          }
        }
      });
  }

  getSubMenus() {
    this.sharedDataService
      .getSubMenus()
      // .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((data: any) => {
        this.subMenus = [];
        if (data) {
          this.isHome = this.currentPath === data.key ? true : false;
          if (data.subMenus) {
            this.subMenus = data.subMenus;
          }
        }
      });
  }

  onQuickMenuClick(menuKey: any) {
    this.subMenus = [];
    const menu = this.menus[menuKey];
    this.sharedDataService.saveSubMenus(menu ? menu : null);
    // console.log('TEST101:menu', menu);

    // if (menu) {
    //   this.subMenus = menu.subMenus;
    // }
    // console.log('TEST101:submenu', this.subMenus);
  }

  logout() {
    // this.socket.disconnectSocket();
    this.authService.removeToken();
    this.sharedDataService.saveUser(null);
    this.router.navigateByUrl('login');
  }

  viewSmallScreenMenu() {
    this.sharedDataService.setSmallScreenMenuState(true);
  }

  onClickDropdownMenu() {
    this.sharedDataService.saveSubMenus(null);
    this.showUserOptions = !this.showUserOptions
  }

  toggleSound() {
    this.isSound = !this.isSound;
    localStorage.setItem("sound", JSON.stringify(this.isSound));
  }

  canViewSubmenu(subMenus: any, title: any) {
    let isFound = false;
    if (subMenus && subMenus.length) {
      isFound = subMenus.some((m: any) => m.title === title);
    }
    return isFound;
  }

  getUserRole() {

  }

  ngOnDestroy(): void {
    if (this.intervalTimeID) {
      clearInterval(this.intervalTimeID);
    }
  }
}
