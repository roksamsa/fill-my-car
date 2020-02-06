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
    belongsToUser: string,
    selectedVehicle: string,
    tripStatus: string,
    tripIdTag: string,
    tripFromLocation: string,
    tripToLocation: string,
    tripDate: Date,
    tripTime: string,
    tripFreeSeats: number,
    tripPrice: number,
    tripLuggageSpace: number,
    tripMessage: string,
    tripComfortable: boolean,
    tripStopsOnTheWayToFinalDestination: boolean,
    tripNewPassengersAcceptance: string) {
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
    id: string,
    belongsToUser: string,
    selectedVehicle: string,
    tripStatus: string,
    tripIdTag: string,
    tripFromLocation: string,
    tripToLocation: string,
    tripDate: Date,
    tripTime: string,
    tripFreeSeats: number,
    tripPrice: number,
    tripLuggageSpace: number,
    tripMessage: string,
    tripComfortable: boolean,
    tripStopsOnTheWayToFinalDestination: boolean,
    tripNewPassengersAcceptance: string): Observable<Trip[]> {
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

  // Update trip from database
  updateSeatsOnTrip(
    id: string,
    tripFreeSeats: number): Observable<Trip[]> {
    const trip = {
      id: id,
      tripFreeSeats: tripFreeSeats
    };
    return this.http.patch<Trip[]>(this.uriTripUpdate + id, trip);
  }

  // Delete trip from database
  deleteTrip(id: any): Observable<Trip[]> {
    return this.http.delete<Trip[]>(this.uriTripDelete + id);
  }
}
