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
  tripDate: {
    type: String
  },
  tripTime: {
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
  tripComfortable: {
    type: Boolean
  },
  tripStopsOnTheWayToFinalDestination: {
    type: Boolean
  },
  tripNewPassengersAcceptance: {
    type: String
  }
});

module.exports = mongoose.model('trips', tripSchema);
