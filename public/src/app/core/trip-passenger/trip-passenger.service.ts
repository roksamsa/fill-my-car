import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripPassenger } from './trip-passenger.module';
import { ConstantsService } from '../../common/services/constants.service';

@Injectable({
  providedIn: 'root'
})

export class TripPassengerService {
  uriBase = this.constant.baseAppDomain;
  uriTripsPassengers = this.uriBase + 'trip-passengers/';
  uriTripsPassengerData = this.uriTripsPassengers + 'passenger/';
  uriTripPassengerAdd = this.uriTripsPassengers + 'add/';
  uriTripUpdate = this.uriTripsPassengers + 'update/';
  uriTripDelete = this.uriTripsPassengers + 'delete/';
  uriTripDeleteAll = this.uriTripsPassengers + 'delete-all/';

  constructor(
    private http: HttpClient,
    private constant: ConstantsService) { }

  // Get all trips in database
  public getAllTripPassengers(): Observable<TripPassenger[]> {
    return this.http.get<TripPassenger[]>(this.uriTripsPassengers);
  }

  // Get specific trip by ID
  public getTripPassengerById(id: any): Observable<TripPassenger[]> {
    return this.http.get<TripPassenger[]>(this.uriTripsPassengerData + id);
  }

  // Get specific trip by HASH
  public getTripPassengerByHash(tripPassengerCancelTripHash: any): Observable<TripPassenger[]> {
    return this.http.get<TripPassenger[]>(this.uriTripsPassengerData + tripPassengerCancelTripHash);
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
    tripPassengerPhone: string,
    tripPassengerCancelTripHash: string) {
    const tripPassenger = {
      belongsToUser: belongsToUser,
      belongsToVehicle: belongsToVehicle,
      belongsToTrip: belongsToTrip,
      tripPassengerSeatsReservation: tripPassengerSeatsReservation,
      tripPassengerStartLocation: tripPassengerStartLocation,
      tripPassengerEndLocation: tripPassengerEndLocation,
      tripPassengerName: tripPassengerName,
      tripPassengerEmail: tripPassengerEmail,
      tripPassengerPhone: tripPassengerPhone,
      tripPassengerCancelTripHash: tripPassengerCancelTripHash
    };
    return this.http.post(this.uriTripPassengerAdd, tripPassenger);
  }

  // Delete trip passenger from database with specific HASH
  public deleteTripPassenger(hash: any): Observable<TripPassenger[]> {
    return this.http.delete<TripPassenger[]>(this.uriTripDelete + hash);
  }

   // Delete all trips from database
  public deleteAllTripPassengers(): Observable<TripPassenger[]> {
    return this.http.delete<TripPassenger[]>(this.uriTripDeleteAll);
  }
}
