import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CAPACITY, FUELTYPES, BODYTYPES } from 'src/app/utils/utils.common';
@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {
selectAllFundingSource(arg0: boolean) {
throw new Error('Method not implemented.');
}
onSpaceTypeChange($event: any) {
throw new Error('Method not implemented.');
}
getAddress($event: Event) {
throw new Error('Method not implemented.');
}
addCapacity() {
throw new Error('Method not implemented.');
}
removeCapacity(_t432: number) {
throw new Error('Method not implemented.');
}
selectAllCapacities(arg0: boolean) {
throw new Error('Method not implemented.');
}
  fleetForm!: FormGroup;
  selectedStatus: any = "active";
  user: any;
  serviceAreas: any=[];
  levelOfServices: any=[];
  bodyType: any=[];
  equipments:any = [];
  capacity = CAPACITY;
  fuelTypes = FUELTYPES;
  bodyTypes = BODYTYPES;
  fundingSources: any=[]
  spaceTypes:any=[];
  spaceTypesMain: any = [];
  isSubmitted = false;
  fleetId:any;
  spaceTypeCapacity:any = []
  status = "active"
  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fleetForm = this.fb.group({
      setiDecall: ["", Validators.required],
      serviceAreas: [""],
      los: ["", Validators.required],
      losDetails: ["", Validators.required], // for payload only
      spaceType: ["",Validators.required],
      spaceTypeDetails: ["", Validators.required], // for payload only
      bodyType: ["", Validators.required],
      equipments: [""],
      capacity: ["", Validators.required],
      fundingSources: [[]],
      vin: ["", Validators.required],
      driverCarNumber: ["", Validators.required],
      realOdometer: [""],
      driverCarYear: ["", Validators.required],
      driverCarModel: ["", Validators.required],
      driverCarColor: ["", Validators.required],
      fuelType: ["", Validators.required],
      gasCardNumber: [""],
      limitation: [""],
      notes: [""],
      dimensions: this.fb.group({
        width: [""],
        height: [""],
        length: [""],
        groundClearance: [""],
        bedLength: [""],
        rampWidth: [""],
      }),
      owner: this.fb.group({
        name: [""],
        address: [""],
        latitude: [""],
        longitude: [""],
        phone: [""],
        business: [""],
        licenseNo: [""],
      }),

      capacities:  this.fb.array([]),
      status: ["active", Validators.required],
  })
}


get form() {
  return this.fleetForm.controls;
}

get dimensions() {
  return this.fleetForm.controls.dimensions;
}

get capacitiesForm() {
  return this.fleetForm.get('capacities') as FormArray;
}

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.fleetForm.valid) {
      console.log(this.fleetForm.value);
      // Handle form submission logic here
    }
  }

  onLosChange(event: any): void {
    // Handle Level of Service change logic here
  }
}

