import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UnAuthorizationGuard } from './services/non-auth-guard/unauthorization-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { MySocketWrapper } from './services/socket-service/socket-wrapper';
// import { SocketService } from './services/socket-service/socket-service.service';
import { DatePipe } from './pipes/date-pipe/date.pipe';
import { SideNavComponent } from './components/shared/layout/side-nav/side-nav.component';
import { HeaderComponent } from './components/shared/layout/header/header.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OperationsComponent } from './components/operations/operations.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptor } from './services/token-interceptor/token.interceptor';
import { AuthorizationGuard } from './services/auth-guard/authorization.guard';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { SortByPipe } from './pipes/order-by/order-by.pipe';
import { CamelCasePipe } from './pipes/camelcase.filter/camelcase.filter.pipe';
import { TripDetailsModalComponent } from './components/shared/modals/trip-details-modal/trip-details-modal.component';
import { TripActionsDropdownComponent } from './components/shared/components/trip-actions-dropdown/trip-actions-dropdown.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AddDriverComponent } from './components/profiling/drivers/add-driver/add-driver.component';
import { DriversListComponent } from './components/profiling/drivers/drivers-list/drivers-list.component';
import { StaffListComponent } from './components/profiling/staff/staff-list/staff-list.component';
import { AddStaffComponent } from './components/profiling/staff/add-staff/add-staff.component';
import { MembersListComponent } from './components/profiling/members/members-list/members-list.component';
import { AddMemberComponent } from './components/profiling/members/add-member/add-member.component';
import { FundingSourcesListComponent } from './components/profiling/fundingSources/funding-sources-list/funding-sources-list.component';
import { AddFundingSourcesComponent } from './components/profiling/fundingSources/add-funding-sources/add-funding-sources.component';
import { MapperListComponent } from './components/profiling/fundingSources/mapper/mapper-list/mapper-list.component';
import { AddMapperComponent } from './components/profiling/fundingSources/mapper/add-mapper/add-mapper.component';
import { AddVehicleComponent } from './components/fleet/vehicles/add-vehicle/add-vehicle.component';
import { VehicleListComponent } from './components/fleet/vehicles/vehicle-list/vehicle-list.component';
import { LevelofserviceListComponent } from './components/fleet/levelofservice/levelofservice-list/levelofservice-list.component';
import { AddLevelofserviceComponent } from './components/fleet/levelofservice/add-levelofservice/add-levelofservice.component';
import { SpaceTypesListComponent } from './components/fleet/spaceTypes/space-types-list/space-types-list.component';
import { AddSpaceTypesComponent } from './components/fleet/spaceTypes/add-space-types/add-space-types.component';
import { EquipmentListComponent } from './components/fleet/equipment/equipment-list/equipment-list.component';
import { AddEquipmentComponent } from './components/fleet/equipment/add-equipment/add-equipment.component';
import { ServiceAreasListComponent } from './components/fleet/ServiceAreas/service-areas-list/service-areas-list.component';
import { AddServiceAreasComponent } from './components/fleet/ServiceAreas/add-service-areas/add-service-areas.component';
import { AddViolationComponent } from './components/fleet/violation/add-violation/add-violation.component';
import { RatesListComponent } from './components/dynamic-fare/rates/rates-list/rates-list.component';
import { AddRatesComponent } from './components/dynamic-fare/rates/add-rates/add-rates.component';
import { AddonsListComponent } from './components/dynamic-fare/addons/addons-list/addons-list.component';
import { AddAddonsComponent } from './components/dynamic-fare/addons/add-addons/add-addons.component';
import { AppointmentTypesListComponent } from './components/dynamic-fare/appointment-types/appointment-types-list/appointment-types-list.component';
import { AddAppointmentTypesComponent } from './components/dynamic-fare/appointment-types/add-appointment-types/add-appointment-types.component';
import { ClockTimePipe } from './pipes/clock-time/clock-time.pipe';
import { FilterPipe } from './pipes/list-filter-pipe/list-filter-pipe';
import { CircleTimerModule } from "./libraries/circle-timer/src/lib/circle-timer.module";


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 80,
  bgsType: 'ball-spin-clockwise',
  blur: 0,
  fgsColor: '#727cf5',
  fgsPosition: 'center-center',
  fgsSize: 0,
  fgsType: 'ball-spin',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 150,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: '#ffffff00',
  pbColor: '#727cf5',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
};

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    SideNavComponent,
    HeaderComponent,
    OperationsComponent,
    SigninComponent,
    ResetPasswordComponent,
    HomeComponent,
    AddCompanyComponent,
    CompanyListComponent,
    SortByPipe,
    CamelCasePipe,
    ClockTimePipe,
    FilterPipe,
    TripDetailsModalComponent,
    TripActionsDropdownComponent,
    AddDriverComponent,
    DriversListComponent,
    StaffListComponent,
    AddStaffComponent,
    MembersListComponent,
    AddMemberComponent,
    FundingSourcesListComponent,
    AddFundingSourcesComponent,
    MapperListComponent,
    AddMapperComponent,
    AddVehicleComponent,
    VehicleListComponent,
    LevelofserviceListComponent,
    AddLevelofserviceComponent,
    SpaceTypesListComponent,
    AddSpaceTypesComponent,
    EquipmentListComponent,
    AddEquipmentComponent,
    ServiceAreasListComponent,
    AddServiceAreasComponent,
    AddViolationComponent,
    RatesListComponent,
    AddRatesComponent,
    AddonsListComponent,
    AddAddonsComponent,
    AppointmentTypesListComponent,
    AddAppointmentTypesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig), // import NgxUiLoaderModule
    NgxUiLoaderHttpModule.forRoot({
        exclude: ['http://provider.qalbs.com/api/assigns/dashboard', 'http://provider.qalbs.com/api/notifications', 'http://provider.qalbs.com/api/assigns/corporate',
            'http://provider.qalbs.com/api/users/me', 'http://provider.qalbs.com/api/drivers/nearby'],
        showForeground: true
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-bottom-left',
        preventDuplicates: true,
        progressBar: true
    }),
    NgMultiSelectDropDownModule.forRoot(),
    GoogleMapsModule,
    NgSelectModule,
    CircleTimerModule
],
  // providers: [
  //   { provide: UnAuthorizationGuard, useClass: UnAuthorizationGuard },
  // ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: AuthorizationGuard, useClass: AuthorizationGuard },
    // { provide: UnAuthorizationGuard, useClass: UnAuthorizationGuard },
    // { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
    // { provide: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: false } },
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // },
    DatePipe,
    // MySocketWrapper,
    // SocketService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
