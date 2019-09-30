import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var tripPassengerSchema = new Schema({
  belongsToUser: {
    type: String
  },
  belongsToVehicle: {
    type: String
  },
  belongsToTrip: {
    type: String
  },
  tripPassengerSeatsReservation: {
    type: Number
  },
  tripPassengerStartLocation: {
    type: String
  },
  tripPassengerEndLocation: {
    type: String
  },
  tripPassengerName: {
    type: String
  },
  tripPassengerEmail: {
    type: String
  },
  tripPassengerNamePhone: {
    type: String
  }
});

module.exports = mongoose.model('tripPassenger', tripPassengerSchema);
