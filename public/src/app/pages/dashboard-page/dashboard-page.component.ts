import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../core/vehicle.service';
import { Vehicle } from '../../core/vehicle.module';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  vehicles: Vehicle[];
  displayedColumns: string[] = [
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
    private router: Router) { }

  ngOnInit() {
    this.fetchVehicles();
  }

  fetchVehicles () {
    this.vehicleService
    .getVehicles()
    .subscribe((data: Vehicle[]) => {
      this.vehicles = data;
      console.log('Data required ...');
      console.log(this.vehicles);
    });
  }

  editVehicle(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteVehicle(id) {
    this.vehicleService.deleteVehicle(id).subscribe(() => {
      this.fetchVehicles();
    });
  }

}
