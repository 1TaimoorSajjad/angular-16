import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-addons',
  templateUrl: './add-addons.component.html',
  styleUrls: ['./add-addons.component.css']
})
export class AddAddonsComponent implements OnInit {
  
  addonForm !: FormGroup;
  submitted = false;
  constructor(private fb : FormBuilder){}

  ngOnInit(){
    
    this.addonForm = this.fb.group({
      title: ["", Validators.required],
      status: ['active', Validators.required],
      description: [""],
      code: ['',Validators.required],
      fare:[''],
      cooperate:[''],
      spaceType:[''],
      isAddon:[true]
    });
  }

  get form(){
    return this.addonForm.controls;
  }

  onSelectFundingSource(event:any) {
    if (event) {
      this.addonForm.patchValue({
       cooperate: event
      });
    }
  }

  saveAddon(){
    this.submitted = true;
    console.log('saveAddon', this.addonForm.value);
  }


}
