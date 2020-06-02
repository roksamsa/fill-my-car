import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailForPassengerInfo, EmailForDriverInfo } from './send-email.module';
import { ConstantsService } from '../../common/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  uriBase = this.constant.baseAppDomain;
  sendEmailURIForPassengerWhenHeJoinsTheTrip = this.uriBase + 'emails/passenger-when-joins-trip';
  sendEmailURIForDriverWhenSomebodyJoinsTheTrip = this.uriBase + 'emails/driver-when-joins-trip';

  constructor(private http: HttpClient,
              private constant: ConstantsService) { }

  sendEmailToPassengerWhenJoinsTrip(
    passengerEmailAddress: string,
    passengerName: string,
    passengerPhone: string,
    passengerCancelTripHash: string,
    driverName: string,
    driverEmailAddress: string,
    tripId: string,
    tripIdTag: string,
    tripDate: string,
    tripVehicle: string,
    tripVehicleColor: string,
    tripPrice: string,
    reservedSeatsNumber: number,
    startLocation: string,
    endLocation: string,
    reservedStartLocation: string,
    reservedEndLocation: string): Observable<EmailForPassengerInfo> {
    const email = {
      passengerEmailAddress: passengerEmailAddress,
      passengerName: passengerName,
      passengerPhone: passengerPhone,
      passengerCancelTripHash: passengerCancelTripHash,
      driverName: driverName,
      driverEmailAddress: driverEmailAddress,
      tripId: tripId,
      tripIdTag: tripIdTag,
      tripDate: tripDate,
      tripVehicle: tripVehicle,
      tripVehicleColor: tripVehicleColor,
      tripPrice: tripPrice,
      reservedSeatsNumber: reservedSeatsNumber,
      startLocation: startLocation,
      endLocation: endLocation,
      reservedStartLocation: reservedStartLocation,
      reservedEndLocation: reservedEndLocation
    };
    return this.http.post<EmailForPassengerInfo>(this.sendEmailURIForPassengerWhenHeJoinsTheTrip, email);
  }

  sendEmailToDriverWhenJoinsTrip(
    passengerEmailAddress: string,
    passengerName: string,
    passengerPhone: string,
    driverName: string,
    driverEmailAddress: string,
    tripId: string,
    tripIdTag: string,
    tripDate: string,
    tripVehicle: string,
    tripVehicleColor: string,
    tripPrice: string,
    reservedSeatsNumber: number,
    startLocation: string,
    endLocation: string,
    reservedStartLocation: string,
    reservedEndLocation: string): Observable<EmailForDriverInfo> {
    const email = {
      passengerEmailAddress: passengerEmailAddress,
      passengerName: passengerName,
      passengerPhone: passengerPhone,
      driverName: driverName,
      driverEmailAddress: driverEmailAddress,
      tripId: tripId,
      tripIdTag: tripIdTag,
      tripDate: tripDate,
      tripVehicle: tripVehicle,
      tripVehicleColor: tripVehicleColor,
      tripPrice: tripPrice,
      reservedSeatsNumber: reservedSeatsNumber,
      startLocation: startLocation,
      endLocation: endLocation,
      reservedStartLocation: reservedStartLocation,
      reservedEndLocation: reservedEndLocation
    };
    return this.http.post<EmailForDriverInfo>(this.sendEmailURIForDriverWhenSomebodyJoinsTheTrip, email);
  }
}
