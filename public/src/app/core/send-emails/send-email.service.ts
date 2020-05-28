import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailInfo } from './send-email.module';
import { ConstantsService } from '../../common/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  uriBase = this.constant.baseAppDomain;
  uriSendEmail = this.uriBase + 'send-email/';

  constructor(private http: HttpClient,
              private constant: ConstantsService) { }

  sendEmail(
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
    reservedEndLocation: string): Observable<EmailInfo> {
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
    return this.http.post<EmailInfo>(this.uriSendEmail, email);
  }
}
