
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TripService } from '../../core/trip/trip.service';
import { TripPassengerService } from '../../core/trip-passenger/trip-passenger.service';
import { ConstantsService } from '../../common/services/constants.service';
import { Router } from '@angular/router';
import { SendEmailService } from '../../core/send-emails/send-email.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cancel-trip-reservation',
  templateUrl: './cancel-trip-reservation.component.html',
  styleUrls: ['./cancel-trip-reservation.component.scss']
})
export class CancelTripReservationComponent implements OnInit {

  trip: any = null;
  tripPassengerName: string = null;
  tripPassengerPhone: string = null;
  tripPassengerEmail: string = null;
  tripPassengerSeatsReservation: number = null;
  tripPassengerStartLocation: string = null;
  tripPassengerEndLocation: string = null;
  dateFormatWithoutTime = this.constant.dateFormatWithoutTime;
  subscription: Subscription;

  constructor(
    private router: Router,
    private tripService: TripService,
    private constant: ConstantsService,
    private sendEmailService: SendEmailService,
    public tripPassengerService: TripPassengerService,
    @Inject(MAT_DIALOG_DATA) public selectedTripData: any,
    public thisDialogRef: MatDialogRef<CancelTripReservationComponent>) {

  }

  ngOnInit(): void {
    this.tripPassengerService.getTripPassengerByHash(this.selectedTripData.passengerHash).subscribe(data => {
      this.trip = data;
      this.tripPassengerName = this.trip.tripPassengerName;
      this.tripPassengerPhone = this.trip.tripPassengerPhone;
      this.tripPassengerEmail = this.trip.tripPassengerEmail;
      this.tripPassengerSeatsReservation = this.trip.tripPassengerSeatsReservation;
      this.tripPassengerStartLocation = this.trip.tripPassengerStartLocation;
      this.tripPassengerEndLocation = this.trip.tripPassengerEndLocation;
    });
  }

  // Add vehicle on popup close
  updateTrip(
    id: string,
    tripTakenSeats: number,
    tripFreeSeats: number) {
    this.tripService.updateSeatsOnTrip(
      id,
      tripTakenSeats,
      tripFreeSeats).subscribe(() => {
        this.tripPassengerService.deleteTripPassenger(this.selectedTripData.passengerHash).subscribe(data => {
          console.log('Passenger reservation was deleted from trip #' + this.selectedTripData.trip.tripIdTag);
          this.sendEmailToDriverWhenPassengerCancels(
            this.tripPassengerEmail,
            this.tripPassengerName,
            this.tripPassengerPhone,
            this.selectedTripData.trip.tripDriverName,
            this.selectedTripData.trip.tripDriverEmail,
            this.selectedTripData.trip.id,
            this.selectedTripData.trip.tripIdTag,
            this.selectedTripData.trip.tripDate,
            this.tripPassengerSeatsReservation,
            this.selectedTripData.trip.tripFromLocation,
            this.selectedTripData.trip.tripToLocation,
            this.tripPassengerStartLocation,
            this.tripPassengerEndLocation
          );
          this.thisDialogRef.close('Confirm');
          this.router.navigate(['/potovanje/' + this.selectedTripData.trip.tripIdTag]);
        });
      });
  }

  updateTripWithNewSeatsReservation() {
    this.updateTrip(
      this.selectedTripData.trip.id,
      this.selectedTripData.trip.tripTakenSeats - this.tripPassengerSeatsReservation,
      this.selectedTripData.trip.tripFreeSeats + this.tripPassengerSeatsReservation
    );
  }

  sendEmailToDriverWhenPassengerCancels(
    passengerEmailAddress: string,
    passengerName: string,
    passengerPhone: string,
    driverName: string,
    driverEmailAddress: string,
    tripId: string,
    tripIdTag: string,
    tripDate: string,
    reservedSeatsNumber: number,
    startLocation: string,
    endLocation: string,
    reservedStartLocation: string,
    reservedEndLocation: string) {
    this.subscription = this.sendEmailService.sendEmailToDriverWhenSomeoneCancelsTrip(
      passengerEmailAddress,
      passengerName,
      passengerPhone,
      driverName,
      driverEmailAddress,
      tripId,
      tripIdTag,
      tripDate,
      reservedSeatsNumber,
      startLocation,
      endLocation,
      reservedStartLocation,
      reservedEndLocation).
      subscribe(data => {
        const msg = data['message'];
      }, error => {
        console.error(error, 'error');
      });
  }

  // Cancel adding vehicle on popup close
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
