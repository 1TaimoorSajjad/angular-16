import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getShiftDays } from 'src/app/utils/utils.common';

@Component({
  selector: 'app-add-rates',
  templateUrl: './add-rates.component.html',
  styleUrls: ['./add-rates.component.css']
})
export class AddRatesComponent implements OnInit {
  fareForm !: FormGroup;
  zoneFareForm !: FormGroup;
  submitted = false;
  singleZoneFormSubmitted = false;
  daysList = getShiftDays;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fareForm = this.fb.group({
      cooperate: ['', Validators.required],
      company: ['', Validators.required],
      perMile: ['', Validators.required],
      perMin: ['', Validators.required],
      minimumFare: [''],
      cancelCharges: ['', Validators.required],
      additionalPassengerCharges: [''],
      noShowCharges: ['0', Validators.required],
      pickupSurcharge: this.fb.group({
        fare: [''],
        per: [''],
        after: ['']
      }),

      baseFare: this.fb.group({
        fare: ['', Validators.required],
        for: ['', Validators.required],
      }),

      waitTime: this.fb.group({
        fare: ['', Validators.required],
        per: ['', Validators.required],
        after: ['', Validators.required],
      }),

      zones: [[]],
      isPerMileZone: [false],
      los: ['', Validators.required],
      spaceType: ['', Validators.required],
      preStartTime: ["", Validators.required],
      startTime: ["", Validators.required],
      preEndTime: ["", Validators.required],
      endTime: ['', Validators.required],
      days: [[], Validators.required],

      code: [""],
      perMileCode: [""],
      preUnLoadTime: [""],
      dryRunCode: [""],
      baseFareCode: [""],
      waitTimeCode: [""],
      weekendNightCode: [""],
      responseNightCode: [""],
      status: [""],


    });

    this.zoneFareForm = this.fb.group({
      fare: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
  }

  get form() {
    return this.fareForm.controls;
  }

  get baseFareControls() {
    return (this.fareForm.get('baseFare') as FormGroup).controls;
  }

  get zoneForm() {
    return this.zoneFareForm.controls;
  }


  get waitTimeForm() {
    return (this.fareForm.get('waitTime') as FormGroup).controls;
  }

  toggleZonePerMile() {
    this.fareForm.patchValue({
      isPerMileZone: !this.fareForm.value.isPerMileZone
    });
  }


  onSelectLOS(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value ?? '';
    console.log('los value', value);
    // Your logic here
  }

  setStartTimeChange(evt: any) {
    // this.fareForm.patchValue({
    //   startTime : moment(evt).tz(this.timeZone, true).format("HH:mm"),
    // });
  };

  setEndTimeChange(evt: any) {
    // this.fareForm.patchValue({
    //   endTime : moment(evt).tz(this.timeZone, true).format("HH:mm"),
    // });
  }

  addZone() {
    this.singleZoneFormSubmitted = true;
    if (this.zoneFareForm.invalid) {
      return;
    }
    this.fareForm.value.zones.push(this.zoneFareForm.value);
    this.zoneFareForm.reset();
    this.singleZoneFormSubmitted = false;
  }

  removeZone(index: any) {
    const z = this.fareForm.value.zones;
    z.splice(index, 1);
    this.fareForm.patchValue({
      zones: z
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.fareForm.invalid) {
      return;
    }
    console.log('From value', this.fareForm.value);
  }

}
