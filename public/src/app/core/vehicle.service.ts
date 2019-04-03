import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  uriLink = 'http://localhost:4000';

  constructor(
    private http: HttpClient,
    public authService: AuthService) { }

  getVehicles() {
    return this.http.get(`${this.uriLink}/vehicles`);
  }

  getVehicleById(id) {
    return this.http.get(`${this.uriLink}/vehicles/${id}`);
  }

  getVehicleByUser(belongsToUser) {
    return this.http.get(`${this.uriLink}/vehicles/user/${belongsToUser}`);
  }

  addVehicle(belongsToUser, vehicleType, vehicleBrand, vehicleName, vehicleModelYear, vehicleColor, vehicleSeats, vehicleMaxLuggage) {
    const vehicle = {
      belongsToUser: belongsToUser,
      vehicleType: vehicleType,
      vehicleBrand: vehicleBrand,
      vehicleName: vehicleName,
      vehicleModelYear: vehicleModelYear,
      vehicleColor: vehicleColor,
      vehicleSeats: vehicleSeats,
      vehicleMaxLuggage: vehicleMaxLuggage
    };
    return this.http.post(`${this.uriLink}/vehicles/add`, vehicle);
  }

  updateVehicle(id,
    belongsToUser,
    vehicleType,
    vehicleBrand,
    vehicleName,
    vehicleModelYear,
    vehicleColor,
    vehicleSeats,
    vehicleMaxLuggage) {
    const vehicle = {
      belongsToUser: belongsToUser,
      vehicleType: vehicleType,
      vehicleBrand: vehicleBrand,
      vehicleName: vehicleName,
      vehicleModelYear: vehicleModelYear,
      vehicleColor: vehicleColor,
      vehicleSeats: vehicleSeats,
      vehicleMaxLuggage: vehicleMaxLuggage
    };
    return this.http.post(`${this.uriLink}/vehicles/update/${id}`, vehicle);
  }

  deleteVehicle(id) {
    return this.http.delete(`${this.uriLink}/vehicles/delete/${id}`);
  }
}
