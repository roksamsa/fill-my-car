import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { TripService } from '../../core/trip/trip.service';
import { AuthService } from '../../core/auth/auth.service';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { TripPassengerService } from '../../core/trip-passenger/trip-passenger.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { Trip } from '../../core/trip/trip.module';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTripDialogComponent } from '../../dialogs/edit-trip-dialog/edit-trip-dialog.component';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-trip-page',
  templateUrl: './trip-page.component.html',
  styleUrls: ['./trip-page.component.scss']
})

export class TripPageComponent implements OnInit {
  vehicle: Vehicle;
  public trip: Trip[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  areThereAnyTrips = false;
  dateFormat = 'EEEE, dd. MMMM yyyy';
  currentTripId: any;
  tripFromLocationCity = '';
  tripToLocationCity = '';
  hereMapStart = '';
  hereMapFinish = '';
  dialogResult: '';

  selectedVehicleId = '';

  selectedTypeData = '';
  selectedBrandData = '';
  selectedNameData = '';
  selectedBrandDataWithoutSpaces = '';
  selectedColorData = '';
  selectedVehicleYearData = '';
  isVehicleInsuranceChecked = false;

  vehicleSeatsTakenNumber: number; // Na koncu moram to številko posodobit!
  vehicleSeatsAvailableNumber: any;
  vehicleSeatsStillLeftForCurrentTrip: number;
  vehicleSeatsSelectedNumber: number; // Izbrana številka v inputu!

  iWouldLikeToJointTheTrip1 = true;
  iWouldLikeToJointTheTrip2 = false;
  iWouldLikeToJointTheTrip3 = false;
  iWouldLikeToJointTheTrip4 = false;
  iWouldLikeToJointTheTrip5 = false;
  iWouldLikeToJointTheTrip6 = false;

  addTripFormStepperForm: FormGroup;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private vehicleService: VehicleService,
    private tripService: TripService,
    private tripPassengerService: TripPassengerService,
    private socialAuthService: AuthService,
    private popupDialog: MatDialog,
    private router: Router,
    private form: FormBuilder,
    private location: Location,
    private cdref: ChangeDetectorRef) {
    this.addTripFormStepperForm = this.form.group({
      addTripFormStepperFormArray: this.form.array([
        this.form.group({
          vehicleSeatsSelectedNumber: ''
        }),
        this.form.group({
          yourStartLocation: ['', Validators.required]
        }),
        this.form.group({
          yourEndLocation: ['', Validators.required]
        }),
        this.form.group({
          isAcceptPassengersChecked: 'auto'
        })
      ])
    });
  }

  ngOnInit() {
    this.fetchTrip();
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

          this.tripFromLocationCity = data.tripFromLocation.split(', ')[0];
          this.tripToLocationCity = data.tripToLocation.split(', ')[0];
          this.hereMapStart = data.tripFromLocation;
          this.hereMapFinish = data.tripToLocation;
          this.selectedVehicleId = data.selectedVehicle;
          this.vehicleSeatsTakenNumber = data.tripFreeSeats;

          this.fetchVehicle(this.selectedVehicleId);

        } else {
          this.trip = null;
          this.areThereAnyTrips = true;
        }
      });
    });
  }

  fetchVehicle(vehicleID) {
    this.vehicleService.getVehicleById(vehicleID)
      .pipe(filter(x => !!x))
      .subscribe((selectedVehicleData) => {
        if (selectedVehicleData) {
          this.vehicle = selectedVehicleData;
          this.selectedTypeData = selectedVehicleData.vehicleType;
          this.selectedColorData = selectedVehicleData.vehicleColor;
          this.selectedBrandData = selectedVehicleData.vehicleBrand;
          this.selectedNameData = selectedVehicleData.vehicleName;
          this.vehicleSeatsAvailableNumber = selectedVehicleData.vehicleSeats;
          this.vehicleSeatsStillLeftForCurrentTrip = this.vehicleSeatsAvailableNumber - this.vehicleSeatsTakenNumber;
        } else {
          this.vehicle = null;
        }
      });
  }

  // Edit vehicle dialog popup
  openEditVehicleDialog(trip: any, tripIndex: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '1100px';
    dialogConfig.position = {
      top: '100px'
    };
    dialogConfig.data = trip;

    const dialogRef = this.popupDialog.open(EditTripDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      this.fetchTrip();
    });
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  seatsInputChange(value: number) {
    this.vehicleSeatsSelectedNumber = value;
  }

  joinTripStart() {
    this.stepper.next();
    this.vehicleSeatsSelectedNumber = 1;
  }

  joinTrip1() {
    this.stepper.next();
  }

  joinTrip2() {
    this.stepper.next();
  }

  joinTrip3() {
    this.stepper.next();
  }

  // Add vehicle on popup close
  joinTripSave(
    belongsToUser: String,
    belongsToVehicle: String,
    belongsToTrip: String,
    tripPassengerSeatsReservation: Number,
    tripPassengerStartLocation: String,
    tripPassengerEndLocation: String,
    tripPassengerName: String,
    tripPassengerEmail: String,
    tripPassengerPhone: String) {
    this.tripPassengerService.addTripPassenger(
      belongsToUser,
      belongsToVehicle,
      belongsToTrip,
      tripPassengerSeatsReservation,
      tripPassengerStartLocation,
      tripPassengerEndLocation,
      tripPassengerName,
      tripPassengerEmail,
      tripPassengerPhone).subscribe(() => {
      });
  }

  cancelTripBooking() {
    this.stepper.selectedIndex = 0;
    this.vehicleSeatsSelectedNumber = 0;
  }
}
