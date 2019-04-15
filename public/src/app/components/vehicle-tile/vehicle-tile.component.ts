import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Vehicle } from '../../core/vehicle.module';

@Component({
  selector: 'app-vehicle-tile',
  templateUrl: './vehicle-tile.component.html',
  styleUrls: ['./vehicle-tile.component.scss']
})
export class VehicleTileComponent implements OnInit {

  @HostBinding('class.state--active') clickActiveState = false;
  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyVehicles = false;

  private _vehicleRegistrationPlate = '';
  private _vehicleType = '';
  private _vehicleColor = '';

  constructor() {}

  ngOnInit() {
  }

  clickSetActiveState() {
    this.clickActiveState = !this.clickActiveState;
  }

  @Input()
  set vehicleRegistrationPlate(vehicleRegistrationPlate: string) {
    this._vehicleRegistrationPlate = vehicleRegistrationPlate;
  }

  get vehicleRegistrationPlate(): string {
    return this._vehicleRegistrationPlate;
  }

  @Input()
  set vehicleType(vehicleType: string) {
    this._vehicleType = vehicleType;
  }

  get vehicleType(): string {
    return this._vehicleType;
  }

  @Input()
  set vehicleColor(vehicleColor: string) {
    this._vehicleColor = vehicleColor;
  }

  get vehicleColor(): string {
    return this._vehicleColor;
  }

  setVehicleClasses() {
    return 'vehicle-tile__icon--' + this.vehicleType + ' vehicle-tile__icon--' + this.vehicleColor;
  }
}
