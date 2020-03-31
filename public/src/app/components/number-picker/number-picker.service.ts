import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NumberPickerService {

  // Input placeholder value
  public inputPlaceholderData = new BehaviorSubject<string>(null);
  currentInputPlaceholderData = this.inputPlaceholderData.asObservable();

  // Koliko vozil je ZASEDENIH na vozilu
  public vehicleSeatsTakenNumberData = new BehaviorSubject<number>(null);
  currentVehicleSeatsTakenNumber = this.vehicleSeatsTakenNumberData.asObservable();

  // Koliko vozil je IZBRANIH na vozilu
  public vehicleSeatsSelectedFromInputValueData = new BehaviorSubject<number>(null);
  currentVehicleSeatsSelectedFromInputValueNumber = this.vehicleSeatsSelectedFromInputValueData.asObservable();

  constructor() { }

  changeInputPlaceholderValue(availableNumberData: string) {
    this.inputPlaceholderData.next(availableNumberData);
  }

  changeVehicleSeatsTakenNumber(takenNumberData: number) {
    this.vehicleSeatsTakenNumberData.next(takenNumberData);
  }

  changeVehicleSeatsSeatsSelectedFromInput(selectedFromInputNumberData: number) {
    this.vehicleSeatsSelectedFromInputValueData.next(selectedFromInputNumberData);
  }
}
