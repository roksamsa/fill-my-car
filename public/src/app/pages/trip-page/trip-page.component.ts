import { Component, OnInit, Input } from '@angular/core';
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

export class TripPageComponent implements OnInit {
  vehicle: Vehicle[] = [];
  trip: Trip[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyTrips = false;

  currentTripId: any;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private vehicleService: VehicleService,
    private tripService: TripService,
    private router: Router) { }

  ngOnInit() {
    this.fetchTrip();
  }

  // Fetch all trips for specific user
  fetchTrip() {
    this.route.paramMap.subscribe(params => {
      this.currentTripId = params.get('id');
      this.tripService.getTripById(this.currentTripId).subscribe((data: Trip[]) => {
        if (Object.getOwnPropertyNames(data).length === 0) {
          this.trip = null;
          this.areThereAnyTrips = true;
        } else {
          this.trip = data;
          this.areThereAnyTrips = true;
          console.log(data);
        }
      });
    });
  }
}
