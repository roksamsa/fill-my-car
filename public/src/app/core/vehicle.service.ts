import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Vehicle } from './vehicle.module';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  uriBase = 'http://localhost:4000';
  uriVehicles = this.uriBase + '/vehicles/';
  uriVehiclesForUser = this.uriVehicles + 'user/';
  uriVehicleAdd = this.uriVehicles + 'add/';
  uriVehicleUpdate = this.uriVehicles + 'update/';
  uriVehicleDelete = this.uriVehicles + 'delete/';

  constructor(
    private http: HttpClient) { }

  // Get all vehicles in database
  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.uriVehicles);
  }

  // Get specific vehicle by ID
  getVehicleById(id: any): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.uriVehicles + id);
  }

  // Get vehicles by specific user
  getVehicleByUser(belongsToUser: any): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.uriVehiclesForUser + belongsToUser);
  }

  // Add vehicle to database
  addVehicle(
    belongsToUser: any,
    vehicleRegistrationPlate: any,
    vehicleType: any,
    vehicleBrand: any,
    vehicleName: any,
    vehicleModelYear: number,
    vehicleColor: any,
    vehicleSeats: number,
    vehicleMaxLuggage: number) {
    const vehicle = {
      belongsToUser: belongsToUser,
      vehicleRegistrationPlate: vehicleRegistrationPlate,
      vehicleType: vehicleType,
      vehicleBrand: vehicleBrand,
      vehicleName: vehicleName,
      vehicleModelYear: vehicleModelYear,
      vehicleColor: vehicleColor,
      vehicleSeats: vehicleSeats,
      vehicleMaxLuggage: vehicleMaxLuggage
    };
    return this.http.post(this.uriVehicleAdd, vehicle);
  }

  // Update vehicle from database
  updateVehicle(
    id: any,
    belongsToUser: any,
    vehicleRegistrationPlate: any,
    vehicleType: any,
    vehicleBrand: any,
    vehicleName: any,
    vehicleModelYear: number,
    vehicleColor: any,
    vehicleSeats: number,
    vehicleMaxLuggage: number) {
    const vehicle = {
      belongsToUser: belongsToUser,
      vehicleRegistrationPlate: vehicleRegistrationPlate,
      vehicleType: vehicleType,
      vehicleBrand: vehicleBrand,
      vehicleName: vehicleName,
      vehicleModelYear: vehicleModelYear,
      vehicleColor: vehicleColor,
      vehicleSeats: vehicleSeats,
      vehicleMaxLuggage: vehicleMaxLuggage
    };
    return this.http.post(this.uriVehicleUpdate, vehicle);
  }

  // Delete vehicle from database
  deleteVehicle(id: any): Observable<Vehicle[]> {
    return this.http.delete<Vehicle[]>(this.uriVehicleDelete + id);
  }
}
