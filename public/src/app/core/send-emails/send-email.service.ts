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
    emailAddress: string,
    name: string,
    phone: string,
    trip: string,
    seats: number,
    startLocation: string,
    endLocation: string): Observable<EmailInfo> {
    const email = {
      emailAddress: emailAddress,
      name: name,
      phone: phone,
      trip: trip,
      seats: seats,
      startLocation: startLocation,
      endLocation: endLocation
    };
    return this.http.post<EmailInfo>(this.uriSendEmail, email);
  }
}
