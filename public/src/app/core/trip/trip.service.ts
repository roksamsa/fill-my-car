import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip.module';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsService } from '../../common/services/constants.service';

@Injectable({
  providedIn: 'root'
})

export class TripService {
  uriBase = this.constant.baseAppDomainLocal;
  uriTrip = this.uriBase + 'trip/';
  uriTrips = this.uriBase + 'trips/';
  uriTripsForUser = this.uriTrips + 'user/';
  uriTripAdd = this.uriTrips + 'add/';
  uriTripUpdate = this.uriTrips + 'update/';
  uriTripUpdateSpecificField = this.uriTrips + 'update-specific-field/';
  uriTripDelete = this.uriTrips + 'delete/';

  constructor(
    private http: HttpClient,
    private constant: ConstantsService) {}

  // Get all trips in database
  public getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.uriTrips);
  }

  // Get specific trip by ID
  public getTripById(id: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.uriTrips + id);
  }

  // Get specific trip by tripIdTag
  public getTripByTagId(tripIdTag: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.uriTrip + tripIdTag);
  }

  // Get trips for specific user
  public getTripsByUser(belongsToUser: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.uriTripsForUser + belongsToUser);
  }

  // Add new trip to database
  public addTrip(
    belongsToUser: string,
    selectedVehicle: string,
    tripStatus: string,
    tripIdTag: string,
    tripFromLocation: string,
    tripToLocation: string,
    tripCreationDate: Date,
    tripEditedDate: Date,
    tripDate: Date,
    tripTimeHour: string,
    tripTimeMinutes: string,
    tripAvailableSeats: number,
    tripTakenSeats: number,
    tripFreeSeats: number,
    tripPrice: number,
    tripLuggageSpace: number,
    tripMessage: string,
    tripNewPassengersAcceptance: string,
    tripComfortable: boolean,
    tripStopsOnTheWayToFinalDestination: boolean,
    tripPassengersCanSmoke: boolean,
    tripPetsAreAllowed: boolean,
    tripQuiet: boolean) {
    const trip = {
      belongsToUser: belongsToUser,
      selectedVehicle: selectedVehicle,
      tripStatus: tripStatus,
      tripIdTag: tripIdTag,
      tripFromLocation: tripFromLocation,
      tripToLocation: tripToLocation,
      tripCreationDate: tripCreationDate,
      tripEditedDate: tripEditedDate,
      tripDate: tripDate,
      tripTimeHour: tripTimeHour,
      tripTimeMinutes: tripTimeMinutes,
      tripAvailableSeats: tripAvailableSeats,
      tripTakenSeats: tripTakenSeats,
      tripFreeSeats: tripFreeSeats,
      tripPrice: tripPrice,
      tripLuggageSpace: tripLuggageSpace,
      tripMessage: tripMessage,
      tripNewPassengersAcceptance: tripNewPassengersAcceptance,
      tripComfortable: tripComfortable,
      tripStopsOnTheWayToFinalDestination: tripStopsOnTheWayToFinalDestination,
      tripPassengersCanSmoke: tripPassengersCanSmoke,
      tripPetsAreAllowed: tripPetsAreAllowed,
      tripQuiet: tripQuiet
    };
    return this.http.post(this.uriTripAdd, trip);
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
    tripCreationDate: Date,
    tripEditedDate: Date,
    tripDate: Date,
    tripTimeHour: string,
    tripTimeMinutes: string,
    tripAvailableSeats: number,
    tripTakenSeats: number,
    tripFreeSeats: number,
    tripPrice: number,
    tripLuggageSpace: number,
    tripMessage: string,
    tripNewPassengersAcceptance: string,
    tripComfortable: boolean,
    tripStopsOnTheWayToFinalDestination: boolean,
    tripPassengersCanSmoke: boolean,
    tripPetsAreAllowed: boolean,
    tripQuiet: boolean): Observable<Trip[]> {
    const trip = {
      id: id,
      belongsToUser: belongsToUser,
      selectedVehicle: selectedVehicle,
      tripStatus: tripStatus,
      tripIdTag: tripIdTag,
      tripFromLocation: tripFromLocation,
      tripToLocation: tripToLocation,
      tripCreationDate: tripCreationDate,
      tripEditedDate: tripEditedDate,
      tripDate: tripDate,
      tripTimeHour: tripTimeHour,
      tripTimeMinutes: tripTimeMinutes,
      tripAvailableSeats: tripAvailableSeats,
      tripTakenSeats: tripTakenSeats,
      tripFreeSeats: tripFreeSeats,
      tripPrice: tripPrice,
      tripLuggageSpace: tripLuggageSpace,
      tripMessage: tripMessage,
      tripNewPassengersAcceptance: tripNewPassengersAcceptance,
      tripComfortable: tripComfortable,
      tripStopsOnTheWayToFinalDestination: tripStopsOnTheWayToFinalDestination,
      tripPassengersCanSmoke: tripPassengersCanSmoke,
      tripPetsAreAllowed: tripPetsAreAllowed,
      tripQuiet: tripQuiet
    };
    return this.http.patch<Trip[]>(this.uriTripUpdate + id, trip);
  }

  // Update specific field for trip from database
  public updateSeatsOnTrip(
    id: string,
    tripTakenSeats: number,
    tripFreeSeats: number): Observable<Trip[]> {
    const updatedTrip = {
      _id: id,
      tripTakenSeats: tripTakenSeats,
      tripFreeSeats: tripFreeSeats
    };
    return this.http.patch<Trip[]>(this.uriTripUpdateSpecificField + id, updatedTrip);
  }

  // Delete trip from database
  public deleteTrip(id: any): Observable<Trip[]> {
    return this.http.delete<Trip[]>(this.uriTripDelete + id);
  }
}
