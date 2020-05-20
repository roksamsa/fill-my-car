import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripPassenger } from './trip-passenger.module';
import { ConstantsService } from '../../common/services/constants.service';

@Injectable({
  providedIn: 'root'
})

export class TripPassengerService {
  uriBase = this.constant.baseAppDomain;
  uriTripsPassengers = this.uriBase + 'trip-passengers/';
  uriTripsPassengersForUser = this.uriTripsPassengers + 'user/';
  uriTripPassengerAdd = this.uriTripsPassengers + 'add/';
  uriTripUpdate = this.uriTripsPassengers + 'update/';
  uriTripDelete = this.uriTripsPassengers + 'delete/';

  constructor(
    private http: HttpClient,
    private constant: ConstantsService) { }

  // Get all trips in database
  public getAllTrips(): Observable<TripPassenger[]> {
    return this.http.get<TripPassenger[]>(this.uriTripsPassengers);
  }

  // Get specific trip by ID
  public getTripById(id: any): Observable<TripPassenger[]> {
    return this.http.get<TripPassenger[]>(this.uriTripsPassengers + id);
  }

  // Get trips for specific user
  public getTripsByUser(belongsToUser: any): Observable<TripPassenger[]> {
    return this.http.get<TripPassenger[]>(this.uriTripsPassengersForUser + belongsToUser);
  }

  // Add new trip to database
  public addTripPassenger(
    belongsToUser: string,
    belongsToVehicle: string,
    belongsToTrip: string,
    tripPassengerSeatsReservation: number,
    tripPassengerStartLocation: string,
    tripPassengerEndLocation: string,
    tripPassengerName: string,
    tripPassengerEmail: string,
    tripPassengerPhone: string) {
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
    console.log(tripPassenger);
    return this.http.post(this.uriTripPassengerAdd, tripPassenger);
  }

  // Update trip from database
  public updateTrip(
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
    tripTakenSeats: number,
    tripPrice: number,
    tripLuggageSpace: number,
    tripMessage: string,
    tripComfortable: boolean,
    tripStopsOnTheWayToFinalDestination: boolean,
    tripNewPassengersAcceptance: string): Observable<TripPassenger[]> {
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
      tripTakenSeats: tripTakenSeats,
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
  public deleteTripPassenger(id: any): Observable<TripPassenger[]> {
    return this.http.delete<TripPassenger[]>(this.uriTripDelete + id);
  }

  // Delete trip from database
  public deleteAllTripPassengers(): Observable<TripPassenger[]> {
    return this.http.delete<TripPassenger[]>(this.uriTripDelete);
  }
}
