import { Injectable } from '@angular/core';
import { Menu, SubMenu } from './menu-models';
import { UserRole } from 'src/app/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menus: any = {};
  userRole: any;

  constructor() { }

  addMenu(menu: Menu): void {
    if (this.canView(menu.roles)) {
      this.menus[menu.key] = menu;
    }
  }

  addSubMenu(key: string, subMenu: SubMenu) {
    if ((this.menus[key] && this.canView(subMenu.roles))) {
      const subMenus = this.menus[key].subMenus;
      if (!subMenus) {
        this.menus[key].subMenus = [];
      }
      this.menus[key].subMenus.push(subMenu);
    }
  }

  getMenu(userRole: any): object {
    this.menus = {};
    this.userRole = userRole;
    this.addMenus();
    return this.menus;
  }

  addMenus() {
    // Home
    this.addMenu({
      title: "Dashboard",
      url: "dashboard",
      icon: this.getIcon("home"),
      key: "dashboard",
      position: 1,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    // operations
    this.addMenu({
      title: "Operations",
      url: "operations",
      icon: this.getIcon("operations"),
      key: "operations",
      position: 2,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    // Alarming
    this.addMenu({
      title: "Alarming",
      url: "alarming",
      icon: this.getIcon("trips"),
      key: "trips",
      position: 3,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    // Credentails
    this.addMenu({
      title: "Credentialing",
      url: "credentialing",
      icon: this.getIcon("credentialing"),
      key: "credentialing",
      position: 4,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    this.addSubMenu('credentialing', {
      title: "Drivers",
      url: "credentialing/drivers",
      position: 1,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    this.addSubMenu('credentialing', {
      title: "Staff",
      url: "credentialing/staff",
      position: 2,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    this.addSubMenu('credentialing', {
      title: "Members",
      url: "credentialing/members",
      position: 3,
      roles: [UserRole.QUARTER, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });


    this.addSubMenu('credentialing', {
      title: "Funding Sources",
      url: "credentialing/fundingsource",
      position: 4,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    // Fleet
    this.addMenu({
      title: "Fleet",
      url: "fleet",
      icon: this.getIcon("fleet"),
      key: "fleet",
      position: 4.0,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER],
    });

    // vehicles
    this.addSubMenu('fleet', {
      title: "Vehicles",
      url: "fleet/vehicles",
      position: 0,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    // levelofservice
    this.addSubMenu("fleet", {
      title: "Level of Service",
      url: "fleet/levelofservice",
      position: 1,
      // roles: [UserRoles.COMPANY, UserRoles.FULLACCESS]
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    // spaceTypes
    this.addSubMenu("fleet", {
      title: "Space Types",
      url: "fleet/spaceTypes",
      position: 2,
      // roles: [UserRoles.COMPANY, UserRoles.FULLACCESS]
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });
    
    // equipment
    this.addSubMenu("fleet", {
      title: "Equipment",
      url: "fleet/equipment",
      position: 3,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    // "Service Aareas
    this.addSubMenu("fleet", {
      title: "Service Aareas",
      url: "fleet/service-areas",
      position: 4,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });
    
    // violation
    this.addSubMenu("fleet", {
      title: "Violation",
      url: "fleet/violation",
      position: 4,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });


    this.addMenu({
      title: "Rates",
      url: "rates",
      icon: this.getIcon("fares"),
      key: "rates",
      position: 4.2,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER],
    });


    this.addSubMenu('rates', {
      title: "Rates",
      url: "rates",
      position: 0,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    this.addSubMenu('rates', {
      title: "Addons",
      url: "rates/addons",
      position: 1,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    this.addSubMenu('rates', {
      title: "Appointment Types",
      url: "rates/appointment-types",
      position: 2,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });


    //Time Sheet

    this.addMenu({
      title: "Map View",
      url: "map-view",
      icon: this.getIcon("timelines"),
      key: "mapview",
      position: 4.1,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });



    // Reports
    this.addMenu({
      title: "Reports",
      url: "reports/statistics",
      icon: this.getIcon("reports"),
      key: "reports",
      position: 6,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    this.addSubMenu('reports', {
      title: "Statistics",
      url: "reports/statistics",
      position: 2,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });

    this.addSubMenu('reports', {
      title: "NEMT Statistics",
      url: "reports/nemtstatistics",
      position: 3,
      roles: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    });
  }

  canView(menuRoles: any) {
    if (Array.isArray(this.userRole)) {
      // In case if user has multiple roles assigned to them.
      // Logic will be added here if needed.
      return false;
    }

    return menuRoles.includes(this.userRole);
  }

  getUserRoleTitle(role: any) {
    let title = '';
    if (role === UserRole.ADMIN) {
      title = "Admin";
    } else if (role === UserRole.AUTHORIZER) {
      title = "Authorizer";
    } else if (role === UserRole.DISPATCHER) {
      title = "Dispatcher";
    } else {
      title = role;
    }

    return title;
  }

  getIcon(menu: any) {
    switch (menu) {
      case "manifest":
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
      </svg>
      `;
      case "home":
        return `<svg
          class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6 19v1q0 .425-.287.712Q5.425 21 5 21H4q-.425 0-.712-.288Q3 20.425 3 20v-8l2.1-6q.15-.45.538-.725Q6.025 5 6.5 5h11q.475 0 .863.275q.387.275.537.725l2.1 6v8q0 .425-.288.712Q20.425 21 20 21h-1q-.425 0-.712-.288Q18 20.425 18 20v-1Zm-.2-9h12.4l-1.05-3H6.85ZM5 12v5Zm2.5 4q.625 0 1.062-.438Q9 15.125 9 14.5t-.438-1.062Q8.125 13 7.5 13t-1.062.438Q6 13.875 6 14.5t.438 1.062Q6.875 16 7.5 16Zm9 0q.625 0 1.062-.438Q18 15.125 18 14.5t-.438-1.062Q17.125 13 16.5 13t-1.062.438Q15 13.875 15 14.5t.438 1.062Q15.875 16 16.5 16ZM5 17h14v-5H5Z"
          />
        </svg>`
      case 'help':
        return `<svg
          class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          >
          <path fill="currentColor"
          d="M14 8.775q0-.225.163-.463T14.524 8q.725-.25 1.45-.375T17.5 7.5q.5 0 .988.063t.962.162q.225.05.388.25t.162.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113T17.5 9q-.65 0-1.275.125t-1.2.325q-.45.175-.737-.025T14 8.775Zm0 5.5q0-.225.163-.463t.362-.312q.725-.25 1.45-.375T17.5 13q.5 0 .988.063t.962.162q.225.05.388.25t.162.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113T17.5 14.5q-.65 0-1.275.113t-1.2.312q-.45.175-.738-.013T14 14.276Zm0-2.75q0-.225.163-.463t.362-.312q.725-.25 1.45-.375t1.525-.125q.5 0 .988.063t.962.162q.225.05.388.25t.162.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113t-.788-.037q-.65 0-1.275.125t-1.2.325q-.45.175-.737-.025t-.288-.65ZM6.5 16q1.175 0 2.288.263T11 17.05V7.2q-1.025-.6-2.175-.9T6.5 6q-.9 0-1.788.175T3 6.7v9.9q.875-.3 1.738-.45T6.5 16Zm6.5 1.05q1.1-.525 2.212-.788T17.5 16q.9 0 1.763.15T21 16.6V6.7q-.825-.35-1.713-.525T17.5 6q-1.175 0-2.325.3T13 7.2v9.85Zm-6-5.4Zm5 7.825q-.35 0-.663-.088t-.587-.237q-.975-.575-2.05-.862T6.5 18q-1.05 0-2.063.275T2.5 19.05q-.525.275-1.012-.025T1 18.15V6.1q0-.275.138-.525T1.55 5.2q1.15-.6 2.4-.9T6.5 4q1.45 0 2.838.375T12 5.5q1.275-.75 2.663-1.125T17.5 4q1.3 0 2.55.3t2.4.9q.275.125.413.375T23 6.1v12.05q0 .575-.487.875t-1.013.025q-.925-.5-1.937-.775T17.5 18q-1.125 0-2.2.288t-2.05.862q-.275.15-.588.238t-.662.087Z"/></svg>`
      case 'protips':
        return `<svg
          class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
           d="M10 18v-.107c0-.795-.496-1.488-1.117-1.984a5 5 0 1 1 6.235 0c-.622.497-1.118 1.189-1.118 1.984V18m-4 0v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2m-4 0h4m6-6h1M4 12H3m9-8V3m5.657 3.343l.707-.707m-12.02.707l-.708-.707M12 15v-2"/></svg>`
      case 'operations':
        return `<svg
          class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
        >
        <path
          fill="currentColor"
          d="M24 21h2v5h-2zm-4-5h2v10h-2zm-9 10a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3v-2a5 5 0 0 1 0 10z"
        />
        <path
          fill="currentColor"
          d="M28 2H4a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2h24a2.003 2.003 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2Zm0 9H14V4h14ZM12 4v7H4V4ZM4 28V13h24l.002 15Z"
        />
      </svg>`
      case 'trips':
        return `<svg
        class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M14.844 20H6.5C5.121 20 4 18.879 4 17.5S5.121 15 6.5 15h7c1.93 0 3.5-1.57 3.5-3.5S15.43 8 13.5 8H8.639a9.812 9.812 0 0 1-1.354 2H13.5c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-7C4.019 13 2 15.019 2 17.5S4.019 22 6.5 22h9.593a10.415 10.415 0 0 1-1.249-2zM5 2C3.346 2 2 3.346 2 5c0 3.188 3 5 3 5s3-1.813 3-5c0-1.654-1.346-3-3-3zm0 4.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5 6.5z"
        />
        <path
          fill="currentColor"
          d="M19 14c-1.654 0-3 1.346-3 3c0 3.188 3 5 3 5s3-1.813 3-5c0-1.654-1.346-3-3-3zm0 4.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 19 18.5z"
        />
      </svg>`
      case 'credentialing':
        return `<svg class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32">
        <path fill="currentColor" d="M16 22a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2zM14 6h4v2h-4z" />
        <path fill="currentColor"
          d="M24 2H8a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2h16a2.003 2.003 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2Zm-4 26h-8v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1Zm2 0v-2a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3v2H8V4h16v24Z" />
      </svg>`
      case 'fleet':
        return `<svg id="Layer_1" class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6" data-name="Layer 1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 53.49"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>cars</title><path class="cls-1" d="M93.43.94h13c4,0,6.3,3.39,7.27,7.27L116,17.62l1.34-2.54c6.95-.4,7.57,3.64.22,7.12L118.78,24c4.84,5,4.38,9.93,3.63,22.21v4a2.27,2.27,0,0,1-2.27,2.27h-9.71a2.27,2.27,0,0,1-2.27-2.27V48.45h-3.6V47l0-.63c.18-2.92.34-5.49.42-7.79l5.73-.05a3.88,3.88,0,0,0,1.93-.53,3.3,3.3,0,0,0,1.17-1.3l.93-2.26c.69-1.76.14-2.61-1.89-2.39L105,33a19.87,19.87,0,0,0-2.65-9.45,11.6,11.6,0,0,0,1.4-1.91h0a10.55,10.55,0,0,0,.73-1.57h8.14l-2.35-9.76c-.64-3-2.49-5.55-5.55-5.55H95A21.78,21.78,0,0,0,93.43.94ZM31.27,21.74c-7-3.54-6.17-7.49.83-7.08l1.57,2.94,3.23-10C38.17,3.59,40.29,0,44.44,0H81c4.15,0,6.53,3.52,7.54,7.54L91,17.29l1.4-2.63c7.2-.42,7.85,3.77.22,7.38l1.24,1.9c5,5.15,4.54,10.29,3.76,23v4.18a2.36,2.36,0,0,1-2.35,2.36H85.17a2.36,2.36,0,0,1-2.35-2.36V49.24H40.08v1.89a2.36,2.36,0,0,1-2.36,2.36h-10a2.36,2.36,0,0,1-2.36-2.36V45.7c0-.12,0-.24,0-.37-.76-9.76-1.84-18.56,5.93-23.59ZM44.11,33.32l-8.93-1.13c-2.11-.23-2.68.66-2,2.47l1,2.35a3.36,3.36,0,0,0,1.2,1.34,4.09,4.09,0,0,0,2,.56l8,.06c1.92,0,2.75-.77,2.15-2.54a4.3,4.3,0,0,0-3.4-3.11Zm34.67,0,8.93-1.13c2.1-.23,2.67.66,2,2.47L88.7,37a3.38,3.38,0,0,1-1.21,1.34,4.06,4.06,0,0,1-2,.56l-8,.06c-1.93,0-2.76-.77-2.16-2.54a4.31,4.31,0,0,1,3.41-3.11ZM37,19.82H87.38L85,9.7C84.28,6.62,82.36,4,79.2,4H45.81C42.65,4,41,6.69,40.06,9.7L37,19.82v0ZM32.15.94H16.47c-4,0-6.3,3.39-7.27,7.27L6.85,17.62,5.51,15.08c-6.95-.4-7.57,3.64-.22,7.12L4.1,24C-.74,29-.29,34,.47,46.25v4a2.27,2.27,0,0,0,2.27,2.27h9.71a2.27,2.27,0,0,0,2.27-2.27V48.45h3.62V45.36l-.06-.74c-.16-2.08-.33-4.11-.42-6.09l-5.73-.05A3.88,3.88,0,0,1,10.21,38,3.3,3.3,0,0,1,9,36.65l-.93-2.26C7.42,32.63,8,31.78,10,32l7.88,1a21.93,21.93,0,0,1,3.19-10.85c-.17-.25-.31-.5-.45-.74A11.35,11.35,0,0,1,20,20.06h-9.7l2.35-9.76c.64-3,2.49-5.55,5.55-5.55h12.3A26.67,26.67,0,0,1,32.15.94Z"/></svg>`
      case 'timelines':
        return `<svg class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`
      case 'fares':
        return `<svg
        class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
        />
      </svg>`
      case 'reports':
        return `<svg
        class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
        />
      </svg>`
      case 'quarters':
        return `<svg
        class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke-width="1.5"
         stroke="currentColor"
         >
        <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
        />
      </svg>`
      case 'invoices':
        return `<svg
        class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 48 48"><g fill="none"
         stroke="currentColor"
         stroke-width="4"
         >
         <path
         stroke-linecap="round"
         stroke-linejoin="round"
         d="M24 6H9a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-5m-18 8v8m-10 0h20"/><circle cx="37" cy="13" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M37 20v-4m0-6V6m-6.062 10.5l3.464-2m5.196-3l3.464-2m-12.124 0l3.464 2m5.196 3l3.464 2"
         /></g>
         </svg>`
      case 'support':
        return `<svg
        class="text-nav-svg-dark group-hover:text-nav-light h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
        />
      </svg>`
      default:
        return '<svg class="navbar-svg-default mr-4 flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>';
    }
  }
}
