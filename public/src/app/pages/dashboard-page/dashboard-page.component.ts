import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../core/vehicle.service';
import { Vehicle } from '../../core/vehicle.module';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit {

  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyVehicles = false;

  constructor(
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.fetchVehicles();
    this.isVehicleListEmpty();
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

  // Check if we get some vehicles from user or not
  isVehicleListEmpty(): boolean {
    return this.areThereAnyVehicles;
  }
}
