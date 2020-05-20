import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NumberPickerService {

  // Input placeholder value
  public inputPlaceholderData = new BehaviorSubject<string>(null);
  currentInputPlaceholderData = this.inputPlaceholderData.asObservable();

  // Input value
  public inputValueData = new BehaviorSubject<number>(null);
  currentInputValueDataNumber = this.inputValueData.asObservable();

  constructor() { }

  changeInputPlaceholderValue(availableNumberData: string) {
    this.inputPlaceholderData.next(availableNumberData);
  }

  changeInputValue(InputValueData: number) {
    this.inputValueData.next(InputValueData);
  }
}
