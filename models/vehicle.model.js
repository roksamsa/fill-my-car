import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var vehicleSchema = new Schema({
  id: {
    type: String
  },
  belongsToUser: {
    type: String
  },
  vehicleType: {
    type: String
  },
  vehicleBrand: {
    type: String
  },
  vehicleName: {
    type: String
  },
  vehicleModelYear: {
    type: Number
  },
  vehicleColor: {
    type: String
  },
  vehicleSeats: {
    type: Number
  },
  vehicleMaxLuggage: {
    type: Number
  },
  vehicleInsurance: {
    type: Boolean
  }
});

module.exports = mongoose.model('vehicles', vehicleSchema);
