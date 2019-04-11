import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../core/vehicle.service';
import { Vehicle } from '../../core/vehicle.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})

export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyVehicles = false;
  displayedColumns: string[] = [
    'vehicleRegistrationPlate',
    'vehicleType',
    'vehicleBrand',
    'vehicleName',
    'vehicleModelYear',
    'vehicleColor',
    'vehicleSeats',
    'vehicleMaxLuggage',
    'actions'
  ];

  constructor(
    private vehicleService: VehicleService,
    private router: Router) {}

  ngOnInit() {
    this.fetchVehicles();
  }

  // Fetch all vehicles for specific user
  fetchVehicles() {
    this.vehicleService.getVehicleByUser(this.currentUser.uid)
    .subscribe((data: Vehicle[]) => {
      if (data.length > 0) {
        this.vehicles = data;
        this.areThereAnyVehicles = true;
      } else {
        this.vehicles = null;
        this.areThereAnyVehicles = false;
      }
    });
  }

  // Edit specific vehicle
  editVehicle(id: any) {
    this.router.navigate([`/edit/${id}`]);
  }

  // Delete specific vehicle
  deleteVehicle(id: any) {
    this.vehicleService.deleteVehicle(id)
    .subscribe(() => {
      this.fetchVehicles();
    });
  }

}
