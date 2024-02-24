import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TripService } from '../../../core/trip/trip.service';
import { Trip } from '../../../core/trip/trip.module';
import { VehicleService } from '../../../core/vehicle/vehicle.service';
import { Vehicle } from '../../../core/vehicle/vehicle.module';
import { Subscription, Subject } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';
import { ConstantsService } from '../../../common/services/constants.service';
import { FirebaseAuthService } from '../../../core/auth/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTripDialogComponent } from '../../../dialogs/edit-trip-dialog/edit-trip-dialog.component';

@Component({
    selector: 'app-my-trip-list',
    templateUrl: './my-trip-list.component.html',
    styleUrls: ['./my-trip-list.component.scss']
})
export class MyTripListComponent implements OnInit {

    fetchTripsSubscription: Subscription;
    fetchVehiclesSubscription: Subscription;
    deleteTripSubscription: Subscription;

    public areThereAnyTrips = false;
    public trips: Trip[] = [];
    public vehicle: Vehicle;
    public currentUser: any;
    preloadingSpinnerVisibility = true;
    vehicleSeatsAvailableNumber: number;
    selectedVehicleId = '';
    createButtonTooltipText = 'Dodaj novo potovanje';

    emptyDataType = 'vertical';
    emptyDataText = 'Še nisi delil prevoza z drugimi.';
    emptyDataIcon = 'trip';
    emptyDataButtonText = 'Načrtuj novo potovanje';

    selectedTrip: any;
    selectedTripIndex = '';
    dialogResult: '';
    tripFromLocationCity = '';
    moreActionVisible: any;
    moreActionOpened = -1;
    dateFormat = 'dd. MMMM yyyy';
    dateLocale = 'sl-SI';

    tripStatusString: string;
    currentDate: Date = null;
    tripDate: any;
    tripDateFormatted: any;
    tripTime: any;
    isTripActive: boolean;
    public statusIconTooltip: String;
    @Input() readonly placeholder: string = '';
    @Output() setValue: EventEmitter<string> = new EventEmitter();
    private _searchSubject: Subject<string> = new Subject();

    constructor(
        private popupDialog: MatDialog,
        private constant: ConstantsService,
        public authService: FirebaseAuthService,
        private vehicleService: VehicleService,
        private tripService: TripService) {
        this.currentUser = this.authService.currentUserData;
        this._setSearchSubscription();
        this.currentDate = this.constant.currentDate;
    }

    ngOnInit() {
        this.fetchTrips();
        this.isTripsListEmpty();
    }

    moreActionsToggle(tripIndex) {
        if (this.moreActionOpened !== tripIndex) {
            this.moreActionOpened = tripIndex;
        } else {
            this.moreActionOpened = -1;
        }
    }

    private checkIfTripIsActive(): void {
        if (this.currentDate < this.tripDateFormatted) {
            this.isTripActive = true;
            this.statusIconTooltip = 'Potovanje je aktivno';
        } else {
            this.isTripActive = false;
            this.statusIconTooltip = 'Potovanje ni aktivno';
        }
    }

    public makeTripDateFormatted(date): Date {
        return new Date(date);
    }

    // Delete specific trip
    deleteTrip(id: any) {
        this.deleteTripSubscription = this.tripService.deleteTrip(id)
            .subscribe(() => {
                this.fetchTrips();
                this.moreActionOpened = -1;
            });
    }

    preloadingSpinnerShow() {
        const that = this;
        this.preloadingSpinnerVisibility = true;

        setTimeout(function () {
            that.preloadingSpinnerVisibility = false;
        }, 500);
    }

    // Fetch all trips
    fetchTrips() {
        this.fetchTripsSubscription = this.tripService.getAllTrips().subscribe((data: any) => {
            if (data.length > 0) {
                this.trips = data;
                this.areThereAnyTrips = true;
                this.preloadingSpinnerShow();
                this.selectedVehicleId = data[0].selectedVehicle;
                this.fetchVehicle(this.selectedVehicleId);
            } else {
                this.trips = null;
                this.areThereAnyTrips = false;
                this.preloadingSpinnerShow();
            }
        });
    }

    // Fetch all vehicles for specific user
    fetchVehicle(vehicleID) {
        this.fetchVehiclesSubscription = this.vehicleService.getVehicleById(vehicleID)
            .pipe(filter(x => !!x))
            .subscribe((selectedVehicleData) => {
                if (selectedVehicleData) {
                    this.vehicle = selectedVehicleData;
                    this.vehicleSeatsAvailableNumber = this.vehicle.vehicleSeats;
                } else {
                    this.vehicle = null;
                }
            });
    }

    // Edit vehicle dialog popup
    openEditVehicleDialog(trip: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.closeOnNavigation = true;
        dialogConfig.width = '1100px';
        dialogConfig.data = trip;

        const dialogRef = this.popupDialog.open(EditTripDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            this.dialogResult = result;
            this.fetchTrips();
        });
    }

    // Check if we get some vehicles from user or not
    isTripsListEmpty(): boolean {
        return this.areThereAnyTrips;
    }

    // Optionally, I have added a placeholder input for customization
    public updateSearch(searchTextValue: string) {
        this._searchSubject.next(searchTextValue);
    }

    private _setSearchSubscription() {
        this._searchSubject.pipe(
            debounceTime(500)
        ).subscribe((searchValue: string) => {
            this.setValue.emit(searchValue);
        });
    }

    ngOnDestroy() {
        this._searchSubject.unsubscribe();

        if (this.fetchTripsSubscription) {
            this.fetchTripsSubscription.unsubscribe();
        }

        if (this.fetchVehiclesSubscription) {
            this.fetchVehiclesSubscription.unsubscribe();
        }

        if (this.deleteTripSubscription) {
            this.deleteTripSubscription.unsubscribe();
        }
    }

}
