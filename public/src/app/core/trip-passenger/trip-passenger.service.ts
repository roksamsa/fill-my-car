import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripPassenger } from './trip-passenger.module';

@Injectable({
  providedIn: 'root'
})

export class TripPassengerService {

  uriBase = 'http://localhost:4000';
  uriTripsPassengers = this.uriBase + '/trip-passengers/';
  uriTripsPassengersForUser = this.uriTripsPassengers + 'user/';
  uriTripPassengerAdd = this.uriTripsPassengers + 'add/';
  uriTripUpdate = this.uriTripsPassengers + 'update/';
  uriTripDelete = this.uriTripsPassengers + 'delete/';

  constructor(
    private http: HttpClient) { }

  // Get all trips in database
  getAllTrips(): Observable<TripPassenger[]> {
    return this.http.get<TripPassenger[]>(this.uriTripsPassengers);
  }

  // Get specific trip by ID
  getTripById(id: any): Observable<TripPassenger[]> {
    return this.http.get<TripPassenger[]>(this.uriTripsPassengers + id);
  }

  // Get trips for specific user
  getTripsByUser(belongsToUser: any): Observable<TripPassenger[]> {
    return this.http.get<TripPassenger[]>(this.uriTripsPassengersForUser + belongsToUser);
  }

  // Add new trip to database
  addTripPassenger(
    belongsToUser: String,
    belongsToVehicle: String,
    belongsToTrip: String,
    tripPassengerSeatsReservation: Number,
    tripPassengerStartLocation: String,
    tripPassengerEndLocation: String,
    tripPassengerName: String,
    tripPassengerEmail: String,
    tripPassengerPhone: String) {
    const tripPassenger = {
      belongsToUser: belongsToUser,
      belongsToVehicle: belongsToVehicle,
      belongsToTrip: belongsToTrip,
      tripPassengerSeatsReservation: tripPassengerSeatsReservation,
      tripPassengerStartLocation: tripPassengerStartLocation,
      tripPassengerEndLocation: tripPassengerEndLocation,
      tripPassengerName: tripPassengerName,
      tripPassengerEmail: tripPassengerEmail,
      tripPassengerPhone: tripPassengerPhone
    };
    return this.http.post(this.uriTripPassengerAdd, tripPassenger);
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
    tripNewPassengersAcceptance: String): Observable<TripPassenger[]> {
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
    return this.http.patch<TripPassenger[]>(this.uriTripUpdate + id, trip);
  }

  // Delete trip from database
  deleteTrip(id: any): Observable<TripPassenger[]> {
    return this.http.delete<TripPassenger[]>(this.uriTripDelete + id);
  }
}
