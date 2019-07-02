import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  getVehicleById(vehicleId: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.uriVehicles + vehicleId);
  }

  // Get vehicles by specific user
  getVehicleByUser(belongsToUser: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.uriVehiclesForUser + belongsToUser);
  }

  // Add new vehicle to database
  addVehicle(
    belongsToUser: any,
    vehicleType: any,
    vehicleBrand: any,
    vehicleName: any,
    vehicleModelYear: number,
    vehicleColor: any,
    vehicleSeats: number,
    vehicleMaxLuggage: number,
    vehicleInsurance: boolean) {
    const vehicle = {
      belongsToUser: belongsToUser,
      vehicleType: vehicleType,
      vehicleBrand: vehicleBrand,
      vehicleName: vehicleName,
      vehicleModelYear: vehicleModelYear,
      vehicleColor: vehicleColor,
      vehicleSeats: vehicleSeats,
      vehicleMaxLuggage: vehicleMaxLuggage,
      vehicleInsurance: vehicleInsurance
    };
    return this.http.post(this.uriVehicleAdd, vehicle);
  }

  // Update vehicle from database
  updateVehicle(
    id: any,
    vehicleType: any,
    vehicleBrand: any,
    vehicleName: any,
    vehicleModelYear: number,
    vehicleColor: any,
    vehicleSeats: number,
    vehicleMaxLuggage: number,
    vehicleInsurance: boolean): Observable<Vehicle[]> {
    const vehicle = {
      id: id,
      vehicleType: vehicleType,
      vehicleBrand: vehicleBrand,
      vehicleName: vehicleName,
      vehicleModelYear: vehicleModelYear,
      vehicleColor: vehicleColor,
      vehicleSeats: vehicleSeats,
      vehicleMaxLuggage: vehicleMaxLuggage,
      vehicleInsurance: vehicleInsurance
    };
    return this.http.patch<Vehicle[]>(this.uriVehicleUpdate + id, vehicle);
  }

  // Delete vehicle from database
  deleteVehicle(id: any): Observable<Vehicle[]> {
    return this.http.delete<Vehicle[]>(this.uriVehicleDelete + id);
  }
}
