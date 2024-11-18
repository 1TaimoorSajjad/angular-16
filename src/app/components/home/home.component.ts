import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { getBrokersList } from 'src/app/utils/utils.common';
import { SharedDataService } from 'src/app/services/shared-service/shared-data.service';
// import { SocketService } from 'src/app/services/socket-service/socket-service.service';
import { CompanyService } from '../company/service/company.service';
import { TripService } from 'src/app/services/trip-service/trip.service';
import { HttpClient } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import { urls } from 'src/app/utils/url.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild("date", { static: true }) date_v!: ElementRef;
  @ViewChild("audioOption", { static: true }) audioPlayerRef!: ElementRef;
  // tripDetail = 'Taimoor';
  tripDetailObj: any;
  providerTime = moment().toISOString();
  assigns: any;
  datePipeEn = new DatePipe("en-US");
  searchForm!: FormGroup;
  currentUser: any;
  searchCompanyType = "";
  submitted = false;
  companyType: any;
  filteredAssigns: any;
  emptySearch!: boolean;
  searchBroker = '';
  searchStatus: string = "";
  companyTypes: any = getBrokersList;
  intervalTimeID: any;
  userPlatform: any;
  filterOpen = false;
  view = "list";
  assignKey: any;
  search: any;

  filterdataList = [];
  selectedDropdownIndex = -1;
  toggleActionButtons: boolean = false;
  showSlideFilter = false;

  companies: any;
  companiesByKey: any;

  columns: any = {
    name: true,
    address: true,
    miles: true,
    vehicle: true,
    provider: true,
    status: true
  }
  
  constructor(
    private tripService: TripService,
    private sharedDataService: SharedDataService,
    // private socketService: SocketService,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient, 
  ) { }

  ngOnInit(): void {
    this.intervalTimeID = setInterval(() => {
      this.providerTime = moment().toISOString();
    }, 1000);

    this.searchForm = this.fb.group({
      search_date: ["", Validators.required],
      search_tripId: ["", Validators.required],
      search_name: ["", Validators.required],
      search_phone: ["", Validators.required],
    });

    this.sharedDataService.getUser()
    // .pipe(takeUntil(componentDestroyed(this)))
    .subscribe((data) => {
      if (data && data.platform) {
        this.userPlatform = data.platform;
      }
      this.currentUser = data;
    });

    this.listenSocket();
    this.getCompanies();
    this.initMultiSelect();

  }

  getCompanies() {
    const queryParams = {
      accountStatus: 'active',
      isRemoveIAAL: true
    };

    this.companyService
      .getCompanies(queryParams)
      // .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((data: any) => {
        if (data && data.length) {
          this.companies = data;
          this.companiesByKey = data.reduce((obj: any, item: any) => (obj[item._id] = item, obj) ,{});
        }
      });
  }

  getTrips() {
    this.searchForm.value.search_date = this.datePipeEn.transform(
      this.date_v.nativeElement.value,
      "yyyy-MM-dd"
    );

    const scheduleTime = moment(this.searchForm.value.search_date)
      .tz(this.searchCompanyType ? this.companiesByKey[this.searchCompanyType].timeZone : this.currentUser.timeZone, true)
      .toISOString();

    let search: any = {};
    if (this.searchForm.value.search_name) {
      search.displayName = this.searchForm.value.search_name;
    }
    if (this.searchForm.value.search_tripId) {
      search["tripId"] = this.searchForm.value.search_tripId;
    }
    if (this.searchForm.value.search_date) {
      search["scheduleTime"] = scheduleTime;
    }
    if (this.searchForm.value.search_phone) {
      search["contactNumber"] = this.searchForm.value.search_phone;
    }

    if (this.searchCompanyType) {
      // Single
      search["companies"] = [this.searchCompanyType];
      search["timeZone"] = this.companiesByKey[this.searchCompanyType].timeZone;
    } else {
      // All
      search["companies"] = this.companies.map((c: any) => c._id);
      search["timeZone"] = this.currentUser.timeZone;
    }

    this.tripService.getDashboardTrips(search)
    // .pipe(takeUntil(componentDestroyed(this)))
    .subscribe((data) => {
      this.searchStatus = "";
      this.searchBroker = "";
      this.assigns = data;
      this.filteredAssigns = data;
     
      if (this.filteredAssigns && this.filteredAssigns.length) {
        this.filteredAssigns.sort((a: any, b: any) => {
          return (this.companiesByKey
              && this.companiesByKey[a.company]
              && this.companiesByKey[b.company]
              && this.companiesByKey[a.company].displayName.localeCompare(this.companiesByKey[b.company].displayName))
              || <any>new Date(a.scheduleTime) - <any>new Date(b.scheduleTime)
        });
      }
    });
    this.submitted = false;
  }

  onSubmit() {
    this.emptySearch = false;
    this.submitted = true;
    if (
      !this.searchForm.value.search_date &&
      !this.searchForm.value.search_tripId &&
      !this.searchForm.value.search_name &&
      !this.searchForm.value.search_phone
    ) {
      this.toastr.error(
        "Please fill atleast one field to continue search.",
        "Empty Search"
      );
      this.onAudioPlay();
      this.emptySearch = true;
      return;
    }
    this.getTrips();
  }

  clearSearch() {
    this.searchForm.patchValue({
      search_date: "",
      search_tripId: "",
      search_name: "",
      search_phone: "",
    });
    this.searchCompanyType = '';
  }

  updateJob(assign: any, assignKey: any) {
    // Update Job - Mark Ready, Mark VIP, Mark Confirm, Mark Voicemail
    let params: any = {
      assignId: assign._id
    }
    params[assignKey] = !assign[assignKey];
    // this.socketService.emit(Events.UPDATE_ASSIGN_TRIP, params);
    this.selectedDropdownIndex = -1;
    this.toggleActionButtons = false;
  }

  listenSocket() {
    // this.socketService.addListener(Events.UPDATE_ASSIGN_TRIP)
    // .pipe(takeUntil(componentDestroyed(this)))
    //   .subscribe(data => {
    //     if (data.success) {
    //       if (data.assign) {
    //         const trip = data.assign;
    //         if (this.assigns && this.assigns.length) {
    //           const idx = this.assigns.findIndex((assign) => assign._id == trip._id);
    //           this.assigns[idx].isReadyForPickup = trip.isReadyForPickup;
    //           this.assigns[idx].isVipTrip = trip.isVipTrip;
    //           this.assigns[idx].isConfirmedTrip = trip.isConfirmedTrip;
    //           this.assigns[idx].isVoiceMail = trip.isVoiceMail;
    //         }
    //       }
    //     }
    //   });
  }

  fetchDriver(assign: any) {
    this.tripService
      .getTripDetail(assign._id)
      // .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((data: any) => {
        assign.driver = data.driver;
      });
  }

  onChangeDropdownFilters() {
    this.filterTrips();
  }

  filterTrips() {
    this.filteredAssigns = this.assigns
      .filter((trip: any) => {
        if (this.searchStatus) {
          if (this.searchStatus === "onway") {
            if (!(trip.jobStatus === this.searchStatus)) return false;
          } else {
            if (!(trip.status === this.searchStatus)) return false;
          }
        }

        if (this.searchBroker) {
          if (!(trip.companyType === this.searchBroker)) return false;
        }

        return true;
      });

  }

  viewTripDetails(trip: any) {
    this.tripDetailObj = trip;
  }

  showActionButtons(idx: any) {
    this.selectedDropdownIndex = idx;
    this.toggleActionButtons = !this.toggleActionButtons;
  }

  closeActionMenu(evt: Event) {
    if (evt && evt.target && (evt.target as Element).id.includes('toggle-action-menu-svg')) return;
    this.selectedDropdownIndex = -1;
    this.toggleActionButtons = false;
  }

  toggleView() {
    if (this.view === "list") {
      this.view = "grid";
    } else {
      this.view = "list";
    }
  }

  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  showFilter() {
    this.showSlideFilter = !this.showSlideFilter
  }

  closeFilter() {
    this.showSlideFilter = false;
  }

  setColumnVisibility(column: any) {
    this.columns[column] = !this.columns[column];
  }

  isAnyColumnToggled() {
    return Object.keys(this.columns).some(c => this.columns[c] === false);
  }

  onAudioPlay() {
    this.audioPlayerRef.nativeElement.play();
  }

  get form() {
    return this.searchForm.controls;
  }

  ngOnDestroy(): void {
    if (this.intervalTimeID) {
      clearInterval(this.intervalTimeID);
    }
    // this.socketService.removeListener(Events.UPDATE_ASSIGN_TRIP);
  }

  changeC() {
    console.log('hii');
  }
  todayDate = moment.tz("America/New_York").startOf('day').toISOString();

  call(){
    this.getStaffList()
      .subscribe(data => {
        if(data) {
        }
    });
  }

  onDateChange(evt: any) {
    console.log(evt);
  }

  getStaffList(): Observable<any> {
    return this.http.get<any>(urls.API_URL + urls.STAFF_URL)
  }

  showToast() {
    this.toastr.success('Trip updated successfully!', 'Alert');
  }

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  initMultiSelect() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
