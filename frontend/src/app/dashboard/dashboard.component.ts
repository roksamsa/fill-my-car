import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle.module';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
