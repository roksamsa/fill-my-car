import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../core/vehicle.service';
import { Vehicle } from '../../core/vehicle.module';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateDialogComponent } from '../../dialogs/create-dialog/create-dialog.component';
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
          query('@vehicleFadeIn', stagger(250, animateChild()))
        ])
      ]),
    ]),
    trigger('vehicleFadeIn', [
      transition(':enter', [
        style({
          transform: 'translateX(-50px)',
          opacity: 0
        }),
        animate('500ms cubic-bezier(.8,-0.6,0.2,1.5)',
          style({
            transform: 'translateX(0)',
            opacity: 1
          }))
      ])
    ])
  ]
})

export class DashboardPageComponent implements OnInit {

  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyVehicles = false;
  private selected = false;
  dialogResult = '';

  constructor(
    private vehicleService: VehicleService,
    public popupCreateVehicle: MatDialog) { }

  ngOnInit() {
    this.fetchVehicles();
    this.isVehicleListEmpty();
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

  select(item: any) {
    this.selected = item;
  }

  isActive(item: any) {
      return this.selected === item;
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.position = {
      top: '100px'
    };

    const dialogRef = this.popupCreateVehicle.open(CreateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
  }
}
