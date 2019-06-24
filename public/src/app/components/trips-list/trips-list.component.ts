import { Component, OnInit } from '@angular/core';
import { TripService } from '../../core/trip/trip.service';
import { Trip } from '../../core/trip/trip.module';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateTripDialogComponent } from '../../dialogs/create-trip-dialog/create-trip-dialog.component';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})

export class TripsListComponent implements OnInit {

  emptyDataType = 'vertical';
  emptyDataText = 'Še nisi delil prevoza z drugimi.';
  emptyDataIcon = 'trip';
  emptyDataButtonText = 'Načrtuj novo potovanje';
  trips: Trip[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyTrips = false;
  dialogResult: '';
  moreActionVisible = false;
  displayedColumns: string[] = [
    'tripStatus',
    'tripIdTag',
    'selectedVehicle',
    'tripFromLocation',
    'tripToLocation',
    'tripDateAndTime',
    'tripCategory',
    'tripDistance',
    'tripDuration',
    'tripPrice',
    'tripLuggageSpace',
  ];

  constructor(
    private popupDialog: MatDialog,
    private tripService: TripService,
    private router: Router) {}

  ngOnInit() {
    this.fetchTrips();
    this.isTripsListEmpty();
  }

  moreActionsToggle() {
   this.moreActionVisible = !this.moreActionVisible;
  }

  // Fetch all trips for specific user
  fetchTrips() {
    this.tripService.getTripsByUser(this.currentUser.uid)
    .subscribe((data: Trip[]) => {
      if (data.length > 0) {
        this.trips = data;
        this.areThereAnyTrips = true;
      } else {
        this.trips = null;
        this.areThereAnyTrips = false;
      }
    });
  }

  // Check if we get some vehicles from user or not
  isTripsListEmpty(): boolean {
    return this.areThereAnyTrips;
  }

  // Add trip dialog popup
  openAddTripDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
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
