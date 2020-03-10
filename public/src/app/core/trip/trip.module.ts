export interface Trip {
  _id: string;
  belongsToUser: string;
  selectedVehicle: string;
  tripIdTag: string;
  tripStatus: string;
  tripFromLocation: string;
  tripToLocation: string;
  tripDate: Date;
  tripTime: string;
  tripStopsOnTheWayToFinalDestination: boolean;
  tripFreeSeats: number;
  tripTakenSeats: number;
  tripPrice: number;
  tripLuggageSpace: number;
  tripComfortable: boolean;
  tripNewPassengersAcceptance: string;
}
