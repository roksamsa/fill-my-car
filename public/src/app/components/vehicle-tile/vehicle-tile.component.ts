import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { UserMenuService } from '../user-menu/user-menu.service';

@Component({
  selector: 'app-vehicle-tile',
  templateUrl: './vehicle-tile.component.html',
  styleUrls: ['./vehicle-tile.component.scss']
})
export class VehicleTileComponent implements OnInit {

  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  darkModeActivated: boolean;

  @Input() vehicleTextVisible = true;
  public _vehicleID = '';
  public _vehicleBrand = '';
  public _vehicleName = '';
  public _vehicleType = '';
  public _vehicleColor = '';

  constructor(private userMenuDarkThemeData: UserMenuService) {}

  ngOnInit() {
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
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
