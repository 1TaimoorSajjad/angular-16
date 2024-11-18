import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  duration = 5 * 1000; // 10 seconds

  @ViewChild('timer', { static: true }) timer: any;

  origin = { lat: 0.0, lng: 0.0 };
  destination = { lat: 0.0, lng: 0.0 };
  zoom: number = 12;
  driverSearch = "";
  notificationSearch = "";
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  display: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  geoCoder: any;
  public tripModalObject: any;
  public assignModalObj: any;
  public driverTripModalObj: any;
  public driverTripModalObject: any;
  live = true;
  isFilter = false;

  public drivers = [];
  filteredDrivers = [];
  public approachingTrips = [];
  public expiringSoonTrips = [];
  public markedTrips = [];
  notifications: any = [];
  companyDriverStatus: any;
  tripId = null;
  reDispatchTripDetail: any;
  selectedDriver: any;

  bounds: any;
  tripsInProgress: any;
  tripsInProgressObserver: any;
  selectedApproachingTripOption: any;
  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef | undefined;

  onlineDrivers = 0;
  busyDrivers = 0;
  offlineDrivers = 0;

  isInprogressRoutes = false;
  isMarkedReadyTrips = false;
  isMarkedReadyRoutes = false;
  isExpiredTrips = false;
  isExpiredTripRoutes = false;
  isTraffic = false;
  isApproachingTrips = false;
  isAutoZoom = true;
  openPopup = false;
  showCreateTripModal = true;
  showInprogressTripsSlideout = false;
  driverDetailProfileModal: any;
  selectedMapDriver = '';

  serviceAreaList = [];
  selectedServiceArea = [];
  preServiceAreas: any = {};

  constructor() {}

  ngOnInit(): void {}

  onChangeServiceArea() {}
  hightlightDriver(evt: any) {}
  openDriverTripDetailModal(id: any) {}
  onClickProfile(evt: any) {}
  onTimerComplete() {}
  toggleTraffic() {}

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.display = event.latLng.toJSON();
    }
  }

  ngOnDestroy(): void {}
}
