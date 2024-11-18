import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-service-areas',
  templateUrl: './add-service-areas.component.html',
  styleUrls: ['./add-service-areas.component.css']
})
export class AddServiceAreasComponent implements OnInit {
  serviceAreaForm !: FormGroup;
  zipCodeForm !: FormGroup
  submitted = false;
  zipCodeSubmitted = false;
  zipCodeArray = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.serviceAreaForm = this.fb.group({
      name: ["", Validators.required],
      status: ['active', Validators.required],
      zipCodes: [[]]
    });

    this.zipCodeForm = this.fb.group({
      zipCode: ['', Validators.required]
    })
  }

  get form() {
    return this.serviceAreaForm.controls;
  }

  get formControl(){
    return this.zipCodeForm.controls;
  }

  saveServiceArea() {
    this.submitted = true;
    console.log('serviceAreaForm', this.serviceAreaForm.value);
  }

  addZipCode() {
    this.submitted = true;
    this.zipCodeSubmitted = true;
    if (this.zipCodeForm.invalid) {
      return;
    }
    for(let item of this.zipCodeArray){
      this.serviceAreaForm.value.zipCodes.push(item);
    }
    this.zipCodeArray= [];
    this.zipCodeForm.reset();
    this.zipCodeSubmitted = false;
    this.submitted = false;
  }

  removeZipCode(index:number) {
    const z1 = this.serviceAreaForm.value.zipCodes;
    z1.splice(index, 1);
    this.serviceAreaForm.patchValue({
      zipCodes: z1
    });
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    if (inputValue) {
      const values = inputValue.split(',');
       this.zipCodeArray = values.map((value: any) => value.trim());
    }
  }

}
