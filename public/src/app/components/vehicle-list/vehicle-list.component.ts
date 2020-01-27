import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VehicleTileService } from '../../../app/components/vehicle-tile/vehicle-tile.service';
import { CreateVehicleDialogComponent } from '../../dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { EditVehicleDialogComponent } from '../../dialogs/edit-vehicle-dialog/edit-vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})

export class VehicleListComponent implements OnInit {
  emptyDataType = 'horizontal';
  tileTitleTrips = 'Moja potovanja';
  tileHeadlineAddButtonTooltipText = 'Dodaj novo potovanje';
  emptyDataText = 'Tvoja garaža je še vedno prazna.';
  emptyDataIcon = 'vehicle';
  emptyDataButtonText = 'Dodaj novo vozilo';

  @Input() selectedVehicle: any;
  selectedVehicleIndex: number;
  isSelectedVehicle: boolean;
  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyVehicles = false;
  dialogResult = '';
  displayedColumns: string[] = [
    'vehicleType',
    'vehicleBrand',
    'vehicleName',
    'vehicleModelYear',
    'vehicleColor',
    'vehicleSeats',
    'vehicleMaxLuggage',
    'vehicleID',
    'actions'
  ];

  constructor(
    private vehicleService: VehicleService,
    public popupDialog: MatDialog,
    private vehicleTileData: VehicleTileService,
    private router: Router) { }

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
      this.isSelectedVehicle = false;
      this.fetchVehicles();
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
    });
  }

  // Delete specific vehicle
  deleteVehicle(id: any) {
    this.vehicleService.deleteVehicle(id)
      .subscribe(() => {
        this.fetchVehicles();
        console.log(id);
      });
  }
}
