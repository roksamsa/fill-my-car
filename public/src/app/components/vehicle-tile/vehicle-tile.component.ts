import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { VehicleService } from '../../core/vehicle.service';
import { Vehicle } from '../../core/vehicle.module'

@Component({
  selector: 'app-vehicle-tile',
  templateUrl: './vehicle-tile.component.html',
  styleUrls: ['./vehicle-tile.component.scss']
})
export class VehicleTileComponent implements OnInit, AfterViewInit, OnDestroy {

  vehicles: Vehicle[] = [];
  vehiclesData: any;
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyVehicles = false;

  constructor(
    private vehicleService: VehicleService) {}

  async ngOnInit() {
    this.fetchVehicles();
    this.vehicleService.getVehicleByUser(this.currentUser.uid);
  }

  ngAfterViewInit() {
  }

  // Fetch all vehicles for specific user
  fetchVehicles() {
    this.vehicleService.getVehicleByUser(this.currentUser.uid)
    .subscribe((data: Vehicle[]) => {
      if (!data) {
        return;
      }
      if (data.length > 0) {
        this.vehicles = data;
        return this.vehicles;
      } else {
        return this.vehicles = null;
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  ngOnDestroy() {
  }

}
