import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Vehicle } from '../../core/vehicle/vehicle.module';

@Component({
  selector: 'app-vehicle-tile',
  templateUrl: './vehicle-tile.component.html',
  styleUrls: ['./vehicle-tile.component.scss']
})
export class VehicleTileComponent implements OnInit {

  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));

  private _vehicleID = '';
  private _vehicleBrand = '';
  private _vehicleName = '';
  private _vehicleType = '';
  private _vehicleColor = '';

  constructor() {}

  ngOnInit() {
  }

  // Vehicle ID
  @Input()
  set vehicleID(vehicleID: string) {
    this._vehicleID = vehicleID;
  }

  get vehicleID(): string {
    return this._vehicleID;
  }

  // Vehicle brand name
  @Input()
  set vehicleBrand(vehicleBrand: string) {
    this._vehicleBrand = vehicleBrand;
  }

  get vehicleBrand(): string {
    return this._vehicleBrand;
  }

  // Vehicle name
  @Input()
  set vehicleName(vehicleName: string) {
    this._vehicleName = vehicleName;
  }

  get vehicleName(): string {
    return this._vehicleName;
  }

  // Vehicle type
  @Input()
  set vehicleType(vehicleType: string) {
    this._vehicleType = vehicleType;
  }

  get vehicleType(): string {
    return this._vehicleType;
  }

  // Vehicle color
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
