import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VehicleTileService } from '../../../app/components/vehicle-tile/vehicle-tile.service';
import { CreateVehicleDialogComponent } from '../../dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { EditVehicleDialogComponent } from '../../dialogs/edit-vehicle-dialog/edit-vehicle-dialog.component';
import { trigger, stagger, query, style, animate, transition, animateChild, group } from '@angular/animations';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  animations: [
    trigger('vehicleActionIconsFadeIn', [
      transition(':enter', [
        style({
          transform: 'translateX(30px)',
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
          transform: 'translateX(0)',
          opacity: 1
        }),
        animate('300ms cubic-bezier(.8,-0.6,0.2,1.5)',
          style({
            transform: 'translateX(30px)',
            opacity: 0
          })
        )
      ])
    ])
  ]
})

export class VehicleListComponent implements OnInit {
  emptyDataType = 'vertical';
  tileTitleTrips = 'Moja potovanja';
  tileHeadlineAddButtonTooltipText = 'Dodaj novo potovanje';
  emptyDataText = 'Tvoja garaža je še vedno prazna.';
  emptyDataIcon = 'vehicle';
  emptyDataButtonText = 'Dodaj novo vozilo';

  buttonTooltipTextEdit: string;
  buttonTooltipTextDelete: string;
  buttonTooltipTextAdd = 'Dodaj novo vozilo';

  selectedVehicleIndex: number;
  isSelectedVehicle: boolean;
  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyVehicles = false;
  preloadingSpinnerVisibility = true;
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

  @Input() selectedVehicle: any;

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

  preloadingSpinnerShow() {
    const that = this;
    this.preloadingSpinnerVisibility = true;

    setTimeout(function() {
      that.preloadingSpinnerVisibility = false;
    }, 500);
  }

  // Fetch all vehicles for specific user
  fetchVehicles() {
    this.vehicleService.getVehicleByUser(this.currentUser.uid)
      .subscribe((data: Vehicle[]) => {
        if (data.length > 0 && data != null) {
          this.vehicles = data;
          this.areThereAnyVehicles = true;
          this.preloadingSpinnerShow();
        } else {
          this.vehicles = [];
          this.areThereAnyVehicles = false;
          this.preloadingSpinnerShow();
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

      this.buttonTooltipTextEdit = 'Uredi vozilo ' + this.selectedVehicle.vehicleBrand + ' ' + this.selectedVehicle.vehicleName;
      this.buttonTooltipTextDelete = 'Odstrani vozilo ' + this.selectedVehicle.vehicleBrand + ' ' + this.selectedVehicle.vehicleName;
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
  openEditVehicleDialog(vehicleID: string) {
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
