import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { imageProcessing, ImageSnippet } from 'src/app/utils/image-processing-utils';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  addNewStaff !: FormGroup;
  submitted = false;
  profileImageURL = null;
  selectedFile: ImageSnippet | null = null;
  passwordToggleFlag = true;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addNewStaff = this.fb.group({
      displayName: ["", [Validators.required, Validators.minLength(3)]],
      contactNumber: ["", Validators.required],
      address: ["", Validators.required],
      roles: ["", Validators.required],
      accountStatus: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      staffId: [""],
      images: [""],
    });

  }


  get form() {
    return this.addNewStaff.controls;
  }

  processFile(imageInput: any) {
    imageProcessing(imageInput)
      .subscribe((result) => {
        this.selectedFile = result.file;
        this.profileImageURL = result.src;
      });
  }

  getAddress(place: any) {
    console.log('place', place);
  }

  togglePasswordType() {
    this.passwordToggleFlag = !this.passwordToggleFlag;
  }

  saveStaff() {
    this.submitted = true;
    console.log('form', this.addNewStaff.value);
    
  }
}




