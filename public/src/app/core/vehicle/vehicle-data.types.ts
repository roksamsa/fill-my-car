export class VehicleTypesSetup {
  id: string;
  vehicleType: string;
}

export const vehicleTypes: VehicleTypesSetup[] = [
  {
    id: 'car',
    vehicleType: 'Avto'
  },
  {
    id: 'suv',
    vehicleType: 'SUV'
  },
  {
    id: 'van',
    vehicleType: 'Kombi'
  },
  {
    id: 'truck',
    vehicleType: 'Tovornjak'
  },
  {
    id: 'motorbike',
    vehicleType: 'Motor'
  }
];
