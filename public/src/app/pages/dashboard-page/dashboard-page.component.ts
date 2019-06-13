import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { VehicleTileService } from '../../../app/components/vehicle-tile/vehicle-tile.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateVehicleDialogComponent } from '../../dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { EditVehicleDialogComponent } from '../../dialogs/edit-vehicle-dialog/edit-vehicle-dialog.component';
import { CreateTripDialogComponent } from '../../dialogs/create-trip-dialog/create-trip-dialog.component';
import { trigger, stagger, query, style, animate, transition, animateChild, group } from '@angular/animations';

export const defaultAnimationFunction = 'ease-in-out';
export const logoFadeInAnimationTiming = '250ms';
export const logoFadeOutAnimationTiming = '150ms';
export const logoAnimationDelay = '450ms';
export const headerFadeInAnimationTiming = '300ms';
export const headerFadeOutAnimationTiming = '150ms';
export const headerAnimationDelay = '450ms';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  animations: [
    trigger('vehiclesListFadeIn', [
      transition(':enter', [
        group([
          query('@vehicleFadeIn', stagger(200, animateChild()))
        ])
      ]),
    ]),
    trigger('vehicleFadeIn', [
      transition(':enter', [
        style({
          transform: 'translateX(-50px)',
          opacity: 0
        }),
        animate('300ms cubic-bezier(.8,-0.6,0.2,1.5)',
          style({
            transform: 'translateX(0)',
            opacity: 1
          }))
      ])
    ]),
    trigger('vehicleActionDeleteFadeIn', [
      transition(':enter', [
        style({
          transform: 'translateY(-50px)',
          opacity: 0
        }),
        animate('300ms cubic-bezier(.8,-0.6,0.2,1.5)',
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ]),
      transition(':leave', [
        style({
          transform: 'translateY(0)',
          opacity: 1
        }),
        animate('300ms cubic-bezier(.8,-0.6,0.2,1.5)',
          style({
            transform: 'translateY(-50px)',
            opacity: 0
          })
        )
      ])
    ]),
    trigger('vehicleActionEditFadeIn', [
      transition(':enter', [
        style({
          transform: 'translateY(50px)',
          opacity: 0
        }),
        animate('300ms cubic-bezier(.8,-0.6,0.2,1.5)',
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ]),
      transition(':leave', [
        style({
          transform: 'translateY(0)',
          opacity: 1
        }),
        animate('300ms cubic-bezier(.8,-0.6,0.2,1.5)',
          style({
            transform: 'translateY(50px)',
            opacity: 0
          })
        )
      ])
    ])
  ]
})

export class DashboardPageComponent implements OnInit {

  emptyDataType = 'horizontal';
  tileTitleTrips = 'Moja potovanja';
  tileHeadlineAddButtonTooltipText = 'Dodaj novo potovanje';
  emptyDataText = 'Tvoja garaža je še vedno prazna.';
  emptyDataIcon = 'vehicle';
  emptyDataButtonText = 'Dodaj novo vozilo';

  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));

  @Input() selectedVehicle: any;
  selectedVehicleIndex: number;
  isSelectedVehicle: boolean;

  dialogResult = '';

  areThereAnyVehicles = false;

  constructor(
    private vehicleService: VehicleService,
    public popupDialog: MatDialog,
    private vehicleTileData: VehicleTileService) { }

  ngOnInit() {
    this.fetchVehicles();
    this.isVehicleListEmpty();
    this.vehicleTileData.currentVehicleSelectState.subscribe(clickActiveState => this.isSelectedVehicle = clickActiveState);
  }

  // Fetch all vehicles for specific user
  fetchVehicles() {
    this.vehicleService.getVehicleByUser(this.currentUser.uid)
    .subscribe((data: Vehicle[]) => {
      if (data.length > 0) {
        this.vehicles = data;
        this.areThereAnyVehicles = true;
      } else {
        this.vehicles = null;
        this.areThereAnyVehicles = false;
      }
    });
  }

  // Check if we get some vehicles from user or not
  isVehicleListEmpty(): boolean {
    return this.areThereAnyVehicles;
  }

  vehicleClickSetSelectedState(vehicle: any, index: any) {
    if (vehicle === this.selectedVehicle) {
      this.selectedVehicle = '';
      this.selectedVehicleIndex = null;
      this.isSelectedVehicle = false;
    } else {
      this.selectedVehicle = vehicle;
      this.selectedVehicleIndex = index;
      this.isSelectedVehicle = true;
    }
  }

  deselectAllVehicles() {
    this.selectedVehicle = '';
    this.isSelectedVehicle = false;
  }

  // Add vehicle dialog popup
  openAddVehicleDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '600px';
    dialogConfig.position = {
      top: '100px'
    };

    const dialogRef = this.popupDialog.open(CreateVehicleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      this.fetchVehicles();
      this.isSelectedVehicle = false;
    });
  }

  // Edit vehicle dialog popup
  openEditVehicleDialog(vehicleID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '600px';
    dialogConfig.position = {
      top: '100px'
    };
    dialogConfig.data = this.selectedVehicle;

    const dialogRef = this.popupDialog.open(EditVehicleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      this.fetchVehicles();
      this.isSelectedVehicle = false;
    });
  }

  // Delete specific vehicle
  deleteVehicle(id: any) {
    this.vehicleService.deleteVehicle(id)
    .subscribe(() => {
      this.fetchVehicles();
      this.isSelectedVehicle = false;
    });
  }

  // Add trip dialog popup
  openAddTripDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '1100px';
    dialogConfig.position = {
      top: '100px'
    };

    const dialogRef = this.popupDialog.open(CreateTripDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
  }
}
