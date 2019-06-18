import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip.module';

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

  constructor(
    private http: HttpClient) { }

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
    tripIdTag: String,
    tripStatus: String,
    tripFromLocation: String,
    tripToLocation: String,
    tripDate: Date,
    tripTime: String,
    tripFreeSeats: Number,
    tripPrice: Number,
    tripLuggageSpace: Number,
    tripComfortable: Boolean,
    tripStopsOnTheWayToFinalDestination: Boolean,
    tripNewPassengersAcceptance: String) {
    const trip = {
      belongsToUser: belongsToUser,
      selectedVehicle: selectedVehicle,
      tripIdTag: tripIdTag,
      tripStatus: tripStatus,
      tripFromLocation: tripFromLocation,
      tripToLocation: tripToLocation,
      tripDate: tripDate,
      tripTime: tripTime,
      tripFreeSeats: tripFreeSeats,
      tripPrice: tripPrice,
      tripLuggageSpace: tripLuggageSpace,
      tripComfortable: tripComfortable,
      tripStopsOnTheWayToFinalDestination: tripStopsOnTheWayToFinalDestination,
      tripNewPassengersAcceptance: tripNewPassengersAcceptance
    };
    return this.http.post(this.uriTripAdd, trip);
  }

  // Update trip from database
  updateTrip(
    id: any,
    vehicleType: any,
    vehicleBrand: any,
    vehicleName: any,
    vehicleModelYear: number,
    vehicleColor: any,
    vehicleSeats: number,
    vehicleMaxLuggage: number): Observable<Trip[]> {
    const trip = {
      id: id,
      vehicleType: vehicleType,
      vehicleBrand: vehicleBrand,
      vehicleName: vehicleName,
      vehicleModelYear: vehicleModelYear,
      vehicleColor: vehicleColor,
      vehicleSeats: vehicleSeats,
      vehicleMaxLuggage: vehicleMaxLuggage
    };
    return this.http.patch<Trip[]>(this.uriTripUpdate + id, trip);
  }

  // Delete trip from database
  deleteTrip(id: any): Observable<Trip[]> {
    return this.http.delete<Trip[]>(this.uriTripDelete + id);
  }
}
