import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TripService } from '../../core/trip/trip.service';
import { AuthService } from '../../core/auth/auth.service';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { Trip } from '../../core/trip/trip.module';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-page',
  templateUrl: './trip-page.component.html',
  styleUrls: ['./trip-page.component.scss']
})

export class TripPageComponent implements OnInit, AfterViewInit {
  vehicle: Vehicle[] = [];
  trip: Trip[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyTrips = false;
  dateFormat = 'EEEE, dd. MMMM yyyy';
  currentTripId: any;
  tripFromLocationCity = '';
  tripToLocationCity = '';
  hereMapStart = '';
  hereMapFinish = '';

  selectedVehicleId = '';

  selectedTypeData = '';
  selectedBrandData = '';
  selectedBrandDataWithoutSpaces = '';
  selectedColorData = '';
  selectedVehicleYearData = '';
  isVehicleInsuranceChecked = false;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private vehicleService: VehicleService,
    private tripService: TripService,
    private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.fetchTrip();
    this.fetchVehicles();
  }

  // Fetch all trips for specific user
  fetchTrip() {
    this.route.paramMap.subscribe(params => {
      this.currentTripId = params.get('id');
      this.tripService.getTripById(this.currentTripId).subscribe((data: any) => {
        if (data !== null && data !== undefined) {
          this.trip = data;
          this.areThereAnyTrips = true;
          console.log(this.trip);

          this.tripFromLocationCity = this.trip.tripFromLocation.split(', ')[0];
          this.tripToLocationCity = this.trip.tripToLocation.split(', ')[0];
          this.hereMapStart = this.trip.tripFromLocation;
          this.hereMapFinish = this.trip.tripToLocation;
          this.selectedVehicleId = this.trip.selectedVehicle;

          this.fetchVehicles();

        } else {
          this.trip = null;
          this.areThereAnyTrips = true;
        }
      });
    });
  }

  fetchVehicles() {
    this.vehicleService.getVehicleById(this.selectedVehicleId)
      .subscribe((selectedVehicleData) => {
        if (selectedVehicleData) {
          this.vehicle = selectedVehicleData;
          console.log(this.vehicle);
          this.selectedTypeData = this.vehicle.vehicleType;
          this.selectedBrandData = '';
          this.selectedBrandDataWithoutSpaces = '';
          this.selectedColorData = this.vehicle.vehicleColor;
        } else {
          this.vehicle = null;
        }
      });
  }
}
