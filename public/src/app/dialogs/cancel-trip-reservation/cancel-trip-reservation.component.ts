
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TripService } from '../../core/trip/trip.service';
import { TripPassengerService } from '../../core/trip-passenger/trip-passenger.service';
import { ConstantsService } from '../../common/services/constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-trip-reservation',
  templateUrl: './cancel-trip-reservation.component.html',
  styleUrls: ['./cancel-trip-reservation.component.scss']
})
export class CancelTripReservationComponent implements OnInit {

  tripPassengerSeatsReservation: number = null;
  trip: any = null;
  dateFormatWithoutTime = this.constant.dateFormatWithoutTime;

  constructor(
    private router: Router,
    private tripService: TripService,
    private constant: ConstantsService,
    public tripPassengerService: TripPassengerService,
    @Inject(MAT_DIALOG_DATA) public selectedTripData: any,
    public thisDialogRef: MatDialogRef<CancelTripReservationComponent>) {

  }

  ngOnInit(): void {
    this.tripPassengerService.getTripPassengerByHash(this.selectedTripData.passengerHash).subscribe(data => {
      this.trip = data;
      this.tripPassengerSeatsReservation = this.trip.tripPassengerSeatsReservation;
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

  // Cancel adding vehicle on popup close
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
