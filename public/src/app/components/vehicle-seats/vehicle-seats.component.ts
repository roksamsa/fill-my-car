import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-seats',
  templateUrl: './vehicle-seats.component.html',
  styleUrls: ['./vehicle-seats.component.scss']
})
export class VehicleSeatsComponent implements OnInit, AfterViewInit {

  private vehicleSeatsNumberValue: number[];
  @Input() vehicleSeatsNumber: any;
  @Input() vehicleSeatsAvailableNumber: any;

  constructor() {
  }

  ngOnInit() {
    this.vehicleSeatsNumberValue = this.generateArrayFromVehicleSeatsNumber(this.vehicleSeatsNumber);

    console.log(this.vehicleSeatsNumber);
    console.log(this.vehicleSeatsNumberValue);
  }

  ngAfterViewInit() {
  }

  generateArrayFromVehicleSeatsNumber(number) {
    return Array.from(Array(number)).map((x, i) => i);
  }
}
