import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-space-types',
  templateUrl: './add-space-types.component.html',
  styleUrls: ['./add-space-types.component.css']
})
export class AddSpaceTypesComponent implements OnInit{
  spaceTypeForm !: FormGroup;
  submitted = false;
  
  constructor(private fb : FormBuilder){}
  
ngOnInit(){
  this.spaceTypeForm = this.fb.group({
    title: ["", Validators.required],

    los: ["", Validators.required],
    status: ['active', Validators.required],
    description: [""],
    loadTime: ["",Validators.required],
    preLoadTime: [""],
    preUnLoadTime: [""],
    unloadTime: ["",Validators.required],
    wnr : [false]

  });
}

saveSpaceType() {
  this.submitted = true;

}

get form(){
  return this.spaceTypeForm.controls;
}

onUnLoadTimeChange(evt:any) {
  // this.spaceTypeForm.patchValue({
  //   unloadTime: moment(evt).format("HH:mm"),
  // });
}

onLoadTimeChange(evt:any) {
  // this.spaceTypeForm.patchValue({
  //   loadTime: moment(evt).format("HH:mm"),
  // });
}

toggleWNR(wnr:any){
  this.spaceTypeForm.patchValue({
    wnr : !wnr
  })
}

}
