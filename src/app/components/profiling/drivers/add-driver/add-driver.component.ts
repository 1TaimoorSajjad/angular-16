import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { imageProcessing } from 'src/app/utils/image-processing-utils';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  createDriverFormV2 !: FormGroup;
  submitted = false;
  serviceAreas = [
    { _id: '65f07df250d85a035fa97a42', name: 'Sacramento' },
    { _id: '65f08b4a00e65e68cecebff0', name: 'Santa Clara' },
    { _id: '65fdc13c07e98880e9e9df87', name: 'San Mateo' },
    { _id: '65fdc19507e98880e9e9df94', name: 'San Francisco' }
  ];
  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {

    this.createDriverFormV2 = this.fb.group({
      legalName: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      profileRole: ['', Validators.required],
      stationManager: ['', Validators.required],
      serviceAreas: ['', Validators.required],
      costCenter: ['', Validators.required],
      employeeId: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      password: ['', Validators.required],
      startingPointAddress: this.fb.group({
        address: ['', Validators.required],
        latitude: [0, Validators.required],
        longitude: [0, Validators.required],
      }),

      address: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
      preStartDate: [''],
      startDate: ['', Validators.required],
      preEndDate: ['', Validators.required],
      endDate: ['', Validators.required],
      scheduleShells: ['', Validators.required],
      proficiency: [[], Validators.required],
      competency: ['', Validators.required],
      specialRequests: [''],
      limitation: [''],
      fundingSources: this.fb.array([]),
      profileImageURL: [''],

      zipCode: ["",],
      state: [""],
      city: [""],
      driverSignatureImage: [""],
      driverLicenseNumber: ["", Validators.required],
      accountStatus: ['active', Validators.required],
      shifts: this.fb.array([]),

    });

  }

  get form() {
    return this.createDriverFormV2.controls;
  }

  get addressForm() {
    
    return this.createDriverFormV2.get('startingPointAddress') as FormGroup | null;
  }

//   get addressForm() {
//     // Assuming form is your FormGroup or FormArray
// // const form = this.form.get('someControl') as FormGroup; // Type assertion
// // const control = form.get('controls')?.get('nestedControl'); // Correct access

//     return this.createDriverFormV2.get('startingPointAddress') as FormArray
//     // return this.createDriverFormV2.controls.startingPointAddress['controls'];
//   }

  get shiftsForm() {
    return  this.createDriverFormV2.get('shifts')as FormArray;
  }

  onCreateDriverV2() {
    this.submitted = true;
    console.log('createDriverFormV2' , this.createDriverFormV2.value);
  }

  setGarageAddress(place:any) {
    console.log('place');
  }

  onDateChange(evt:any, control: AbstractControl) {
    if (evt) {
      control.setValue(moment(evt).toISOString());
    }
  }

  
  setAddress(place:any) {
    console.log('place');
  }

  async fileProcessing(ImageInput:any, form:any) {
    imageProcessing(ImageInput)
      .subscribe(async (result) => {
        console.log('result');
        // const data: any = await this.proTips.changeCoverImage(result.file).toPromise();
        // form.setValue(data.location);
      })

  }

}
