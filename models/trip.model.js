import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var tripSchema = new Schema({
  belongsToUser: {
    type: String
  },
  selectedVehicle: {
    type: String
  },
  tripStatus: {
    type: String
  },
  tripIdTag: {
    type: String
  },
  tripFromLocation: {
    type: String
  },
  tripToLocation: {
    type: String
  },
  tripCreationDate: {
    type: Date
  },
  tripEditedDate: {
    type: Date
  },
  tripDate: {
    type: Date
  },
  tripTimeHour: {
    type: String
  },
  tripTimeMinutes: {
    type: String
  },
  tripFreeSeats: {
    type: Number
  },
  tripPrice: {
    type: Number
  },
  tripLuggageSpace: {
    type: Number
  },
  tripMessage: {
    type: String
  },
  tripNewPassengersAcceptance: {
    type: String
  },
  tripComfortable: {
    type: Boolean
  },
  tripStopsOnTheWayToFinalDestination: {
    type: Boolean
  },
  tripPassengersCanSmoke: {
    type: Boolean
  },
  tripPetsAreAllowed: {
    type: Boolean
  },
  tripPageVisitsCounter: {
    type: Number
  }
});

module.exports = mongoose.model('trips', tripSchema);
