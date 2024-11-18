import { Injectable ,Component, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService  {
  private user = new BehaviorSubject(null);
  private subMenus = new BehaviorSubject(null);
  private datePicker: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private date: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private smallScreenMenuState: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private nemtCodes = new BehaviorSubject(null);

  constructor() { }

  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  saveUser(user: any) {
    this.user.next(user);
  }

  getSubMenus() {
    return this.subMenus.asObservable();
  }

  saveSubMenus(subMenus: any) {
    this.subMenus.next(subMenus);
  }

  toggleDatePicker(bool: any){
    this.datePicker.next(bool);
  }

  getDatePickerSate(){
    return this.datePicker.asObservable();
  }

  setDate(date: any){
    this.date.next(date);
  }

  getDate(){
    return this.date.asObservable();
  }

  getSmallScreenMenuState(): Observable<any> {
    return this.smallScreenMenuState.asObservable();
  }

  setSmallScreenMenuState(b: any) {
    this.smallScreenMenuState.next(b);
  }

  getNemtCodes(): Observable<any> {
    return this.nemtCodes.asObservable();
  }

  saveNemtCodes(data: any) {
    this.nemtCodes.next(data);
  }
}
