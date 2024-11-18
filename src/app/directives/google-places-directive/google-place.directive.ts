import { Directive, ElementRef, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
declare var google: any;

@Directive({
  selector: '[google-place]'
})
export class GooglePlaceDirective implements OnInit, OnChanges {
  @Input() radius: any;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;
  constructor(elRef: ElementRef, private mapsAPILoader: MapsAPILoader) {
    // elRef will get a reference to the element where
    // the directive is placed
    this.element = elRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.radius && changes.radius.currentValue) {
      const options = this.setupOptions( changes.radius.currentValue);
      this.initAutocomplete(options);
    } else {
      this.initAutocomplete();
    }
  }

  setupOptions(radius) {
    const center = radius.center;
    const val = (radius.miles * 1.609344) / 100

    // Create a bounding box with sides ~100km away from the center point - 1.0 means ~100KM
    const defaultBounds = {
      north: center.lat + val,
      south: center.lat - val,
      east: center.lng + val,
      west: center.lng - val,
    };

    const options = {
      bounds: defaultBounds,
      // componentRestrictions: { country: 'US' },
      strictBounds: true
      // types: ['(cities)']
      // types: ['geocode']  // 'establishment' / 'address' / 'geocode'
    }
    return options;
  }

  ngOnInit() {
    if (this.radius) {
      const options = this.setupOptions(this.radius);
      this.initAutocomplete(options);
    } else {
      this.initAutocomplete();
    }
  }

  initAutocomplete(options?) {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.element, options ? options : {
        // componentRestrictions: { country: 'US' },
        // types: ['geocode']  // 'establishment' / 'address' / 'geocode'
      });

      // Event listener to monitor place changes in the input
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        // Emit the new address object for the updated place
        this.onSelect.emit(autocomplete.getPlace());
      });
    });
  }

}
