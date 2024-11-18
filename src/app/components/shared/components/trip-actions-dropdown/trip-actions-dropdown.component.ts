import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-trip-actions-dropdown',
  templateUrl: './trip-actions-dropdown.component.html',
  styleUrls: ['./trip-actions-dropdown.component.css']
})
export class TripActionsDropdownComponent implements OnInit {
  @Input() assign: any;
  @Output() markReady = new EventEmitter<any>();
  @Output() markVip = new EventEmitter<any>();
  @Output() markConfirmed = new EventEmitter<any>();
  @Output() markVoicemail = new EventEmitter<any>();
  @Output() tripDetails = new EventEmitter<any>();
  isClose = false;

  constructor() { }
  
  ngOnInit() { 
  }

  isStringExist(substrings: any, str: any) {
    if (substrings.some((v: any) => str.toLowerCase().includes(v))) {
      return true;
    }
    return false;
  }
}
