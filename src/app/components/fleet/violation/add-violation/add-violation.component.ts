import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-violation',
  templateUrl: './add-violation.component.html',
  styleUrls: ['./add-violation.component.css']
})
export class AddViolationComponent implements OnInit {
  violationForm !: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.violationForm = this.fb.group({
      batch: this.fb.group({
        pickupEarly: ["0", Validators.required],
        pickupWait: ["0", Validators.required],
        pickupLate: ["0", Validators.required],
        dropoffEarly: ["0", Validators.required],
        dropoffWait: ["0", Validators.required],
        dropoffLate: ["0", Validators.required],
        returnPickupEarly: ["0", Validators.required],
        returnPickupWait: ["0", Validators.required],
        returnPickupLate: ["0", Validators.required],
        maxOnBoardTime: ["0", Validators.required],
        breakCushion:[0,Validators.required],
        maxDistancePerRun: ["0", Validators.required],
        maxPerRun: ["0", Validators.required],
        isOnboardViolation: [false, Validators.required],
        isCapacityViolation: [false, Validators.required],
      }),
      single: this.fb.group({
        pickupEarly: ["0", Validators.required],
        pickupWait: ["0", Validators.required],
        pickupLate: ["0", Validators.required],
        dropoffEarly: ["0", Validators.required],
        dropoffWait: ["0", Validators.required],
        dropoffLate: ["0", Validators.required],
        returnPickupEarly: ["0", Validators.required],
        returnPickupWait: ["0", Validators.required],
        returnPickupLate: ["0", Validators.required],
        maxOnBoardTime: ["0", Validators.required],
        breakCushion:[0,Validators.required],
        maxDistancePerRun: ["0", Validators.required],
        maxPerRun: ["0", Validators.required],
        isOnboardViolation: [false, Validators.required],
        isCapacityViolation: [false, Validators.required],
      })
    });
  }

  createViolation(){
    console.log('violationForm', this.violationForm.value);
  }
}
