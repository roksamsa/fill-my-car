export interface Trip {
  id: string;
  belongsToUser: string;
  selectedVehicle: string;
  tripStatus: string;
  tripIdTag: string;
  tripFromLocation: string;
  tripToLocation: string;
  tripCreationDate: Date;
  tripEditedDate: Date;
  tripDate: Date;
  tripTimeHour: string;
  tripTimeMinutes: string;
  tripDriverName: string;
  tripDriverEmail: string;
  tripAvailableSeats: number;
  tripTakenSeats: number;
  tripFreeSeats: number;
  tripPrice: number;
  tripLuggageSpace: number;
  tripMessage: string;
  tripNewPassengersAcceptance: string;
  tripComfortable: boolean;
  tripStopsOnTheWayToFinalDestination: boolean;
  tripPassengersCanSmoke: boolean;
  tripPetsAreAllowed: boolean;
  tripQuiet: boolean;
}
