export interface Vehicle {
  _id: string;
  belongsToUser: string;
  vehicleType: string;
  vehicleTypeID: string;
  vehicleBrand: string;
  vehicleName: string;
  vehicleModelYear: number;
  vehicleColorID: string;
  vehicleColor: string;
  vehicleSeats: number;
  vehicleMaxLuggage: number;
  vehicleInsurance: boolean;
}
