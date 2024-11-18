import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { AuthorizationGuard } from './services/auth-guard/authorization.guard';
import { UserRole } from './enums/enums';
import { DriversListComponent } from './components/profiling/drivers/drivers-list/drivers-list.component';
import { AddDriverComponent } from './components/profiling/drivers/add-driver/add-driver.component';
import { StaffListComponent } from './components/profiling/staff/staff-list/staff-list.component';
import { AddStaffComponent } from './components/profiling/staff/add-staff/add-staff.component';
import { MembersListComponent } from './components/profiling/members/members-list/members-list.component';
import { AddMemberComponent } from './components/profiling/members/add-member/add-member.component';
import { FundingSourcesListComponent } from './components/profiling/fundingSources/funding-sources-list/funding-sources-list.component';
import { AddFundingSourcesComponent } from './components/profiling/fundingSources/add-funding-sources/add-funding-sources.component';
import { VehicleListComponent } from './components/fleet/vehicles/vehicle-list/vehicle-list.component';
import { AddVehicleComponent } from './components/fleet/vehicles/add-vehicle/add-vehicle.component';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
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
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: SigninComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER],
    }
  },

  // drivers
  {
    path: 'credentialing/drivers',
    component: DriversListComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER],
    }
  },

  {
    path: 'credentialing/drivers/add',
    component: AddDriverComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER],
    }
  },

  // staff
  {
    path: 'credentialing/staff',
    component: StaffListComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER],
    }
  },

  {
    path: 'credentialing/staff/add',
    component: AddStaffComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER],
    }
  },

  // Members
  {
    path: 'credentialing/members',
    component: MembersListComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER],
    }
  },

  {
    path: 'credentialing/members/add',
    component: AddMemberComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER],
    }
  },

  // fundingSources
  {
    path: 'credentialing/fundingsource',
    component: FundingSourcesListComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER],
    }
  },

  {
    path: 'credentialing/fundingsource/add',
    component: AddFundingSourcesComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER],
    }
  },

  {
    path: 'credentialing/fundingsource/:id/edit', component: AddFundingSourcesComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },



  // fleet

  {
    path: 'fleet/vehicles', component: VehicleListComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'fleet/vehicles/add', component: AddVehicleComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'fleet/vehicles/:id/edit', component: AddCompanyComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },

  // fleet/levelofservic

  {
    path: 'fleet/levelofservice', component: LevelofserviceListComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'fleet/levelofservice/add', component: AddLevelofserviceComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'fleet/levelofservice/:id/edit', component: AddLevelofserviceComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },

  // spaceTypes

  {
    path: 'fleet/spaceTypes', component: SpaceTypesListComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'fleet/spaceTypes/add', component: AddSpaceTypesComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'fleet/spaceTypes/:id/edit', component: AddSpaceTypesComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },

  // equipment
  {
    path: 'fleet/equipment', component: EquipmentListComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'fleet/equipment/add', component: AddEquipmentComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'fleet/equipment/:id/edit', component: AddEquipmentComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },

  // service-areas

  {
    path: 'fleet/service-areas', component: ServiceAreasListComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'fleet/service-areas/add', component: AddServiceAreasComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'fleet/service-areas/:id/edit', component: AddServiceAreasComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },

  // violation

  {
    path: 'fleet/violation', component: AddViolationComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },

  // rates

  {
    path: 'rates', component: RatesListComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'rates/add', component: AddRatesComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'rates/:id/edit', component: AddRatesComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  // addons

  {
    path: 'rates/addons', component: AddonsListComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'rates/addons/add', component: AddAddonsComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'rates/addons/:id/edit', component: AddAddonsComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  // appointment-types
  {
    path: 'rates/appointment-types', component: AppointmentTypesListComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'rates/appointment-types/add', component: AddAppointmentTypesComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },
  {
    path: 'rates/appointment-types/:id/edit', component: AddAppointmentTypesComponent, canActivate: [AuthorizationGuard], data: {
      role: [UserRole.COMPANY, UserRole.ADMIN, UserRole.AUTHORIZER, UserRole.DISPATCHER]
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
