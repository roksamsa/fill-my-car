export interface Trip {
  _id: String;
  belongsToUser: String;
  selectedVehicle: String;
  tripIdTag: String;
  tripStatus: String;
  tripFromLocation: String;
  tripToLocation: String;
  tripDate: Date;
  tripTime: String;
  tripStopsOnTheWayToFinalDestination: Boolean;
  tripFreeSeats: Number;
  tripPrice: Number;
  tripLuggageSpace: Number;
  tripComfortable: Boolean;
  tripNewPassengersAcceptance: String;
}
