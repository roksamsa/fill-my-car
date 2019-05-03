import { Component, OnInit } from '@angular/core';
import { TripService } from '../../core/trip/trip.service';
import { Trip } from '../../core/trip/trip.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})

export class TripsListComponent implements OnInit {

  trips: Trip[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyVehicles = false;
  displayedColumns: string[] = [
    'tripStatus',
    'tripIdTag',
    'selectedVehicle',
    'tripFromLocation',
    'tripToLocation',
    'tripDateAndTime',
    'tripCategory',
    'tripDistance',
    'tripDuration',
    'tripPrice',
    'tripLuggageSpace',
  ];

  constructor(
    private tripService: TripService,
    private router: Router) {}

  ngOnInit() {
    this.fetchTrips();
  }

  // Fetch all trips for specific user
  fetchTrips() {
    this.tripService.getTripsByUser(this.currentUser.uid)
    .subscribe((data: Trip[]) => {
      if (data.length > 0) {
        this.trips = data;
        this.areThereAnyVehicles = true;
      } else {
        this.trips = null;
        this.areThereAnyVehicles = false;
      }
    });
  }
}
