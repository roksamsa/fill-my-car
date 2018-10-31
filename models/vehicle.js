import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let VehicleSchema = new Schema({
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
    }
});

export default mongoose.model('Vehicle', VehicleSchema);