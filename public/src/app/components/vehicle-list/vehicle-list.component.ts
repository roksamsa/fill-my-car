import { Component, AfterViewInit, OnInit } from '@angular/core';
import { VehicleService } from '../../core/vehicle.service';
import { AuthService } from '../../core/auth.service';
import { Vehicle } from '../../core/vehicle.module';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})

export class VehicleListComponent implements OnInit, AfterViewInit {

  areThereAnyVehicles = false;
  user = JSON.parse(localStorage.getItem('user'));
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
    public authService: AuthService,
    private vehicleService: VehicleService,
    private router: Router) {
    }

  ngOnInit() {
    this.fetchVehicles();
    this.isVehicleListEmpty();
  }

  ngAfterViewInit() {
  }

  fetchVehicles() {
    this.vehicleService
      .getVehicleByUser(this.user.uid)
      .subscribe((data: Vehicle[]) => {
        if (data.length > 0) {
          this.vehicles = data;
          this.areThereAnyVehicles = true;
        } else {
          this.vehicles = [];
          this.areThereAnyVehicles = false;
        }
    });
  }

  public isVehicleListEmpty(): boolean {
    return this.areThereAnyVehicles;
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
