import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SharedDataService } from 'src/app/services/shared-service/shared-data.service';
import { MenuService } from '../menu-service/menu.service';
import { Menu } from '../menu-service/menu-models';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  user: any;
  menus: any;
  selectedMenu: any;
  // isSubMenu = false;
  isShowSmallScreenMenu = false;
  selectedMenukey: any;
  isRouterEventsExist = false;

  constructor(
    private sharedDataService: SharedDataService,
    private menuService: MenuService,
    public sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events
    // .pipe(takeUntil(componentDestroyed(this)))
    .subscribe((event) => {
      this.isRouterEventsExist = true;
      if (event instanceof NavigationEnd) {
        if (event.url) {
          this.selectMenuDynamically(event.url);
        }
      }
    });
    this.getUser();
    this.getSubMenus();
    this.getSmallScreenMenuState();
    this.getUrlOnPageReload();
  }

  getUrlOnPageReload() {
    if (this.isRouterEventsExist) return;
    if(this.router.url) {
      this.selectMenuDynamically(this.router.url);
    }
  }

  selectMenuDynamically(routeUrl: any) {
    if (!this.selectedMenu) {
      const url = routeUrl.split("/");
      if (url[1] === "home" || url[1] === "") {
        this.selectedMenu = "home";
      } else {
        this.selectedMenu = url[1];
      }
      this.onSelectMenu(this.menus ? this.menus[this.selectedMenu] : null);
    }
  }

  getUser() {
    this.sharedDataService
      .getUser()
      // .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(user => {
        if (user) {
          this.user = user;
          if (this.user && this.user.roles) {
            if ((typeof this.user.roles) === 'string') {
              if(this.user.sRoles)
              this.menus = this.menuService.getMenu(this.user.sRoles);
              else
              this.menus = this.menuService.getMenu(this.user.roles);
            } else if ((typeof this.user.roles) === 'object') {
              this.menus = this.menuService.getMenu(this.user.roles[0]);
            }

            Object.keys(this.menus).forEach(key => {
              this.menus[key].sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(this.menus[key].icon);
            });
          }
        }
      });
  }

  sortMethod(a: any, b: any) {
    return a.value.position > b.value.position ? 1 : -1;
  }

  onSelectMenu(menu: any) {
    this.selectedMenu = menu;
    this.sharedDataService.saveSubMenus(menu ? menu : null);
  }

  getSubMenus() {
    this.sharedDataService
      .getSubMenus()
      // .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((menu: any) => {
        if (menu && this.selectedMenu) {
          if (this.selectedMenu.key !== menu.key) {
            this.selectedMenu = menu;
          }
        }
      });
  }

  onSelectMenuSmallScreen(menu: any) {
    this.selectedMenu = menu;
    this.sharedDataService.saveSubMenus(menu ? menu : null);
    if (this.selectedMenukey === menu.key) {
      this.selectedMenukey = '';
    } else {
      this.selectedMenukey = menu.key;
    }
    this.sharedDataService.setSmallScreenMenuState(false);
  }

  getSmallScreenMenuState() {
    this.sharedDataService
      .getSmallScreenMenuState()
      // .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(data => {
        // console.log('test1011:', data);
        this.isShowSmallScreenMenu = data;
      });
  }

  closeSmallScreenMenu() {
    this.sharedDataService.setSmallScreenMenuState(false);
  }

  setMenuCss(evt: any) {
    // console.log('setmenucss', evt);
    return 'bg-nav-light text-nav-light';
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    if (location.href) {
      let currentUrl = location.href.replace('http://','');
      currentUrl = currentUrl.replace('https://','');
      const url = currentUrl.split("/");
      if (url[1] === "dashboard" || url[1] === "") {
        this.selectedMenu = "dashboard";
      } else {
        this.selectedMenu = url[1];
      }
      // console.log('TEST100:Browser:Menu', this.selectedMenu);
      this.onSelectMenu(this.menus ? this.menus[this.selectedMenu] : null);
    }
  }

  getMenu(menu: any) {
    return menu;
  }

  ngOnDestroy(): void {
  }
}
