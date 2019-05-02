import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var tripSchema = new Schema({
  id: {
    type: String
  },
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
  tripDateAndTime: {
    type: Date
  },
  tripStopsOnTheWayToFinalDestination: {
    type: Boolean
  },
  tripCategory: {
    type: String
  },
  tripCO2Emissions: {
    type: Number
  },
  tripDistance: {
    type: Number
  },
  tripDuration: {
    type: Number
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
  tripNewPassengersAcceptance: {
    type: String
  }
});

module.exports = mongoose.model('trips', tripSchema);
