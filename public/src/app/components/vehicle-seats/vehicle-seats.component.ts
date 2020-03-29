import { VehicleSeatsService } from './vehicle-seats.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-seats',
  templateUrl: './vehicle-seats.component.html',
  styleUrls: ['./vehicle-seats.component.scss']
})
export class VehicleSeatsComponent implements OnInit {

  vehicleSeatsTakenNumber: number;
  vehicleSeatsTakenNumberValue: number[];

  vehicleSeatsAvailableOnVehicleNumber: number;
  vehicleSeatsAvailableOnVehicleNumberValue: number[];

  vehicleSeatsSelectedFromInputNumber = 0;
  vehicleSeatsSelectedFromInputValue = 0;

  constructor(public vehicleSeatsData: VehicleSeatsService) {
  }

  ngOnInit() {
    this.vehicleSeatsData.vehicleSeatsAvailableOnVehicleNumberData.subscribe((availableNumber) => {
      this.vehicleSeatsAvailableOnVehicleNumber = availableNumber;
      this.vehicleSeatsAvailableOnVehicleNumberValue = this.generateArrayFromVehicleSeatsNumber(this.vehicleSeatsAvailableOnVehicleNumber);
    });

    this.vehicleSeatsData.vehicleSeatsTakenNumberData.subscribe((takenNumber) => {
      this.vehicleSeatsTakenNumber = takenNumber;
      this.vehicleSeatsTakenNumberValue = this.generateArrayFromVehicleSeatsNumber(this.vehicleSeatsTakenNumber);
    });

    this.vehicleSeatsData.vehicleSeatsSelectedFromInputValueData.subscribe((selectedFromInput) => {
      this.vehicleSeatsSelectedFromInputNumber = selectedFromInput;
    });
  }

  generateArrayFromVehicleSeatsNumber(number: number): Array<number> {
    return Array.from(Array(number)).map((x, i) => i);
  }
}
