export interface Trip {
  _id: String;
  belongsToUser: String;
  selectedVehicle: String;
  tripFromLocation: String;
  tripToLocation: String;
  tripDate: Date;
  tripTime: Date;
  tripStopsOnTheWayToFinalDestination: Boolean;
  tripCategory: String;
  tripCO2Emissions: Number;
  tripDistance: Number;
  tripDuration: Number;
  tripFreeSeats: Number;
  tripPrice: Number;
  tripLuggageSpace: Number;
  tripComfortable: Boolean;
  tripNewPassengersAcceptance: String;
}
