export interface TripPassenger {
  _id: String;
  belongsToUser: String;
  belongsToVehicle: String;
  belongsToTrip: String;
  tripPassengerSeatsReservation: Number;
  tripPassengerStartLocation: String;
  tripPassengerName: String;
  tripPassengerEmail: String;
  tripPassengerPhone: String;
}
