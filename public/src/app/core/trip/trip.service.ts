import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateTripDialogComponent } from '../../dialogs/create-trip-dialog/create-trip-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class TripService {

  uriBase = 'http://localhost:4000';
  uriTrips = this.uriBase + '/trips/';
  uriTripsForUser = this.uriTrips + 'user/';
  uriTripAdd = this.uriTrips + 'add/';
  uriTripUpdate = this.uriTrips + 'update/';
  uriTripDelete = this.uriTrips + 'delete/';

  dialogTripsResult: any;
  currentUser = JSON.parse(localStorage.getItem('user'));
  preloadingSpinnerVisibility = true;
  areThereAnyTrips = false;
  trips: Trip[] = [];

  constructor(
    private http: HttpClient,
    private popupDialog: MatDialog) { }

  // Get all trips in database
  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.uriTrips);
  }

  // Get specific trip by ID
  getTripById(id: any): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.uriTrips + id);
  }

  // Get trips for specific user
  getTripsByUser(belongsToUser: any): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.uriTripsForUser + belongsToUser);
  }

  // Add new trip to database
  addTrip(
    belongsToUser: String,
    selectedVehicle: String,
    tripStatus: String,
    tripIdTag: String,
    tripFromLocation: String,
    tripToLocation: String,
    tripDate: Date,
    tripTime: String,
    tripFreeSeats: Number,
    tripPrice: Number,
    tripLuggageSpace: Number,
    tripMessage: String,
    tripComfortable: Boolean,
    tripStopsOnTheWayToFinalDestination: Boolean,
    tripNewPassengersAcceptance: String) {
    const trip = {
      belongsToUser: belongsToUser,
      selectedVehicle: selectedVehicle,
      tripStatus: tripStatus,
      tripIdTag: tripIdTag,
      tripFromLocation: tripFromLocation,
      tripToLocation: tripToLocation,
      tripDate: tripDate,
      tripTime: tripTime,
      tripFreeSeats: tripFreeSeats,
      tripPrice: tripPrice,
      tripLuggageSpace: tripLuggageSpace,
      tripMessage: tripMessage,
      tripComfortable: tripComfortable,
      tripStopsOnTheWayToFinalDestination: tripStopsOnTheWayToFinalDestination,
      tripNewPassengersAcceptance: tripNewPassengersAcceptance
    };
    return this.http.post(this.uriTripAdd, trip);
  }

  // Update trip from database
  updateTrip(
    id: String,
    belongsToUser: String,
    selectedVehicle: String,
    tripStatus: String,
    tripIdTag: String,
    tripFromLocation: String,
    tripToLocation: String,
    tripDate: Date,
    tripTime: String,
    tripFreeSeats: Number,
    tripPrice: Number,
    tripLuggageSpace: Number,
    tripMessage: String,
    tripComfortable: Boolean,
    tripStopsOnTheWayToFinalDestination: Boolean,
    tripNewPassengersAcceptance: String): Observable<Trip[]> {
    const trip = {
      id: id,
      belongsToUser: belongsToUser,
      selectedVehicle: selectedVehicle,
      tripStatus: tripStatus,
      tripIdTag: tripIdTag,
      tripFromLocation: tripFromLocation,
      tripToLocation: tripToLocation,
      tripDate: tripDate,
      tripTime: tripTime,
      tripFreeSeats: tripFreeSeats,
      tripPrice: tripPrice,
      tripLuggageSpace: tripLuggageSpace,
      tripMessage: tripMessage,
      tripComfortable: tripComfortable,
      tripStopsOnTheWayToFinalDestination: tripStopsOnTheWayToFinalDestination,
      tripNewPassengersAcceptance: tripNewPassengersAcceptance
    };
    return this.http.patch<Trip[]>(this.uriTripUpdate + id, trip);
  }

  // Delete trip from database
  deleteTrip(id: any): Observable<Trip[]> {
    return this.http.delete<Trip[]>(this.uriTripDelete + id);
  }

  // Fetch all trips for specific user
  fetchTrips() {
    this.getTripsByUser(this.currentUser.uid)
      .subscribe((data: Trip[]) => {
        if (data) {
          this.trips = data;
          this.areThereAnyTrips = true;
          this.preloadingSpinnerVisibility = false;
        } else {
          this.trips = null;
          this.areThereAnyTrips = false;
          this.preloadingSpinnerVisibility = true;
        }
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
      this.dialogTripsResult = result;
      this.fetchTrips();
    });
  }
}
