import { VehicleSeatsService } from './vehicle-seats.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-seats',
  templateUrl: './vehicle-seats.component.html',
  styleUrls: ['./vehicle-seats.component.scss']
})
export class VehicleSeatsComponent implements OnInit, OnDestroy {

  availableOnVehicleNumberDataSubscription: Subscription;
  vehicleSeatsTakenNumberDataSubscription: Subscription;
  vehicleSeatsSelectedFromInputValueDataSubscription: Subscription;

  vehicleSeatsTakenNumber: number;
  vehicleSeatsTakenNumberValue: number[];

  vehicleSeatsAvailableOnVehicleNumber: number;
  vehicleSeatsAvailableOnVehicleNumberValue: number[];

  vehicleSeatsSelectedFromInputNumber = 0;
  vehicleSeatsSelectedFromInputValue = 0;

  constructor(public vehicleSeatsData: VehicleSeatsService) {
  }

  ngOnInit() {
    this.availableOnVehicleNumberDataSubscription =
    this.vehicleSeatsData.vehicleSeatsAvailableOnVehicleNumberData.subscribe((availableNumber) => {
      this.vehicleSeatsAvailableOnVehicleNumber = availableNumber;
      this.vehicleSeatsAvailableOnVehicleNumberValue = this.generateArrayFromVehicleSeatsNumber(this.vehicleSeatsAvailableOnVehicleNumber);
    });

    this.vehicleSeatsTakenNumberDataSubscription = this.vehicleSeatsData.vehicleSeatsTakenNumberData.subscribe((takenNumber) => {
      this.vehicleSeatsTakenNumber = takenNumber;
      this.vehicleSeatsTakenNumberValue = this.generateArrayFromVehicleSeatsNumber(this.vehicleSeatsTakenNumber);
    });

    this.vehicleSeatsSelectedFromInputValueDataSubscription =
    this.vehicleSeatsData.vehicleSeatsSelectedFromInputValueData.subscribe((selectedFromInput) => {
      this.vehicleSeatsSelectedFromInputNumber = selectedFromInput;
    });
  }

  ngOnDestroy() {
    if (this.availableOnVehicleNumberDataSubscription) {
      this.availableOnVehicleNumberDataSubscription.unsubscribe();
    }

    if (this.vehicleSeatsTakenNumberDataSubscription) {
      this.vehicleSeatsTakenNumberDataSubscription.unsubscribe();
    }

    if (this.vehicleSeatsSelectedFromInputValueDataSubscription) {
      this.vehicleSeatsSelectedFromInputValueDataSubscription.unsubscribe();
    }
  }

  generateArrayFromVehicleSeatsNumber(number: number): Array<number> {
    return Array.from(Array(number)).map((x, i) => i);
  }
}
