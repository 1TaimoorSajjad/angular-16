import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {
  equipmentForm !: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.equipmentForm = this.fb.group({
      title: ["", Validators.required],
      status: ['active', Validators.required],
      description: [""],
      isAddon: [false]
    });
  }

  saveEquipment() {
    this.submitted = true;
    console.log('equipmentForm');
  }

  get form(){
    return this.equipmentForm.controls;
  }
}
