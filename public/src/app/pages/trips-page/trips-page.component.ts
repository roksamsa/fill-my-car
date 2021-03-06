import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateTripDialogComponent } from '../../dialogs/create-trip-dialog/create-trip-dialog.component';
import { TripService } from '../../core/trip/trip.service';
import { Trip } from '../../core/trip/trip.module';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-trips-page',
  templateUrl: './trips-page.component.html',
  styleUrls: ['./trips-page.component.scss']
})
export class TripsPageComponent implements OnInit {

  dialogResult = '';
  tileTitle = 'Moja potovanja';
  tileHeadlineAddButtonTooltipText = 'Dodaj novo potovanje';
  currentUser = JSON.parse(localStorage.getItem('user'));
  trips: Trip[] = [];
  areThereAnyTrips = false;

  constructor(public popupTrip: MatDialog,
              private titleService: Title,
              private tripService: TripService) { }

  ngOnInit() {
    this.fetchTrips();
    this.titleService.setTitle(this.tileTitle);
  }

  // Fetch all trips for specific user
  fetchTrips() {
    this.tripService.getTripsByUser(this.currentUser.uid).subscribe((data: Trip[]) => {
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
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '1100px';
    dialogConfig.position = {
      top: '100px'
    };

    const dialogRef = this.popupTrip.open(CreateTripDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTrips();
      this.dialogResult = result;
    });
  }
}
