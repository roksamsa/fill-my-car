import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var tripSchema = new Schema({
  belongsToUser: {
    type: String
  },
  selectedVehicle: {
    type: String
  },
  tripIdTag: {
    type: String
  },
  tripStatus: {
    type: String
  },
  tripFromLocation: {
    type: String
  },
  tripToLocation: {
    type: String
  },
  tripDate: {
    type: Date
  },
  tripTime: {
    type: Date
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
