import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class VehicleTileService {

  private vehicleSelectState = new BehaviorSubject(false);
  currentVehicleSelectState = this.vehicleSelectState.asObservable();

  constructor() { }

  isVehicleTileSelected(vehicleSelectState: boolean) {
    this.vehicleSelectState.next(vehicleSelectState);
  }
}
