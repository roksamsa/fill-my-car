import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateTripDialogComponent } from '../../dialogs/create-trip-dialog/create-trip-dialog.component';

@Component({
  selector: 'app-trips-page',
  templateUrl: './trips-page.component.html',
  styleUrls: ['./trips-page.component.scss']
})
export class TripsPageComponent implements OnInit {

  dialogResult = '';
  tileTitle = 'Moja potovanja';
  tileHeadlineAddButtonTooltipText = 'Dodaj novo potovanje';

  constructor(public popupTrip: MatDialog) { }

  ngOnInit() {
  }

  // Add trip dialog popup
  openAddTripDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '1100px';
    dialogConfig.position = {
      top: '100px'
    };

    const dialogRef = this.popupTrip.open(CreateTripDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
  }
}
