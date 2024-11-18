import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { imageProcessing } from 'src/app/utils/image-processing-utils';

@Component({
  selector: 'app-add-levelofservice',
  templateUrl: './add-levelofservice.component.html',
  styleUrls: ['./add-levelofservice.component.css']
})
export class AddLevelofserviceComponent implements OnInit {
  levelOfServiceForm !: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.levelOfServiceForm = this.fb.group({
      title: ["", Validators.required],
      status: ['active', Validators.required],
      description: [""],
      profileImageURL: ["", Validators.required]
    });
  }

  saveLevelOfService() {
    this.submitted = true;
    if (this.levelOfServiceForm.invalid) {
      return;
    }

    console.log('Form', this.levelOfServiceForm.value);

  }
  get form() {
    return this.levelOfServiceForm.controls;
  }

  async fileProcessing(ImageInput: any, form: any) {
    imageProcessing(ImageInput)
      .subscribe(async (result) => {

      })

  }


}
