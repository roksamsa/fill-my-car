export interface TripPassenger {
  _id: string;
  belongsToUser: string;
  belongsToVehicle: string;
  belongsToTrip: string;
  tripPassengerSeatsReservation: number;
  tripPassengerStartLocation: string;
  tripPassengerName: string;
  tripPassengerEmail: string;
  tripPassengerPhone: string;
}
