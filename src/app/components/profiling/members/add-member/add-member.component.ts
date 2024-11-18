import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { imageProcessing } from 'src/app/utils/image-processing-utils';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  memberForm !: FormGroup;
  commentForm !: FormGroup;
  submitted: boolean = false;
  cmtSubmitted: boolean = false;
  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit() {


    this.memberForm = this.fb.group({
      firstName: ["", Validators.required],
      middleName: [""],
      lastName: ["", Validators.required],
      email: [""],
      clientId: ["", Validators.required],
      preDob: [""],
      dob: [""],
      contactNumber: ["", Validators.required],
      cellPhone: [""],
      los: [""],
      spaceType: [""],
      fundingSource: [""],
      gender: ["", Validators.required],
      weight: [""],
      stairsStep: [""],
      covidStatus: [""],
      privateNote: [""],
      note: [""],
      clientType: ["", Validators.required],
      password: [''],
      smsConsent: [false],

      statusDetails: this.fb.group({
        preExpiryDate: [''],
        expiryDate: [""],
        reason: [""],
      }),

      type: ["regular"],
      preVipExpiryDate: [''],
      vipExpiryDate: [""],
      homeAddress: this.fb.group({
        name: [""],
        address: ["", Validators.required],
        aptOrSuite: [""],
        zipCode: [""],
        state: [""],
        city: [""],
        latitude: [""],
        longitude: [""],
        street: [""]
      }),
      profileImageURL: [""],
      accountStatus: ["", Validators.required],
      history: [[]]
    });

    this.commentForm = this.fb.group({
      text: ['', Validators.required],
      createdAt: [''],
      createdBy: [''],
      relation: ['']
    })

  }


  get form() {
    return this.memberForm.controls
  }

  get addressForm() {
    return (this.memberForm.get('homeAddress') as FormGroup)?.controls;

  }

  get historyForm() {
    return this.commentForm.controls;
  }

  get statusForm() {
    const statusDetailsGroup = this.memberForm.get('statusDetails') as FormGroup;
    return statusDetailsGroup.controls;
  }

  onDateChange(evt: any, control: AbstractControl) {
    if (evt) {
      control.setValue(moment(evt).toISOString());
    }
  }

  setAddress(place:any) {
    console.log('Place');
  }

onChangeType(event: Event): void {
  const target = event.target  as HTMLSelectElement | null;
  const selectedValue = target ? target.value : '';
  if (selectedValue === 'vip') {
      this.memberForm.get('vipExpiryDate')?.setValidators([Validators.required]);
    }
    else {
      this.memberForm.get("vipExpiryDate")?.clearValidators();
    }
    this.memberForm.get('vipExpiryDate')?.updateValueAndValidity();
}

onChangeClientType(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedValue = target ? target.value : '';
  console.log(selectedValue);
  // Handle the selected value here
}

onChangeAccountStatus(event: Event): void {
  const target = event.target as HTMLSelectElement | null;
  const selectedValue = target ? target.value : '';
  console.log(selectedValue);
  // Handle the selected value here
}

 onChangeReason(event: Event): void {
  const target = event.target as HTMLSelectElement | null;
  const selectedValue = target ? target.value : '';
  console.log(selectedValue);
  // Handle the selected value here
}

  addComment(){
    this.cmtSubmitted = true;
    console.log('functionality will be add later');
  }

  onCommentEdit(comment:any){
    console.log('functionality will be add later');
  }
  cancelReply(){
    console.log('functionality will be add later');
  }

  async fileProcessing(ImageInput:any, form:any) {
    imageProcessing(ImageInput)
     .subscribe(async (result) => {
      console.log('fileProcessing functionality will be add later');
    })
  }


  onSelectLOS(losId:any) {
  
    console.log('fileProcessing functionality will be add later');
  }

  
  saveMember() {
    this.submitted = true;
    console.log('form');
  }

}
