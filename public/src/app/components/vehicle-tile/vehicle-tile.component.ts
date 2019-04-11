import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Vehicle } from '../../core/vehicle.module';
import { trigger, query, style, group, animate, transition } from '@angular/animations';

export const defaultAnimationFunction = 'ease-in-out';
export const logoFadeInAnimationTiming = '250ms';
export const logoFadeOutAnimationTiming = '150ms';
export const logoAnimationDelay = '450ms';
export const headerFadeInAnimationTiming = '300ms';
export const headerFadeOutAnimationTiming = '150ms';
export const headerAnimationDelay = '450ms';

@Component({
  selector: 'app-vehicle-tile',
  templateUrl: './vehicle-tile.component.html',
  styleUrls: ['./vehicle-tile.component.scss'],
  animations: [
    trigger('vehicleFadeIn', [
      transition(':enter', [
          group([
            style({
              transform: 'translateX(-50px)',
              opacity: '0'
            }),
            animate(`${logoFadeInAnimationTiming} 400ms ${defaultAnimationFunction}`, style({
              transform: 'translateX(0)',
              opacity: '1'
            }))
          ])
      ]),
      transition(':leave', [
          style({
            height: '56px'
          }),
          animate(`${headerFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
            height: '0'
          })),
          group([
            query('.vehicle-tile__icon', [
              style({
                opacity: 1,
                transform: 'translateX(0)'
              }),
              animate(`${logoFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
                opacity: 0,
                transform: 'translateX(-40px)'
              }))
            ])
          ])
      ]),
    ])
  ]
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
