import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripService } from 'src/app/services/trip-service/trip.service';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps'
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-trip-details-modal',
  templateUrl: './trip-details-modal.component.html',
  styleUrls: ['./trip-details-modal.component.css']
})
export class TripDetailsModalComponent implements OnInit {
  @Input() tripdetailModallObj: any;
  @Output() onCloseModal = new EventEmitter<any>();
  tripDetail: any;
  origin: any;
  destination: any;

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;

  directionsResults$!: Observable<google.maps.DirectionsResult|undefined>;

  constructor(
    private tripService: TripService,
    private directionService: MapDirectionsService
  ) { }

  ngOnInit(): void {
    this.origin = { lat: this.tripdetailModallObj.jobOriginLatitude, lng: this.tripdetailModallObj.jobOriginLongitude };
    this.destination = { lat: this.tripdetailModallObj.jobDestinationLatitude, lng: this.tripdetailModallObj.jobDestinationLongitude };

    const request: google.maps.DirectionsRequest = {
      // destination: {lat: 12, lng: 4},
      // origin: {lat: 14, lng: 8},
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = this.directionService.route(request).pipe(map(response => response.result));

    this.getTripDetail();
    this.getDirection();
  }

  getTripDetail() {
    this.tripService.getTripDetail(this.tripdetailModallObj._id)
      // .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((data: any) => {
        this.tripDetail = data;
      });
  }


  getDirection() {
    this.origin = { lat: this.tripdetailModallObj.jobOriginLatitude, lng: this.tripdetailModallObj.jobOriginLongitude };
    this.destination = { lat: this.tripdetailModallObj.jobDestinationLatitude, lng: this.tripdetailModallObj.jobDestinationLongitude };
  }

  googleImageURL(latitude: any, longitude: any) {
    return `https://maps.googleapis.com/maps/api/staticmap?markers=icon:https://nemtpanel.com/modules/companies/client/img/buttons/normal.png|${latitude},${longitude}&zoom=18&size=500x500&key=AIzaSyC60nn_VZXJTxtmWuIB9SnHGU6USDb1LGo`;
  }

  modalClose() {
    this.onCloseModal.emit(null);
  }

  ngOnDestroy(): void {
  }

}
