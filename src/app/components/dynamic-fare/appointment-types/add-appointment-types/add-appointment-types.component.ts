import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-appointment-types',
  templateUrl: './add-appointment-types.component.html',
  styleUrls: ['./add-appointment-types.component.css']
})
export class AddAppointmentTypesComponent implements OnInit {

  tripPurposesForm !: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.tripPurposesForm = this.fb.group({
      title: ['', Validators.required],
      status: ['', Validators.required],
    });

  }

  get form() {
    return this.tripPurposesForm.controls;
  }

  onCreateTripPurposes() {
    this.submitted = true;
    console.log('tripPurposesForm');
  }
}
