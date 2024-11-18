import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-mapper',
  templateUrl: './add-mapper.component.html',
  styleUrls: ['./add-mapper.component.css']
})
export class AddMapperComponent implements OnInit {
  configurationsForm !: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.configurationsForm = this.fb.group({
      cooperate: ['', Validators.required],
      spaceTypes: this.fb.array([this.createSpaceTypeGroup()])
    });
  }

  createSpaceTypeGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      spaceType: ['', Validators.required]
    });
  }

  get form() {
    return this.configurationsForm.controls;
  }
  
  get spaceTypes(): FormArray {
    return this.configurationsForm.get('spaceTypes') as FormArray;
  }

  addConfiguration(preSpaceTypesList?: any) {

    const items = this.configurationsForm.get('spaceTypes') as FormArray;

    if (preSpaceTypesList) {
      for (const spaceType of preSpaceTypesList) {
        items.push(
          this.fb.group({
            title: [spaceType.title, Validators.required],
            spaceType: [spaceType.spaceType, Validators.required],
            los: [spaceType.los, Validators.required]
          })
        );

      }
      return;
    }

    items.push(
      this.fb.group({
        title: ['', Validators.required],
        spaceType: ['', Validators.required],
        los: ['', Validators.required]
      })
    );
  }

  removeConfigurationItem(index: any) {
    const items = this.configurationsForm.get('spaceTypes') as FormArray;
    items.removeAt(index);
  }

  onSelectConfigurationItem(configurationItem :any) {
    console.log('configurationItem');
  }

  onSubmit() {
    this.submitted = true;
    console.log('Form');
  }
}
