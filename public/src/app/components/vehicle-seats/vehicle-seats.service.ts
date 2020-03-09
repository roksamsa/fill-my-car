import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class VehicleSeatsService {

  // Koliko vozil je MOŽNIH na vozilu
  public vehicleSeatsAvailableOnVehicleNumberData = new BehaviorSubject<number>(null);
  currentVehicleSeatsAvailableNumber = this.vehicleSeatsAvailableOnVehicleNumberData.asObservable();

  // Koliko vozil je ZASEDENIH na vozilu
  public vehicleSeatsTakenNumberData = new BehaviorSubject<number>(null);
  currentVehicleSeatsTakenNumber = this.vehicleSeatsTakenNumberData.asObservable();

  // Koliko vozil je IZBRANIH na vozilu
  public vehicleSeatsSelectedFromInputValueData = new BehaviorSubject<number>(null);
  currentVehicleSeatsSelectedFromInputValueNumber = this.vehicleSeatsSelectedFromInputValueData.asObservable();

  constructor() { }

  changeVehicleSeatsTakenNumber(takenNumberData: number) {
    this.vehicleSeatsTakenNumberData.next(takenNumberData);
  }

  changeVehicleSeatsAvailableNumber(availableNumberData: number) {
    this.vehicleSeatsAvailableOnVehicleNumberData.next(availableNumberData);
  }

  changeVehicleSeatsSeatsSelectedFromInput(selectedFromInputNumberData: number) {
    this.vehicleSeatsSelectedFromInputValueData.next(selectedFromInputNumberData);
  }
}
