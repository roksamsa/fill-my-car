import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getVehicles() {
    return this.http.get(`${this.uri}/vehicles`);
  }

  getVehicleById(id) {
    return this.http.get(`${this.uri}/vehicles/${id}`);
  }

  addVehicle(vehicleType, vehicleBrand, vehicleName, vehicleModelYear, vehicleColor, vehicleSeats, vehicleMaxLuggage) {
    const vehicle = {
      vehicleType: vehicleType,
      vehicleBrand: vehicleBrand,
      vehicleName: vehicleName,
      vehicleModelYear: vehicleModelYear,
      vehicleColor: vehicleColor,
      vehicleSeats: vehicleSeats,
      vehicleMaxLuggage: vehicleMaxLuggage
    };
    return this.http.post(`${this.uri}/vehicles/add`, vehicle);
  }

  updateVehicle(id, vehicleType, vehicleBrand, vehicleName, vehicleModelYear, vehicleColor, vehicleSeats, vehicleMaxLuggage) {
    const vehicle = {
      vehicleType: vehicleType,
      vehicleBrand: vehicleBrand,
      vehicleName: vehicleName,
      vehicleModelYear: vehicleModelYear,
      vehicleColor: vehicleColor,
      vehicleSeats: vehicleSeats,
      vehicleMaxLuggage: vehicleMaxLuggage
    };
    return this.http.post(`${this.uri}/vehicles/update/${id}`, vehicle);
  }

  deleteVehicle(id) {
    return this.http.delete(`${this.uri}/vehicles/delete/${id}`);
  }
}
